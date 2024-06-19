import { IUser } from '../../domain/entities/IUser';
import { getChannel } from './rabbitMQ.config';

const userDataQueueName = 'user_data_to_apigateway';

export const publishUserData = async (userData: IUser) => {
    try {
        const channel = getChannel();
        if (!channel) {
            throw new Error('RabbitMQ channel is not initialized');
        }

        await (await channel).assertQueue(userDataQueueName, { durable: true });

        (await channel).sendToQueue(userDataQueueName, Buffer.from(JSON.stringify(userData)));

        console.log(`Published user ${userData.email} to ${userDataQueueName}`);
    } catch (error) {
        console.error('Error publishing user data to RabbitMQ:', error);
        throw error;
    }
};

