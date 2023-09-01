import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedLoans {
        totalLoanAmount
        totalInterest
        loanTerm
        loanPrinciple
        interestRate
        depositAmount
        createdAt
        _id
      }
    }
  }
`;