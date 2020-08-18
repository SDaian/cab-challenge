import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/containers/cart/cart.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { TableContainerComponent } from './components/shopping-cart/table-container/table-container.component';
import { ImageComponent } from './components/shopping-cart/table-container/image/image.component';
import { ProductComponent } from './components/shopping-cart/table-container/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    TableContainerComponent,
    ImageComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
