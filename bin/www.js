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
}

/**
 * WebSocket
 */
// ・ソケットのひも付け（listen）
const io = require('socket.io')(server);
const schedule = require("node-schedule");

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
    //ルームIDはサーバー側で生成するようにする
    // とりあえず連番
    room = room_id;
    console.log("room_id: " + room);
    socket.join(room);
  });

  console.info("new connection. sessionId: " + id);
  socket.emit('sync', bets);
  socket.on('c2s', onMessage);

  // jsonを入れると、自動的にJSON.stringfyされる
  // socket.json.emit('send_json', json);

  // to(id)：自分のみ
  let sendId = 'your id is ' + id;
  io.to(socket.id).emit('send_id', sendId);

  // broadcast：自分以外
  sendId = id + 'さんが入室しました';
  socket.broadcast.emit('send_id', sendId);

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
