import jwt from "jsonwebtoken";
export const jwtAuthorization = (req,res,next)=>{
    //const token = req.headers['authorization'];
    const token = req.cookies.jwtToken;
    if(!token)
    {
        return res.status(401).send("unauthorized");
    }

    try{
        console.log("hello");
        const payload = jwt.verify(token,process.env.JWT_TOKEN);
        req.userId = payload.userId;
        console.log(payload);
    }
    catch(err)
    {
        return res.status(401).send("unauthorized");
    }
    next();
}