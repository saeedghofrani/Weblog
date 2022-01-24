const { Error } = require('mongoose');
const { MongoError } = require('mongodb');

function handler(res, err, from) {
  
  if(err instanceof Error.ValidationError) {
    validationErrorLogger(err, from);
    return res.status(406).send({ success: false, message: 'Not Acceptable Values.' });
  }
  if(err instanceof MongoError) {
    mongoErrorLogger(err, from);
    return res.status(406).send({ success: false, message: 'Not Acceptable Values.' });
  }
  if(err instanceof TypeError) {
    console.log('\x1b[31m%s\x1b[0m', err.message);
    process.exit(1);
  }
  // errorLogger(from, err.message);
  err.status = err.status || 500;
  return res.status(err.status).send({ success: false, message: err.message });
}

function validationErrorLogger(err, from) {
  console.log('\x1b[31m%s\x1b[0m', 'Error Logger, Start:');
  console.log(`In ${from} with message:`);
  for(const e in err.errors) {
    console.log('\x1b[33m%s\x1b[0m', e, err.errors[e].message);
  }
  console.log('\x1b[31m%s\x1b[0m', 'Error Logger, End.');
  return;
}

function mongoErrorLogger(err, from) {
  if(err.code === 11000) {
    console.log('\x1b[31m%s\x1b[0m', 'Error Logger, Start:');
    console.log(`In ${from} with message:`);
    console.log('\x1b[33m%s\x1b[0m', err.message);
    console.log('\x1b[31m%s\x1b[0m', 'Error Logger, End.');
  }
  return;
}

module.exports = {
  handler
}