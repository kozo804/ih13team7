const { render } = require('ejs');
var express = require('express');
const { Result } = require('postcss');
var router = express.Router();
var con = require('../models/mongoose-loader');
var carModel = require('../models/t03_car').car;
var employeeModel = require('../models/t04_Employees');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.get('/login', function (req, res, next) {
});

router.get('/top', function (req, res, next) {

});
//yasuda user_cer.ejs
router.get('/car', function(req, res, next) {
        const db = con.mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function () {
        // we're connected!
        console.log('DB接続中... You can cancel from ctrl + c');
      });

  carModel.find({ status:0 })
  .then((result)=>{
    console.log(result);
    res.render('user_car',{result:JSON.stringify(result)});
  });
});

router.get('/car/:car_id', function (req, res, next) {

});

router.get('/auction', function (req, res, next) {

});

router.get('/auction/:auction_id', async function (req, res, next) {
  let id = req.params['auction_id']
  const Auction = await AuctionModel.findById(id)
  res.render('user_auction.ejs', {Auction:Auction})
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

module.exports = router;
