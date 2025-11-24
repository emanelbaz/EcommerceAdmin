import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { IType } from '../../../shared/interfaces/itype';
import { IBrand } from '../../../shared/interfaces/ibrand';
import { IColor } from '../../../shared/interfaces/icolor';
import { ISize } from '../../../shared/interfaces/isize';
import { ICreateProduct } from '../../../shared/interfaces/icreate-product';

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
  variantColors: IColor[] = [];
  variantSizes: ISize[] = [];

  addProductForm: FormGroup = new FormGroup({
    nameEn: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    nameAr: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    descriptionEn: new FormControl(''),
    descriptionAr: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    pictureUrl: new FormControl(''),
    productTypeId: new FormControl(null, Validators.required),
    productBrandId: new FormControl(null, Validators.required),
    variants: new FormArray([])
  });

  createVariant(): FormGroup {
    return new FormGroup({
      colorId: new FormControl(0, Validators.required),
    sizeId: new FormControl(0, Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    sku: new FormControl('', Validators.required)
    });
  }

  get variants(): FormArray {
    return this.addProductForm.get('variants') as FormArray;
  };

  addVariant(): void {
    this.variants.push(this.createVariant());
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if(isPlatformBrowser(this.ID)){

      this.getProductsBrands();
      this.getProductsTypes();
      this.getVariantColor();
      this.getVariantSize();
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

  getVariantColor(): void {
    this.productsService.getColors().subscribe({
      next: (colors) => {
        console.log(colors);
        this.variantColors = colors as IColor[];
      },
      error: (error) => {
        console.error('Error fetching variant colors:', error);
      },
    });

  }

  getVariantSize(): void {
    this.productsService.getSizes().subscribe({
      next: (sizes) => {
        console.log(sizes);
        this.variantSizes = sizes as ISize[];
      },
      error: (error) => {
        console.error('Error fetching variant sizes:', error);
      },
    });

  }

  submitForm(){
    
  if (this.addProductForm.invalid) {
    this.addProductForm.markAllAsTouched();
    return;
  }

  const productData: ICreateProduct = {
    nameEn: this.addProductForm.value.nameEn!,
    nameAr: this.addProductForm.value.nameAr!,
    descriptionEn: this.addProductForm.value.descriptionEn!,
    descriptionAr: this.addProductForm.value.descriptionAr!,
    price: this.addProductForm.value.price!,
    pictureUrl: this.addProductForm.value.pictureUrl!,
    productTypeId: this.addProductForm.value.productTypeId!,
    productBrandId: this.addProductForm.value.productBrandId!,

    variants: this.variants.value.map((v: any) => ({
      productId: 0,
      colorId: v.colorId,
      sizeId: v.sizeId,
      price: v.price,
      stock: v.stock,
      sku: v.sku
    }))
  };


    this.productsService.addProduct(productData).subscribe({
      next:(res)=>{
        console.log("Product created:", res);
        alert("Product added successfully!");
        this.addProductForm.reset();
        this.variants.clear();

      }, 
      error:(err)=>{
        console.error("Error creating product:", err);
        alert("Failed to create product.");
      }
    })

  }
}
