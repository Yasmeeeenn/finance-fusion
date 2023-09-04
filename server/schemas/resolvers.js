const { Loan } = require('../models');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const calculateLoan = (loanPrincipal, loanTerm, interestRate) => {
  const interestRateDecimal = interestRate / 100;
  const monthlyInterestRate = interestRateDecimal / 12;
  const monthlyPayment = loanPrincipal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm)));

  // Calculate the total interest
  let remainingLoanBalance = loanPrincipal;
  let totalInterestPaid = 0;

  for (let paymentNumber = 1; paymentNumber <= loanTerm; paymentNumber++) {
    const interestPayment = remainingLoanBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    totalInterestPaid += interestPayment;
    remainingLoanBalance -= principalPayment;
  }

  const totalInterest = parseFloat(totalInterestPaid.toFixed(2));
  const totalLoanAmount = parseFloat((totalInterest + loanPrincipal).toFixed(2));

  return { totalInterest, totalLoanAmount, monthlyPayment };
};

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
    saveLoan: async (parent, { loanTerm, interestRate, loanPrincipal, loanTitle, depositAmount }, context) => {
      if (!loanTitle) {
        const loanTitle =  'Default Title'
      }
    
      // Calculate the total interest and total loan amount based on the default values
      const { totalInterest, totalLoanAmount, monthlyPayment } = calculateLoan(loanPrincipal, loanTerm, interestRate);
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: {
            savedLoans: {
              loanTerm,
              interestRate,
              loanPrincipal,
              monthlyPayment,
              loanTitle,
              depositAmount,
              totalInterest,
              totalLoanAmount,
            },
          },
        },
        { new: true }
      );
    
      return updatedUser;
    },
    removeLoan: async (parent, { loanId }) => {
      return Loan.findOneAndDelete({ _id: loanId });
    },
  },
};

module.exports = resolvers;
