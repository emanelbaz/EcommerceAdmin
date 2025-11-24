import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICreateProduct } from '../../../shared/interfaces/icreate-product';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient : HttpClient) { }

  getProductsBrands(){
    return this.httpClient.get(`${environment.baseURL}/api/Products/brands`)
  }

  getProductsTypes(){
    return this.httpClient.get(`${environment.baseURL}/api/Products/types`)
  }

  getSizes(){
    return this.httpClient.get(`${environment.baseURL}/api/sizes`)
  }

  getColors(){
    return this.httpClient.get(`${environment.baseURL}/api/colors`)
  }

  addProduct(product:ICreateProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>(`${environment.baseURL}/api/Products`, product);
  }
}
