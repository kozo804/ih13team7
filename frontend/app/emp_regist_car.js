'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
// import mixinScss from './scss/_mixin.scss';
import resetScss from './scss/_reset.scss';


// Vue.mixin(mixinScss);
Vue.mixin(resetScss);
Vue.mixin(axiosBase);

Vue.component('emp-regist-car', require('./components/EmpRegistCar').default);

const EnpReistCar = new Vue({
  el: '#wrapper'
});

console.log('tes');