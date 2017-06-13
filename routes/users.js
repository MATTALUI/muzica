'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
// const humps = require('humps');

router.post('/login', (req,res,next)=>{
  res.send(req.body)
});



module.exports = router;
