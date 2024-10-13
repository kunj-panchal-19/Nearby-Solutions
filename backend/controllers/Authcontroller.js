const express=require('express');
const User=require('../model/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const handleLogin= async (req,res)=>{
  try{
        const username=req.body.email;
        const password=req.body.password;
        // console.log(req.body);
        console.log(username)
        console.log(password)
        if(!username || !password) return res.status(400).json({'message':"username , password are required!",'success':false});
        const user=await User.findOne({"email":username});
        if(!user)return res.status(401).json({'message':'user is not registerd'});
        const match=await bcrypt.compare(password,user.password);
        if(match){
           const accessToken=jwt.sign(
            {
                "username":username
            },
            process.env.ACCESS_SECRET,
            {
                expiresIn:'30s'
            }
           );
           const refreshtoken=jwt.sign(
            {
                "username" : username
            },
            process.env.REFRESH_SECRET,
            {
                expiresIn:'1d'
            }
           );
           user.refreshtoken=refreshtoken;
           const result=await user.save();
           res.cookie('jwt', refreshtoken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
           res.json({ accessToken,"id":user._id });
           console.log(refreshtoken);
           

        }else{
            return res.sendStatus(401);
        }

  }catch(err){
    console.error(err);
  }
    
}

module.exports={handleLogin};