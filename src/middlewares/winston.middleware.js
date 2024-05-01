import winston from "winston";


const logger = winston.createLogger({
    level : 'info',
    format : winston.format.json(),
    defaultMeta : {service : 'request-logging'},
    transports : [
        new winston.transports.File({filename : "logs.txt"})
    ]
})


export const winstonMiddleware = async(req,res,next)=>{
    console.log(req.body);
    const logData = `req URL : ${req.url} reqBody : ${JSON.stringify(req.body)}`
    logger.info(logData);
    next();
}