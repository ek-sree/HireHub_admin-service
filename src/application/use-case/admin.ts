import { IUser } from "../../domain/entities/IUser";
import { AdminRepository } from "../../domain/repositories/AdminRepository"

const adminRepo = new AdminRepository()

export const loginAdmin = async (email: string, password: string): Promise<any> =>{
    try {
        const result = await adminRepo.checkAdmin(email, password);
        console.log("res admin", result);
        return result;
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error saving user: ${err.message}`);
    }
}
export const saveUser = async (userData: IUser): Promise<void> => {
    try {
        
        await adminRepo.save(userData);
        console.log(`Saved user ${userData.email} in admin database`);
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};