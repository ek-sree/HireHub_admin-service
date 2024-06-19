import { IAdminRepository } from "./IAdminRepository";
import { IAdmin } from "../entities/IAdmin";
import { admin } from "../../model/Admin";
import bcrytp from 'bcrypt';
import { IUser } from "../entities/IUser";

export class AdminRepository implements IAdminRepository {

    async checkAdmin(email: string, password: string): Promise<{ success: boolean; message: string; adminData?: IAdmin | undefined; }> {
        try {
            const adminData = await admin.findOne({ email }).exec();
            if(!adminData){
                return { success: false, message: "Email incorrect" };
            }
            const isPasswordMatch = await bcrytp.compare(password, adminData.password);
            if (!isPasswordMatch) {
                return { success: false, message: "Password incorrect" };
            }
            return { success: true, message:"Admin found", adminData };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding user by email and password: ${err.message}`);
        }
    }

        save = async (userData: IUser): Promise<void> => {
        try {
            const newUser = new admin(userData);
            await newUser.save();
            console.log(`Saved user ${userData.email} in admin database`);
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    };
}