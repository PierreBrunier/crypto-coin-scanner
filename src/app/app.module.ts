import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CryptoPricesComponent } from './crypto-prices/crypto-prices.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoPricesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
