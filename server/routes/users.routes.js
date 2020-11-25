const auth = require ('../middleware/auth');
debugger;
module.exports=function(app){

    let users=require('../controllers/users.controller.js')
    const express = require('express');
    const cors = require('cors');//Adds the Access-Control-Allow-Origin header to the response.
    app.use(cors());
    //express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
    //need to parse our incoming requests by using the express.json() , express.urlencoded() middleware functions
    app.use(express.json());//must add to read body
    // app.use(express.urlencoded());
    app.use(express.urlencoded({ extended: true }));

    app.get('/user/me',auth,users.getUsers);
    app.post('/user',users.authUser);
    app.post('/user/register',users.registerUser);
    app.post('/user/login',users.loginUser);
    app.patch('/user/me',auth,users.updateUser);
    app.post('/user/logout', users.logoutUser);
    app.post('/user/logoutAll',auth, users.logoutAll);
    //app.delete('user/me',auth,users.usersDelete);
}