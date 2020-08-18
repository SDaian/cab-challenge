import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  quantity = new FormControl(0);
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();

  constructor() { }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get quantityValue(): number {
    return this.quantity.value;
  }

  substract(): void {
    if (this.quantityValue > 0) {
      this.quantity.setValue(this.quantityValue - 1);
      this.removeFromCart.emit(this.product);
    } else {
      this.quantity.setValue(this.quantityValue);
    }
  }

  public add(): void{
    this.quantity.setValue(this.quantityValue + 1);
    this.addToCart.emit(this.product);
  }

  public calculateTotal(): number {
    return this.quantity.value * this.product.price;
  }

}
