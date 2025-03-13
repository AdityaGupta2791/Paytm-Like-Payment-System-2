const jwt = require('jsonwebtoken');
const jwtSecret = require('./config');

const authMiddleware = (req, res, next)=>{
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
      return res.status(401).json({
        msg: "Invalid token"
      })
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    if(decoded.userId){
      req.userId = decoded.userId;
      next()
    }
    else{
      res.status(401).json({
        msg: "Authentication Failed",
      })
    }
  }
  catch (e){
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occured",
    })
  }
  
}


module.exports = authMiddleware;