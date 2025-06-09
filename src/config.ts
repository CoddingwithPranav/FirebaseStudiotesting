
// config.ts
export const config = {
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase',
  apiKey: process.env.API_KEY || 'default_api_key',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  // Add other environment variables as needed
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
};
