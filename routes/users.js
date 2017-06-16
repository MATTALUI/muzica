'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const path = require("path");
const jwt = require('jsonwebtoken');
const saltRounds = 8;
const secret = 'secret';


router.post('/login', (req, res, next) => {
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .first()
    .then(function(user) {
      if (Object.keys(user).length === undefined) {
        res.setHeader('Content-Type', 'text/plain');
        res.send("Incorrect email or password");
      } else {
        bcrypt.compare(req.body.password, user.hashed_password, function(err, decode) {
          if (err) {
            return res.send('Invalid email or password')
          } else if (decode===true){
            delete user.hashed_password;
            var token = jwt.sign(user, 'secret');
            res.cookie('token', token, {
              httpOnly: true
            });
            // console.log(req.cookies);
            // console.log(user.id);
            // knex('projects')
            //   .select('*')
            //   .where('user_id', 'user.id')
            //   .then(projects => {
            //     console.log(projects);
            // console.log("ready to redirect");
              // return res.redirect('/home.html')
                return res.send(true)
          }else{
            return res.send(false)
          }
        });
      }
    })
    .catch(err=>{
      return res.send("invalid")
    })
});

router.post('/createuser', (req, res, next) => {
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .then(function(user) {
      if (user.email!==undefined||user.email!==null) {
        res.setHeader('Content-Type', 'text/plain');
        return res.send("Invalid email, already taken");
      } else {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          if (err) {
            res.send(err)
          } else {
            req.body.hashed_password = hash
            delete req.body.password
            knex('users')
              .returning('*')
              .insert(req.body)
              .then(new_user=>{
                console.log("this is what sends when we create a user",new_user);
                let token = jwt.sign(new_user[0], 'secret');
                res.cookie('token', token, {
                  httpOnly: true
                });
                return res.send(new_user)
              })
          }
        });
      }
    })
    .catch(err=>{
      return res.send("invalid")
    })
});

router.get('/me', function(req, res, next){
  let token = req.cookies.token;
  // || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4';
  try{
    jwt.verify(token, secret, function(err, userInfo){
      if(err){
        res.send('you do not have permission to be here')
      }else{
        res.send(userInfo);
      }
    });
  }catch(err){}
})

router.get('/logout',(req,res,next)=>{
  res.clearCookie('token');
  res.send(true)
})

module.exports = router;
