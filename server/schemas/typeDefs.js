const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    loanCount: Int
    savedLoans: [Loan]  
  }

  type Loan {
    _id: ID
    totalLoanAmount: Float!
    loanTerm: Int!
    interestRate: Float!
    totalInterest: Float!
    loanPrinciple: Float!
    depositAmount: Float
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    loans: [Loan]!
    loan(loanId: ID!): Loan
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLoan(loanId: ID!, totalLoanAmount: Int!, loanTerm: Int!, interest: Int!, loanPrinciple: Int!, depositAmount: Int, createdAt: String): Loan
    removeLoan(loanId: ID!): Loan
  }
`;

module.exports = typeDefs;
