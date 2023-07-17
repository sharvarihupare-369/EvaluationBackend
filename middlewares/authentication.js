const jwt = require("jsonwebtoken")
const authentication = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send({"msg":"Access Token Not Found!"})
    }

    jwt.verify(token,process.env.jwt_secretKey,(err,decoded)=>{
        if(decoded){
            req.userId = decoded.userId
            req.name = decoded.name
            next()
        }else{
            res.status(400).send({"msg":"Invalid Token"})
        }
    })

}

module.exports = authentication