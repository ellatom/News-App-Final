const auth = require ('../middleware/auth');

module.exports=function(app){

    let posts=require('../controllers/posts.controller.js')
    const express = require('express');
    // const multer = require('multer');
    const sharp = require('sharp');
    const cors = require('cors');//Adds the Access-Control-Allow-Origin header to the response.
    app.use(cors());
    //express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
    //need to parse our incoming requests by using the express.json() , express.urlencoded() middleware functions
    app.use(express.json());//must add to read body
    // app.use(express.urlencoded());
    app.use(express.urlencoded({ extended: true }));

    // const upload =multer({
    //     // dest:'avatars',
    //     limits:{
    //         fileSize:1000000//under 1 mb
    //     },
    //     //cb when done filter
    //     fileFilter(req,file,cb){
    //         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
    //             return cb(new Error('Please upload an image'));
    //         }
    //         // cb(new Error('File must be a PDF'));
    //         cb(undefined,true);
    //         // cb(undefined,false);
    //     }
    // })
    // const errorMiddleware=(req,res,cb)=>{
    //     throw new Error('From my middleware');
    // }

    app.get('/livenews',posts.getPosts);
    // app.post('/livenews',auth,upload.single('upload'),posts.createPost);
    app.post('/livenews',posts.createPost);
    app.delete('/livenews/:title',posts.deletePost);
    app.patch('/liveNews/:title', posts.updatePost);


    
}