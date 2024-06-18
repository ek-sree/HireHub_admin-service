import { loginAdmin } from "../../application/use-case/admin";
import * as grpc from '@grpc/grpc-js';

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
    }
}