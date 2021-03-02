import Article from "./article";

class Product{
    _name: string
    _stock: number;
    _articles: Article[]
    constructor(name: string,stock: number,articles: Article[]){
        this._name = name;
        this._stock = stock;
        this._articles = articles;
    }
}

export default Product;