'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
// const humps = require('humps');

router.post('/login', (req,res,next)=>{
    knex('users')
    .select('*')
    .where('email', req.body.email)
    .then(function(user){
      if(user.length === 0){
        res.send('there are no emails like that in the db')
      }else{
        bcrypt.compare(req.body.password, user.hashed_password, function(err, match){
          if(err){
            res.send('they dont match')
          }else{
          res.send('perfect match')
        }
        });
      }

    });


});



module.exports = router;
