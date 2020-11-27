'use strict';
import Vue from 'vue';
import axiosBase from './AxiosBase';
import resetScss from './scss/_reset.scss';
// import bootstrapVue from 'bootstrap-vue';
import './scss/_reset.scss';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
// Vue.use(bootstrapVue);

Vue.mixin(resetScss);
Vue.mixin(axiosBase);

Vue.component('emp-regist-car', require('./components/EmpRegistCar').default);

const EnpReistCar = new Vue({
  el: '#wrapper'
});
