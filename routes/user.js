var express = require('express');
const { Result } = require('postcss');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car').car;
var employeeModel = require('../models/t04_Employees');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//yasuda user_cer.ejs
router.get('/car', function (req, res, next) {

  carModel.find({ status: 0 })
    .then((result) => {
      console.log(result[0]);

      //レンダリングしている
      res.render('user_car', { result: JSON.stringify(result) });
    })


});

module.exports = router;
