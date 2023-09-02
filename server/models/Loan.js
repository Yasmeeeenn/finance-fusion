const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const loanSchema = new Schema({
  totalLoanAmount: {
    type: Number,
  },
  loanTerm: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  totalInterest: {
    type: Number,
  },
  loanPrinciple: {
    type: Number,
    required: true,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

loanSchema.pre('save', function (next) {
  const interestRateDecimal = this.interestRate / 100;
  const monthlyInterestRate = interestRateDecimal / 12;

  // Calculate the total interest
  let remainingLoanBalance = this.loanPrinciple;
  let totalInterestPaid = 0;

  for (let paymentNumber = 1; paymentNumber <= this.loanTerm; paymentNumber++) {
    const interestPayment = remainingLoanBalance * monthlyInterestRate;
    const principalPayment = this.loanPrinciple - interestPayment;

    totalInterestPaid += interestPayment;
    remainingLoanBalance -= principalPayment;
  }

  this.totalInterest = parseFloat(totalInterestPaid.toFixed(2));
  this.totalLoanAmount = parseFloat((this.totalInterest + this.loanPrinciple).toFixed(2));

  // Round the monthly payment to two decimal places
  console.log('Loan Principle', this.loanPrinciple);
  console.log('Calculated totalInterest:', this.totalInterest);
  console.log('Calculated totalLoanAmount:', this.totalLoanAmount);

  next();
});

const Loan = model('Loan', loanSchema);

module.exports = Loan;
