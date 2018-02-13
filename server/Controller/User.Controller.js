const User=require('../Model/User.Model');
const bcrypt=require('bcrypt');
const passport=require('passport');
const {mongoose,port}=require('../../config/config');
const session=require('express-session');

/*
exports.Success=(req,res)=>{
    res.json(userToken);
};
*/


exports.Error=(req,res)=>{
    res.json("Email and Password is Invalid");
};

/*exports.loginLoacl=(req,res)=>{
    User.find({Email:req.body.email,Password:req.body.password})
        .then(user=>{
            if(user.length==0) {
                return res.json("Email and Password is Invalid");
            }
            res.json("Login Successfully");
        }).catch(e=>res.json("Email and Password is Invalid"));
};*/

exports.registerUser=(req,res)=>{
    const newUser=new User({
        Name:req.body.name,
        Email:req.body.email,
        Password:req.body.password,
        Photo:"",
        Token:""
    });
    newUser.save().then(() => {
       res.json("User Register Successfully");
    }).catch((e) => {
        res.status(400).send(e);
    })
}


/*exports.loginUser=(req,res)=>{
    User.find({Email:req.body.email,Password:req.body.password})
        .then(user=>{
            if(user.length==0) {
                return res.json("Email and Password is Invalid");
            }
            console.log(user);
            res.json("Login Successfully");

        }).catch(e=>res.json("Email and Password is Invalid"));
}*/

exports.getUser=(req,res)=>{
    User.find().then(users=>res.send(users)).catch(e=>next(e));
}
