  var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
});
router.get('/emp_car',(req,res,next)=>{
  res.render('emp_car.ejs');

})
module.exports = router;
