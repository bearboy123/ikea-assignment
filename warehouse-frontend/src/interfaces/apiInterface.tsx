import Article from "../models/article";
import Product from "../models/product";

interface ApiInterface {
    getAllProducts(): Product[];
    sellProduct(product: Product): Article[];
}

export default ApiInterface;