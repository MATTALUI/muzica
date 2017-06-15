'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', function(req,res,next){
  res.send('get permissions')
});







module.exports = router;
