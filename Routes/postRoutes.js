

const express = require("express")
const { PostModel } = require("../Models/PostModel")
const jwt = require("jsonwebtoken")
const PostsRouter = express.Router()


PostsRouter.post("/add", async (req, res) => {


    try {



        const payload = req.body
        console.log(payload)
        const newMovie = new PostModel(payload)
        await newMovie.save()
        res.status(200).send({ "msg": "new post added" })
    } catch (er) {
        res.status(400).send(er.message)
    }

})


PostsRouter.post("/add", async (req, res) => {


    try {



        const payload = req.body
        console.log(payload)
        const newMovie = new PostModel(payload)
        await newMovie.save()
        res.status(200).send({ "msg": "new post added" })
    } catch (er) {
        res.status(400).send(er.message)
    }

})



PostsRouter.get("/", async (req, res) => {
const {max,min}=req.query
console.log(max)
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "masai")
    const req_id = decoded.userId
    console.log(req_id)
    
        if(max!==undefined && min!==undefined){
            try {
                let posts=await PostModel.find({$and:[{ userId: req_id },{   no_of_comments:{$gt:min}},{ no_of_comments:{$lt:max}}]})
               console.log(posts)
                if (posts.length > 0) {
                    res.status(200).send(posts)
                } else {
                    res.status(404).send({ "msg": "post not found" })
                }
            } catch (error) {
                console.log(error)
                res.send({"error":"Error Occured Not able to get the data",error})
            }

        }else{
            try {
                const posts = await PostModel.find({ userId: req_id })
        

                if (posts.length > 0) {
                    res.status(200).send(posts)
                } else {
                    res.status(404).send({ "msg": "post not found" })
                }
        
        
            } catch (er) {
                res.status(400).send({ "msg": msg.err })
            }
        }
       


    
})

PostsRouter.patch("/update/:postId", async (req, res) => {
    const postId = req.params.postId
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "masai")
    const req_id = decoded.userId
    const posts = await PostModel.findOne({ _id: postId })
    const userId_in_post = posts.userId
    try {
        if (req_id === userId_in_post) {
            await PostModel.findByIdAndUpdate({ _id: postId }, req.body)
            res.status(200).send({ "msg": "Post updated sucessfully" })
        } else {
            res.status(400).send({ "msg": "not autorised to updated this post" })
        }
    }catch(er){
        console.log(er)
    } 

})

PostsRouter.delete("/delete/:postId", async (req, res) => {
    const postId = req.params.postId
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "masai")
    const req_id = decoded.userId
    const posts = await PostModel.findOne({ _id: postId })
    const userId_in_post = posts.userId
    try {
        if (req_id === userId_in_post) {
            await PostModel.findByIdAndDelete({ _id: postId }, req.body)
            res.status(200).send({ "msg": "Post deleted sucessfully" })
        } else {
            res.status(400).send({ "msg": "not autorised to delete this post" })
        }
    }catch(er){
        console.log(er)
    } 

})


module.exports = {
    PostsRouter
}