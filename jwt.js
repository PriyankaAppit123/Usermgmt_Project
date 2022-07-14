const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const {secret} = require('./config/Authkey')
const  repo = require('../repositories/token.repo')


module.exports. verifyJwt = async (req,res,next)=>{
  let token =  req.header('auth-token')
  if(!token)
    res.status(StatusCodes.UNAUTHORIZED).send({error:"tokens not recieved"})  
  
  try{
    const data = jwt.verify(token,secret)
    let result =  await repo.selectToken(token)
   
    if(token === result.token){
      req.body.id = data.data
      console.log(req.body.id)
      next();
    }
    else{
      res.status(StatusCodes.EXPECTATION_FAILED).send({message :`User is logged out`})
    }
  }
  catch(error){
    res.status(StatusCodes.UNAUTHORIZED).send({error : 'token expired '})
  }
}

     