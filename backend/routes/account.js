const express = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
  try{
    const account = await Account.findOne({userId: req.userId});
    res.status(200).json({
      balance: account.balance,
    })
  }
  catch (e){
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occured",
    })
  }
})

router.post("/transfer", authMiddleware, async (req, res)=>{
  try{
    const session = await mongoose.startSession();
    await session.withTransaction(async ()=>{
      const { to, amount} = req.body;

      // Fetch the accounts within the transaction
      const account = await Account.findOne({userId: req.userId}).session(session);

      if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
          msg: "Insufficient balance",
        })
      }

      const toAccount = await Account.findOne({userId: to}).session(session);

      if(!toAccount){
        await session.abortTransaction();
        return res.status(404).json({
          msg: "Invalid account",
        })
      }

      //perform the transaction 
      await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
      await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

      //commit the transaction
      await session.commitTransaction();
    });
    res.status(200).json({
      msg: "Transfer Successful "
    })
  }
  catch (e){
    console.error(e);  
    res.status(500).json({
      msg: "An unexpected error occured",
    })
  }
  
})

module.exports = router;