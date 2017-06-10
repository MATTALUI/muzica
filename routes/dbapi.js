'use strict';
const express = require('express');
const router = express.Router();
// const knex = require('../knex');
// const humps = require('humps');

router.get('/', (req,res,next)=>{
  res.send('get gbapi')
});



module.exports = router;
