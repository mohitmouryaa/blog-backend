module.exports = {
  apps: [
    {
      name: "blog-backend",           
      script: "./dist/src/index.js", 
      instances: 1,              
      exec_mode: "fork",          
      watch: false,                 
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
    },
  ],
};
