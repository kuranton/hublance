import Vue from "vue";
import Axios from "axios";
import Vuebar from "vuebar";
import VueAgile from 'vue-agile'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(Vuebar);
Vue.use(VueAgile);

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
