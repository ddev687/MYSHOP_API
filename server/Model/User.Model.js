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
    }
});


User.methods.generateAuthToken=function(){
    user=this;
    let token=user._id.toHexString();
    let data=jwt.sign(token,"abc");
    user.UserId=data;
    return user.save().then(()=>{
        return data;
    }).catch((e)=>res.send(e));
}
User.pre('save',function (next) {
    user=this;
    bcrypt.genSalt(10,function (err,salt) {
        console.log(user.Password)
        bcrypt.hash(user.Password,salt,function (err,hash) {
            console.log(hash)
            bcrypt.compare(user.Password,hash,(err,res)=>{
                console.log(res)
                if(res){
                user.Password=hash;
                next();}
            })
            next();
        });
    });
});

module.exports=mongoose.model('Users',User);