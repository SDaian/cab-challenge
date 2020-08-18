import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent {

  products$: Observable<Product[]>;

  constructor(private service: CartService) {
    this.products$ = this.service.getProducts();
  }

  addProductToOrder(product: Product): void {
    this.service.addProduct(product);
  }

  removeProductFromOrder(product: Product): void {
    this.service.removeProduct(product);
  }
}
