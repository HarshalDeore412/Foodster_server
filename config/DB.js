const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = async () => {
  try {
    // Use encodeURIComponent to handle special characters in the password
    const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
    const dbUser = process.env.DB_USER;
    const dbCluster = process.env.DB_CLUSTER;
    const dbName = process.env.DB_NAME;

    const conn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=project_1`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    
    // Optional: Implement a retry mechanism
    // Decide on max number of retries
    const maxRetries = 5;
    let retries = 0;
    
    while (retries < maxRetries && !mongoose.connection.readyState) {
      retries++;
      console.log(`Attempt ${retries} to reconnect...`);
      await new Promise(res => setTimeout(res, 5000)); // wait for 5 seconds before retrying
      try {
        await mongoose.connect(
          `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=project_1`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log(`MongoDB Reconnected: ${conn.connection.host}`);
      } catch (retryErr) {
        console.error(`Retry connection error: ${retryErr.message}`);
        if (retries === maxRetries) {
          // Exit process after final retry fails
          process.exit(1);
        }
      }
    }
  }
};

module.exports = DBConnect;
