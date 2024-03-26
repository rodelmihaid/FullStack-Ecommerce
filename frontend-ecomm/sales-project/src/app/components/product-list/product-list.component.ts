import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  currentCaregoryId: number = 0;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProducts());
    this.listProducts();
  }

  listProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategory) {
      //get the "id" param and convert to number using "+"
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.currentCaregoryId = +idParam;
      }
    } else {
      //not category available def category 1
      this.currentCaregoryId = 1;
    }

    this.productService
      .getProductList(this.currentCaregoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
