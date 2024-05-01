import { ObjectId } from "mongodb";
import {getDB } from "../../config/mongodb.js";

export class CartRepository{
    constructor()
    {
        this.collection = "cartitems";
    }
    async get(userId)
    {
        try{
            console.log(userId);
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userId:new ObjectId(userId)}).toArray();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async add(newCartIem)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            console.log(id);
            await collection.updateOne(
                {productId : new ObjectId(newCartIem.productId),userId : new ObjectId(newCartIem.userId)},
                {$setOnInsert : {_id:id},$inc: {quantity: newCartIem.quantity}},
                {upsert : true}
            )
            //await collection.insertOne({productId : new ObjectId(newCartIem.productId),userId : new ObjectId(newCartIem.userId),quantity: newCartIem.quantity});
            return newCartIem;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async delete(userId,cartItemId)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.deleteOne({userId: new ObjectId(userId)});
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getNextCounter(db)
    {
        const counter = await db.collection("counters").findOneAndUpdate({_id:"cartItemId"},{$inc : {value : 1}},{returnDocument : 'after'});
        console.log(counter);
        return counter.value;
    }
}