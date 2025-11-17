import { Routes } from '@angular/router';
import { AddProductComponent } from './pages/products/add-product/add-product.component';

export const routes: Routes = [
    {path:"", redirectTo:"addProduct", pathMatch:"full"},
    {path:"addProduct", component:AddProductComponent, title:"Add-Product"},
];
