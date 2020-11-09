'use strict';
import io from 'socket.io-client';

// setInterval(() => {
//   $.get('/server-status', {}, (data) => {
//     loadavg.text(data.loadavg.toString());
//   });
// }, 10);

const socket = io('http://localhost:3000');
socket.on('server-status', (data) => {
  loadavg.text(data.loadavg.toString());
});
socket.on('connect', () => {
  console.log('接続しました');
});
socket.on('disconnect', () => {
  console.log('切断しました');
});