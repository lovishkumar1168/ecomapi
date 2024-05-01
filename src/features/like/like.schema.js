import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : "types"
    },
    types : {
        type : String,
        enum : ["Product","Category"]
    }
}).pre('save',(next)=>{
    console.log("new like coming");
    next();
}).post('save',(doc)=>{
    console.log("user liked this ",doc);
}).pre('find',(next)=>{
    console.log('retreiving likes');
}).post('find',(docs)=>{
    console.log("get all likes",docs)
})