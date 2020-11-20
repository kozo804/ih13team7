var express = require('express');
var router = express.Router();

var member = require('../models/t01_users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  // mongoに書き込み
  // member.
  var schema = new member();
  schema.name = req.body.name;
  schema.email = req.body.email;
  schema.tel = req.body.tel;
  schema.password = req.body.password;
  
  console.log(req.body.name);
  schema.save();
});

module.exports = router;
