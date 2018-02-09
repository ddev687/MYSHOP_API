const {mongoose,port}=require('./config/config');
const userRoute=require('./server/Route/userRoute');
const productRoute=require('./server/Route/productRoute');
const bodyParser=require('body-parser');
const LocalStrategy=require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const session=require('express-session');
const GithubStrategy=require('passport-github').Strategy;
const express=require("express");
const passport=require('passport');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 'abc',
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',passport.authenticate('github', {
    successRedirect : '/success',
    failureRedirect : '/error'
}));

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
                        return done(null,true);
                    } else {
                        return done(null,false);
                    }
                })
            }).catch(e=>{return (null,false)});
    }
));


productRoute.route(app);
userRoute.route(app);
console.log(port);

app.listen(3000);