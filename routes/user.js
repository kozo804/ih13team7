const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car').car;
var employeeModel = require('../models/t04_Employees');

/* GET users listing. */
router.get('/login', function(req, res, next) {
});

router.get('/top', function(req, res, next) {
  
});

router.get('/car', function(req, res, next) {
  carModel.find({ status:0 })
  .then((result)=>{
    console.log(result[0]);
    render('user_car',{result:JSON.stringify(result)})
  })
});

router.get('/car/:car_id', function(req, res, next) {
  
});

router.get('/auction', function(req, res, next) {
  
});

router.get('/auction/:auction_id', function(req, res, next) {
  
});

router.get('/auction/:auction_id/bit', function(req, res, next) {
  res.render('user_auction_auctionid_bit');
})

module.exports = router;
