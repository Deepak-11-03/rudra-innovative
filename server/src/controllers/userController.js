const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const signup =async(req,res)=>{
    try {
           let {name,email,phone,password} = req.body;
           if(name.length===0 || email.length === 0 || phone.length ===0 || password.length === 0){
            return res.status(400).send({status:false,msg:"Please enter all details"});
           }
           let deletedAccount = await userModel.findOne({email,isDeleted:true})
           if(deletedAccount){
            return res.status(400).send({status:false,msg:"This account is blocked , contact Us"});
           }
           let existingDetails= await userModel.find({email,phone});
           if(existingDetails.length !== 0){
            return res.status(400).send({status:false,msg:"Email or phone already exist"});
           }
           const hashpass = await bcrypt.hash(password,10);
           const details = {name,email,phone,password:hashpass};
           await userModel.create(details);
           return res.status(201).send({status:true,msg:"Account created"});
        } 
    catch (error) {
        return res.status(500).send({msg:error.message});
    }
}
const login =async(req,res)=>{
    try {
        let {email,password} = req.body;
        let user = await userModel.findOne({email,isDeleted:false});
        if(!user){
            return res.status(404).send({status:false,msg : 'user not found'});
        } 
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({status:false,msg: "inValid password" });
        }
        const token =jwt.sign({userId:user._id, email:email},process.env.SECRET_KEY);
        return res.status(200).send({status:true,name:user.name,token :token});
    } catch (error) {
        return res.status(500).send({msg:error.message});
    }
}
const getProfile =async(req,res)=>{
    try {
        let userId = req.userid;

        let user = await userModel.findOne({_id:userId,isDeleted:false}).select({__v:0,_id:0,password:0});
        if(!user){
            return res.status(400).send({status:false,msg : 'Something wrong'});
        } 
        return res.status(200).send({status:true,profile:user});
    } catch (error) {
        return res.status(500).send({msg:error.message});
    }
}

const updateProfile =async(req,res)=>{
    try {
        let userId = req.userid;
        let {name,email,phone} = req.body;
      let existingEmail = await userModel.findOne({ email,isDeleted:false });

      if(existingEmail){
        if(existingEmail._id != userId){
          return res.status(400).send({status:false,msg:"This email is already registered"});
        }
      }
      let existingPhone = await userModel.findOne({ phone,isDeleted:false  });
      if(existingPhone){
        if(existingPhone._id != userId){
          return res.status(400).send({status:false,msg:"This email is already registered"});
        }
      }
       await userModel.findOneAndUpdate({_id:userId},req.body,{new:true});

      return res.status(200).send({status: true,msg:"Your profile update successfully"});
      
    } catch (error) {
        return res.status(500).send({msg:error.message});
    }
}

const deleteProfile =async(req,res)=>{
    try {
        let userId = req.userid;
      let user = await userModel.findOne({_id:userId})
      if(!user){
        return res.status(400).send({status:false,msg:"No user found"})
      }
      await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true, deletedAt: Date.now() }, { new: true })

      return res.status(200).send({status: true,msg:"Successfully delete"});
      
    } catch (error) {
        return res.status(500).send({msg:error.message});
    }
}




module.exports = {signup,login,getProfile,updateProfile,deleteProfile}