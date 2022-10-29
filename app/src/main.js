import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import router from '@/router'
import API from './api/index'
import {scrollBottom, isMessage} from './tool/tools'

import { Upload, Empty, Message, Select, Option, Checkbox, Autocomplete, Dialog } from 'element-ui';
import 'babel-polyfill'

Vue.component(Upload.name, Upload);
Vue.component(Empty.name, Empty);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(Dialog.name, Dialog);

Vue.prototype.$scrollBottom = scrollBottom
Vue.prototype.$isMessage = isMessage

Vue.prototype.$message = Message
Vue.prototype.$API = API

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 5,
  error: ('@/assets/img-err.jpg'),
  loading: require('@/assets/imgLoad.gif'),
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router
}).$mount('#app')
