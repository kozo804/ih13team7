'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
import axios from 'axios'
Vue.config.productionTip = false;

const AuctionResist = new Vue({
  el: '#wrapper',
  data: {
    maker: '',
    auctionName: 'カーオークション',
    startTime: '',
    checkCars: []
  },
  methods:{
    onFormSubmit: async function () {
        // console.log(this.maker)
        console.log(this.auctionName);
        console.log(this.startTime);
        console.log(this.checkCars);
        const data = { 
            auctionName : this.auctionName, 
            startTime : this.startTime,
            checkCars: this.checkCars
         };
        await axios.post('/emp/auction/confirm', data)
    }
  },
  mounted () {
    this.startTime = new Date()
    console.log(this.maker)
  }
});

