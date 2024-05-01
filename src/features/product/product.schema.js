import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name : String,
    desc : String,
    category : String,
    price : Number,
    sizes : {type :String, enum :["x","l","m"]},
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ],
    categories : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        }
    ],
})