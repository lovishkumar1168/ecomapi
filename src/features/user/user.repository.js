import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

//creating a model basically in other words collection using Schema
const UserModel = mongoose.model("users",userSchema);

export class UserRepository{
    async signUp(user)
    {
        try{
            //creating a instance of UserModel and basically create a document
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err)
        {
            if(err instanceof mongoose.Error.ValidationError)
            {
                throw err;
            }
            console.log(err);
        }
    }
    async findByEmail(email)
    {
        try{
            return await UserModel.findOne({email});
        }
        catch(err)
        {
            console.log(err);
        }
    } 
    async resetPassword(userId,newPassword)
    {
        try{
            let user = await UserModel.findById(userId);
            if(user)
            {
                user.password = newPassword;
                await user.save();
            }else{
                throw new Error("user not found");
            }
        }
        catch(err)
        {
          console.log(err);  
        }
    }
}