import { CartModel } from "./cart.model.js";
import { CartRepository } from "./cart.repository.js";
export class CartController{
    constructor()
    {
        this.cartRepository = new CartRepository();
    }
    async addCartItem(req,res)
    {
        try{
            const{productId,quantity} = req.body;
            const userId = req.userId;
            const itemToCreate = new CartModel(productId,userId,quantity)
            await this.cartRepository.add(itemToCreate);
            return res.status(201).send(itemToCreate);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getCartItems(req,res)
    {
        try{
            const cartItems = await this.cartRepository.get(req.userId);
            return res.status(200).send(cartItems);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async deleteCartItem(req,res)
    {
        try{
            const userId = req.userId;
            const cartItemsId = req.params.id;
            await this.cartRepository.delete(userId,cartItemsId);
            // if(error)
            // {
            //     return res.status(400).send(error);
            // }
            // else
            {
                return res.status(200).send("deleted succesful");
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
}