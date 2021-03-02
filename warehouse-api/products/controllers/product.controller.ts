import express from "express";
import productsService from "../services/products.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:products-controller");

class ProductController {
  async listProducts(req: express.Request, res: express.Response) {
    const products = await productsService.list(100, 0);
    res.status(200).send(products);
  }
}
export default new ProductController();
