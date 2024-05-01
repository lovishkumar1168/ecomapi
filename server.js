import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import ProductRouter from "./src/features/product/Product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartRouter from "./src/features/cart/cart.routes.js"
import OrderRouter from "./src/features/order/order.routes.js"
import bodyParser from "body-parser";
import { jwtAuthorization } from "./src/middlewares/jwt.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiDoc from "../E-Com-Api/swagger.json" assert {type:'json'}
//import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { winstonMiddleware } from "./src/middlewares/winston.middleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware.js";
import { connectToMongoDBUsingMongoose } from "./src/config/mongooseConfig.js";
import { likeRouter } from "./src/features/like/like.routes.js";
const server = express();
server.use(bodyParser.json());
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:5500')
//     res.header('Access-Control-Allow-Headers','Content-type,Authorization')

//     if(req.method == "OPTIONS")
//     {
//         res.sendStatus(200);
//     }
//     next();
// })
var corsOptions = {
    origin : 'http://localhost:5500',
    allowedHeaders : '*'
}
server.use(cors(corsOptions));
server.use("/api-docs",swagger.serve,swagger.setup(apiDoc))
server.use(winstonMiddleware);
server.use(cookieParser());
server.use("/api/products",jwtAuthorization,ProductRouter);
server.use("/api/users",UserRouter);
server.use("/api/cart",jwtAuthorization,CartRouter);
server.use("/api/orders",jwtAuthorization,OrderRouter);
server.use("/api/likes",jwtAuthorization,likeRouter);
server.get("/",(req,res)=>{
    res.send("Welcome to E-commerce application");
})
server.use(errorHandlerMiddleware);
server.use((req,res)=>{
    res.status(404).send("API not found");
})
server.listen(3100,()=>{
    console.log("listening at 3100");
    connectToMongoDBUsingMongoose();
})