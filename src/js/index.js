let index_auto_scrolled = false;

$(() => {
    media.sound = sound;
    media.pre_load = pre_load;
    media.init("template", "index");
    index_clicks();
    TweenMax.delayedCall(0.1, animate_logo);
    $(".-scroll-arrow").on(device.click(), () => {
        media.sound.play("Click");
        auto_scroll_index(true)
    })
    window.addEventListener('scroll', check_scrolled);
    window.addEventListener('mousewheel', check_scrolled);
    /*
     Logo animates when sound has preloaded in assets.js load: call
     */
});

const check_scrolled = ()=>{
    if(!index_auto_scrolled){
        window.removeEventListener('scroll', check_scrolled);
        window.removeEventListener('mousewheel', check_scrolled);
        index_auto_scrolled = true;
    }
}

const auto_scroll_index = (click) => {
    let $footer = $("footer"),
        $btn = $("._title .-btn");
    if(index_auto_scrolled && !click){
        return
    }
    index_auto_scrolled = true;
    new TimelineMax()
        .to(window, 0.7, {
            scrollTo: {
                y: window.innerHeight
            }
        })
        .staggerTo($btn, 0.2,
            {
                backgroundColor: "black",
                color: "white",
                yoyo: true,
                repeat: 1
            }, 0.5)
        .set($btn, {clearProps: "all"})
        .to($footer, 0.43, {y: -($footer.outerHeight() / 2), yoyo: true, repeat: 1})
}


let chirped = false;

//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)

const animate_logo = () => {
    if (chirped) {
        return;
    }
    chirped = true;
    let $logo = $(".-svg-logo"),
        $menu = $(".menu-icon"),
        $bird = $logo.find(".svg-bird").children(),
        $rings = $logo.find(".svg-rings").children(),
        $title = $logo.find(".svg-title").children(),
        $sub_title = $logo.find(".svg-sub-title").children(),
        $lines = $logo.find(".svg-lines").children(),
        //$button = $logo.parent().find(".-btn"),
        $scroll_button = $(".-scroll-arrow"),
        all = [$bird, $rings, $title, $sub_title, $lines, $menu];

    let config = {
            fade_dur: 0.45,
            fade_del: 0.1,
            stagger: 0.06,
            y: 40,
            x: 60
        },
        sound_points = [
            0.083,
            0.188,
            0.3,
            0.4,
            0.5,
            0.66,
            0.73,
            0.8,
            0.9,
            0.99,
            1.21,
            1.377,
            1.56,
            1.67,
            1.75,
            1.875
        ],
        chirp = new TimelineMax();

    /*
     Point position and magnitude
     Needs to be a even number to finish animation

     0.083 - 3.5
     0.188 - 4
     0.3 - 3
     0.4 - 4.5
     0.5 - 4
     0.66 - 3
     0.73 - 2.5
     0.8 - 1.5
     0.9 - 1.5
     0.99 - 1.5
     1.21 - 4.5
     1.377 - 4.5
     1.56 - 2.5
     1.67 - 1.7

     currently need to adjust the SIML animation duration in the logo.pug file.
     This increases the distance of the chirp movement
     */

    sound_points.forEach((point) => {
        chirp.add(bird_chirp, point)
    });


    new TimelineMax()
        .set(all, {autoAlpha: 0})
        .set($logo, {autoAlpha: 1})
        .fromTo($bird, config.fade_dur,
            {
                y: config.y
            },
            {
                ease: Quart.easeIn,
                autoAlpha: 1,
                y: 0
            })
        //.call(media.sound.play, ['Chirp'])
        .fromTo($rings, config.fade_dur,
            {
                y: config.y
            },
            {
                autoAlpha: 1,
                y: 0
            }, "-=" + config.fade_del)
        .staggerFromTo($title, config.fade_dur / 3,
            {
                y: config.y / 2
            },
            {
                ease: Cubic.easeOut,
                autoAlpha: 1,
                y: 0
            }, config.fade_dur / 5, "-=" + config.fade_del)
        .staggerFromTo($sub_title, config.fade_dur / 3,
            {
                y: config.y / 2
            },
            {
                ease: Cubic.easeOut,
                autoAlpha: 1,
                y: 0
            }, config.fade_dur / 5, "-=" + config.fade_del)
        .fromTo($($lines[0]), config.fade_dur * 2,
            {
                x: config.x
                //  scaleX: 0.5
            },
            {
                ease: Cubic.easeOut,
                autoAlpha: 1,
                //  scaleX: 1,
                x: 0
            }, "lines-=" + config.fade_del)
        .fromTo($($lines[1]), config.fade_dur * 2,
            {
                x: -config.x
                //  scaleX: 0.5
            },
            {
                ease: Cubic.easeOut,
                autoAlpha: 1,
                //  scaleX: 1,
                x: 0
            }, "lines-=" + config.fade_del)
        // .fromTo($button, config.fade_dur,
        //     {
        //         y: config.y
        //         //  scaleX: 0.5
        //     },
        //     {
        //         ease: Cubic.easeOut,
        //         autoAlpha: 1,
        //         //  scaleX: 1,
        //         y: 0
        //     }, "-=" + config.fade_dur * 2)
        .fromTo($scroll_button, config.fade_dur,
            {
                y: config.y,
                scaleX: 0.5
            },
            {
                ease: Cubic.easeOut,
                autoAlpha: 1,
                scaleX: 1,
                y: 0
            }, "end")
        .call(show_menu_icon, [$menu])
        .set([$scroll_button], {className: "+=__active"})
        .set([$scroll_button], {className: "-=__active"}, "+=0.5")
        .call(auto_scroll_index, [], this, '+=0.6')
        .to($scroll_button, config.fade_dur,
            {
                ease: Cubic.easeIn,
                //  scaleX: 1,
                y: 15,
                scaleX: 1.1,
                scaleY: 0.9,
                repeat: -1,
                yoyo: true,
            }, "end+=" + config.fade_dur)


};

let animation_start = document.getElementById("animation-start"),
    animation_reverse = document.getElementById("animation-reverse"),

    svg = document.getElementsByClassName("logo")[0];

svg.addEventListener("click", function () {
    bird_chirp()

}, false);


const bird_chirp = () => {
    if (!animation_start.beginElement) {
        return;
    }
    if (!svg.classList.contains("saved")) {
        svg.classList.add("saved");
        animation_start.beginElement();
    } else {
        svg.classList.remove("saved");
        animation_reverse.beginElement();
    }
};