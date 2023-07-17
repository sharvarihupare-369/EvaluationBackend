const express = require("express")
const connection = require("./db")
const userRouter = require("./routes/userRoute")
const cors = require("cors")
const postRouter = require("./routes/postRoutes")
const app = express()
require("dotenv").config()
const PORT = process.env.port 

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",postRouter)


app.get("/",(req,res)=>{
    res.send("Welcome To Home Page")
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
  console.log(`Server is listening on port ${PORT}` )
})