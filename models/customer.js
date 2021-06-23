const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    accno: {
      type: "string",
      required: true,
    },
    cur_bal: {
      type: "Number",
      required: true,
    },
    Totransactions: [{ type: ObjectId, ref: "Transaction" }],
    FromTransaction: [{ type: ObjectId, ref: "Transaction" }],
  }
);

mongoose.model("Customer", customerSchema)