class Article{
    _id: string;
    _name: string;
    _quantity: number;

    constructor(id: string,name: string,quantity:number){
        this._id = id;
        this._name  = name;
        this._quantity  = quantity;
    }
}

export default Article;