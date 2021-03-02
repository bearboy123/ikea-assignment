import Article from "../models/article";
import Product from "../models/product";

interface DataInterface {
    getAllProducts(): Product[],
    getInventory(): Article[] 
}

export default DataInterface;