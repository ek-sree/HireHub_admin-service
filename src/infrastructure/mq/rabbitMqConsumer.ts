import { getChannel } from './rabbitMQ.config';
import { adminController } from '../../interfaces/controller/adminController';
import { IUser } from '../../domain/entities/IUser';
import { publishUserData } from './rabbitMqproducer';

const queueName = 'user_data_queue';

const consumeMessages = async () => {
    try {
        const channel = getChannel();
        if (!channel) {
            throw new Error('RabbitMQ channel is not initialized');
        }

        await channel.assertQueue(queueName, { durable: true });

        console.log(`[*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const userData: IUser = JSON.parse(msg.content.toString());
                console.log('Received message:', userData);

                adminController.processUserData(userData);
                await publishUserData(userData);

                channel.ack(msg);
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ', error);
        throw error;
    }
};

consumeMessages();
