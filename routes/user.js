var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user/login',(req,res)=>{
  //dataを取得
  //render
  // res.render('user_login',{data:data});
})


module.exports = router;
