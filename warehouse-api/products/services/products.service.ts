import { CRUD } from "../../common/interfaces/crud.interface";
import ProductsDao from "../daos/product.dao";
import ProductDto from "../dto/product.dto";
class ProductsService implements CRUD {
  async create(resource: ProductDto) {
    return null;
  }

  async deleteById(resourceId: string) {
    return "";
  }

  async list(limit: number, page: number) {
    return ProductsDao.getProducts();
  }

  async patchById(resource: ProductDto) {
    return "";
  }

  async readById(resourceId: string) {
    return "";
  }

  async updateById(resource: ProductDto) {
    return "";
  }

  async deleteByName(resourceId: string, quantity: number) {
    return ProductsDao.removeProductByName(resourceId, quantity);
  }
}

export default new ProductsService();
