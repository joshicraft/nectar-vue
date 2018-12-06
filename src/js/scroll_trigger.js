/*
 * Created by Josh on 17/06/2017.
 */


function check_scroll_event(trigger, scroller) {
    var offset = get_offset(trigger.static_point || trigger.trigger_elm).top,
        opts = trigger.scroll_options || {},
        elm,
        t_p = trigger.trigger_point($(scroller));
    opts.prev_offset = opts.prev_offset || 0;
    trigger.scroll_options = opts;
    //log(
    //   "Event: " +
    //     type +
    //     ", Temp Scroll Height:  " +
    //     // this[0].scrollHeight +
    //     ", Trigger Elm Offset: " +
    //     offset +
    //     ", Trigger Point: " +
    //     trigger.trigger_point
    //);
    /*
     DANGER: when testing offset it can take the offset of the item before the scroll position has properly adjusted.
     May need a delay on measuring offset? An alternative which has performance bonus of not
     measuring extra trigger points is checking against the window height.

     SET: $(trigger.trigger_elm).height() as a static property so that it does not need to be calculated each event.
    */

    if (!opts.triggered && offset < t_p) {
        opts.triggered = true;
        if (trigger.settings.in.func) {
            if (trigger.settings.in.transition)trigger.settings.in.transition.totalProgress(1);
            TweenMax.killDelayedCallsTo(media.sound.play)
            trigger.settings.in.transition = trigger.settings.in.func(trigger);
            current_scroll_trigger.in = trigger;
        }
    } else if (
        opts.triggered &&
        ((trigger.settings.hide_below_fold && offset > window.innerHeight) ||
        (!trigger.settings.hide_below_fold && offset > (t_p + $(trigger.trigger_elm).height()) + (trigger.settings.out.offset || 0)))
    ) {
        opts.triggered = false;
        if (trigger.settings.out.func) {
            if (trigger.settings.out.transition)trigger.settings.out.transition.totalProgress(1);
            trigger.settings.out.transition = trigger.settings.out.func(trigger);
            current_scroll_trigger.out = trigger;
        }
    }
    opts.prev_offset = offset;
}

const scroll_triggers = function(elm) {
    //Constructor of trigger object

    var triggers = [],
        id = elm;

    function fire_scroll_event(event) {
        /*
         Loops through each custom built scroll check and fires them off the one scroll event.
         */
        triggers.forEach((trigger)=>{
            check_scroll_event(trigger, event.currentTarget);
        });
    }

    return {
        update(temp) {
            $(ANIMATION_CONFIG.SCROLL_TARGET)
                .off("mousewheel scroll", fire_scroll_event)
                .on("mousewheel scroll", fire_scroll_event);
        },
        remove() {
            $(ANIMATION_CONFIG.SCROLL_TARGET).off("mousewheel scroll", fire_scroll_event);
        },
        new_trigger(temp, trigger) {
            scroll_triggers.update();
            triggers.push.apply(triggers, trigger)
        }
    }
}(window);

function Trigger($temp, settings) {
    var defaults = {
        id: "blank",
        trigger_elm: $temp.find(".trigger-point-" + "a"),
        scroll_options: {
            offset: 0,
            triggered: false
        },
        trigger_point: ()=>{
            return window.innerHeight / 2
        },
        settings: {
            in: {
                vars: {
                    autoAlpha: 1
                },
                elm: $temp.find(".trigger-elm-" + "a"),
                dur: 1,
                func: function () {
                },
                parameters: []
            }
        }
    };
    return $.extend({}, defaults, settings);
}

var current_scroll_trigger = {click_index: -1};

function get_top_offset(el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    try {
        return el.getBoundingClientRect().top;
    } catch (err) {
        console.warn("cannot retrieve element for measuring top offset");
        return;
    }
}

function get_offset(el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    try {
        return el.getBoundingClientRect();
    } catch (err) {
        console.warn("cannot retrieve element for measuring top offset");
        return;
    }
}
