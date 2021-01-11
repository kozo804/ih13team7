'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
import axios from 'axios'
Vue.config.productionTip = false;

const EmpCar = new Vue({
  el: '#wrapper',
  data: {
    cars:"",
    imgSrc:""
  },
  methods:{
    
  },
  mounted () {
    axios.get('https://api.thecatapi.com/v1/images/search?limt=1').then(res => {
      console.log(res.data[0].url)
      this.imgSrc = res.data[0].url
      return res.data[0].url
    })
    console.log("aaaaa")
    this.cars = JSON.parse(this.$refs.cars.value)
    console.log(this.cars)
  }
});

