const db = require('../config/connection');
const { Loan } = require('../models');
const loanSeed = require('./loanSeed.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Loan', 'loans');
  
  await Loan.create(loanSeed);

  console.log('all done!');
  process.exit(0);
});
