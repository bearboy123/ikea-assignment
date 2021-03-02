import ProductDto from "./product.dto";

export default interface WarehouseDto {
  products: ProductDto[];
  stock: number;
}
