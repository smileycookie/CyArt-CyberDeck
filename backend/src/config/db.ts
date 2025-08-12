import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
  try {
    // Debug log to verify the URI is loaded
    console.log('Connecting to:', process.env.MONGODB_URI);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

// Elasticsearch configuration for Wazuh OpenSearch
const elasticsearchConfig = {
  node: 'http://100.66.240.63:9200',
  auth: {
    username: 'admin',
    password: 'admin'
  },
  ssl: {
    rejectUnauthorized: false
  },
  requestTimeout: 30000,
  pingTimeout: 3000,
  // Disable version check for OpenSearch compatibility
  ignoreUndefined: true,
  // Skip product check for OpenSearch
  disablePrototypePoisoningProtection: true
};

export { elasticsearchConfig };
export default connectDB;
