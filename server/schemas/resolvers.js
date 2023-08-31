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
    loan: async (parent, {loanId}) => {
      console.log(`Requested Loan ID => `+ loanId)
    return Loan.findOne({ _id: loanId })
    .select('-__v')
    },
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
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

    saveLoan: async (parent, { loanId, totalLoanAmount, loanTerm, interest, loanPrinciple, depositAmount, createdAt, monthlyPayment }) => {
      return Loan.create({ loanId, totalLoanAmount, loanTerm, interest, loanPrinciple, depositAmount, createdAt, monthlyPayment });
    
    removeLoan: async (parent, { loanId }) => {
      return Loan.findOneAndDelete({ _id: loanId });
    },
  },
};

module.exports = resolvers;
