module.exports = {
  apps: [
    {
      name: "blog-backend",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3001,
        MONGO_URL: process.env.MONGO_URL,
        JWT_SECRET: process.env.JWT_SECRET || 'blog-backend',
      },
      env_development: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 3001,
        MONGO_URL: process.env.MONGO_URL, 
        JWT_SECRET: process.env.JWT_SECRET || 'blog-backend',
      }
    }
  ]
};
