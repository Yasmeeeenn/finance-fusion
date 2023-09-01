import { gql } from '@apollo/client';

<<<<<<< HEAD
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
=======
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
>>>>>>> dev
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
<<<<<<< HEAD
=======
        email
>>>>>>> dev
      }
    }
  }
`;

<<<<<<< HEAD
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
mutation saveLoan($totalInterest: Float!, $totalLoanAmount: Float!, $loanTerm: Int!, $interestRate: Float!, $loanPrinciple: Float!, $depositAmount: Float!, $createdAt: String) {
 saveLoan(totalInterest: $totalInterest, totalLoanAmount: $totalLoanAmount, loanTerm: $loanTerm, interestRate: $interestRate, loanPrinciple: $loanPrinciple, depositAmount: $depositAmount, createdAt: $createdAt) {
   username
   savedLoans {
        totalLoanAmount
        totalInterest
        loanPrinciple
        loanTerm
        depositAmount
        interestRate
        createdAt
        _id
      }
      loanCount
      email
      _id
    }
  }
}
`;

//edit
export const REMOVE_LOAN = gql`
mutation RemoveLoan($loanId: ID!) {
  removeLoan(loanId: $loanId) {
    username
    savedLoans {
      totalLoanAmount
      totalInterest
      loanTerm
      interestRate
      loanPrinciple
      depositAmount
      createdAt
      _id
    }
      loanCount
      email
      _id
    }
  }
}
`;
=======
export default LOGIN_MUTATION;


>>>>>>> dev
