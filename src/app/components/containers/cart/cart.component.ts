import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  constructor(private service: CartService) { }


  get getOrderSummary(): Observable<Product[]>{
    return this.service.getOrderSummary();
  }
}
