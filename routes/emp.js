var express = require('express');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car');
var employeeModel = require('../models/t04_Employees');
var multer = require('multer');
var upload = multer({
  dist: '/public/images/',
  // rename: function (fieldname, filename) {
  //   console.log("multer rename function: fieldname" + fieldname);
  //   console.log("multer rename function: filename" + filename);
  //   return `emp_`;
  // },
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

});

router.get('/car', function (req, res, next) {

});

router.get('/car/regist', function (req, res, next) {
  req.session.car_info = "";
  res.render('emp_car_regist');
});

router.post('/car/confirm', upload.array('file'), function (req, res, next) {
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
  console.log(req.files);
  // 写真の処理を追加する予定

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
  const car = new carModel.car({
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
router.get('/emp_car',(req,res,next)=>{
  res.render('emp_car.ejs');

})
module.exports = router;
