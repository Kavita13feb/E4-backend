const express=require("express")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../Models/userModel")
const bcrypt = require('bcrypt');
const userRouter=express.Router()




userRouter.post("/login",async (req,res)=>{

  
    
    const {email,password}=req.body
         try{

        const user=await UserModel.findOne({email})
       if(user){
 
        bcrypt.compare(password,user.password,(err, result)=> {
            res.send({"msg":"Login Successful","token":jwt.sign({"userId":user._id},"masai")})
        });
         
       } else {
          res.send("Login Failed")
         }
          } catch(err){
    console.log(err)
    }
    })
    
    userRouter.post("/register",async (req,res)=>{
        const {name,email,password,gender,age,city, is_married}=req.body

        try{
            const user=await UserModel.findOne({name,email})
         
            if(user){
                res.status(400).send("User already exist, please login")
            }else{
                bcrypt.hash(password, 2, async(err, hash) =>{
                    const user= new UserModel({name,email,password:hash,gender,age,city,is_married})
                    
            await user.save()
            res.send("Registered")
                });   
            }
       
        
        
        }catch(err){
        res.send(err)
        }
        
        })
      

    module.exports ={
        userRouter  
    }