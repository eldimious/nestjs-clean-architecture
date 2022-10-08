import { IUserResponseDto } from '../../presentation/http/routes/users/dto/response/IUserResponseDto';

export class User {
  readonly userId: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly username: string;

  readonly email: string;

  readonly password: string;

  readonly created: Date;

  constructor(_id: string, firstName: string, lastName: string, username: string, email: string, password: string, created: Date) {
    this.userId = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created = created;
  }

  toUserResponse(): IUserResponseDto {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      created: this.created,
    } as IUserResponseDto;
  }
}
