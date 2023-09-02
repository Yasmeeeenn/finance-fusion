import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;
//edit
export const SAVE_LOAN = gql`
mutation SaveLoan($totalLoanAmount: Float!, $loanTerm: Int!, $interestRate: Float!, $totalInterest: Float!, $loanPrinciple: Float!, $depositAmount: Float, $createdAt: String) {
  saveLoan(totalLoanAmount: $totalLoanAmount, loanTerm: $loanTerm, interestRate: $interestRate, totalInterest: $totalInterest, loanPrinciple: $loanPrinciple, depositAmount: $depositAmount, createdAt: $createdAt) {
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
      loanPrinciple
      interestRate
      depositAmount
      createdAt
    }
  }
}
`;

//edit
export const REMOVE_LOAN = gql`
mutation RemoveLoan($loanId: ID!) {
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
