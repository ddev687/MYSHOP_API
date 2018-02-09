const User=require('../Model/User.Model');
const bcrypt=require('bcrypt');
const passport=require('passport');
const {mongoose,port}=require('../../config/config');
const session=require('express-session');



/*exports.githubAuth=()=>{
    passport.authenticate('github', { scope: [ 'user:email' ] })};

exports.githubAuthCallBack=()=>{
    passport.authenticate('github', {
        successRedirect : '/success',
        failureRedirect : '/error'
    })};*/

exports.googleAuth=()=>{passport.authenticate('google', { scope : ['profile', 'email'] })};
//app.get('/auth/google',passport.authenticate('google'));

exports.googleAuthCallBack=()=>{
    passport.authenticate('google', {
        successRedirect : '/success',
        failureRedirect : '/error'
    })};

exports.facebookAuth=()=>{passport.authenticate('facebook')};


exports.facebookAuthCallBack=()=>{
    passport.authenticate('facebook',{
        successRedirect:'/success',
        failureRedirect:'/error'
    })};

exports.twitterAuth=()=>{passport.authenticate('twitter')};


exports.twitterAuthCallBack=()=>{
    passport.authenticate('twitter',{
        successRedirect:'/success',
        failureRedirect:'/error'
    })};

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(id, done) {
    done(null,id);
});

exports.loginUser=()=>{passport.authenticate('local',{
    successRedirect:'/success',
    failureRedirect:'/error'
})};

exports.Success=(req,res)=>{
    res.json("Login Successfully");
};


exports.Error=(req,res)=>{
    res.json("Email and Password is Invalid");
};

exports.loginLoacl=(req,res)=>{
    User.find({Email:req.body.email,Password:req.body.password})
        .then(user=>{
            if(user.length==0) {
                return res.json("Email and Password is Invalid");
            }
            console.log(user);
            res.json("Login Successfully");

        }).catch(e=>res.json("Email and Password is Invalid"));
};

exports.registerUser=(req,res)=>{
    console.log(req.body);
    const newUser=new User({
        Name:req.body.name,
        Email:req.body.email,
        Password:req.body.password
    });
    newUser.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('auth', token).json("User Register Successfully");
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
    console.log("User");
    User.find().then(users=>res.send(users)).catch(e=>next(e));
}
