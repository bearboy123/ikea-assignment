import ProductDto from "./product.dto";

export default interface StockDto {
  product: ProductDto;
  amount: number;
}
