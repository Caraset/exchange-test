import { Component, OnInit } from '@angular/core'

import { CurrencyI, CurrencyService } from '../shared/currency.service'

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss'],
})
export class ExchangerComponent implements OnInit {
  fromCurrency = 'USD'
  toCurrency = 'UAH'
  fromAmount = 0
  toAmount = 0

  currencies: CurrencyI[] = []

  currenciesCodes: string[] = []
  fromCurrenciesCodes: string[] = []
  toCurrenciesCodes: string[] = []

  constructor(private cs: CurrencyService) {}

  ngOnInit(): void {
    this.cs.getCur().subscribe(curr => {
      this.currencies = curr
      this.getCurrenciesCodes()
    })
  }

  getCurrenciesCodes() {
    this.currenciesCodes = ['UAH', ...this.currencies.map(curr => curr.ccy)]
    this.getFromCurrenciesCodesFormated()
    this.getToCurrenciesCodesFormated()
  }

  getFromCurrenciesCodesFormated() {
    this.fromCurrenciesCodes = this.currenciesCodes.filter(
      code => code !== this.fromCurrency && code !== this.toCurrency
    )
  }

  getToCurrenciesCodesFormated() {
    this.toCurrenciesCodes = this.currenciesCodes.filter(
      code => code !== this.toCurrency && code !== this.fromCurrency
    )
  }

  swapCurr() {
    const from = this.fromCurrency
    const fromA = this.fromAmount

    const to = this.toCurrency
    const toA = this.toAmount

    this.fromCurrency = to
    this.fromAmount = toA

    this.toCurrency = from
    this.toAmount = fromA

    this.getFromCurrenciesCodesFormated()
    this.getToCurrenciesCodesFormated()
  }

  fromExchangeCurr(from: string, to: string, amount: number): number {
    if (amount < 1) {
      return 0
    }
    let uahAmount: number = 0
    const fromCurr = this.currencies.find(cur => cur.ccy === from)
    const toCurr = this.currencies.find(cur => cur.ccy === to)

    if (from === 'UAH') {
      return Math.round((amount / Number(toCurr?.sale)) * 100) / 100
    }

    if (to === 'UAH') {
      return Math.round(Number(fromCurr?.sale) * amount * 100) / 100
    }

    uahAmount = Number(fromCurr?.sale) * amount

    return Math.round((uahAmount / Number(toCurr?.buy)) * 100) / 100
  }

  toExchangeCurr(from: string, to: string, amount: number): number {
    if (amount < 1) {
      return 0
    }
    let uahAmount: number = 0
    const fromCurr = this.currencies.find(cur => cur.ccy === from)
    const toCurr = this.currencies.find(cur => cur.ccy === to)

    if (from === 'UAH') {
      return Math.round((amount / Number(toCurr?.buy)) * 100) / 100
    }

    if (to === 'UAH') {
      return Math.round(Number(fromCurr?.buy) * amount * 100) / 100
    }

    uahAmount = Number(fromCurr?.buy) * amount

    return Math.round((uahAmount / Number(toCurr?.sale)) * 100) / 100
  }

  showAmount() {
    this.swapCurr()
  }

  setFromCurrency(event: Event) {
    this.fromCurrency = (event.target as HTMLOptionElement).value
    this.getFromCurrenciesCodesFormated()
    this.getToCurrenciesCodesFormated()
    this.toAmount = this.fromExchangeCurr(
      this.fromCurrency,
      this.toCurrency,
      this.fromAmount
    )
  }
  setToCurrency(event: Event) {
    this.toCurrency = (event.target as HTMLOptionElement).value
    this.getFromCurrenciesCodesFormated()
    this.getToCurrenciesCodesFormated()
    this.fromAmount = this.toExchangeCurr(
      this.toCurrency,
      this.fromCurrency,
      this.toAmount
    )
  }

  setFromAmount(event: Event) {
    this.fromAmount = Number((event.target as HTMLInputElement).value)
    this.toAmount = this.fromExchangeCurr(
      this.fromCurrency,
      this.toCurrency,
      this.fromAmount
    )
  }
  setToAmount(event: Event) {
    this.toAmount = Number((event.target as HTMLInputElement).value)
    this.fromAmount = this.toExchangeCurr(
      this.toCurrency,
      this.fromCurrency,
      this.toAmount
    )
  }
}
