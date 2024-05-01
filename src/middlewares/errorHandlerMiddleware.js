import mongoose from "mongoose";

export class customErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}
export const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.status(400).send(err.message);
    }
    if(err instanceof customErrorHandler)
    {
        return res.status(err.statusCode).send(err.message);
    }
    res.status(500).send("Oops! Something went wrong... Please try again later!");
}