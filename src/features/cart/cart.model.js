export class CartModel{
    constructor(productId,userId,quantity,id)
    {
        this.productId = productId,
        this.userId = userId,
        this.quantity = quantity,
        this._id = id
    }
    static add(productId,userId,quantity)
    {
        let newCartIem = new CartModel(productId,userId,quantity);
        newCartIem.id = carts.length + 1;
        carts.push(newCartIem)
        return newCartIem;
    }
    static getAllCartItems(userId)
    {
        return carts.filter((cart)=>cart.userId == userId)
    }
    static delete(userId,cartItemId)
    {
        const cartItemIndex = carts.findIndex((cart)=>cart.id == cartItemId && cart.userId == userId);
        if(cartItemIndex == -1)
        {
            return "Item not found";
        }
        else
        {
           carts.splice(cartItemIndex,1);
        }
    }
}

var carts = [
    new CartModel(1,2,2,1)
]