var express = require('express');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car').car;
var AuctionModel = require('../models/t02_auction').Auction;
var employeeModel = require('../models/t04_Employees');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    console.log(req.file);
    cd(null, '/public/images/')
  },
  filename: function (req, file, cd) {
    cd(null, `emp_${Date.now()}`)
  }
})

var upload = multer({
  storage: storage,
  onFileUploadStart: function (file, req, res) {
    console.log(file.fieldname + ' is starting ...')
  },
  onFileUploadData: function (file, data, req, res) {
    //dataはBufferオブジェクト。何も指定しないとutf-8でデコードされます。
    console.log(data.toString());
  },
  onFileUploadComplete: function (file, req, res) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  },
  onError: function (error, next) {
    console.error(error);
    next(error);
  }
})


/* GET users listing. */
router.get('/top', function (req, res, next) {
  res.render('emp_top');
});

router.get('/login', function (req, res, next) {
  res.render('emp_login');
});

router.post('/login', function (req, res, next) {
  try {
    employeeModel.employees.find({ name: req.body.emp_id, password: req.body.password })
      .then(function (result) {
        console.log('result', result)
        res.status = 200
        res.send(result)
      }).catch(function (err) {
        console.log(err);
        res.status = 500
        res.send()
      });
  } catch (e) {
    console.log(e)
  }
});

router.get('/car', async function (req, res, next) {
  const result = await carModel.find({ status: 0 })
  res.render('emp_car', { result: result });

});

router.get('/car/regist', function (req, res, next) {
  req.session.car_info = "";
  res.render('emp_car_regist');
});

router.post('/car/confirm', upload.array('car_picture'), function (req, res, next) {
  const car_info = {
    maker: req.body.maker,
    car_name: req.body.car_name,
    grade: req.body.grade,
    shape: req.body.shape,
    registed_model_year: req.body.registed_model_year,
    model_year: req.body.model_year,
    inspection: req.body.inspection,
    model: req.body.model,
    mission: req.body.mission,
    fuel: req.body.fuel,
    outer_color: req.body.outer_color,
    inner_color: req.body.inner_color,
    engine_size: req.body.engine_size,
    mileage: req.body.mileage,
    car_history: req.body.car_history,
    undercarriage_number: req.body.undercarriage_number,
    NOX: req.body.NOX,
    owner: req.body.owner,
    door: req.body.door,
    riding_capacity: req.body.riding_capacity,
    handle: req.body.handle,
    meter_exchange_history: req.body.meter_exchange_history,
    color_change: req.body.color_change,
    in_room_sheet: req.body.in_room_sheet,
    recycleing_amount: req.body.recycleing_amount,
    air_conditioning: req.body.air_conditioning,
    powor_window: req.body.powor_window,
    powor_steering: req.body.powor_steering,
    sunroof: req.body.sunroof,
    leather_seet: req.body.leather_seet,
    airbag: req.body.airbag,
    aliminium_foil: req.body.aliminium_foil,
    navigation: req.body.navigation,
    warranty: req.body.warranty,
    guide: req.body.guide,
    auction_desired_price: req.body.auction_desired_price,
    auction_start_price: req.body.auction_start_price,
    evaluation_point: req.body.evaluation_point,
    interior_point: req.body.interior_point,
    exterior_point: req.body.exterior_point,
    considerations: req.body.considerations,
    sales_point: req.body.sales_point,
    entries_field: req.body.entries_field,
    comment: req.body.comment,
  }
  // console.log(req.files);

  req.session.car_info = car_info;

  res.render('emp_car_confirm', { car_info: car_info });
});

router.post('/car/finish', function (req, res, next) {
  const db = con.mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('DB接続中... You can cancel from ctrl + c');
  });

  // DBに保存
  const car_info = req.session.car_info;

  console.log(car_info);
  const car = new carModel({

    maker: car_info.maker,
    car_name: car_info.car_name,
    grade: car_info.grade,
    shape: car_info.shape,
    registed_model_year: car_info.registed_model_year,
    model_year: car_info.model_year,
    inspection: car_info.inspection,
    model: car_info.model,
    mission: car_info.mission,
    fuel: car_info.fuel,
    outer_color: car_info.outer_color,
    inner_color: car_info.inner_color,
    engine_size: car_info.engine_size,
    mileage: car_info.mileage,
    car_history: car_info.car_history,
    undercarriage_number: car_info.undercarriage_number,
    NOX: car_info.NOX,
    owner: car_info.owner,
    door: car_info.door,
    riding_capacity: car_info.riding_capacity,
    handle: car_info.handle,
    meter_exchange_history: car_info.meter_exchange_history,
    color_change: car_info.color_change,
    in_room_sheet: car_info.in_room_sheet,
    recycleing_amount: car_info.recycleing_amount,
    air_conditioning: car_info.air_conditioning,
    powor_window: car_info.powor_window,
    powor_steering: car_info.powor_steering,
    sunroof: car_info.sunroof,
    leather_seet: car_info.leather_seet,
    airbag: car_info.airbag,
    aliminium_foil: car_info.aliminium_foil,
    navigation: car_info.navigation,
    warranty: car_info.warranty,
    guide: car_info.guide,
    auction_desired_price: car_info.auction_desired_price,
    auction_start_price: car_info.auction_start_price,
    evaluation_point: car_info.evaluation_point,
    interior_point: car_info.interior_point,
    exterior_point: car_info.exterior_point,
    considerations: car_info.considerations,
    sales_point: car_info.sales_point,
    entries_field: car_info.entries_field,
    comment: car_info.comment,
  });
  car.save()
    .catch((err) => {
      console.error(err);
      return next(err);
    });

  // sessionクリア
  req.session.car_info = '';

  res.render('emp_car_finish');
});

router.get('/auction', (req, res, next) => {
  // DBからオークション履歴と今後のスケジュール取得
  let history = {};
  let schedule = {};
  const nowTime = new Date().getTime();
  // console.log(nowTime);
  
  AuctionModel.find({end_time: {$lt: nowTime}}, {}, {sort: {start_time: 1}, limit: 6}, function (err, result){  //{end_time: {$gt: nowTime}},
    if (err) return console.log(err);
    for (let i = 0; i < result.length; i++) {
      let stime = new Date(result[i].start_time);
      let etime = new Date(result[i].end_time);
      let sstime = ('0' + stime.getHours()).slice(-2) + ":" + ('0' + stime.getMinutes()).slice(-2);
      let eetime = ('0' + etime.getHours()).slice(-2) + ":" + ('0' + etime.getMinutes()).slice(-2);
      let ddate = {
        "month": stime.getMonth() + 1,
        "day": stime.getDay(),
        "stime": sstime,
        "etime": eetime,
      };
      result[i].ddate = ddate;
    }
    history = result;
    
    AuctionModel.find({end_time: {$gt: nowTime}}, {}, {sort: {start_time: 1}, limit: 6}, function(err,result){
      if (err) return console.log(err);
      for (let i = 0; i < result.length; i++) {
        let stime = new Date(result[i].start_time);
        let etime = new Date(result[i].end_time);
        let sstime = ('0' + stime.getHours()).slice(-2) + ":" + ('0' + stime.getMinutes()).slice(-2);
        let eetime = ('0' + etime.getHours()).slice(-2) + ":" + ('0' + etime.getMinutes()).slice(-2);
        let ddate = {
          "month": stime.getMonth() + 1,
          "day": stime.getDay(),
          "stime": sstime,
          "etime": eetime,
        };
        result[i].ddate = ddate;
      }
      schedule = result;

      res.render('emp_auction', {history: history, schedule: schedule});
    });

    // console.log(history);
    
  });
  
});

router.get('/auction/regist', async (req, res, next) => {
  const cars = await carModel.find({ status: 0 });

  res.render('emp_auction_regist.ejs', { cars: cars });
});


router.post('/auction/confirm', async (req, res, next) => {
  console.log(req.body)
  let str = req.body.year + ' ' + req.body.month + ' ' + req.body.date + ',' + req.body.auction_start_time;
  console.log(str);
  let date = new Date(str);
  console.log(date.getTime());
  const auction = {
    auction_name: req.body.auction_name,
    start_time: +date.getTime(),
    end_time: +date.getTime() + 30 * req.body.defaultCheck1.length * 1000,
    // rep_id: Number,
    car_count: req.body.defaultCheck1.length,
    car_ids: []
  }
  for (let i = 0; i < req.body.defaultCheck1.length; i++) {
    let car = await carModel.find({ _id: req.body.defaultCheck1[i] });
    auction.car_ids[i] = {
      carEndtime: auction.start_time + 30 * i * 1000,
      carData: car[0]
    }
  }
  console.log(auction)
  req.session.auction = auction;
  res.render('emp_auction_confirm.ejs', { auction: auction });
});

router.get('/auction/finsh', async (req, res, next) => {

  const auction_data = req.session.auction
  console.log('auction_data', auction_data)
  const auction_res = await AuctionModel.create(auction_data)
  console.log('auction_res', auction_res)
  res.render('emp_acution_finish.ejs', { auction_res: auction_res })
})

router.get('/auction/:auction_id', (req,res,next)=>{
  AuctionModel.findOne({"_id": req.params.auction_id}, function (err, result){
    // console.log(result);
    // console.log(result.car_ids[0]);
    let stime = new Date(result.start_time);
    let sstime = ('0' + (stime.getMonth() + 1)).slice(-2) + "/" + ('0' + stime.getDate()).slice(-2) + " " + ('0' + stime.getHours()).slice(-2) + ":" + ('0' + stime.getMinutes()).slice(-2);
    let etime = new Date(result.end_time);
    let eetime = etime.getHours() + ":" + etime.getDate();
    result.data = {
      "stime": sstime,
      "etime": eetime
    };
    console.log("result.data.stime: "+result.data.stime);
    res.render('emp_auction_detail', {auction: result});
  });
});

// router.post('/auction/:auction_id', (req, res, next)=>{
//   console.log(req.params.auction_id);
//   console.log(req.body.auction_id);
//   let auctionId = req.body.auction_id;
//   let nowTime = new Date().getTime();
//   AuctionModel.update({_id: auctionId}, {$set: {start_time: nowTime}});

//   AuctionModel.findOne({_id: auctionId}, function(err, result){
//     if (err) return console.log(err);
//     // console.log(result);
//     // console.log(result.car_ids[0].carEndtime);
//     for (var i=0; i<result.car_ids.length; i++){
//       result.car_ids[i].carEndtime = nowTime + 30 * 1000 * i;
//     }
//     result.end_time = result.car_ids[result.car_count-1].carEndtime;
//     res.render('emp_auction_detail', {auction: result});
//   });
// });

module.exports = router;
