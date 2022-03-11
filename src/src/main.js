import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VConsole from 'vconsole';
// const vConsole = new VConsole();

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
import VueSocketIO from 'vue-socket.io'
// Vue.use(vConsole)
Vue.use(ElementUI);

Vue.use(new VueSocketIO({
  debug: false,
  autoConnect: false,
  connection: 'http://172.18.26.74:3000',
  options: {
    timeout: 2000, // 在触发connect_error 或 connect_timeout之前的超时时间
    reconnectionDelayMax: 1000, // 重新连接等待时间
    reconnectionAttempts: 3 // 重试连接次数
  },
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
  // options: { path: '/my-app/' } // Optional option
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
