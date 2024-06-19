import { loginAdmin, saveUser } from "../../application/use-case/admin";
import * as grpc from '@grpc/grpc-js';
import { IUser } from "../../domain/entities/IUser";

export const adminController = {
    loginAdmin: async(call: any, callback:any) => {
        try {
            console.log("admin", call.request);
            
            const { email, password} = call.request;
            const result = await loginAdmin(email, password);
            callback(null, result)
        } catch (error) {
            const err = error as Error;
            callback({
               code:grpc.status.INTERNAL,
               message:err.message,
            },null); 
           }
    },

    processUserData: async (userData: IUser) => {
        try {
            await saveUser(userData);
            console.log(`Saved user ${userData.email} from RabbitMQ`);
        } catch (error) {
            console.error('Error processing user data:', error);
            throw error;
        }
    }
}