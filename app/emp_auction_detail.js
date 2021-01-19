'use strict';
import Vue from 'vue';
import io from 'socket.io-client';
import Axios from 'axios';
// import AxiosBase from './AxiosBase';

Vue.config.productionTip = false;

const socket = io('http://localhost:9000');
const user_auction_auctionid_bit = new Vue({
  el: '.container',
  data: {
    auction_id: document.getElementsByName("auction_id")[0].value,
    now: "",
  },
  methods: {
    start: function () {
      this.now = new Date(Date.now());
      Axios.post(
        `/emp/auction/${this.auction_id}`,
        {
          auction_id: this.auction_id,
          now: this.now,
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    console.log(this.auction_id);
  }
});
