import Vue from 'vue'
import App from './App.vue'
import inputKeyboard from './lib/index.js'

Vue.use(inputKeyboard)
new Vue({
  el: '#app',
  render: h => h(App)
})
