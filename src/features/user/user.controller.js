import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";
import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt"
export class UserController{
    constructor()
    {
        this.userRepository = new UserRepository();
    }
    async signUp(req,res,next)
    {
        try
        {
            const {name,email,password,type} = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            let user = new UserModel(name,email,hashedPassword,type);
            let newUser = await this.userRepository.signUp(user);
            res.status(201).send(newUser);
        }
        catch(err)
        {
            next(err);
           throw new customErrorHandler("something went wrong",500);
        }
    }
    async signIn(req,res)
    {
        try
        {
            const {email,password} = req.body;
            let user = await this.userRepository.findByEmail(email);
            if(!user)
            {
                return res.status(400).send("incorrect credentials");
            }
            const result = await bcrypt.compare(password,user.password);
            if(result)
            {
                const token = jwt.sign(
                    {
                        userId : user._id,
                        email : user.email
                    },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn : '1h'
                    }
                )
                res.status(200).cookie('jwtToken',token).send(token);
            }
            else
            {
                res.status(400).send("incorrect credentials");
            }
        }
        catch(err)
        {
           throw new customErrorHandler("something went wrong",500);
        }
    }
    async resetPassword(req,res)
    {
        const {newPassword} = req.body;
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(newPassword,12)
        try{
            await this.userRepository.resetPassword(userId,hashedPassword);
            res.status(200).send("password is reset");
        }
        catch(err)
        {
            console.log(err);
        }
    }
}