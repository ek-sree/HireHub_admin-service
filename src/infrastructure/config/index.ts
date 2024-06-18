import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 5002,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/HireHub-Admin-service',
    grpcPort: process.env.GRPC_PORT || 50053,
}

export default config;