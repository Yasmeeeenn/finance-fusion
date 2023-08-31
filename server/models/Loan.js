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
  monthlyPayment: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

loanSchema.pre('save', function (next) {
  const interestRateDecimal = this.interestRate / 100;
  const totalPayments = this.loanTerm * 12;
  this.totalInterest = parseFloat(((this.loanPrinciple * interestRateDecimal * totalPayments) / 12).toFixed(2));
  this.totalLoanAmount = parseFloat((this.totalInterest + this.loanPrinciple).toFixed(2));

  console.log('Calculated totalInterest:', this.totalInterest);
  console.log('Calculated totalLoanAmount:', this.totalLoanAmount);

  next();
});

const Loan = model('Loan', loanSchema);

module.exports = Loan;
