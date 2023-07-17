const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")
const registerVal = require("../middlewares/registerVal")

userRouter.post("/register",registerVal,async(req,res)=>{
    const {email,password} = req.body
    try {
       
        const newPass = await bcrypt.hash(password,10)
        const user = await UserModel.create({...req.body,password:newPass})
        res.status(200).send({"msg":"User registered successfully", user})
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({"msg":"Invalid Credentials"})
        }
        const comparePass = await bcrypt.compare(password,user.password)
        if(!comparePass){
            return res.status(400).send({"msg":"Invalid Credentials"})
        }else{
            const token = jwt.sign({userId:user._id,name:user.name},process.env.jwt_secretKey,{expiresIn:"1d"})
            res.status(200).send({"msg":"User LoggedIn Successfully",token})
        }
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})


module.exports = userRouter