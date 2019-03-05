const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb://Vallabha:V@llabha1@cluster0-shard-00-00-fpqvq.mongodb.net:27017,cluster0-shard-00-01-fpqvq.mongodb.net:27017,cluster0-shard-00-02-fpqvq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
};

export default config;
