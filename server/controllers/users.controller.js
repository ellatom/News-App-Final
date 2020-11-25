const mongoose = require('mongoose');
const express = require('express');
const auth = require ('../middleware/auth');

mongoose.connect('mongodb://127.0.0.1:27017/newsapi', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Users = require('../models/users.js');
const Roles = require('../models/role.js');

exports.registerUser = (async (req, res) => {
   
    console.log("Im in server register user");
    const user = new Users(req.body);
    let email = await Users.findOne({ email: req.body.email });

    if (email)
        return res.status(409).send('User already registered');
    
    try {
        debugger;
        await user.save();
        res.status(201).send(user);
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});

exports.authUser =(async (req,res)=>{
    try{
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({user,token});
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})

exports.loginUser =(async (req,res)=>{
    
    debugger;
    try{
        const user =await Users.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})

exports.getUsers = (async (req, res) => {

    res.send(req.user);

});
exports.logoutAll= (async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();

    }catch(e){
        res.status(500).send();
    }
})

exports.logoutUser=(async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>
        {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    }catch(e)
    {
        res.status(500).send();
    }
})
exports.updateUser=(async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user);

    } catch (e) {
        res.status(400).send(e)
    }
})

exports.deleteUser = async function(req,res){
    try{
        //const user = await User.findOneAndDelete(req.user._id);

        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove();
        res.send(req.user);

    }catch(e)
    {
        res.status(500).send();
    }
}


