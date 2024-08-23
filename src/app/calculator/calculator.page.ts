import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CalculatorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sum: string = '+';
  subtract: string = '-';
  multiply: string = '*';
  divide: string = '/';
  percentage: string = '%';
  squareRoot: string = '√';
  decimalPoint: string = '.';
  errorMessage: string = 'Error!';
  emptyContent: string = '0';
  num1: string = '';
  num2: string = '';
  bnum1: boolean = false;
  bnum2: boolean = false;
  historicalResults: string[] = [];
  currentOperation: string = '';

  update(number: string): void {
    if (this.emptyContent === '0' || this.emptyContent === this.errorMessage) {
      this.emptyContent = number;
    } else {
      this.emptyContent += number;
    }
  }

  deleteChar(): void {
    if (this.emptyContent.length > 1) {
      this.emptyContent = this.emptyContent.slice(0, -1);
    } else {
      this.emptyContent = '0';
    }
  }

  results(): void {
    try {
      let result = eval(this.emptyContent).toString();
      this.historicalResults.unshift(`${this.currentOperation} = ${result}`);
      this.emptyContent = result;
      this.currentOperation = result;
      if (this.historicalResults.length > 3) {
        this.historicalResults.pop();
      }
    } catch (error) {
      this.emptyContent = this.errorMessage;
    }
  }

  deleteAll() {
    this.emptyContent = '0';
    this.num1 = '';
    this.num2 = '';
    this.bnum1 = false;
    this.bnum2 = false;
    this.currentOperation = '';
  }

  getPercentage(): void {
    try {
      let result = (eval(this.emptyContent) / 100).toString();
      this.currentOperation = `${this.currentOperation}% = ${result}`;
      this.historicalResults.unshift(this.currentOperation);
      this.emptyContent = result;
      this.currentOperation = result;
      if (this.historicalResults.length > 3) {
        this.historicalResults.pop();
      }
    } catch (error) {
      this.emptyContent = this.errorMessage;
    }
  }
  
  getSquareRoot(): void {
    try {
      let result = Math.sqrt(parseFloat(this.emptyContent)).toString();
      this.currentOperation = `√(${this.currentOperation}) = ${result}`;
      this.historicalResults.unshift(this.currentOperation);
      this.emptyContent = result;
      this.currentOperation = result;
      if (this.historicalResults.length > 3) {
        this.historicalResults.pop();
      }
    } catch (error) {
      this.emptyContent = this.errorMessage;
    }
  }

  updateNumber(number: string): void {
    if (this.bnum1 && this.bnum2) {
      this.deleteAll();
      this.bnum1 = false;
      this.bnum2 = false;
    }
    this.update(number);
    this.currentOperation += number;
  }

  updateOperation(operation: string): void {
    if (!this.bnum1) {
      this.num1 = this.emptyContent;
      this.bnum1 = true;
    } else if (this.bnum1 && !this.bnum2) {
      this.num2 = this.emptyContent;
      this.bnum2 = true;
    }
    this.update(operation);
    this.currentOperation += ' ' + operation + ' ';
  }
  historicalResultsMethod(): void {
    console.log(this.historicalResults);
  }
}


