import { OrderRepository } from "./order.repository.js";

export class OrderController{
    constructor()
    {
        this.orderRepository = new OrderRepository();
    }
    async placeOrder(req,res)
    {
        try{
            const userId = req.userId;
            await this.orderRepository.placeOrder(userId);
            return res.status(201).send("order is created");
        }
        catch(err)
        {
            console.log(err);
        }
    }
}