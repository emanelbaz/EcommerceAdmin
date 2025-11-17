import { ICreateVariant } from "./icreate-variant";

//what API expects when creating a new product
export interface ICreateProduct {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
  variants: ICreateVariant[];
}

