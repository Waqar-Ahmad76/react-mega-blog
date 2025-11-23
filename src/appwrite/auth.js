import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount ({ email, password, name }){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password,name);

            if (userAccount){
                // we will call another method on succesful sign up
                return this.login({email, password});
            }
            else {
                return userAccount;
            }
        }
        catch(error){
             console.error("sign up failed:", error.message);
            throw error;
        }

    }

    async login({email,password}) {
        try {
           return  await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
             console.error("Login failed:", error.message);
            throw error;
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get();
        } catch (error) {
             console.error("could not get user:", error.message);
            throw error;
        }

        return null;
    }

    async logout (){
        try {
            await this.account.deleteSessions();
        } catch (error) {
             console.error("could not log out :", error.message);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;