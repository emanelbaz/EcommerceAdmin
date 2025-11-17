import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { IType } from '../../../shared/interfaces/itype';
import { IBrand } from '../../../shared/interfaces/ibrand';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  private readonly ID = inject(PLATFORM_ID);
  private readonly productsService = inject(ProductsService);

  productTypes: IType[] = [];
  productBrands: IBrand[] = [];

  addProductForm: FormGroup = new FormGroup({
    nameEn: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    nameAr: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    descriptionEn: new FormControl(''),
    descriptionAr: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    pictureUrl: new FormControl(''),
    productTypeId: new FormControl(null, Validators.required),
    productBrandId: new FormControl(null, Validators.required),
    variants: new FormControl([])
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if(isPlatformBrowser(this.ID)){

      this.getProductsBrands();
      this.getProductsTypes();
    }
    
    
  }

  getProductsBrands(): void {
    this.productsService.getProductsBrands().subscribe({
      next: (brands) => {
        console.log(brands);
        this.productBrands = brands as IBrand[];
      },
      error: (error) => {
        console.error('Error fetching product brands:', error);
      },
    });
  }

  getProductsTypes(): void {
    this.productsService.getProductsTypes().subscribe({
      next: (types) => {
        console.log(types);
        this.productTypes = types as IType[];
      },
      error: (error) => {
        console.error('Error fetching product types:', error);
      },
    }); 
  }

  submitForm(){

  }
}
