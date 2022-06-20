import { Component, OnInit, Input } from '@angular/core'
import { map } from 'rxjs'
import { CurrencyService } from '../shared/currency.service'

import { CurrencyI } from '../shared/currency.service'

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppBarComponent implements OnInit {
  constructor(public currencyTool: CurrencyService) {}

  public cur: CurrencyI[] = []

  private roundExchangeValue(currencies: CurrencyI[]) {
    return currencies.map(cur => {
      return {
        ...cur,
        sale: `${Math.round(+cur.sale * 100) / 100}`,
        buy: `${Math.round(+cur.buy * 100) / 100}`,
      }
    })
  }

  ngOnInit(): void {
    this.currencyTool
      .getCur()
      .pipe(map(this.roundExchangeValue))
      .subscribe(currencies => (this.cur = currencies))
  }
}
