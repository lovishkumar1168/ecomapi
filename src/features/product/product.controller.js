import { ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repository.js";
export class ProductController {
    constructor()
    {
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req,res) {
        try{
            console.log("get all products");
            const products = await this.productRepository.getAll();
            console.log("products ",products);
            res.status(200).send(products);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async addProduct(req,res) {
        try
        {
            const {name,price,description,categories} = req.body;
            const newProduct =  new ProductModel(name,description,parseFloat(price),sizes?.split(","),req?.file?.filename,categories)
            // const newProduct = {
            //     name,
            //     price : parseFloat(price),
            //     sizes : sizes.split(","),
            //     imageUrl : req.file.filename,
            // }
            //const productToCreate = new ProductModel(newProduct);
            const product = await this.productRepository.add(newProduct);
            return res.status(201).send(product);
        }

        catch(err)
        {
            console.log(err);
        }
    }
    async getOneProduct(req,res) {

        try{
            let id = req.params.id
            const product = await this.productRepository.get(id);
            if(product)
            {
                res.status(200).send(product);
            }
            else
            {
                res.status(404).send("not found");
            }
        }
        catch(err)
        {
            console.log(err);
        }

    }
    async filterProducts(req,res) {
        try{
            const {minPrice,categories} = req.query;
            const filteredProducts = await this.productRepository.filter(minPrice,categories);
            res.status(200).send(filteredProducts);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async rateProduct(req,res)
    {
        try{
            const userId = req.userId;
            const {productId,rating} = req.body;
            await this.productRepository.rate(userId,productId,rating);
            res.status(200).send("Rating has been added");
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async averagePrice(req,res)
    {
        try{
           const result = await this.productRepository.averagePricePerCategory();
           res.status(200).send(result);
        }
        catch(err)
        {
            console.log(err);
        }
    }
}