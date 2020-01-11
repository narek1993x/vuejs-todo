import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import {
  store
} from './store'
import router from './router'
import FirebaseConfig from '../config/config.json'
import Loading from '@/components/Loading'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    error: '#DD2C00',
    primary: '#009688'
  }
})
Vue.component('app-loading', Loading)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp(FirebaseConfig)
  }
})
