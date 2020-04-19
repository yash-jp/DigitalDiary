const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const {User,validateLogin} = require('../model/user');
/******************************************************/

router.post('/',async (req,res)=>{
  try{
    const {error} = validateLogin(req.body);

    if(error){
      return res.status(400).json({"status":1,"message":error.details[0].message});
    }

    let user = await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({"status":1,"message":"user email or password is incorrect"});
    }

    const validatePassword = await bcrypt.compare(req.body.password,user.password);
    if(!validatePassword){
      return res.status(400).json({"status":1,"message":"user email or password is incorrect"});
    }

    const token = jwt.sign({id:user.id,name:user.name},config.get('jwtPrivateKey'));

    return res.status(200).json({"status":0,"message":"Login Successful","user":user,"token":token});
    
  }
  catch(error){
    console.log(`users - ${error.message}`);
  }
});



module.exports = router;