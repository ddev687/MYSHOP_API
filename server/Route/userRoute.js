exports.route=(app)=>{
    const UserContoller=require("../Controller/User.Controller");

    app.get('/getUser',UserContoller.getUser);
    /*app.get('/auth/github',UserContoller.githubAuth);
    app.get('/auth/github/callback',UserContoller.githubAuthCallBack);*/
    /*app.get('/auth/google',UserContoller.googleAuth);
    app.get('/auth/google/callback',UserContoller.googleAuthCallBack);
    app.get('/auth/facebook',UserContoller.facebookAuth);
    app.get('/auth/facebook/callback',UserContoller.facebookAuthCallBack);
    app.get('/auth/twitter',UserContoller.twitterAuth);
    app.get('/auth/twitter/callback',UserContoller.twitterAuthCallBack);*/
    /*app.get('/success',UserContoller.Success);*/
    app.get('/error',UserContoller.Error);


    /*app.post('/loginLocal',UserContoller.loginLoacl);*/
    app.post('/registerUser',UserContoller.registerUser);
    /*app.post('/loginUser',UserContoller.loginUser);*/
};