import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    name : {type : String,required:[true,"name is required"]},
    email: {type : String, unique: true,match : [/.+\@.+\../,"please enter a valid email"]},
    password: { type : String, 
        validate : {
            validator : function(value){
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
            },
            message : "Password should be 8-12 characters and have special characters"
    }},
    type: {type : String, enum : ["seller","customer"]}
})