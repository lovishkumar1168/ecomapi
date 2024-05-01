import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";

export const connectToMongoDBUsingMongoose = ()=>{
    mongoose.connect(process.env.DB_URL,{useNewUrlParser : true, useUnifiedTopology : true})
    .then(
        ()=>{
            console.log("connect to mongoDB using mongoose");
            addCategories();
        }
    )
    .catch(err=>{
        console.log(err);
    })
}


async function addCategories() {
    const CategoryModel = mongoose.model("Category",categorySchema)
    const categories = await CategoryModel.find();
    if(!categories || categories.length == 0)
    {
        await CategoryModel.insertMany([{name : 'Books'},{name : 'Clothing'},{name : 'Electronics'}])
    }
}