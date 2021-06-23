const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  from: {
    type: ObjectId,
    ref:"Customer",
    required: true,
  },
  to: {
    type: ObjectId,
    ref:"Customer",
    required: true,
  },
  fromAccno: {
    type: "string",
    required: true,
  },
  toAccno: {
    type: "string",
    required: true,
  },
  amount: {
      type: "Number",
      required: true,
  }
}, {timestamps:true});

mongoose.model("Transaction", transactionSchema)