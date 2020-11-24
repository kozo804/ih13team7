'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
Vue.mixin(axiosBase);

Vue.component('emp-regist-car', require('./components/EmpRegistCar').default);


const EnpReistCar = new Vue({
  el: '#wrapper'
});
