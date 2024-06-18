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