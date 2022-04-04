const express = require('express');
const Post = require("./models/Post");
const router = express.Router();

router.get("/posts", async(req,res)=>{
    const posts = await Post.find();
    res.send(posts);
})

router.get("/posts/:id", async(req,res)=>{
    try{
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    }catch{
        res.status(404);
        res.send({error: "Post doesn't exist!"});
    }
})

router.post("/posts", async(req,res)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    await post.save();
    res.send(post)
})

router.patch("/posts/:id", async(req,res)=>{
    try{
        const post = await Post.findOne({_id: req.params.id});
        if(req.body.title){
            post.title = req.body.title;
        }
        if(req.body.content){
            post.content = req.body.content;
        }
        await post.save();
        res.send(post);
    }catch(err){
        console.log(err);
        res.status(404);
        res.send({error: "Post doesn't exist!"});
    }
})

router.delete("/posts/:id", async(req,res)=>{
    try{
        await Post.deleteOne({_id: req.params.id});
        res.status(204);
        res.send("Deleted Successfully");
    }catch (err){
        console.log(err);
        res.status(404);
        res.send("Post doesn't exist")
    }
})

module.exports = router;