const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,  // Timeout for server selection (5 seconds)
      connectTimeoutMS: 30000,        // Timeout for initial connection (30 seconds)
      socketTimeoutMS: 45000,         // Timeout for operations on sockets (45 seconds)
    });
    
    console.log('MongoDB connected Sucessfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
