import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  private readonly ID = inject(PLATFORM_ID);
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if(isPlatformBrowser(this.ID)){

      this.getProductsBrands();
    }
    
    
  }

  getProductsBrands(): void {
    this.productsService.getProductsBrands().subscribe({
      next: (brands) => {
        console.log(brands);
      },
      error: (error) => {
        console.error('Error fetching product brands:', error);
      },
    });
  }
}
