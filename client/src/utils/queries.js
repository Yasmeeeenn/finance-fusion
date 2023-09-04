import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    email
    loanCount
    savedLoans {
      _id
      totalLoanAmount
      loanTitle
      loanTerm
      totalInterest
      interestRate
      monthlyPayment
      loanPrincipal
      depositAmount
      createdAt
    }
  }
}
`;

export const GET_LOAN = gql`
query loan($loanId: ID!) {
  loan(loanId: $loanId) {
    _id
    totalLoanAmount
    loanTitle
    loanTerm
    interestRate
    totalInterest
    loanPrincipal
    monthlyPayment
    depositAmount
    createdAt
  }
}
`;

