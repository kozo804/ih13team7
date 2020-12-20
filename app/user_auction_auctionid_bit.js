'use strict';
import Vue from 'vue';
import io from 'socket.io-client';
// import AxiosBase from './AxiosBase';

Vue.config.productionTip = false;

const socket = io('http://localhost:9000');
const user_auction_auctionid_bit = new Vue({
  el: '#wrapper',
  data: {
    values: '',
    bit_price: '',
    now_price: '',
    auction_id: document.getElementsByName("auction_id")[0].value,
    now_date: new Date(),
    end_date: new Date(document.getElementsByName("end_date")[0].value),
  },
  methods: {
    // 入札ボタンを押したときの処理
    bit: function () {
      const price = this.bit_price;
      socket.emit('bit', price);
    },
    // windowを離れたときにsocketを切断するリスナを設定
    leave: function () {
      window.addEventListener('beforeunload', (event) => {
        socket.disconnect();
      });
    },
    countdown: function () {
      let self = this;
      setInterval(function () {
        self.now_date = Date.now();
      }, 250);
    },
  },
  computed: {
    difference: function () {
      return this.end_date - this.now_date;
    },
    timeOut: function () {
      return (this.difference <= 0 ? true : false);
    },
    bit_button: function () {
      return (this.timeOut ? "終了" : "入札する");
    },
    time: function () {
      // var difference = this.end_date - this.now_date;
      let difference = this.difference;
      var remaining = '';
      if (difference >= 0) {
        let hour = Math.floor(difference / (1000 * 60 * 60)).toString();
        difference -= (hour * (1000 * 60 * 60));
        let minute = Math.floor(difference / (1000 * 60)).toString();
        if (minute < 10) {
          minute = minute.padStart(2, '0');
        }
        difference -= (minute * (1000 * 60));
        let second = Math.floor(difference / 1000).toString();
        if (second < 10) {
          second = second.padStart(2, '0');
        }
        if(hour > 0){
          remaining += hour + ':';
        }
        remaining += minute + ':';
        remaining += second;
      }
      else {
        remaining = "終了";
      }
      return remaining;
    }

  },
  mounted() {
    // ルームに参加
    socket.emit("join_room", this.auction_id);
    // console.log(this.bit_button);
    // socket.on('sync', this.receiveMsg);

    // const axios = AxiosBase.axiosBase();
    // axios.get();

    this.countdown();
    this.leave();
  }
});
