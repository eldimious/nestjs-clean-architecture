export default () => ({
  httpPort: process.env.HTTP_PORT || 8080,
  database: {
    url: process.env.DATABASE_URL,
  }
});