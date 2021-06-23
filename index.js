const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5002
const {MONGOURI}  = require('./config/key')





mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

mongoose.connection.on('connected', () => {console.log('connected to mongo')})

mongoose.connection.on('error', (err) => {
  console.log("error ", err);
});

require("./models/customer")
require("./models/transaction")


app.use(express.json());
app.use(cors());
app.use(require("./routes/customer"));
app.use(require("./routes/transaction"))
// app.use(require("./routes/user"));

app.get('/', (req, res) => {
  res.send(MONGOURI);
})

// if(process.env.NODE_ENV == "production") {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*", (req, res)=>{
//       res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
//     })
// }
app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT)
})


// To start nodemon type npm run nodemon