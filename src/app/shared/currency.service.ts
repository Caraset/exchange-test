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
  private currencyObserver: Observable<CurrencyI[]>

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
  }

  getCur(): Observable<CurrencyI[]> {
    return this.currencyObserver
  }
}
