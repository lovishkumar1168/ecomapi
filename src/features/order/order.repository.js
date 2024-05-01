import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { OrderModel } from "./order.model.js";

export class OrderRepository{
    constructor()
    {
        this.collection = "orders";
    }
    async placeOrder(userId)
    {
        const client = getClient();
        console.log(client)
        const session = client.startSession();
        session.startTransaction();
        try{
            const db = getDB();
            //1. get total amount
            const items = await this.getTotalAmount(userId,session);
            const finalTotalAmount = items.reduce((acc,item)=>acc+item.totalAmount,0)
            //2. create a record for document
            const newOrder = new OrderModel(new ObjectId(userId),finalTotalAmount,new Date())
            await db.collection(this.collection).insertOne(newOrder,{session});  
            //3. remove the stock
            for(let item of items)
            {
                await db.collection("products").updateOne({_id: item.productId},{$inc : {stock: -item.quantity}},{session})
            }
            //4.clear the cart
            await db.collection("cartitems").deleteMany({userId : new ObjectId(userId)},{session});
            session.commitTransaction();
            session.endSession();
        }
        catch(err)
        {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
        }
    }
    async getTotalAmount(userId,session)
    {
        const db = getDB();
        const items = await db.collection("cartitems").aggregate([
            {
                $match : {userId : new ObjectId(userId)}
            },
            {
                $lookup:{
                    from:"products",
                    localField : "productId",
                    foreignField : "_id",
                    as : "productInfo"
                }
            },
            {
                $unwind : "$productInfo"
            },
            {
                $addFields : {
                    "totalAmount" : {$multiply:["$productInfo.price","$quantity"]}
                }
            }
        ],{session}).toArray()
        return items;
    }
}