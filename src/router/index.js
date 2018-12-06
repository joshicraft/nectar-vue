/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Meta from 'vue-meta'
// import * from '@/components/pages'
import Partners from '@/components/pages/Partners'
import Products from '@/components/pages/Products'
import Contact from '@/components/pages/Contact'
import About from '@/components/pages/About'

Vue.use(Router)
Vue.use(Meta)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/partners',
      name: 'Partners',
      component: Partners
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  TweenMax.killAll()
  console.log('route ')
  new TimelineMax()
    .to('#view', 0.3, {opacity: 0})
    .to(window, 0, {scrollTo: {y: 0}})
    .call(next)
    .to('#view', 0.3, {opacity: 1})
})

export default router
