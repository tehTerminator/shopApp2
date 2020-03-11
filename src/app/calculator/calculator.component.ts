import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  textField = '';

  currencyCounter = {
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    2000: 0
  };

  constructor() { }

  ngOnInit() {
  }

  denomination = () => Object.keys(this.currencyCounter);
  calcValue = (denominator: string) => +denominator * this.currencyCounter[+denominator];

  evaluate() {
    const pattern = new RegExp('^[0-9]{1,7}(([\\\-\+\.\*])[0-9]{1,7})*$');
    if (pattern.test(this.textField)) {
      // tslint:disable-next-line: no-eval
      this.textField += `=${eval(this.textField)}`;
    } else if ( this.textField.indexOf('=') >= 0 || this.textField.length === 0 ) {
      return;
    } else {
      this.textField = 'error! Invalid Value';
    }
  }

  onReset = () => this.denomination().forEach(item => { this.currencyCounter[item] = 0; });

  getTotal(): number {
    let sum = 0;
    this.denomination().forEach(item => {
      sum += this.currencyCounter[item] * +item;
    });
    return sum;
  }
}
