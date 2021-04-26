import { createApp } from 'vue'
// import Vuelidate from 'vuelidate'
// import Vuelidate from '@vuelidate/core'
// import { VuelidatePlugin } from 'vuelidate'
// import useVuelidate from '@vuelidate/core' // ustnovim iz Interneta i sohranim 4erez "npm install --save vuelidate", vnizu propiwem use(Vuelidate).
// import { VuelidatePlugin } from '@vuelidate/core'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin' // sami napisali plugin dlja vivodov soobwenij
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'materialize-css/dist/js/materialize.min'

const firebaseConfig = { // vzjali iz generated Firebase
  apiKey: 'AIzaSyAShpnJvKbfZh7hp4cOEVrtNoUm_gbfzTA',
  authDomain: 'crm2-cb793.firebaseapp.com',
  projectId: 'crm2-cb793',
  storageBucket: 'crm2-cb793.appspot.com',
  messagingSenderId: '503307632931',
  appId: '1:503307632931:web:08df044db47cb789b84c96',
  measurementId: 'G-392ELGMZD1'
}
firebase.initializeApp(firebaseConfig)

let appi
firebase.auth().onAuthStateChanged(() => { // esli avtorizacija proizoidet, to tolko togda zapuskajetsja app
  if (!appi) { // esli ranwe appi ne bil sozdan, t.e. ego ranwe ne risovali, to teper zapustim
    createApp(App).use(store).use(router).use(messagePlugin).mount('#app')
  }
})
