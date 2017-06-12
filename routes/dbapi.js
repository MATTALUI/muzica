'use strict';
const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');
// const knex = require('../knex');
// const humps = require('humps');

router.get('/', (req,res,next)=>{
  // res.send('get dbapi')
  https.get('https://www.googleapis.com/drive/v2/files', function(response){
    console.log(response);
    res.send();
  });
});



module.exports = router;
