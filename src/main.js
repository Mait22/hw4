import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)


new Vue({
  router,
  store,

  created () {
    // Store user session data in broser cache
    const userString = sessionStorage.getItem('userData')  

    // If present update Vuex store
    if (userString != undefined || userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }

    // In case of error log user out of system and clear user store
    axios.interceptors.response.use(
      (response) => {return response},
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },

  render: h => h(App)
}).$mount('#app')