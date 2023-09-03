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
  loanTitle: {
    type: String,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  totalInterest: {
    type: Number,
  },
  loanPrincipal: {
    type: Number,
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: false,
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
  let remainingLoanBalance = this.loanPrincipal;
  let totalInterestPaid = 0;

  for (let paymentNumber = 1; paymentNumber <= this.loanTerm; paymentNumber++) {
    const interestPayment = remainingLoanBalance * monthlyInterestRate;
    const principalPayment = this.monthlyPayment - interestPayment;

    totalInterestPaid += interestPayment;
    remainingLoanBalance -= principalPayment;
  }

  this.totalInterest = parseFloat(totalInterestPaid.toFixed(2));
  this.totalLoanAmount = parseFloat((this.totalInterest + this.loanPrincipal).toFixed(2));

  // Round the monthly payment to two decimal places
  this.monthlyPayment = parseFloat(this.monthlyPayment.toFixed(2));
  
  console.log(`\n`+'Loan Principal: '+`$`, this.loanPrincipal)
  console.log('Calculated Total Interest: '+`$`, this.totalInterest);
  console.log('Total Loan Amount: '+`$`, this.totalLoanAmount);;
  
  next();
  });

const Loan = model('Loan', loanSchema);

module.exports = Loan;
