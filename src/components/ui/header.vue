<template>
  <header>
    <div class="wrapper">
      <div class="-menu-icon menu-icon">
        <svg viewBox="0 0 512 512">
          <path
            d="M194.5,40.75H502v61.5H194.5V40.75z M194.5,225.25H502v61.5H194.5V225.25z M194.5,409.75H502v61.5H194.5V409.75z   M10,71.5C10,37.536,37.537,10,71.5,10c33.964,0,61.5,27.536,61.5,61.5S105.464,133,71.5,133C37.537,133,10,105.464,10,71.5z   M10,256c0-33.964,27.537-61.5,61.5-61.5c33.964,0,61.5,27.536,61.5,61.5c0,33.963-27.536,61.5-61.5,61.5  C37.537,317.5,10,289.963,10,256z M10,440.5c0-33.963,27.537-61.5,61.5-61.5c33.964,0,61.5,27.537,61.5,61.5S105.464,502,71.5,502  C37.537,502,10,474.463,10,440.5z"></path>
        </svg>
      </div>
      <div class="page-icons">
        <router-link class="-menu-icon home-icon" to="/">
        <div class="-icon-name _flex_v_h"><p>HOME</p></div>
        <svg viewBox="0 0 512 512">
          <path class="-svg-outer-line" display="inline"
                d="M508.749,473.75c0,19.25-15.75,35-35,35H38.25c-19.25,0-35-15.75-35-35V38.25c0-19.25,15.75-35,35-35   h435.499c19.25,0,35,15.75,35,35V473.75z"></path>
          <path fill="#FFFFFF"
                d="M489.814,292.533l-87.68-87.68V73.332h-58.454v73.067L256,58.719L22.185,292.533v14.614h58.454  v146.134h146.134v-87.681h58.454v87.681h146.135V307.147h58.453V292.533z"></path>
        </svg>
      </router-link>
      <router-link class="-menu-icon about-icon" to="/about">
        <div class="-icon-name _flex_v_h">
          <p>ABOUT</p>
        </div>
        <svg viewBox="0 0 512 512">
          <path class="-svg-outer-line" display="inline"
                d="M508.749,473.75c0,19.25-15.75,35-35,35H38.25c-19.25,0-35-15.75-35-35V38.25c0-19.25,15.75-35,35-35   h435.499c19.25,0,35,15.75,35,35V473.75z"></path>
          <g>
            <path fill="#FFFFFF"
                  d="M255.939,243.218c34.598,0,62.41-27.972,62.41-62.349c0.04-34.478-27.812-62.369-62.41-62.369   c-34.357,0-62.249,27.892-62.249,62.369C193.69,215.287,221.583,243.218,255.939,243.218z"></path>
            <path fill="#FFFFFF"
                  d="M305.999,253.379H206.04c-17.872,0-32.51,16.386-32.51,36.485v100.402c0,1.104,0.562,2.088,0.623,3.232   h163.674c0.119-1.144,0.583-2.128,0.583-3.232V289.864C338.469,269.765,323.83,253.379,305.999,253.379z"></path>
            <path fill="#FFFFFF"
                  d="M423.81,272.978c27.771,0,50.04-22.349,50.04-49.959c0-27.611-22.269-50-50.04-50   c-27.569,0-49.879,22.389-49.879,50C373.871,250.608,396.241,272.978,423.81,272.978z"></path>
            <path fill="#FFFFFF"
                  d="M463.95,281.13h-80.1c-14.378,0-26.125,13.132-26.125,29.297v80.442c0,0.863,0.422,1.687,0.482,2.631   h131.285c0.06-0.944,0.461-1.768,0.461-2.631v-80.442C490.016,294.262,478.288,281.13,463.95,281.13z"></path>
            <path fill="#FFFFFF"
                  d="M88.149,272.978c27.73,0,50.02-22.349,50.02-49.959c0-27.611-22.29-50-50.02-50   c-27.59,0-49.899,22.389-49.899,50C38.25,250.628,60.559,272.978,88.149,272.978L88.149,272.978z"></path>
            <path fill="#FFFFFF"
                  d="M128.269,281.13h-80.18c-14.337,0-26.044,13.132-26.044,29.297v80.442c0,0.863,0.422,1.687,0.502,2.631   h131.285c0.06-0.944,0.442-1.768,0.442-2.631v-80.442C154.313,294.262,142.586,281.13,128.269,281.13z"></path>
          </g>
        </svg>
      </router-link>
      </div>
      <div class="menu-icons">
        <router-link class="-menu-icon contact-icon" to="/contact">
          <div class="-icon-name _flex_v_h">
            <p>CONTACT</p>
          </div>
          <svg viewBox="0 0 512 512">
            <path class="-svg-outer-line" display="inline"
                  d="M508.749,473.75c0,19.25-15.75,35-35,35H38.25c-19.25,0-35-15.75-35-35V38.25c0-19.25,15.75-35,35-35   h435.499c19.25,0,35,15.75,35,35V473.75z"></path>
            <path fill="#FFFFFF"
                  d="M358.083,295.5c-28.916,28.917-28.916,57.833-57.833,57.833s-57.833-28.916-86.75-57.833  c-28.917-28.916-57.833-57.833-57.833-86.75s28.917-28.917,57.833-57.833C242.417,122,155.667,35.25,126.75,35.25S40,122,40,122  c0,57.833,59.409,175.076,115.667,231.333C211.924,409.591,329.167,469,387,469c0,0,86.75-57.833,86.75-86.75  S387,266.584,358.083,295.5z"></path>
          </svg>
        </router-link>
        <a class="-menu-icon facebook-icon" href="https://www.facebook.com/Nectar-Beverages-186910505238446/">
        <div class="-icon-name _flex_v_h"><p>FACEBOOK</p></div>
        <svg viewBox="0 0 512 512">
          <path class="-svg-outer-line" display="inline"
                d="M508.749,473.75c0,19.25-15.75,35-35,35H38.25c-19.25,0-35-15.75-35-35V38.25c0-19.25,15.75-35,35-35   h435.499c19.25,0,35,15.75,35,35V473.75z"></path>
          <path fill="#FFFFFF"
                d="M205.98,495.835V241.994h-72.526v-72.526h72.526v-36.263  c0-59.942,48.846-108.789,108.789-108.789h72.526v72.526H314.77c-19.944,0-36.263,16.318-36.263,36.263v36.263h108.789  l-18.132,72.526h-90.657v253.841H205.98z"></path>
        </svg>
      </a><a class="-menu-icon instagram-icon" href="https://www.instagram.com/nectarbeverages/">
        <div class="-icon-name _flex_v_h"><p>INSTAGRAM</p></div>
        <svg viewBox="0 0 512 512">
          <path class="-svg-outer-line" display="inline"
                d="M508.749,473.75c0,19.25-15.75,35-35,35H38.25c-19.25,0-35-15.75-35-35V38.25c0-19.25,15.75-35,35-35   h435.499c19.25,0,35,15.75,35,35V473.75z"></path>
          <g>
            <path display="inline" fill="#FFFFFF"
                  d="M259.126,74.949c59.305,0,66.323,0.263,89.644,1.304   c21.683,0.957,33.376,4.592,41.187,7.63c10.321,3.995,17.771,8.85,25.483,16.563c7.811,7.81,12.568,15.177,16.646,25.498   c3.038,7.81,6.673,19.588,7.63,41.187c1.041,23.417,1.305,30.437,1.305,89.658c0,59.222-0.264,66.323-1.305,89.657   c-0.957,21.683-4.592,33.377-7.63,41.187c-3.995,10.321-8.836,17.771-16.563,25.484c-7.811,7.81-15.177,12.568-25.484,16.647   c-7.81,3.037-19.601,6.672-41.188,7.629c-23.416,1.041-30.435,1.305-89.657,1.305c-59.221,0-66.324-0.264-89.657-1.305   c-21.682-0.957-33.376-4.592-41.187-7.629c-10.321-3.997-17.771-8.838-25.497-16.564c-7.811-7.811-12.569-15.177-16.647-25.483   c-3.038-7.811-6.672-19.602-7.629-41.188c-1.041-23.417-1.305-30.437-1.305-89.656c0-59.223,0.264-66.325,1.305-89.658   c0.957-21.683,4.591-33.377,7.629-41.188c3.996-10.321,8.851-17.771,16.564-25.498c7.81-7.811,15.176-12.568,25.497-16.647   c7.811-3.038,19.588-6.673,41.188-7.63c23.319-1.041,30.353-1.304,89.657-1.304H259.126z M259.126,34.981   c-60.262,0-67.795,0.264-91.475,1.305c-23.583,1.04-39.8,4.855-53.839,10.321c-14.648,5.716-27.05,13.262-39.355,25.665   C62.054,84.59,54.507,96.978,48.792,111.544c-5.466,14.136-9.281,30.256-10.322,53.838c-1.04,23.764-1.304,31.296-1.304,91.558   s0.264,67.794,1.304,91.475c1.041,23.583,4.856,39.8,10.322,53.839c5.729,14.648,13.261,27.051,25.664,39.355   c12.305,12.306,24.707,19.949,39.273,25.581c14.136,5.467,30.256,9.28,53.838,10.321c23.667,1.04,31.214,1.304,91.475,1.304   c60.262,0,67.809-0.264,91.475-1.304c23.583-1.041,39.801-4.854,53.839-10.321c14.565-5.632,26.968-13.262,39.272-25.581   c12.306-12.318,19.949-24.707,25.581-39.272c5.467-14.136,9.28-30.255,10.321-53.839c1.04-23.666,1.304-31.213,1.304-91.475   s-0.264-67.794-1.304-91.474c-1.041-23.583-4.854-39.8-10.321-53.839c-5.466-14.746-13.012-27.134-25.4-39.454   c-12.305-12.305-24.707-19.948-39.272-25.581c-14.136-5.466-30.256-9.28-53.839-10.321c-23.75-1.124-31.297-1.387-91.558-1.387l0,0   L259.126,34.981z"></path>
            <path display="inline" fill="#FFFFFF"
                  d="M259.126,142.923c-62.94,0-114.018,51.064-114.018,114.017   c0,62.954,51.064,114.018,114.018,114.018c62.952,0,114.017-51.063,114.017-114.018   C373.143,194.001,322.078,142.923,259.126,142.923z M259.126,330.895c-40.841,0-73.954-33.114-73.954-73.954   c0-40.841,33.113-73.954,73.954-73.954c40.839,0,73.953,33.113,73.953,73.954C333.079,297.78,299.965,330.895,259.126,330.895z"></path>
            <path display="inline" fill="#FFFFFF"
                  d="M404.259,138.415c0,14.705-11.916,26.621-26.621,26.621s-26.622-11.917-26.622-26.621   s11.917-26.621,26.622-26.621S404.259,123.71,404.259,138.415z"></path>
          </g>
        </svg>
      </a></div>
    </div>
  </header>
</template>
<script>
  /* eslint-disable camelcase,no-undef,one-var,padded-blocks */
  import $ from 'jquery'
  export default {
    computed: {
      sM () {
        return this.social_media
      }
    },
    mounted () {

      window.addEventListener('scroll', this.check_header_scroll)
      window.addEventListener('mousewheel', this.check_header_scroll)

      let hover_support = this.device.hover_support()
      $('.menu-icon').on('click', this.show_menu_items)

      if (!this.device.touch) {
        $('.-menu-icon:not(.menu-icon)').on(
          hover_support.in + ' ' +
          hover_support.out
          , this.hover_menu_items)
      }

      this.show_menu_icon($('.menu-icon'))
    },
    methods: {
      check_header_scroll (e) {
        if (this.header_visible) {
          this.show_menu_items()
        }
      },
      show_menu_icon: ($menu) => {
        TweenMax.fromTo($menu || '.menu-icon', 0.288, {left: '100%'}, {autoAlpha: 1, left: 0})
      },
      hover_menu_items (e) {
        let $b = $(e.currentTarget),
          on = e.type === this.device.hover_support().in
        TweenMax.to($b.children('.-icon-name'), 0.3,
          {
            left: on ? -$b.children('.-icon-name').width() + -10 : 0,
            autoAlpha: on ? 1 : 0
          }
        )
      },
      show_menu_items (e) {
        var $b = $(e ? e.currentTarget : '.menu-icon'),
          $icons = $b.siblings().find('.-menu-icon'),
          active = $b.hasClass('__active'),
          dur = 0.3,
          call_back = active ? 'onStart' : 'onComplete',
          vars = {
            ease: Power4.easeInOut,
            left: active ? '100%' : 0,
            autoAlpha: 1
          }

        this.header_visible = !active

        vars[call_back] = function (e) {
          if (this.device.touch || e.type !== 'click') {
            let new_e = e || {},
              h_s = this.device.hover_support()
            new_e.currentTarget = this.target
            new_e.type = active ? h_s.out : h_s.in
            this.hover_menu_items(new_e)
          }
        }

        vars[call_back + 'Params'] = [e]

        $b[active ? 'removeClass' : 'addClass']('__active')

        TweenMax.staggerTo($icons, dur, vars, dur / 2)
      }
    },
    data () {
      return {
        icons: [
          {name: 'facebook', link: ''},
          {name: 'instagram', link: ''},
          {name: 'contact', link: ''},
          {name: 'home', link: ''},
          {name: 'about', link: ''}
        ]
      }
    }
  }
</script>
