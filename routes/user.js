var express = require('express');
const passport = require('passport');
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

router.get('/auction/:auction_id/bit/:car_id', function (req, res, next) {
  let auction_id;
  let user_info;
  let car_id;
  try {
    auction_id = req.params.auction_id;
    user_info = req.session.passport.user[0];
    car_id = req.parems.car_id;
  } catch (e) {
    console.log(e);
    res.redirect('/test'); //loginページに変える
    return;
  }
  /**
   * [
      {
        _id: '5ffd51cad1b125039690fcbf',
        name: 'test',
        email: 'test@gmail.com',
        tel: '12345',
        password: '12345',
        __v: 0
      }
    ]
   */

  // オークションの詳細を取ってくる処理
  // とりあえず仮置き
  let endDate = new Date('2021-01-14T16:00:00').toString();
  // console.log(endDate);
  // 
  
  // 車の開始価格を取ってくる処理

  res.render(
    'user_auction_auctionid_bit',
    {
      auction_id: auction_id,
      car_id: '2',//仮置き
      end_date: endDate,
      user_id: user_info._id,
      user_name: user_info.name
    }
  );
})

module.exports = router;
