import express from 'express';
import { connectToDatabase } from '../database/mongodb';
import { startGrpcServer } from '../grpc/client/grpcServer';
import config from '../config';
import { connectToRabbitMQ } from '../mq/rabbitMQ.config';


const app = express();
app.use(express.json());

const startServer = async () =>{
    try {
        await connectToDatabase();
        await connectToRabbitMQ()
        startGrpcServer()

        const port = config.port;
        app.listen(port, () =>{
            console.log(`Server running on port ${port}`);
        })
    } catch (error) {
        console.error("Error starting server", error);
        process.exit(1);
    }
}

startServer()