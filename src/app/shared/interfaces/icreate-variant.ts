//what API expects when creating a new variant

export interface ICreateVariant {
  productId: number | null; // you may set null when creating
  colorId: number;
  sizeId: number;
  price: number;
  stock: number;
  sku: string;
}
