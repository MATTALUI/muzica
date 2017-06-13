'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', function(req,res,next){
  let token = req.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6Im1hdHRhbHVpIiwiaWF0IjoxNDk3Mzc5NjQ0fQ.O8AU4EmC3fV9Au2hZFNe-VR5VYz1HbtsR4FQevBph-8'
  // // this was just to generate a testing token
  // let aToken = jwt.sign({
  //   id: 1,
  //   first_name: 'Matt',
  //   last_name: 'Hummer',
  //   email: 'cats@cats.com',
  //   hashed_password: '$2a$08$Kb7JzChJiBv9de6t9NB6V.QKi.w87WD/3gv3PxEH4iAKrNNhbLbjW',
  //   sc_username: 'mattalui'
  // }, 'secret')
  // console.log('token: ',aToken);
  jwt.verify(token, 'secret', function(err, value){
    console.log(err);
    if(err){
      res.send('token doesnt match');
    }else{
      // console.log(value);
      // let userId = value.id;
      // res.send(`${userId}`);
      knex('projects')
      .where('project_owner', value.id)
      .then(function(projects){
        res.send(projects);
      });

    }
  });

});
router.get('/:id', function(req, res, next){


});






module.exports = router;
