var express = require('express');
var router = express.Router();
var passport = require('passport');

var con = require('../models/mongoose-loader');
var memberModel = require('../models/t01_users');
var employeeModel = require('../models/t04_Employees');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('test', { title: 'Express' });
});

router.post('/user', function (req, res, next) {
  // mongoに書き込み
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('DB接続中... You can cancel from ctrl + c');
  });

  console.log(memberModel.users);

  const member = new memberModel.users({
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

  res.render('test', { title: 'Express' });
});

router.post('/employee', (req, res, next) => {
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('DB接続中... You can cancel from ctrl + c');
  });
  const employee = new employeeModel.employees({
    name: req.body.name,
    password: req.body.password
  });
  employee.save(function (err, employee) {
    if (err) return console.error(err);
  });
  res.render('test', { title: 'Express' });
});

router.post(
  '/login',
  passport.authenticate('emp_login', { successRedirect: '/', failureRedirect: '/test', session: true }),
  (req, res, next) => {
    const db = con.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('DB接続中... You can cancel from ctrl + c');
    });
    res.render('test', { title: 'Express' });
  });

module.exports = router;
