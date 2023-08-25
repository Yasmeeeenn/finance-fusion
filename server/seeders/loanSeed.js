const seeds = [
    {
      totalLoanAmount: 500,
      loanTerm: 36,
      interestRate: 4.5,
      totalInterest: 78,
      loanPrinciple: 422,
      depositAmount: 0
    },
    {
      totalLoanAmount: 1000,
      loanTerm: 24,
      interestRate: 5.5,
      totalInterest: 110,
      loanPrinciple: 890,
      depositAmount: 0
    },
    {
      totalLoanAmount: 1500,
      loanTerm: 12,
      interestRate: 6.5,
      totalInterest: 97.5,
      loanPrinciple: 1402.5,
      depositAmount: 0
    },
    {
      totalLoanAmount: 30000,
      loanTerm: 60,
      interestRate: 5,
      totalInterest: 5000,
      loanPrinciple: 7500,
      depositAmount: 500
    },
    {
      totalLoanAmount: 500000,
      loanTerm: 30,
      interestRate: 3.5,
      totalInterest: 200000,
      loanPrinciple: 175000,
      depositAmount: 2083
    }
];

function calculateTotalInterest(totalLoanAmount, loanTerm, interestRate) {
  return totalLoanAmount * interestRate * loanTerm / 100;
}

function calculateLoanPrinciple(totalLoanAmount, totalInterest) {
  return totalLoanAmount - totalInterest;
}