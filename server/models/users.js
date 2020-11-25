
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = mongoose.Schema({

    firstname:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        unique: true,
        required:true,
        trim:true,
        lowercase:true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    confirmPassword:{
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    ,
    tokens: [{
        token:{
            type:String,
            required: true
        }
    }]
});


debugger;
UsersSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8);
    }
    console.log('just before saving!');


    next();
})

UsersSchema.methods.toJSON = function () {
    const user =this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.confirmPassword;
    delete userObject.tokens;

    return userObject;
}

UsersSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse');

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;


}

UsersSchema.statics.findByCredentials = async (email,password)=>{
    const user = await Users.findOne({"email":email});

    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}
const Users = mongoose.model('Users', UsersSchema);
module.exports= Users;
