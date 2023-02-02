const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   hobbies: {
      type: String
   },
   password: {
      type: Number
   },
   datepicker:{
      type:String
   },
   gender:{
      type:String
   },
   status:{
      type:String
   }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)