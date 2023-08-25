const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const loanSchema = new Schema({
  totalLoanAmount: {
    type: Int,
    required: 'There has to be a total loan amount!',
  },
  loanTerm: {
    type: Int,
    required: true,
  },
  interestRate: {
    type: Int,
    required: true,
  },
  totalInterest: {
    type: Int,
    required: true,
  },
  loanPrinciple: {
    type: Int,
    required: true,
  },
  depositAmount: {
    type: Int,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Loan = model('Loan', loanSchema);

module.exports = Loan;
