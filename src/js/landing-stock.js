let animated = false;

$(() => {
  media.sound = sound;
  media.pre_load = pre_load;
  media.init("template", "index");
  index_clicks();
  window.addEventListener("scroll", check_scrolled);
  window.addEventListener("mousewheel", check_scrolled);
});


const animate = () => {
  if(animated){
    return;
  }
  let $menu = $(".menu-icon"),
    $footer = $("footer"),
    $btn = $("._title .-btn")

  animated = true;

  new TimelineMax({delay: 0.4})
    .call(show_menu_icon, [$menu])
    .staggerFromTo("._title h1, ._title p, ._title .-btn", 0.3, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1}, 0.2)
    .to($footer, 0.43, {y: -($footer.outerHeight() / 2), yoyo: true, repeat: 1})


};