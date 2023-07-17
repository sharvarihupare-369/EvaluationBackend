const express = require("express")
const PostModel = require("../models/postModel")
const authentication = require("../middlewares/authentication")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    try {
        const posts = await PostModel.find(req.query)
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

postRouter.post("/add",authentication,async(req,res)=>{
      const {title,body,device,} = req.body
      try {
        const existPost = await PostModel.findOne({title})
        if(existPost){
             res.status(400).send({"msg":"Post already exists"})
        }else{
            const post = await PostModel.create({title,body,device,creator:req.userId,name:req.name})
            res.status(200).send({"msg":"Post Added Successfully",post})
        }

      } catch (error) {
        res.status(400).send({"errmsg":error.message})
      }
})

postRouter.patch("/update/:id",authentication,async(req,res)=>{
   const id = req.params.id
   const post = await PostModel.findById(id);
    try {
      if(post.creator.toString() != req.userId){
       return res.status(400).send({"msg":"You are not allowed to update"})
      }

      const updatedPost = await PostModel.findByIdAndUpdate(req.params.id,req.body,{new : true})
      res.status(200).send({"msg":"Post Updated",updatedPost})


    } catch (error) {
      res.status(400).send({"errmsg":error.message})
    }
})


postRouter.delete("/delete/:id",authentication,async(req,res)=>{
    const id = req.params.id
    // const post = await PostModel.findById(id);
     try {
    //    if(post.creator.toString() != req.userId){
    //      return res.status(400).send({"msg":"You are not allowed to delete"})
    //    }
 
       const deletedPost = await PostModel.findByIdAndDelete({_id:id})
       res.status(200).send({"msg":"Post Deleted"})
 
 
     } catch (error) {
       res.status(400).send({"errmsg":error.message})
     }
 })

module.exports = postRouter