import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import config from '../../config';
import { adminController } from '../../../interfaces/controller/adminController';

const PROTO_PATH = path.resolve(__dirname, '../proto/admin.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true,
});

const protoDescription = grpc.loadPackageDefinition(packageDefinition) as any;
const adminProto = protoDescription.admin;

const server = new grpc.Server();
server.addService(adminProto.AdminService.service,{
    Login: adminController.loginAdmin
});

const startGrpcServer = ()=>{
    const grpcPort = config.grpcPort;
    server.bindAsync(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure(),(err, bindPort)=>{
        if(err){
            console.error("Faild to start grpc server:", err);
            return;
        }else{
            console.log(`gRpc server running at http://0.0.0.0:${bindPort}`);
            
        }
    })
}

export { startGrpcServer };