var mongoose = require('mongoose')

var schema = {}

// transactions
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  transactionid: String
})

schema.User = mongoose.model('User', userSchema)

module.exports = schema
