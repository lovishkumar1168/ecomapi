import express from "express";
import { CartController } from "./cart.controller.js";
const router=express.Router();
const cartController = new CartController();
router.post("/",(req,res)=>{
    cartController.addCartItem(req,res);
});
router.get("/",(req,res)=>{
    cartController.getCartItems(req,res);
});
router.delete("/:id",(req,res)=>{
    cartController.deleteCartItem(req,res);
});
export default router;