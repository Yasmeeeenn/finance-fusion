const { Loan } = require('../models');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, {userId}) => {
        console.log(`Requested User ID => `+ userId)
      return User.findOne({ _id: userId })
      .select('-__v')
      .populate('savedBooks');
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
    addLoan: async (parent, { loanText, loanAuthor }) => {
      return Loan.create({ loanText, loanAuthor });
    },
    addComment: async (parent, { loanId, commentText }) => {
      return Loan.findOneAndUpdate(
        { _id: loanId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateLoan: async (parent, { loanId, loanDepositAmount }) => {
      return Loan.findOneAndUpdate(
        { _id: loanId },
        { $set: { loanDepositAmount } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    
    removeLoan: async (parent, { loanId }) => {
      return Loan.findOneAndDelete({ _id: loanId });
    },
  },
};

module.exports = resolvers;
