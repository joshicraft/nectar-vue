/* eslint-disable no-mixed-operators */
export default {

  sizes: {
    mobile: {
      SMALL: {
        w: 320, h: 530
      },
      MEDIUM: {
        w: 535, h: 850
      },
      LARGE: {
        w: 641, h: 1030
      }
    },
    tablet: {
      SMALL: {
        w: 770, h: 1026
      },
      MEDIUM: {
        w: 800, h: 1280
      },
      LARGE: {
        w: 920, h: 1380
      }
    }
  },

  touch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),

  touch_types: (function () {
    if (window.navigator.pointerEnabled) {
      return {
        end: 'pointerup',
        start: 'pointerdown',
        move: 'pointermove',
        enter: 'pointerenter',
        leave: 'pointerleave'
      }
    } else if (window.navigator.msPointerEnabled) {
      return {
        end: 'MSPointerUp',
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        enter: 'MSPointerEnter',
        leave: 'MSPointerLeave'
      }
    } else {
      return {
        end: 'touchend',
        start: 'touchstart',
        move: 'mousemove',
        enter: 'mouseenter',
        leave: 'mouseleave'
      }
    }
  }()),

  click () {
    return this.touch ? 'touchend' : 'click'
  },

  is_device: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent),

  port () {
    return window.innerHeight > window.innerWidth
  },

  land () {
    return window.innerHeight < window.innerWidth
  },
  is_device_size (dimensions) {
    if (dimensions === undefined) {
      dimensions = this.sizes.mobile.LARGE
    }
    console.log(dimensions)
    return (screen.height <= dimensions.h && screen.width <= dimensions.w) ||
        (screen.height <= dimensions.w && screen.height <= dimensions.h)
  },
  hover_support () {
    return {
      in: this.touch ? this.touch_types.start : this.touch_types.enter,
      out: this.touch ? this.touch_types.end : this.touch_types.leave
    }
  }
}
