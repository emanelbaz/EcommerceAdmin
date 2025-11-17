import { IVariant } from "./ivariant";

//what API returns when getting a product
export interface IProduct {
id:number;
name:string;
description:string;
price:number;
pictureUrl:string | null;
productType:string;
productBrand:string;
variants: IVariant[];
}


// {
//     "id": 1003,
//     "name": "Running Shoes",
//     "description": "High quality running shoes for everyday training.",
//     "price": 120,
//     "pictureUrl": null,
//     "productType": "Woman Clothes",
//     "productBrand": "H&M",
//     "variants": [
//       {
//         "id": 4,
//         "color": "Blue",
//         "size": "XL",
//         "price": 120
//       },
//       {
//         "id": 5,
//         "color": "White",
//         "size": "L",
//         "price": 125
//       }
//     ]
//   }