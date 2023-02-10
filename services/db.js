// import mongoose in db.js file
const mongoose = require('mongoose')

// using momgoose define a connection string
mongoose.connect('mongodb://localhost:27017/bank',()=>{
 console.log('mongoDB connected succesfully');
})

//  create model for the project
// collection - 

const User= mongoose.model('User',{
  username:String,
  acno:Number,
  password: String,
  balance:Number,
  transaction:[]

})

// export model
module.exports={
    User


}