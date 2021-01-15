#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('ix13team7:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('listening post ' + port);
  let nowDate = new Date().toString();
  console.log('Now Date: ' + nowDate);
}

/**
 * WebSocket
 */
// ・ソケットのひも付け（listen）
const io = require('socket.io')(server);
const schedule = require("node-schedule");
const con = require('../models/mongoose-loader');
// const Users = require('./models/t01_users').users;
const bitHistory = require('../models/t05_bit_history').bitHistory;

var bets = Array();
var room_id = 0;
/**
 * websocketで入札を受信したときの処理
 * @param bet
 */
function onBet(bet) {
  console.log("bet: " + bet);
  bets.push(bet);
  io.emit('s2c', bets);
}

/**
 * wobsocketに接続したときの処理
 * @param socket 
 */
function onConnection(socket) {
  let id = socket.id;

  // ルームに参加する処理
  socket.on("join_room", function (data) {
    console.log("room_id: " + data);
    socket.join(data);
  });

  console.info("new connection. sessionId: " + id);
  // socket.emit('sync', bets);
  // socket.on('c2s', onMessage);

  // jsonを入れると、自動的にJSON.stringfyされる
  // socket.json.emit('send_json', json);

  // to(id)：自分のみ
  // let send_id = 'your id is ' + id;
  // io.to(socket.id).emit('send_id', send_id);

  // broadcast：自分以外
  // send_id = id + 'さんが入室しました';
  // socket.broadcast.emit('send_id', send_id);

  socket.on("bit", function (bit_data) {
    // dbに登録する処理
    const db = con.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('DB接続中... You can cancel from ctrl + c');
    });
    const bit_history = new bitHistory({
      car_id: bit_data.car_id,
      user_id: bit_data.user_id,
      user_name: bit_data.user_name,
      price: bit_data.price
    });
    bit_history.save()
      .then(result => {
        console.log(result);
        socket.broadcast.emit('bit_broadcast', result.price);
      })
      .catch(err => {
        console.log(err);
        return;
      });


    // dbから取得する処理
  });

  socket.on("sync", function (car_id) {
    const db = con.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('DB接続中... You can cancel from ctrl + c');
    });
    bitHistory.find({car_id: car_id})
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      return;
    });
  });

  // 切断時の処理
  socket.on('disconnect', function () {
    console.log(id + ' disconnect');
    let message = id + 'さんが退室しました';
    socket.broadcast.emit('leave', message);
  });
  socket.on('error', (error) => { console.error(error); });
}

io.on('connection', onConnection);
// 予定時刻にwebsocketを実行する
// とりあえず6時間おきに実行する
// const interval = 60 * 60 * 5;
// setInterval(function() {
//   // DBから一番近いオークションの開始日時を取得する処理を追加する
//   var date = new Date();
//   var job = schedule.scheduleJob(date, function () {
//     setInterval(function() {
//       io.on('connection', onConnection);
//     }, 6000);
//   });
// }, interval);
