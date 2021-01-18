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
  res.render('user_auction.ejs', { auction: Auction })
});

router.get('/auction/:auction_id/bit/:car_id', function (req, res, next) {
  let auction_id;
  let user_info;
  let car_id;
  let no = req.body.no;
  console.log("no" + no);
  try {
    auction_id = req.params.auction_id;
    user_info = req.session.passport.user[0];
    car_id = req.params.car_id;
  } catch (e) {
    console.log(e);
    res.redirect('/test'); //loginページに変える
    return;
  }

  // オークションの詳細を取ってくる処理
  let auction_end_time;
  let auction_start_price;
  let render_state = "yet";
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('DB接続中... You can cancel from ctrl + c');
  });
  const auction_model = AuctionModel.find({ "car_ids.carData._id": car_id });
  auction_model.exec()
    .then(result => {
      // 何台目かでcar_ids[no]の添字が変わるから、その番号を送ってくるようにする
      auction_end_time = new Date(result[0].car_ids[no].carEndtime).toString();

      // オークションが終了しているかどうかチェック
      let now = new Date(Date.now()).toString();
      if (now > auction_end_time) {
        render_state = "finished";
        // 落札状態によって、ページを変える
        const bit_model = bitModel.find({ car_id: car_id });
        bit_model.exec()
          .then(result => {
            let result_length = result.length;
            if (result[result_length - 1].user_id == user_info._id) {
              // 落札している
              render_state = "bided";
              console.log(render_state + " state");
            }
            console.log(render_state);
            if (render_state == "yet") {
              console.log("yet");
              auction_start_price = result[0].car_ids[0].carData.auction_start_price;
            }
            else if (render_state == "finished") {
              console.log("finished");
              res.render("user_auction_finished");
            }
            else {
              console.log("bided");
              res.render("user_auction_bided");
            }
          })
          .catch(err => {
            console.log(err);
          });
          console.log(no);
      }
      else {
        res.render(
          'user_auction_auctionid_bit',
          {
            auction_id: auction_id,
            car_id: car_id,
            auction_end_time: auction_end_time,
            auction_start_price: auction_start_price,
            user_id: user_info._id,
            user_name: user_info.name,
            no: no,
            // user_id: "2",
            // user_name: "test"
          }
        );
      }
    })
    .catch(err => {
      console.log(err);
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
