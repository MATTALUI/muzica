'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const humps = require('humps');

router.post('/createuser', (req, res, next) => {
  console.log(req.body);
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .then(function(user) {
      console.log(user);
      if (user.length > 0) {
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
                res.send(new_user)
              })
            // res.send(req.body)
          }
        });
      }

    });


});



module.exports = router;
