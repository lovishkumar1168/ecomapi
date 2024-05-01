import { UserModel } from "../features/user/user.model.js";

export const basicAuthorization = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    if(!authHeader)
    {
        return res.status(401).send("No Authorization details provided");
    }

    const base64Creds = authHeader.replace("Basic ","");

    const decodeCreds = Buffer.from(base64Creds,'base64').toString();

    const creds = decodeCreds.split(":");
    console.log(creds);
    const user = UserModel.getAll().find((u)=> u.email == creds[0] && u.password == creds[1]);

    if(user)
    {
        next();
    }
    else
    {
         return res.status(401).send("Invalid Credentials");
    }
}