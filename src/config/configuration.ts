export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
