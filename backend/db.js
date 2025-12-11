
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Establish the db connection
mongoose.connect("mongodb+srv://Admin:Aditya%4010may@cluster0.2d4bvxc.mongodb.net/paytm");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  hashedPassword: {
    type: String,
    require: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
})

userSchema.methods.createHash = async function (plainTextPassword){
  return await bcrypt.hash(plainTextPassword, 10);
}

userSchema.methods.validatePassword = async function (password){
  return await bcrypt.compare(password, this.hashedPassword);
}

// Create a Schema for user balance i.e Accounts
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    require: true,
  },
}) 

// Create a model from the schema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

// export the model
module.exports = {
  User,
  Account
}

