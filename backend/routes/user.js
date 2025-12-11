const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');
const authMiddleware = require('../middleware');

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
})
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
}) 
const updateInfoBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const userExist = await User.findOne({
      username: req.body.username,
    });
    if (userExist) {
      return res.status(409).json({
        msg: "Username already exists",
      });
    } else {
      const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      const hashedPassword = await user.createHash(req.body.password);
      user.hashedPassword = hashedPassword;
      await user.save(); 

      const userId = user._id;
      // create a new account
      await Account.create({
        userId,
        balance: 100 + Math.random(),
      })
      const token = jwt.sign({ userId }, jwtSecret);

      // Set the token in the Authorization header and send the response
      res.status(201)
        .header("Authorization", `Bearer ${token}`)
        .json({
          msg: "User created successfully",
          firstName: user.firstName,
          token: token,
        });
    }
  } 
  catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occurred",
    });
  }
});

router.post("/signin", async (req, res)=>{
  try{
    const { success } = signinBody.safeParse(req.body);
    if(!success){
      return res.status(400).json({
        msg: "Invalid inputs",
      })
    }
    
    const userExist = await User.findOne({username: req.body.username});
    if(userExist && await userExist.validatePassword(req.body.password)){
      const userId = userExist._id;
      const token = jwt.sign({ userId }, jwtSecret);

      res.status(200)
        .header("Authorization", `Bearer ${token}`) 
        .json({
          msg: "Login Successful",
          firstName: userExist.firstName,
          token: token,
        })
    }else{
      return res.status(401).json({
        msg: "Invalid username or password",
      })
    }
  }
  catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occurred",
    });
  }
})


router.put("/", authMiddleware, async (req, res)=>{
  try{
    const { success } = updateInfoBody.safeParse(req.body);
    if(!success){
      return res.status(400).json({
        msg: "Invalid inputs",
      })
    }
    const updateData = req.body;
    if(updateData.password){
      const hashedPassword = await User.prototype.createHash(updateData.password);
      updateData.hashedPassword = hashedPassword;
      delete updateData.password;
    }
    await User.updateOne({_id: req.userId}, updateData);
    res.status(200).json({
      msg: "Updated Successfully"
    })
  }
  catch (e){
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occured",
    })
  }
})

router.get("/bulk", async (req, res)=>{
  try{
    const filter = req.query.filter || "";

    const user = await User.find({
      $or: [{
        firstName: {
          "$regex": filter
        }
      },{
        lastName: {
          "$regex": filter
        }
      }]
    })
    res.status(200).json({
      user: user.map(user => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }))
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
