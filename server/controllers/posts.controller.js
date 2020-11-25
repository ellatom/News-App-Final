const mongoose = require('mongoose');
const express = require('express');

const auth = require ('../middleware/auth');

mongoose.connect('mongodb://127.0.0.1:27017/newsapi', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Posts = require('../models/posts.js');
// const sharp = require('sharp');



//postman post:http://localhost:3030/livenews
//body- post details
exports.createPost = (async (req, res) => {
    
    try {
        let post = await Posts.findOne({ title: req.body.title });

        if (post)
            return res.status(409).send('Post already exist');

        // const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        debugger;
        console.log(req.body);
        post = {
            "title": req.body.title,
            "description": req.body.description,
            "author": req.body.author,
            "image": req.body.urlToImage //req.file.buffer //buffer
        };
        const posts = new Posts(post);

        posts.save().then(() => {
            res.status(201).send(posts);
            console.log("added document")
        }).catch((e) => {
            res.status(500).send(e)
        })
    }
    catch (e) {
        res.status(500).send(e);
    }
});

//get http://localhost:3030/livenews
exports.getPosts = async function (req, res) {

    try {
        let posts = await Posts.find({});
        res.setHeader('Content-Type', 'application/json');
        res.send(posts);
    }
    catch (e) {
        res.status(500).send(e);
    }
};

//postman http://localhost:3000/livenews/:title
exports.deletePost= async function(req, res){

    try {
        const post = await Posts.findOneAndDelete({title:req.params.title});

        if (!post) {
            res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
}

//postman http://localhost:3000/livenews/:title

exports.updatePost = (async (req, res) => {

    let foundIndex =
        Posts.find({title: req.params.title});//findIndex returns-1 in case not found

    if (!foundIndex)
        return res.status(404).send('post not exist');

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'author','image','_id','__v'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))//if not include bad request invalid property added

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        let postData = {

            "title": req.body.title,
            "description": req.body.description,
            "author": req.body.author,
            "image": req.body.image
        };

        //new option to true to return the document after update was applied.
        //useFindAndModify': true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify()
        //Update validators are off by default - you need to specify the runValidators option
        const post = await Posts.findOneAndUpdate(
            { title: req.body.title }, postData, { new: true, runValidators: true, useFindAndModify: false });

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } 
    catch (e) {
        res.status(400).send(e)
    }

});


