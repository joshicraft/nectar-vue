/* eslint-disable camelcase */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuescroll from 'vue-scroll'

import './plugins/gsap'
import device from './plugins/device'
import {Howl} from 'howler'
Vue.use(vuescroll)
Vue.config.productionTip = false
var chirpSound = new Howl({
  src: ['static/sounds/chirp.ogg', 'static/sounds/chirp.mp3']
})
var clickSound = new Howl({
  src: ['static/sounds/click.ogg', 'static/sounds/click.mp3']
})
var errorSound = new Howl({
  src: ['static/sounds/error.ogg', 'static/sounds/error.mp3']
})
var successSound = new Howl({
  src: ['static/sounds/success.ogg', 'static/sounds/success.mp3']
})
Vue.mixin({
  data () {
    return {
      device: device,
      chirpSound: chirpSound,
      clickSound: clickSound,
      successSound: successSound,
      errorSound: errorSound,
      social_media: {
        facebook: {
          title: 'Facebook',
          link: 'https://www.facebook.com/Nectar-Beverages-186910505238446/'
        },
        instagram: {
          title: 'Instagram',
          link: 'https://www.instagram.com/nectarbeverages/'
        }
      },
      contact: [
        {
          name: 'mobile_phone',
          title: 'Phone',
          content: '+640212731902'
        },
        {
          name: 'email',
          title: 'Email',
          content: 'support@nectarbeverages.co.nz'
        }
      ]
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
