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

router.post(
  '/login',
  passport.authenticate('user_login', { successRedirect: '/user/top', failureRedirect: '/user/login', session: true }),
  function(req, res, next) {
    console.log(req.body);
  }
);

router.get('/top', function (req, res, next) {
  res.render('user_top')
});

router.get('/car', function (req, res, next) {
  carModel.find({ status: 0 })
    .then((result) => {
      console.log(result[0]);
      res.render('user_car', { cars: result })
    })
});


router.get('/car/:car_id', async function (req, res, next) {
  console.log(req.params['car_id'])
  const carData = await carModel.find({ _id: req.params['car_id'] })
  console.log(carData);
  res.render('user_car_detail.ejs', { carData: carData })
});

router.get('/auction', function (req, res, next) {
  // DBからオークション履歴と今後のスケジュール取得
  let history = {};
  let schedule = {};
  const nowTime = new Date().getTime();
  console.log(nowTime);

  AuctionModel.find({ end_time: { $lt: nowTime } }, {}, { sort: { start_time: 1 }, limit: 6 }, function (err, result) {  //{end_time: {$gt: nowTime}},
    if (err) return console.log(err);
    for (let i = 0; i < result.length; i++) {
      let stime = new Date(result[i].start_time);
      let etime = new Date(result[i].end_time);
      let sstime = ('0' + stime.getHours()).slice(-2) + ":" + ('0' + stime.getMinutes()).slice(-2);
      let eetime = ('0' + etime.getHours()).slice(-2) + ":" + ('0' + etime.getMinutes()).slice(-2);
      let ddate = {
        "month": stime.getMonth() + 1,
        "day": stime.getDate(),
        "stime": sstime,
        "etime": eetime,
      };
      result[i].ddate = ddate;
    }
    history = result;

    AuctionModel.find({ end_time: { $gt: nowTime } }, {}, { sort: { start_time: 1 }, limit: 6 }, function (err, result) {
      if (err) return console.log(err);
      for (let i = 0; i < result.length; i++) {
        let stime = new Date(result[i].start_time);
        let etime = new Date(result[i].end_time);
        let sstime = ('0' + stime.getHours()).slice(-2) + ":" + ('0' + stime.getMinutes()).slice(-2);
        let eetime = ('0' + etime.getHours()).slice(-2) + ":" + ('0' + etime.getMinutes()).slice(-2);
        let ddate = {
          "month": stime.getMonth() + 1,
          "day": stime.getDate(),
          "stime": sstime,
          "etime": eetime,
        };
        result[i].ddate = ddate;
      }
      schedule = result;

      res.render('user_auction', { history: history, schedule: schedule });
    });
  });
});

router.get('/auction/:auction_id', async function (req, res, next) {
  let id = req.params['auction_id']
  const Auction = await AuctionModel.findById(id)
  res.render('user_auction_detail.ejs', { auction: Auction })
});

router.get('/auction/:auction_id/bit/:car_id', function (req, res, next) {
  let auction_id;
  let user_info;
  let car_id;
  let no = req.query.no;
  try {
    auction_id = req.params.auction_id;
    user_info = req.session.passport.user[0];
    car_id = req.params.car_id;
  } catch (e) {
    console.log(e);
    res.redirect('/user/login');
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
    .then(auction_model_result => {
      auction_end_time = new Date(auction_model_result[0].car_ids[no].carEndtime).getTime();

      // オークションが終了しているかどうかチェック
      let now = new Date(Date.now()).getTime();
      console.log("now" + now);
      console.log("auction_end_time" + auction_end_time);
      if (now > auction_end_time) {
        console.log("time over");
        render_state = "finished";
        // 落札状態によって、ページを変える
        const bit_model = bitModel.find({ car_id: car_id });
        bit_model.exec()
          .then(bit_model_result => {
            let result_length = bit_model_result.length;
            console.log(bit_model_result);
            if(bit_model_result.length <= 0) {
              console.log("bit history empty");
              res.render("user_auction_finished");
            }
            else if (bit_model_result[result_length - 1].user_id == user_info._id) {
              // 落札している
              console.log("bided");
              res.render("user_auction_bided");
            }
            else if (render_state == "finished") {
              // 終了している
              console.log("finished");
              res.render("user_auction_finished");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      else {
        console.log("yet");
        carModel.find({ _id: car_id })
          .then(car_model_result => {
            console.log(car_model_result);
            auction_start_price = auction_model_result[0].car_ids[no].carData.auction_start_price;
            res.render(
              'user_auction_auctionid_bit',
              {
                auction_id: auction_id,
                car_info: car_model_result[0],
                car_id: car_id,
                auction_end_time: auction_end_time.toString(),
                auction_start_price: auction_start_price,
                user_id: user_info._id,
                user_name: user_info.name,
                no: parseInt(no + 1),
                // user_id: "2",
                // user_name: "test"
              }
            );
          });
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
