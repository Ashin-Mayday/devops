import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import * as api from '@/config/api'

Vue.use(CKEditor)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
