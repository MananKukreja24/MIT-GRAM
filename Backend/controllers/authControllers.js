const User= require('../models/user')
const {hashPassword,  comparePassword, hashconfirmPassword} = require('../helpers/auth')
const jwt= require('jsonwebtoken')



const test = (req, res) => {
    res.json('test is working');
  };
  
const registerUser =async (req,res)=>{
  try{
    const {email,password,confirmpassword}=req.body;
    if(!email){
      return res.json({
        error:'email is required'
      })
    };
    if(!password || password.length<6){
      return  res.json({error:"Password is Required and should be atleast 6 character long"})
    };
    if(confirmpassword!=password){
      return   res.json({error:"Confirm Password does not match"});
    };

    const exist = await  User.findOne({email});
    if(exist)
    {
      return res.json({
        error:'Email is already taken'
      })
    }

    const hashedPassword = await hashPassword(password)
    const hashedConfirmPassword = await hashconfirmPassword(confirmpassword)

    const user = await User.create({
      email,
      password: hashedPassword,
      confirmpassword : hashedConfirmPassword,
    });
    return res.json(user)
    

  }catch(error){
    console.log(error)

  }

}








const loginUser = async(req,res)=>
{
  try{
    const {email,password}= req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.json({
        error:'no user found '
      })
    }

    const match = await comparePassword(password, user.password)
    if(match){
      jwt.sign({email:user.email,id:user._id}, process.env.JWT_SECRET,{},(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json(user)
      })
      
    }
    if(!match){
      res.json({
        error:"wrong credentials"
      }) 
    }

  }catch{
    console.log(error)

  }

}

  module.exports = {
    test,
    registerUser,
    loginUser
  };
  









  