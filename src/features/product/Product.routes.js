import express from "express";
import { ProductController } from "./product.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";
const productController = new ProductController();
const router = express.Router();


//already have localhost/api/products
router.get("/filter",(req,res)=>{
    productController.filterProducts(req,res);
});
router.get("/",(req,res)=>{
    productController.getAllProducts(req,res);
});
router.post("/",upload.single("imageUrl"),(req,res)=>{
    productController.addProduct(req,res)
});
router.post("/rating",(req,res)=>{
    productController.rateProduct(req,res);
});
router.get("/averagePrice",(req,res)=>{
    productController.averagePrice(req,res);
});
router.get("/:id",(req,res)=>{
    productController.getOneProduct(req,res);
});

export default router;