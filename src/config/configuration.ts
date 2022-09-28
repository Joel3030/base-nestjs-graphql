export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET123456789',
});
