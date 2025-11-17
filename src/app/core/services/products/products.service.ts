import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
