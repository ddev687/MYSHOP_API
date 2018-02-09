const User=require('../Model/User.Model');
const bodyParser=require('body-parser');
const express=require('express');
const bcrypt=require('bcrypt');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const session=require('express-session');
const GithubStrategy=require('passport-github').Strategy;


let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'abc',
    resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
    function (username, password,done) {
        User.findOne({Email:username})
            .then((user)=>{
                if(!user) {
                    return done(null,false);
                }
                bcrypt.compare(password,user.Password,(err,resu)=> {
                    if (resu) {
                        console.log('avigya bhai')
                        return done(null,true);
                    } else {
                        return done(null,false);
                    }
                })
            }).catch(e=>{return (null,false)});
    }
));

passport.use(new TwitterStrategy({
        consumerKey: " 2OhzVHxgH08DgDAiW4V8zXycP",
        consumerSecret: "H0PuM3tRpXJf3adEGyO5NsmcaIhpPz0gKNyOxAzacLTKWEhO8H",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'userId' : profile.id }, function(err, user) {
            if (err)
                return done(err);
            if(!user){
                var newUser = new User();
                let data=jwt.sign(profile.id,'abc');
                newUser.UserId = data;
                newUser.Name = profile.displayName;
                newUser.Email = profile.emails[0].value;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }else{
                return done(null, user);
            }
        });
    }
));

passport.use(new GithubStrategy({
        clientID: "caa60fa9cfa66fc59454",
        clientSecret: "f072d47d7b648b4ef83f92cf7731ee1d4e0579d6",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'userId' : profile.id }, function(err, user) {
            if (err)
                return done(err);
            if(!user){
                console.log(profile);
                var newUser = new User();
                let data=jwt.sign(profile.id,'abc');
                newUser.UserId = data;
                newUser.Name = profile.displayName;
                newUser.Email = profile.username;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }else{
                return done(null, user);
            }
        });
    }
));


passport.use(new GoogleStrategy({
        clientID: "473356815074-e41jaf9bcn79782r53h0q95fn433jdmk.apps.googleusercontent.com",
        clientSecret: "wuDz8SZufA8YiwUVwc5rs8QZ",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("Google");
        //User.findOrCreate({name: profile.displayName}, {email: "shubham2385@gmail.com"}, {userId: profile.id},{Image:profile.image.url}, function (err, user) {
        User.findOne({ 'userId' : profile.id }, function(err, user) {
            if (err)
                return done(err);
            if(!user){
                var newUser = new User();
                let data=jwt.sign(profile.id,'abc');
                newUser.UserId = data;
                newUser.Name  = profile.displayName;
                newUser.Email = profile.emails[0].value;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }else{
                return done(null, user);
            }
        });
    }
));


passport.use(new FacebookStrategy(
    {
        clientID:"1795193140501575",
        clientSecret:"2a166aca5988c12970f4070e65a54386",
        callbackURL:"http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken,refreshToken,profile,done) {
        console.log("Facebook");
        User.findOne({ 'userId' : profile.id }, function(err, user) {
            if (err)
                return done(err);
            if(!user){
                var newUser = new User();
                let data=jwt.sign(profile.id,'abc');
                newUser.UserId = data;
                newUser.Name  = profile.displayName;
                newUser.Email = profile.emails[0].value;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }else{
                return done(null, user);
            }
        });
    }
));

exports.githubAuth=()=>{
    passport.authenticate('github', { scope: [ 'user:email' ] })};

exports.githubAuthCallBack=()=>{
    passport.authenticate('github', {
        successRedirect : '/success',
        failureRedirect : '/error'
    })};

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
    console.log("Register");
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

