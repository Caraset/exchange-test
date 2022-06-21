import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

import { AppBarComponent } from './appbar/appbar.component'
import { ExchangerComponent } from './exchanger/exchanger.component'
import { ExchangerCardComponent } from './exchanger/exchange-card/exchange-card.component'

import { CurrencyService } from './shared/currency.service'

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    ExchangerComponent,
    ExchangerCardComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [CurrencyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
