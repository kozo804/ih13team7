'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';

Vue.config.productionTip = false;

const EmpCar = new Vue({
  el: '#wrapper',
  data: {
    cars:""
  },
  methods:{
    
  },
  mounted () {
    console.log("aaaaa")
    console.log(this.$refs.cars)
  }
});

