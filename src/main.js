import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from './elementui'
import "@/assets/font_nslx23r4lvg/iconfont.css"
import "@/assets/css/reset.less"

Vue.use(elementui)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
