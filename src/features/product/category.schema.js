import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    products : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
})