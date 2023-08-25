const db = require('../config/connection');
const { Loan } = require('../models');
const loanSeeds = require('./loanSeed');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Loan', 'loans');

  await Loan.create(loanSeeds);

  console.log('all done!');
  process.exit(0);
});
