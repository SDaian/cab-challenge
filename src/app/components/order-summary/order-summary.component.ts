import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {

  internalCodeMug = 'MUG';
  discountForShirt = 5;
  discountMug = 0;
  discountShirt = 0;
  totalWithoutDiscounts = 0;
  orderSummary$: Observable<Product[]>;

  constructor(private service: CartService) {
    this.orderSummary$ = this.service.getOrderSummary();
  }

  public sumItems(length: number): string {
    return length > 1 ? `${length} items` : `${length} item`;
  }

  public calculateTotal(orderSummary: Product[]): number {
    return orderSummary.reduce((sum, prod) => sum += prod.price , 0);
  }

  public checkForMugDiscount(code: string, orderSummary: Product[]): boolean {
    const mugLength = orderSummary.filter(product => product.internalCode === this.internalCodeMug).length;
    return mugLength >= 2;
  }

  private calculateMugDiscount(code: string, orderSummary: Product[]): number {
    const mugFilter = orderSummary.filter(product => product.internalCode === this.internalCodeMug);
    if (mugFilter.length >= 2) {
      const mugPrice = mugFilter[0].price;
      this.discountMug = mugFilter.length % 2 === 0 ? mugFilter.length * mugPrice / 2 : this.discountMug;
    } else {
      this.discountMug = 0;
    }
    return this.discountMug;
  }

  public checkForShirtDiscount(code: string, orderSummary: Product[]): boolean {
    const mugLength = orderSummary.filter(product => product.internalCode === code).length;
    return mugLength >= 3;
  }

  public calculateShirtDiscount(code: string, orderSummary: Product[]): number {
    const shirtFilter = orderSummary.filter(product => product.internalCode === code);
    if (shirtFilter.length >= 3) {
      const shirtPrice = shirtFilter[0].price;
      const discount = this.discountForShirt / 100;
      this.discountShirt = shirtFilter.length % 3 === 0 ? shirtPrice * shirtFilter.length * discount : this.discountShirt;
    } else {
      this.discountShirt = 0;
    }
    return this.discountShirt;
  }

  public calculateDiscount(code: string, orderSummary: Product[]): number {
    switch (code) {
      case 'MUG':
        return this.calculateMugDiscount(code, orderSummary);
      case 'SHIRT':
        return this.calculateShirtDiscount(code, orderSummary);
      default:
        break;
    }
  }

  public calculateTotalWithDiscounts(orderSummary: Product[]): number {
    return this.calculateTotal(orderSummary) -
      this.calculateDiscount('MUG', orderSummary) -
        this.calculateDiscount('SHIRT', orderSummary);
  }
}
