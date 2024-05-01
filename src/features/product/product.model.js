import { UserModel } from "../user/user.model.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";
export class ProductModel{ 
    constructor(name,desc,price,sizes,imageUrl,category,id){
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.categories = category;
        this.price = price;
        this.sizes = sizes;
    }

    static getAll()
    {
        return products;
    }
    // static add(newProduct)
    // {
    //     newProduct.id = products.length + 1;
    //     products.push(newProduct);
    //     return newProduct;
    // }
    static getOne(id)
    {
        return products.find((product)=>product.id == id); 
    }
    static filter(minPrice,maxPrice,category)
    {
        const result = products.filter((product)=> {
            return(
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice) && 
                (!category || product.category == category)
            )
        });
        return result;
    }
    static ratingProduct(userId,productId,rating)
    {
        //1. check if userId is correct or we have userId
        const user = UserModel.getAll().find(u=> u.id==userId);

        if(!user)
        {
           throw new customErrorHandler("user not found",400);
        }

        //2. check if ProductId is found or not
        const product = products.find((product)=> product.id == productId);

        if(!product)
        {
            throw new customErrorHandler("product not found",404);
        }

        // 3. if product rating not exists create rating array and add in products array
        if(!product.rating)
        {
            product.rating = [];
            product.rating.push(
                {
                    userId : userId,
                    rating : rating
                }
            )
        }
        else //if product rating already exist so update rating for that userId and if not found that userId so push it
        {
            const existingRatingIndex = product.rating.findIndex(rating => rating.userId == userId);
            if(existingRatingIndex>=0)
            {
                product.rating[existingRatingIndex] = {
                    userId : userId,
                    rating : rating
                }
            }
            else  
            {
                product.rating.push(
                    {
                        userId : userId,
                        rating : rating
                    }
                )
            }
        }
    }
}

var products = [ 
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1'
      ),
      new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
        ['M', 'XL']
      ),
      new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M', 'XL','S']
      )
]