const { Loan } = require('../models');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    loans: async () => {
      return Loan.find();
    },
    
    user: async (parent, {userId}) => {
        console.log(`Requested User ID => `+ userId)
      return User.findOne({ _id: userId })
      .select('-__v')
      .populate('savedLoans');
    },
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedLoans');
        }
        throw AuthenticationError;
      },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveLoan: async (parent, { totalInterest, totalLoanAmount, loanTerm, interestRate, loanPrincipal, depositAmount, monthlyPayment , loanTitle , createdAt}, context) => {
      if (loanPrinciple) {
        return User.findOneAndUpdate(
           { _id: context.user._id },
           {$addToSet: {
             savedLoans: {totalInterest, totalLoanAmount, loanTerm, interestRate, loanPrincipal, monthlyPayment, loanTitle, depositAmount, createdAt}
             }},
           {new: true}
         ); 
       }
       throw AuthenticationError;
       ('You need to be logged in!');
    },
    removeLoan: async (parent, { loanId }) => {
      return Loan.findOneAndDelete({ _id: loanId });
    },
  },
};

module.exports = resolvers;
