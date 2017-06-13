'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
var path    = require("path");
// const humps = require('humps');

router.post('/login', (req, res, next) => {
  console.log(req.body);
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .first()
    .then(function(user) {
      console.log(user);
      if (user.length === 0) {
        res.setHeader('Content-Type', 'text/plain');
        alert("Incorrect email or password");
      } else {
        bcrypt.compare(req.body.password, user.hashed_password, function(err, match) {
          console.log(req.body);
          if (err) {
            alert('Invalid email or password')
          } else {
            res.send('Valid email and password')
            // res.sendFile(path.join( __dirname+'/home.html'));
          }
        });
      }

    });


});



module.exports = router;
