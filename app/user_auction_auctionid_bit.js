'use strict';
import Vue from 'vue';
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io('http://localhost:9000');
const user_auction_auctionid_bit = new Vue({
  el: '#wrapper',
  data: {
    values: '',
    bit_price: document.getElementsByName("start_price")[0].value,
    now_price: document.getElementsByName("start_price")[0].value,
    auction_id: document.getElementsByName("auction_id")[0].value,
    now_date: new Date(),
    end_date: new Date(document.getElementsByName("end_date")[0].value),
    car_id: document.getElementsByName("car_id")[0].value,
    user_id: document.getElementsByName("user_id")[0].value,
    user_name: document.getElementsByName("user_name")[0].value,
    history: '',
    no: document.getElementsByName("no")[0].value,
  },
  methods: {
    // 入札ボタンを押したときの処理
    bit: function () {
      this.now_price = this.bit_price;
      const bit_data = {
        car_id: this.car_id,
        user_id: this.user_id,
        user_name: this.user_name,
        price: parseInt(this.bit_price) * 1000,
        date: new Date(Date.now())
      };
      socket.emit('bit', bit_data);
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
        if (hour > 0) {
          remaining += hour + ':';
        }
        remaining += minute + ':';
        remaining += second;
      }
      else {
        remaining = "終了";
        // 終了時にリロードする処理
        let url = `/user/auction/${this.auction_id}/bit/${this.car_id}?no=${this.no}`;
        // window.location.href = url;
      }
      return remaining;
    }

  },
  mounted() {
    // ルームに参加
    const self = this;
    socket.emit("join_room", this.car_id);
    socket.on("bit_broadcast", function (bited_price) {
      self.now_price = bited_price / 1000;
      self.bit_price = self.now_price;
    });
    this.countdown();
    this.leave();
    socket.emit('sync', this.car_id);
    socket.on('sync_result', function (result) {
      console.log(result);
      if (result.length >= 1) {
        self.history = result.reverse();
        self.now_price = parseInt(result[0].price) / 1000;
        self.bit_price = parseInt(self.now_price) + 1;
      }
    });
    socket.on('bit_history', function(result) {
      console.log("history" + result);
      self.history = result.reverse();
    });
  }
});
