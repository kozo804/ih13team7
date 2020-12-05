'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
import resetScss from './scss/_reset.scss';
import './scss/_reset.scss';

Vue.config.productionTip = false;

Vue.mixin(resetScss);
Vue.mixin(axiosBase);

Vue.component('emp-car', require('./components/EmpCar').default);

// const EnpReistCar = new Vue({
//   el: '#wrapper'
// });
const EmpCars = new Vue({
      el: '#wrapper'
});