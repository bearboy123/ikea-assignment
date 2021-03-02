import ProductDto from "../dto/product.dto";
import debug from "debug";
import ArticleDto from "../dto/article.dto";
import * as inventoryData from "../../data/inventory.json";
import * as productsData from "../../data/products.json";
import ComposeDto from "../dto/compose.dto";
import InventoryDto from "../dto/inventory.dto";
const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  products: Array<ProductDto> = [];
  inventory: Array<InventoryDto> = [];
  inventoryCopy: Array<InventoryDto> = [];
  articles: Array<ArticleDto> = [];
  constructor() {
    log("Created new instance of UsersDao");
  }

  async getProducts() {
    return this.products;
  }
  getInventory(): ArticleDto[] {
    //read file
    let articlesArr = inventoryData.inventory;
    let productsArr = productsData.products;
    articlesArr.forEach((article) => {
      this.inventory.push({
        article: { id: +article.art_id, name: article.name },
        stock: +article.stock,
      });
      this.inventoryCopy.push({
        article: { id: +article.art_id, name: article.name },
        stock: +article.stock,
      });
      this.articles.push({ id: +article.art_id, name: article.name });
    });
    productsArr.forEach((product) => {
      const name: string = product.name;
      const composeData: Array<ComposeDto> = [];
      const compositionArr = product.contain_articles;
      compositionArr.forEach((data) => {
        const article: any = this.getArticleById(+data.art_id) || {};
        composeData.push({ article, amount: +data.amount_of });
      });
      this.products.push({ name: name, contains: composeData });
    });
    console.log("hello2", this.articles);
    console.log("hello3", this.products);
    console.log("hello4", this.inventory);
    console.log(this.findMinMax(this.inventory));
    this.products.forEach((product) => {
      this.createProduct(product);
    });
    return this.articles;
  }

  findMinMax(arr: Array<InventoryDto>) {
    let min = arr[0].stock,
      max = arr[0].stock;
    for (let i = 1, len = arr.length; i < len; i++) {
      let v = arr[i].stock;
      min = v < min ? v : min;
      max = v > max ? v : max;
    }
    return arr.find((x) => x.stock === min);
  }

  calculateWarehouseProducts(inventory: InventoryDto, product: ProductDto) {}

  createProduct(product: ProductDto) {
    const prodArticles = product.contains;
    prodArticles.forEach((article) => {
      const newData = this.inventoryCopy.forEach((x) => {
        if (x.article.id === article.article.id) {
          x.stock = x.stock - article.amount;
        }
      });
    });
  }

  getArticleById(id: number) {
    return this.articles.find((x) => x.id === id) || {};
  }

  // async removeProductByName(productName: string) {
  //     const objIndex = this.users.findIndex((obj: { id: string; }) => obj.id === userId);
  //     this.users.splice(objIndex, 1);
  //     return `${productName} removed`;
  // }
}

export default new UsersDao();
