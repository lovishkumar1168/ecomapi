export class UserModel {
    constructor(name,email,password,type,id)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type =type;
        this._id = id;
    }
    static getAll()
    {
        return users;
    }
}

var users = [
    new UserModel("Seller User","seller@ecom.com","Password1","seller",1),
    new UserModel("Customer User","customer@ecom.com","Password1","customer",2)
]