var express = require('express');
var router = express.Router();

var con = require('../models/mongoose-loader');
var memberModel = require('../models/t01_users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  // mongoに書き込み
  // member.
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log('DB接続中... You can cancel from ctrl + c');
  });

  const member = new memberModel.Member({
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    password: req.body.password
  });
  
  console.log('req.body.name : ' + req.body.name);
  console.log('member.name : ' + member.name);

  member.save(function (err, member) {
    if (err) return console.error(err);
    // member.speak();
  });

  res.render('test', { title: 'Express'});
});

module.exports = router;
