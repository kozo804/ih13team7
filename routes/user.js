var express = require('express');
var router = express.Router();
const Users = require('../models/t01_users');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('user_login')
});

router.get('/top', function (req, res, next) {
  res.render('user_top')
});

router.get('/car', function (req, res, next) {

});

router.get('/car/:car_id', function (req, res, next) {

});

router.get('/auction', function (req, res, next) {

});

router.get('/auction/:auction_id', function (req, res, next) {

});

router.get('/auction/:auction_id/bit', function (req, res, next) {
  // オークションの詳細を撮ってくる処理

  // とりあえず仮置き
  let endDate = new Date('2020-12-21T01:04:00').toString();
  console.log(endDate);
  // 
  const auction_id = req.params.auction_id;
  res.render(
    'user_auction_auctionid_bit',
    {
      auction_id: auction_id,
      end_date: endDate
    }
  );
})

router.post('/login', function (req, res, next) {
  Users.users.findOne({ name: req.body.user_id, password: req.body.password })
    .then(function (result) {
      res.status = 200
      res.send(result)
    }).catch(function (err) {
      console.log(err);
      res.status = 500
      res.send()
    });
});

module.exports = router;
