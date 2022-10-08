import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { MAX_CONSECUTIVE_FAILS_BY_USERNAME } from '../../../common/constants';

export interface IResourceLimiterRepository {
  maxConsecutiveFailsByUsername: number;
  getUserKeyForFailedLogin: (usernameKey: string) => Promise<RateLimiterRes | null>;
  consumeUserPointsForFailedLogin: (usernameKey: string) => Promise<RateLimiterRes>;
  deleteUserKeyForFailedLogin: (usernameKey: string) => Promise<boolean>
}

@Injectable()
export class RecourceLimiterRepository implements IResourceLimiterRepository {
  private _redisClient: Redis;

  private _limiterUserConsecutiveFailsByUsername: RateLimiterRedis;

  maxConsecutiveFailsByUsername: number;

  constructor(
    // private configService: ConfigService,
  ) {
    // const redisUrl = this.configService.get('redis')?.url;
    this._redisClient = new Redis(process.env.REDIS_URL as string, { enableOfflineQueue: false });
    this.maxConsecutiveFailsByUsername = MAX_CONSECUTIVE_FAILS_BY_USERNAME;
    this._limiterUserConsecutiveFailsByUsername = new RateLimiterRedis({
      storeClient: this._redisClient,
      keyPrefix: 'login_fail_consecutive_username_user',
      points: MAX_CONSECUTIVE_FAILS_BY_USERNAME,
      duration: 60 * 10, // Store number for 10 minutes since first fail(ttl)
      blockDuration: 60 * 10, // Block for 10mnts
    });
  }

  async consumeUserPointsForFailedLogin(usernameKey: string): Promise<RateLimiterRes> {
    return this._limiterUserConsecutiveFailsByUsername.consume(usernameKey);
  }

  async deleteUserKeyForFailedLogin(usernameKey: string): Promise<boolean> {
    return this._limiterUserConsecutiveFailsByUsername.delete(usernameKey);
  }

  async getUserKeyForFailedLogin(usernameKey: string): Promise<RateLimiterRes | null> {
    return this._limiterUserConsecutiveFailsByUsername.get(usernameKey);
  }
}
