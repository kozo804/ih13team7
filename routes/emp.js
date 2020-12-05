var express = require('express');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car');
var employeeModel = require('../models/t04_Employees');

/* GET users listing. */
router.get('/top', function(req, res, next) {
  res.render('emp_top');
});

router.get('/login', function(req, res, next) {
  res.render('emp_login');
});

router.post('/login', function(req, res, next) {
  
});

router.get('/car', function(req, res, next) {

});

router.get('/car/regist', function(req, res, next) {
  res.render('emp_car_regist');
});

router.post('/car/confirm', function(req, res, next) {
});

router.post('/car/finish', function(req, res, next) {
  
});
router.get('/emp_car',(req,res,next)=>{
  res.render('emp_car.ejs');

})
module.exports = router;
