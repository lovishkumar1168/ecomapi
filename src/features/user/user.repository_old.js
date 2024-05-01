import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";




export class UserRepository{
    contructor()
    {
        this.collection = "users";
    }
    async signUp(newUser)
    {
        try
        {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newUser);
            return newUser;
        }
        catch(err)
        {
            console.log(err);
            throw new customErrorHandler("something went wrong",500);
        }
    }
    async findByEmail(email)
    {
        try
        {
            const db = getDB();
            const collection = db.collection("users");
            return await collection.findOne({email});
        }
        catch(err)
        {
            console.log(err);
            throw new customErrorHandler("something went wrong",500);
        }
    }
}