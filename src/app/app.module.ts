import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { AppBarComponent } from './appbar/appbar.component'

import { CurrencyService } from './shared/currency.service'

@NgModule({
  declarations: [AppComponent, AppBarComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CurrencyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
