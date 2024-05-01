import mongoose from "mongoose";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";
const ProductModel = mongoose.model("Product",productSchema);
const ReviewModel = mongoose.model("Review",reviewSchema);
export class ProductRepository{
    constructor()
    {
        this.collection = "products";
    }
    async add(productData)
    {
        // try{
        //     const db = getDB();
        //     const collection = db.collection("products");
        //     await collection.insertOne(newProduct);
        //     return newProduct;
        // }
        // catch(err)
        // {
        //     console.log(err);
        // }
        const CategoryModel = mongoose.model("Category",categorySchema);

        try{
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();
            await CategoryModel.updateMany({_id : {$in : productData.categories}},{$push : {products : new ObjectId(savedProduct._id)}})
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getAll()
    {
        try{
            console.log("in mongodb server getall");
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async get(productId)
    {
        try{
            console.log("in mongo db get",productId)
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(productId)});
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async filter(minPrice,categories)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection); 
            let filterExpression = {};
            if(minPrice)
            {
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            // if(maxPrice)
            // {
            //     filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)}
            // }
            categories = JSON.parse(categories.replace(/'/g,'"'));
            if(categories)
            {
                filterExpression={$or : [{category : {$in : categories}},filterExpression]}
            }
            console.log(filterExpression);
            return await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async rate(userId,productId,rating)
    {
        // try{
        //     console.log("mongo db get rating");
        //     const db = getDB();
        //     const collection = db.collection(this.collection);
        //     await collection.updateOne({_id:new ObjectId(productId)},{$pull : {ratings : {userId: new ObjectId(userId)}}})
        //     await collection.updateOne({_id:new ObjectId(productId)},{$push : {ratings : {userId: new ObjectId(userId),rating}}})
        // }
        // catch(err)
        // {
        //     console.log(err);
        // }
        try{
            const product = await ProductModel.findById(productId);
            if(!product)
            {
                throw new Error("product not found");
            }
            const userReview = await UserModel.findOne({userId: new ObjectId(userId),productId: new ObjectId(productId)})
            if(userReview)
            {
                userReview.rating = rating;
                await userReview.save();
            }
            else
            {
                const newReview = new ReviewModel(
                    {productId: new ObjectId(productId),userId: new ObjectId(userId),rating: rating}
                )
                await newReview.save();
            }
        }
         catch(err)
        {
            console.log(err);
        }
    }
    async averagePricePerCategory()
    {
        try
        {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.aggregate([
                {
                    //stage 1
                    $group : {
                        _id:"$category",
                        averagePrice:{$avg: "$price"}
                    }
                }
            ]).toArray();
        }
        catch(err)
        {
            console.log(err);
        }
    }
}