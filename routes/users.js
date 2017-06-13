'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const path = require("path");
const jwt = require('jsonwebtoken');
// const humps = require('humps');

router.post('/login', (req, res, next) => {
  // console.log(req.body);
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .first()
    .then(function(user) {
      // console.log(user);
      if (user.length === 0) {
        res.setHeader('Content-Type', 'text/plain');
        alert("Incorrect email or password");
      } else {
        bcrypt.compare(req.body.password, user.hashed_password, function(err, match) {
          // console.log(req.body);
          if (err) {
            alert('Invalid email or password')
          } else {
            var token = jwt.sign(user, 'secret');
            // console.log(token);
            res.cookie('token', token, {
              httpOnly: true
            });
            // console.log(req.cookies);
            console.log(user.id);
            // knex('projects')
            //   .select('*')
            //   .where('user_id', 'user.id')
            //   .then(projects => {
            //     console.log(projects);
                res.send('Valid email and password')
            //     // res.sendFile(path.join( __dirname+'/home.html'));
            //   })
          }
        });
      }
    });
});



module.exports = router;
