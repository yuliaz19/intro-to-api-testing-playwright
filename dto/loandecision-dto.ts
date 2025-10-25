export class LoanDecisionDto {
  income: number; // should be > 0
  debt: number; // should be >= 0
  age: number; // should be > 16
  employed: boolean;
  loanAmount: number;
  loanPeriod: number; // should be 3,6,9,12

  constructor(income: number, debt: number, age: number, employed: boolean, loanAmount: number, loanPeriod: number) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
}