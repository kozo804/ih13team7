var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
});

router.get('/top', function (req, res, next) {

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
  let endDate = new Date('2020-12-17T18:30:00').toString();
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

module.exports = router;
