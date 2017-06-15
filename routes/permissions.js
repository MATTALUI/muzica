'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'secret';

router.get('/', function(req,res,next){
  knex('permissions')
  .select('*')
  .then(function(permissions){
    res.send(permissions)
  });
});
router.get('/me', function(req, res, next){
  let token = req.cookies.token
  // || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4';
  jwt.verify(token, secret, function(err, userInfo){
    try{
      if(err){
        res.send('you do not have permissions to be here');
      }else{
        knex('permissions')
        .where('allowed_user', userInfo.id)
        .select(['projects.id as id','permissions.id as permissionId', 'first_name', 'last_name', 'allowed_user', 'project_title', 'project_description'])
        .join('users', 'users.id', 'allowed_user')
        .join('projects', 'permissions.project_id', 'projects.id')
        .then(function(myPermissions){
          res.send(myPermissions)
        });
      }
    }catch(err){}
  });
});
router.get('/:projectId', function(req,res, next){
  knex('permissions')
  .select(['users.id', 'first_name', 'last_name', 'email','sc_username'])
  .where('project_id', req.params.projectId)
  .join('users', 'users.id', 'allowed_user')
  .then(function(permissablePeople){
    res.send(permissablePeople);
  })
});
router.post('/:projectId', function(req, res, next){
  knex('users')
  .select(['id', 'first_name', 'last_name', 'email'])
  .where('email', req.body.email)
  .first()
  .then(function(addedUser){
    knex('permissions')
    .insert({
      project_id: req.params.projectId,
      allowed_user: addedUser.id
    })
    .returning('*')
    .then(function(added){
      knex('permissions')
      .select(['users.id', 'first_name', 'last_name', 'email','sc_username'])
      .where('project_id',req.params.projectId)
      .join('users','users.id','allowed_user')
      .then(function(allperm){
        res.send(allperm)
      })
    })
  })
  .catch(err=>{
    return res.send('invalid')
  })
});
router.delete('/:projectId', function(req, res, next){
  knex('permissions')
  .del()
  .where('allowed_user', req.body.userId)
  .then(function(){
    res.send('atll do, pig')
  });
});





module.exports = router;
