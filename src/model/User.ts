import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../domain/entities/IUser";

export interface IUserDocument extends IUser , Document {}

const adminSchema : Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },

   name: {
    type: String,
    required: true,
   },

    updated_at:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const user = mongoose.model<IUserDocument>("user", adminSchema);