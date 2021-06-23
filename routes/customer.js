const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Customer = mongoose.model("Customer")
const Transaction = mongoose.model("Transaction")

router.get('/api/allcustomers', (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json({ customers: customers });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/customer/:id", (req, res) => {
    
    Customer.findOne({_id:req.params.id})
    .populate("Totransactions", "_id from to toAccno amount")
    .populate("FromTransaction", "_id from to fromAccno amount")
    .then(customer => {
           
            res.json({customer})
        
    }).catch(err=>{
        return res.status(404).json({error:"User Not Found"})
    })
})

router.post('/api/createCustomer', (req, res) => {
  const { name, email, accno, cur_bal} = req.body;
  
  if (!email || !accno || !name || !accno) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  Customer.findOne({ email: email, accno: accno})
    .then((savedCustomer) => {
      if (savedCustomer) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      
        const customer = new Customer({
          email,
          accno,
          name,
          cur_bal,
          Totransactions: [],
          FromTransactions: []
        });

        customer
          .save()
          .then((customer) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/api/transfer", (req, res) => {
  const {from, to, fromAccno, toAccno, amount, cur_bal, toBal} = req.body;

  if (!from || !to || !fromAccno || !toAccno || !amount) {
        
        return res.status(422).json({ error: "please add all the fields" });
    
  }
  const famt = cur_bal-amount;
  const trans = new Transaction({
    from,
    to,
    fromAccno,
    toAccno,
    amount,
  });
  trans.save()
    .then((tran) => {
       Customer.findByIdAndUpdate(
         from,
         { $set: { cur_bal: famt }, $push: { Totransactions: tran._id } },
         { new: true },
         (err, result) => {
           if (err) {
             return res.status(422).json({ error: err.message });
           }
           const tamt = parseInt(toBal) + parseInt(amount);
           Customer.findByIdAndUpdate(
             to,
             { $set: { cur_bal: tamt }, $push: { FromTransaction: tran._id } },
             { new: true },
             (err, resultto) => {
               if (err) {
                 return res.status(422).json({ error: err.message });
               }
             }
           );

           res.status(201).json(tran);
         }
       );
    })

    .catch((err) => {
      console.log(err);
    });
 
    
});

module.exports = router