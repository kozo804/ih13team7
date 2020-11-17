var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  // mongoに書き込み
});

module.exports = router;
