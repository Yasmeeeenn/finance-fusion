import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      loanCount
      savedLoans {
        totalLoanAmount
        totalInterest
        loanTerm
        loanPrincipal
        interestRate
        depositAmount
        createdAt
        _id
      }
    }
  }
`;