const { render } = require('ejs');
var express = require('express');
const passport = require('passport');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car').car;
var AuctionModel = require('../models/t02_auction').Auction;
var employeeModel = require('../models/t04_Employees').employees;
var bitModel = require('../models/t05_bit_history').bitHistory;

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('user_login')
});

router.get('/top', function (req, res, next) {
  res.render('user_top')
});

router.get('/car', function (req, res, next) {
  carModel.find({ status: 0 })
    .then((result) => {
      console.log(result[0]);
      res.render('user_car', { result: JSON.stringify(result) })
    })
});


router.get('/car/:car_id', async function (req, res, next) {
  console.log(req.params['car_id'])
  const carData = await carModel.find({ _id: req.params['car_id'] })
  res.render('user_car_detail.ejs', { carData: carData })
});

router.get('/auction', function (req, res, next) {

});

router.get('/auction/:auction_id', async function (req, res, next) {
  let id = req.params['auction_id']
  const Auction = await AuctionModel.findById(id)
  res.render('user_auction.ejs', { Auction: Auction })
});

router.get('/auction/:auction_id/bit/:car_id', function (req, res, next) {
  let auction_id;
  let user_info;
  let car_id;
  try {
    auction_id = req.params.auction_id;
    user_info = req.session.passport.user[0];
    car_id = req.params.car_id;
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
  let auction_end_time;
  let auction_start_price;
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('DB接続中... You can cancel from ctrl + c');
  });
  const auction_model = AuctionModel.find({ "car_ids.carData._id": car_id });
  auction_model.exec()
    .then(result => {
      // 何台目かでcar_ids[no]の添字が変わるから、その番号を送ってくるようにする
      auction_end_time = new Date(result[0].car_ids[0].carEndtime).toString();
      // とりあえず仮置き
      // const auction_end_time = new Date('2021-01-15T19:00:00').toString();
      // console.log(endDate);
      // 

      // オークションが終了しているかどうかチェック
      let now = new Date(Date.now()).toString();
      if (now > auction_end_time) {
        console.log('over');
        // 落札状態によって、ページを変える
        console.log(car_id);
        console.log(user_info._id);
        const bit_model = bitModel.find({ car_id: car_id });
        bit_model.exec()
          .then(result => {
            let result_length = result.length;
            if (result[result_length - 1].user_id == user_info._id) {
              // 落札している
              res.render("user_auction_bided");
            }
            res.render("user_auction_finished");
          })
          .catch(err => {
            console.log(err);
          });
      }
      
      auction_start_price = result[0].car_ids[0].carData.auction_start_price;
    })
    .catch(err => {
      console.log(err);
    })
    .then(function () {
      res.render(
        'user_auction_auctionid_bit',
        {
          auction_id: auction_id,
          car_id: car_id,
          auction_end_time: auction_end_time,
          user_id: user_info._id,
          user_name: user_info.name
        }
      );
    })
});

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
