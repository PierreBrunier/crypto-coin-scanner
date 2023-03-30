import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CryptoPricesComponent } from './crypto-prices/crypto-prices.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
@NgModule({
  declarations: [
    AppComponent,
    CryptoPricesComponent,
    ContactComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
