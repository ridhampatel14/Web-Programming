//require express, express router and bcrypt as shown in lecture code
const validation=require('../helpers');
const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router
  .route('/')
  .get(async (req, res) => {
    if(req.session.user){
      return res.redirect('/protected');
    }else{
      return res.render('userLogin',{title:'Login',error:' '});
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if(req.session.user){
      return res.redirect('/protected');
    }else{
      return res.render('userRegister',{title:'Sign-up',error:' '});
    }
  })
  .post(async (req, res) => {
    let userInfo=req.body;
    try{
      let username=userInfo.usernameInput;
      let password=userInfo.passwordInput;
      if(!username || !password) throw 'username or password is not provided';
      username=validation.validate_user(username);
      password=validation.validate_password(password);
      const result=await usersData.createUser(username,password);
      if(result.userInserted==true){
        return res.redirect('/');
      }
    }catch(e){
      return res.status(400).render('userRegister',{title:'Sign-up',error:e});
    }
    return res.status(500).send('Internal Server Error');
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    let userInfo=req.body;
    try{
      let username=userInfo.usernameInput;
      let password=userInfo.passwordInput;
      if(!username || !password) throw 'username or password is not provided';
      username=validation.validate_user(username);
      password=validation.validate_password(password);
      const result=await usersData.checkUser(username,password);
      if(result.authenticatedUser==true){
        req.session.user = {username:username};
        return res.redirect('/protected');
      }
    }catch(e){
      return res.status(400).render('userLogin',{title:'login',error:e});
    }
    return res.status(500).send('Internal Server Error');
  })

router
  .route('/protected')
  .get(async (req, res) => {
    return res.render('private',{title:'protected',username:req.session.user.username,currentdateandtime:new Date().toUTCString()});
  })

router
  .route('/logout')
  .get(async (req, res) => {
    req.session.destroy();
    return res.render('logout',{title:'logout'});
  })
  
module.exports = router;