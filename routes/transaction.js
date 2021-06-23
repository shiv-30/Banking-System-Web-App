const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Transaction = mongoose.model("Transaction")

router.get("/api/alltransaction", (req, res) => {
  Transaction.find()
    .sort("-createdAt")
    .populate("from", "name")
    .populate("to", "name")
    .then((transactions) => {
      res.json({ transactions: transactions });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router