import ProductDto from "../dto/product.dto";
import debug from "debug";
import ArticleDto from "../dto/article.dto";
import * as inventoryData from "../../data/inventory.json";
import * as productsData from "../../data/products.json";
import ComposeDto from "../dto/compose.dto";
import InventoryDto from "../dto/inventory.dto";
import StockDto from "../dto/stock.dto";
const log: debug.IDebugger = debug("app:in-memory-dao");

class ProductsDao {
  products: Array<ProductDto> = [];
  inventory?: Array<InventoryDto> = [];
  inventoryCopy?: Array<InventoryDto> = [];
  articles: Array<ArticleDto> = [];
  prodStock: Array<StockDto> = [];
  constructor() {
    log("Created new instance of UsersDao");
  }

  async getProducts() {
    if (this.inventory?.length === 0 && this.products.length === 0)
      this.getInventory();
    return this.prodStock;
  }
  getInventory() {
    //read file
    let articlesArr = inventoryData.inventory;
    let productsArr = productsData.products;
    articlesArr.forEach((article) => {
      this.inventory?.push({
        article: { id: +article.art_id, name: article.name },
        stock: +article.stock,
      });
      this.inventoryCopy?.push({
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
    if (this.inventory && this.inventoryCopy) {
      let leastStockInInventory = this.findMinMax(this.inventoryCopy);
      let productHavingLeastStock = this.products.find((x) => {
        const arrayIds = x.contains.map((y) => y.article.id);
        return arrayIds.includes(leastStockInInventory?.article.id || 0);
      });
      const getLeastStock = () => {
        return leastStockInInventory?.stock || 0;
      };
      for (let i = 0; i < getLeastStock(); i++) {
        if (productHavingLeastStock)
          if (!this.createProduct(productHavingLeastStock)) {
            break;
          }
      }
      leastStockInInventory = this.findMinMax(this.inventoryCopy);
      productHavingLeastStock = this.products.find((x) => {
        const arrayIds = x.contains.map((y) => y.article.id);
        return arrayIds.includes(leastStockInInventory?.article.id || 0);
      });
      for (let i = 0; i < getLeastStock(); i++) {
        if (productHavingLeastStock)
          if (!this.createProduct(productHavingLeastStock)) {
            break;
          }
      }
    }
  }

  findMinMax(arr: Array<InventoryDto>) {
    arr = arr.filter((x) => x.stock > 0);
    let min = arr[0].stock,
      max = arr[0].stock;
    for (let i = 1, len = arr.length; i < len; i++) {
      let v = arr[i].stock;
      min = v < min ? v : min;
      max = v > max ? v : max;
    }
    return arr.find((x) => x.stock === min);
  }

  createProduct(product: ProductDto) {
    const prodArticles = product.contains;
    let articlesModified = 0;
    prodArticles.forEach((x) => {
      console.log(this.inventoryCopy);
      this.inventoryCopy?.forEach((y) => {
        if (y.article.id === x.article.id) {
          y.stock = y.stock >= x.amount ? y.stock - x.amount : y.stock;
          articlesModified += 1;
        }
      });
    });
    if (articlesModified === product.contains.length) {
      if (this.prodStock.length === 0 || !this.isProductInStock(product)) {
        this.prodStock.push({ product, amount: 1 });
      } else {
        this.prodStock.forEach((a) => {
          if (a.product.name === product.name) {
            a.amount += 1;
          }
        });
      }
    }
    return articlesModified === product.contains.length;
  }

  isProductInStock(product: ProductDto) {
    const data = this.prodStock.filter((x) => x.product.name === product.name);
    return data && data.length > 0;
  }

  getArticleById(id: number) {
    return this.articles.find((x) => x.id === id) || {};
  }

  async removeProductByName(productName: string, quantity: number) {
    this.prodStock.forEach((x) => {
      if (x.product.name === productName) {
        x.amount = x.amount >= quantity ? x.amount - quantity : 0;
      }
    });
    return this.prodStock;
  }
}

export default new ProductsDao();
