const UserModel = require("../models/userModel")

const registerVal = async(req,res,next) => {
       const {email,password} = req.body
       const existUser = await UserModel.findOne({email})
        if(existUser){
          return res.status(400).send("User is already registered")
        }

        next()
}

module.exports = registerVal;