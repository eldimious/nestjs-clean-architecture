export default () => ({
  host: process.env.host,
  httpPort: process.env.HTTP_PORT || 5555,
  database: {
    url: process.env.DATABASE_URL,
  }
});