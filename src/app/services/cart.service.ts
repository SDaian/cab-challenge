import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderSummary: Product[] = [];
  orderSummary$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get('/assets/products.json').pipe(
      map((data: any[]) => {
        return data.map(
          (item: any) => new Product(
            item.code,
            item.name,
            item.price,
            item.image,
            item.internalCode)
        );
      })
    );
  }

  addProduct(product: Product): void {
    this.orderSummary.push(product);
    this.orderSummary$.next(this.orderSummary);
  }

  removeProduct(product: Product): void {
    const index = this.orderSummary.findIndex(item => item.code === product.code);
    this.orderSummary.splice(index, 1);
    this.orderSummary$.next(this.orderSummary);
  }

  getOrderSummary(): Observable<Product[]> {
    return this.orderSummary$.asObservable();
  }
}
