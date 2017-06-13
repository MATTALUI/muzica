'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
// const humps = require('humps');

router.post('/login', (req, res, next) => {
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .then(function(user) {
      console.log(user);
      if (user.length === 0) {
        res.setHeader('Content-Type', 'text/plain');
        return res.send("Invalid email or password");
      } else {
        bcrypt.compare(req.body.password, user.hashed_password, function(err, match) {
          if (err) {
            res.send('Bad email or password')
          } else {
            res.send('perfect match')
          }
        });
      }

    });


});



module.exports = router;
