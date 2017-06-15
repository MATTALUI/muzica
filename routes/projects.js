'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'secret';


router.get('/', function(req,res,next){

  let token = req.cookies.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4'
  // this was just to generate a testing token
  // let aToken = jwt.sign({
  //   id: 1,
  //   first_name: 'Matt',
  //   last_name: 'Hummer',
  //   email: 'cats@cats.com',
  //   hashed_password: '$2a$08$Kb7JzChJiBv9de6t9NB6V.QKi.w87WD/3gv3PxEH4iAKrNNhbLbjW',
  //   sc_username: 'helloworldhello'
  // }, 'secret')
  // console.log('token: ',aToken);
  jwt.verify(token, secret, function(err, value){
    if(err){
      res.send('token doesnt match');
    }else{
      knex('projects')
      .where('project_owner', value.id)
      .then(function(projects){
        res.send(projects);
      });

    }
  });

});
router.get('/:id', function(req, res, next){
  knex('commits')
  .where('project_id', req.params.id)
  .join('users', 'commits.submitted_by','=','users.id')
  .select(['first_name', 'last_name', 'project_id', 'widget_url','submitted_by', 'is_master', 'sc_username','commit_comment'])
  .then(function(commits){
    res.send(commits);
  });
});
router.post('/', function(req, res, next){
    try{
    let token = req.cookies.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4'
    jwt.verify(token, secret, function(err, userInfo){
      if(err){
        res.send('you do not have access');
      }else{
      let needed = {
        project_owner: userInfo.id,
        project_title: req.body.projectTitle,
        project_description: req.body.projectDescription

      }
      knex('projects')
      .insert(needed)
      .returning('*')
      .then(function(added){
        res.send(added);
      });

      }
    });
  }
  catch(err){
  }
});
router.post('/commit', function(req, res, next){
  try{
  let token = req.cookies.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4'
  jwt.verify(token, secret, function(err, userInfo){
    if(err){
      res.send('you do not have access');

    }else{
      var widgeturl = "https://w.soundcloud.com/player/?url=https://soundcloud.com/"
      let needed = {
        project_id: req.body.projectId,
        commit_comment: req.body.comment,
        submitted_by: userInfo.id,
        widget_url: `${widgeturl}${userInfo.sc_username}/${req.body.track}`,
        is_master: req.body.is_master
      }
      if(req.body.is_master == 'true' || req.body.is_master == true){
        knex('commits')
        .update('is_master', false)
        .where('project_id', req.body.projectId)
        .where('is_master', true)
        .returning('*')
        .then(function(updated){
          knex('commits')
          .insert(needed)
          .returning('*')
          .then(function(addedCommit){
            knex('commits')
            .where('project_id', req.body.projectId)
            .join('users', 'commits.submitted_by','=','users.id')
            .select(['first_name', 'last_name', 'project_id', 'widget_url','submitted_by', 'is_master', 'sc_username','commit_comment'])
            .then(function(commits){
              res.send(commits);
            });
          });
        });
      }else{
        knex('commits')
        .insert(needed)
        .returning('*')
        .then(function(addedCommit){
          knex('commits')
          .where('project_id', req.body.projectId)
          .join('users', 'commits.submitted_by','=','users.id')
          .select(['first_name', 'last_name', 'project_id', 'widget_url','submitted_by', 'is_master', 'sc_username','commit_comment'])
          .then(function(commits){
            res.send(commits);
          });
        });
      }
    }
  });
  }
    catch(err){
    }

});
router.patch('/', function(req,res,next){
  try{
      let token = req.cookies.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4'
      jwt.verify(token, secret, function(err, userInfo){
        if (err){
          res.send('You do not have permission to be here')
        }else{
          let id = req.body.projectId;
          delete req.body.projectId;
          knex('projects')
          .update(req.body)
          .where('id', id)
          .returning('*')
          .then(function(changed){
            knex('projects')
            .where('project_owner', userInfo.id)
            .then(function(projects){
              res.send(projects);
            });
          })
        }
      });
  }catch(err){}
});
router.delete('/', function(req, res, next){
  try{

    let token = req.cookies.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6Ik1hdHQiLCJsYXN0X25hbWUiOiJIdW1tZXIiLCJlbWFpbCI6ImNhdHNAY2F0cy5jb20iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmEkMDgkS2I3SnpDaEppQnY5ZGU2dDlOQjZWLlFLaS53ODdXRC8zZ3YzUHhFSDRpQUtyTk5oYkxialciLCJzY191c2VybmFtZSI6ImhlbGxvd29ybGRoZWxsbyIsImlhdCI6MTQ5NzQ2ODk1NH0.AUK0W_XMuLkhOqldmd9yE_PL3ZFxRpC0gDrrkpVHAq4'
    jwt.verify(token, secret, function(err, userInfo){
      if (err){
        res.send('you do not have permission')
      }else{
          knex('projects')
          .del()
          .where('id', req.body.projectId)
          .then(function(){
            knex('projects')
            .where('project_owner', userInfo.id)
            .then(function(projects){
              res.send(projects);
            });
          });
      }

    });

  }catch(err){
  }

});
router.delete('/commit', function(req, res, next){
  knex('commits')
  .del()
  .where('id', req.body.commit_id)
  .then(function(){
    knex('commits')
    .where('project_id', req.body.project_id)
    .join('users', 'commits.submitted_by','=','users.id')
    .select(['first_name', 'last_name', 'project_id', 'widget_url','submitted_by', 'is_master', 'sc_username','commit_comment'])
    .then(function(commits){
      res.send(commits);
    });
  });
});



module.exports = router;
