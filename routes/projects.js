'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use('/', function(req,res,next){
  let token = req.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiTWF0dCIsImxhc3RfbmFtZSI6Ikh1bW1lciIsImVtYWlsIjoiY2F0c0BjYXRzLmNvbSIsImhhc2hlZF9wYXNzd29yZCI6IiQyYSQwOCRLYjdKekNoSmlCdjlkZTZ0OU5CNlYuUUtpLnc4N1dELzNndjNQeEVINGlBS3JOTmhiTGJqVyIsInNjX3VzZXJuYW1lIjoibWF0dGFsdWkiLCJpYXQiOjE0OTczNzI5MjV9.sUCMJf1E9u2kNXnjPBiFYvH5Fog8T1i2zajN-GwWwYY'

  //this was just to generate a testing token

  // let aToken = jwt.sign({
  //   first_name: 'Matt',
  //   last_name: 'Hummer',
  //   email: 'cats@cats.com',
  //   hashed_password: '$2a$08$Kb7JzChJiBv9de6t9NB6V.QKi.w87WD/3gv3PxEH4iAKrNNhbLbjW',
  //   sc_username: 'mattalui'
  // }, 'secret')
  // console.log(aToken);

  jwt.verify(token, 'secret', function(err, value){
    console.log(err);
    if(err){
      res.send('token doesnt match');
    }else{

    }
  });


});




module.exports = router;
