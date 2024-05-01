
import fs from "fs";

const fsPromises = fs.promises;

async function log(logData)
{
    try
    {
        logData = `\n ${new Date().toString()}\n ${logData}\n`;
        await fsPromises.appendFile("log.txt",logData);
    }
    catch(err)
    {
        console.log(err);
    }
}

export const loggerMiddleware = async(req,res,next)=>{
    const logData = `req URL : ${req.url}\n reqBody : ${JSON.stringify(req.body)}`
    await log(logData);
    next();
}

