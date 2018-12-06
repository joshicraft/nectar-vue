//const media = function () {

let header_visible = false,
  header_at_top = true;

const check_header_scroll = (e) => {
  // if ($(e.currentTarget).scrollTop() > 100) {
  //   TweenMax.to($('.-menu-icon, #home-button'), 0.2, {scale: 0.7, transformOrigin: '50% 0%'})
  // } else {
  //   TweenMax.to($('.-menu-icon, #home-button'), 0.2, {scale: 1, transformOrigin: '50% 0%'})
  // }

  if (header_visible) {
    show_menu_items()
  }
}

window.addEventListener("scroll", check_header_scroll);
window.addEventListener("mousewheel", check_header_scroll);


const index_clicks = () => {
  let hover_support = device.hover_support();
  $(".menu-icon").on("click", show_menu_items);


  if (!device.touch) {
    $(".-menu-icon:not(.menu-icon)").on(
      hover_support.in + " " +
      hover_support.out
      , hover_menu_items)
  }

};

const show_menu_icon = ($menu) => {
  TweenMax.fromTo($menu || ".menu-icon", 0.288, {left: "-100%"}, {autoAlpha: 1, left: 0})
};

const hover_menu_items = (e) => {
  let $b = $(e.currentTarget),
    on = e.type === device.hover_support().in;

  TweenMax.to($b.children(".-icon-name"), 0.3,
    {
      left: on ? $b.outerWidth() + 15 : 0,
      autoAlpha: on ? 1 : 0
    }
  )

};

const show_menu_items = (e) => {
  var $b = $(e ? e.currentTarget : ".menu-icon"),
    $icons = $b.siblings().find(".-menu-icon"),
    active = $b.hasClass("__active"),
    dur = 0.3,
    call_back = active ? "onStart" : "onComplete",
    vars = {
      ease: Quart.easeInOut,
      left: active ? "-100%" : 0,
      autoAlpha: 1
    };

  header_visible = !active;

  vars[call_back] = function (e) {
    if (device.touch || e.type != "click") {
      let new_e = e || {},
        h_s = device.hover_support();
      new_e.currentTarget = this.target;
      new_e.type = active ? h_s.out : h_s.in;
      hover_menu_items(new_e)
    }
  };

  vars[call_back + "Params"] = [e];

  $b[active ? "removeClass" : "addClass"]("__active");

  TweenMax.staggerTo($icons, dur, vars, dur / 2)
};

