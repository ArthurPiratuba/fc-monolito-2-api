export type CheckStockInputDto = {
  productId: string;
}

export type CheckStockOutputDto = {
  productId: string;
  stock: number;
}
