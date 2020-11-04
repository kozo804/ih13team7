'use strict';
import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:9000');
console.log(socket);
// socket.on('server-status', (data) => {
//   // console.log(data.loadavg.toString());
//   console.log(data);
// });
socket.on('connect', () => {
  console.log('接続しました');
});
socket.on('disconnect', () => {
  console.log('切断しました');
});

const app1 = new Vue({
  el: '.form1',
  data: {
    message: '',
  },
  methods: {
    send: function() {
      let message = this.message
      console.log(message);
      socket.emit('request_message', message);
    }
  }
});