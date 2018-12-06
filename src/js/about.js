
const parallex = {
  tea: {
    class: '.Tea ._col-img',
    duration: window.innerHeight,
    offset: -50,
    tween: (e) => {
      return TweenMax.fromTo(e, 1,
        {
          x: 40,
          autoAlpha: 0.6,
          scale: 1.3
        },
        {
          x: 0,
          scale: 1,
          autoAlpha: 1
        })
    }
  },

  peach: {
    class: '.Extracts ._col-img',
    duration: window.innerHeight,
    offset: -50,
    tween: (e) => {
      return TweenMax.fromTo(e, 1,
        {
          x: -40,
          autoAlpha: 0.6,
          scale: 1.3
        },
        {
          ease: Power4.easeOut,
          x: 0,
          scale: 1,
          autoAlpha: 1
        })
    }
  },
  Brew: {
    class: '.Brew ._col-img',
    duration: window.innerHeight,
    offset: -50,
    tween: (e) => {
      return TweenMax.fromTo(e, 1,
        {
          x: 40,
          autoAlpha: 0.6,
          scale: 1.3
        },
        {
          x: 0,
          scale: 1,
          autoAlpha: 1
        })
    }
  },
  bottle: {
    class: '.Bottle ._col-img',
    duration: window.innerHeight,
    offset: -50,
    tween: (e) => {
      return TweenMax.fromTo(e, 1,
        {
          x: -e.outerHeight() / 1.3,
          autoAlpha: 0
        },
        {
          x: 0,
          autoAlpha: 0.5
        })
    }
  },
  nectar: {
    class: '.Nectar ._col-img',
    // alt_point: device.port() ? false : '.Bottle',
    duration: window.innerHeight,
    // offset: 0,
    offset: -$('.Nectar ._col-img').outerHeight(),
    tween: (e) => {
      return new TimelineMax()
        .fromTo(e, 1,
          {
            y: (e.outerHeight() / 3),
            autoAlpha: 0
          },
          {
            y: -(e.outerHeight() / 3),
            autoAlpha: 1
          })
    }
  }
}

$(() => {
  index_clicks()
  show_menu_icon()
  show_label_animation()
  build_all_scroll_magic(parallex)
})

$(window).on('orientationchange', () => {
  TweenMax.delayedCall(0.5, () => {
    build_all_scroll_magic(parallex)
  })
})

const build_all_scroll_magic = (items) => {
  if (items.controller) {
    items.controller.destroy(true)
  }
  items.controller = new ScrollMagic.Controller()
  for (var item in items) {
    if (item === 'controller') continue
    let i = items[item]
    if (i.scroll_magic) {
      i.scroll_magic.destroy(true)
    }
    i.scroll_magic = new ScrollMagic.Scene({
      triggerElement: i.alt_point || i.class,
      duration: i.duration,
      offset: i.offset
    })
      .setTween(i.tween($(i.class + ' ._img-bg')))
      .addTo(items.controller)
  }
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const show_label_animation = () => {
  let $elm = $('.-svg-label-f'),
    $col_items = $('._col-item'),
    $svg_objs = $elm.find('path:not(.not), rect, polygon, circle, text'),
    dur = 1.2,
    $array = $svg_objs.toArray(),
    t_l = new TimelineMax()

  t_l.fromTo($elm, 0.1, {y: -100}, {y: 0, autoAlpha: 1}, 'a')

  $array.splice(($array.length / 2) - 3, $array.length).forEach(($e) => {
    t_l.add(TweenMax.from($e, dur * 2,
      {
        y: random(-100, 100),
        x: random(-100, 100),
        scale: Math.random(),
        rotation: random(-360, 360),
        z: random(-100, 100),
        autoAlpha: 0
      }), -(dur / 2))
  })
  t_l.add(TweenMax.staggerTo($($col_items.toArray().reverse()), 0.3, {autoAlpha: 1}, -0.15), '-=0.1')
}
