const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://" +
      (process.env.IP ||
        "Vallabha:satyanarayana@cluster0-fpqvq.mongodb.net/mernproject?retryWrites=true")
};

export default config;
