import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { CurrencyService } from 'src/app/shared/currency.service'

import { CurrencyI } from 'src/app/shared/currency.service'

@Component({
  selector: 'app-exchanger-card',
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.scss'],
})
export class ExchangerCardComponent implements OnInit {
  constructor(private cs: CurrencyService) {}

  @Input() selectedCurrency = ''
  @Input() oppositeCurrency = ''
  @Input() amount = 0
  @Output() showEv = new EventEmitter()
  @Output() changeAmount = new EventEmitter()
  @Output() changeCurrency = new EventEmitter()
  @Input() currenciesCodes: string[] = []

  showCur(): void {
    console.log(this.amount)
  }

  ngOnInit(): void {
    console.log('dsf')
  }
}
