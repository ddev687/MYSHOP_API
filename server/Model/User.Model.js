const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const User=new mongoose.Schema({
    Name:{
        type:String,
        trim:true,
    },
    Email:{
        type:String,
        trim:true,
    },
    Password:{
        type:String
    },
    UserId:{
        type:String,
        trim:true,
    },
    Photo:{
        type:String,
        trim:true
    },
    Token:{
        type:String
    }
});

User.methods.generateAuthToken=function(){
    user=this;
    let token=user._id.toHexString();
    let data=jwt.sign(token,"abc");
    user.Token=data;
    return user.save().then(()=>{
        return data;
    }).catch((e)=>res.send(e));
}
User.pre('save',function (next) {
    user=this;
    console.log(user);
    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(user.Password,salt,function (err,hash) {
            user.Password=hash;
            console.log(user.Password);
            next();
        });
    });
});

module.exports=mongoose.model('Users',User);