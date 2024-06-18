import mongoose, { Document, Schema } from "mongoose";
import { IAdmin } from "../domain/entities/IAdmin";

export interface IAdminDocument extends IAdmin , Document {}

const adminSchema : Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },

    password: {
        type: String,
        required: true
    },

    created_at:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const admin = mongoose.model<IAdminDocument>("admin", adminSchema);