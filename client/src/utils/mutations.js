import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      loanCount
      savedLoans {
        _id
        totalLoanAmount
        loanTerm
        totalInterest
        loanPrincipal
        interestRate
        depositAmount
        createdAt
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      loanCount
      savedLoans {
        _id
        loanTerm
        interestRate
        totalLoanAmount
        totalInterest
        loanPrincipal
        depositAmount
        createdAt
      }
    }
  }
}
`;
//edit
export const SAVE_LOAN = gql`
mutation SaveLoan($loanTerm: Int!, $interestRate: Float!, $loanPrincipal: Float!, $loanTitle: String, $monthlyPayment: Float, $depositAmount: Float) {
  saveLoan(loanTerm: $loanTerm, interestRate: $interestRate, loanPrincipal: $loanPrincipal, loanTitle: $loanTitle, monthlyPayment: $monthlyPayment, depositAmount: $depositAmount) {
    _id
    username
    email
    password
    loanCount
    savedLoans {
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
}
`;

//edit
export const REMOVE_LOAN = gql`
mutation removeLoan($loanId: ID!) {
  removeLoan(loanId: $loanId) {
    _id
    username
    email
    password
    loanCount
    savedLoans {
      createdAt
      depositAmount
      totalInterest
      totalLoanAmount
      _id
      loanTerm
      interestRate
      loanPrinciple
    }
  }
}
`;
