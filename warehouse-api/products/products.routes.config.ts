import { CommonRoutesConfig } from "../common/common.routes.config";
import ProductsController from "./controllers/product.controller";
import express from "express";

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProductsRoutes");
  }

  configureRoutes() {
    this.app.route(`/products`).get(ProductsController.listProducts);

    this.app.put(`/products/:productName`, ProductsController.deleteProduct);
    return this.app;
  }
}
