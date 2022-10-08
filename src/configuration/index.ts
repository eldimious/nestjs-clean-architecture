export default () => ({
  host: process.env.host,
  httpPort: process.env.HTTP_PORT || 5555,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
});
