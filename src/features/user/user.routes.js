import express from "express";
import { UserController } from "./user.controller.js";
import { jwtAuthorization } from "../../middlewares/jwt.middleware.js";
const router = express.Router();
const userController = new UserController();
router.post("/signup",(req,res,next)=>{
    userController.signUp(req,res,next);
});
router.post("/signin",(req,res)=>{
    userController.signIn(req,res);
});
router.post("/reset-password",jwtAuthorization,(req,res)=>{
    userController.resetPassword(req,res);
})

export default router;