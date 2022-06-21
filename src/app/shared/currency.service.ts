import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

export interface CurrencyI {
  ccy: string
  base_ccy: string
  buy: string
  sale: string
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // private currencyObserver: Observable<CurrencyI[]>
  private currencyObserver: Observable<CurrencyI[]>
  // currencies: CurrencyI[] = []

  // uahAmount = 0

  constructor(private http: HttpClient) {
    this.currencyObserver = http
      .get<CurrencyI[]>(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
      )
      .pipe(
        map(currencies => {
          return currencies.filter(
            cur => cur.ccy === 'USD' || cur.ccy === 'EUR'
          )
        })
      )
    // this.currencyObserver.subscribe(val => (this.currencies = val))
  }

  // getCurrenciesCodes(): string[] {
  //   return this.currencies.map(curr => curr.ccy)
  // }

  // exchangeCurrency(from: string, to: string, amount: number): number | void {
  //   let uahAmount: number = 0

  //   const fromCur = this.currencies.find(cur => cur.ccy === from)
  //   if (!fromCur) {
  //     return
  //   }

  //   uahAmount = Number(fromCur?.sale) * amount

  //   const toCur = this.currencies.find(cur => cur.ccy === to)
  //   if (!toCur) {
  //     return
  //   }

  //   return Number(toCur.buy) * uahAmount
  // }

  getCur(): Observable<CurrencyI[]> {
    return this.currencyObserver
  }
}
