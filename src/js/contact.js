let contacting_animation = false;

$(() => {
    media.sound = sound;
    media.pre_load = pre_load;
    media.init('template', 'contact');
    index_clicks();
    show_menu_icon();


    $('#send').click(function (e) {
        e.preventDefault();
        let $form = $("form"),
            subject = $('#subject-input').val(),
            name = $('#name-input').val(),
            phone = $('#phone-input').val(),
            email = $('#email-input').val();

        $form.validate().form();
        media.sound.play('Click');
        if ($form.valid()) {
            let data = {
                "phone": phone,
                "email": email,
                "name": name,
                "subject": subject
            };
            animate_contact_logo($form);
            contact_ajax(data, $form);
        } else {
            media.sound.play('Error');
            $('.form-legend').text('Darn... You seem to have entered some details incorrectly. ' +
                'That\'s ok, just adjust the details and hit send!')
            .addClass('__error')
        }
    });

});

const contact_ajax = (data, $form) => {
    $.ajax({
        type: 'POST',
        url: '/send/',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json'
    }).done(() => {
        animate_contact_end($form, true);
    }).fail(() => {
        animate_contact_end($form, false);
        $('.form-legend').text('Darn... There seem\'s to be some funky technical issues, ' +
            'feel free to try again or contact us directly via Email or Phone')
            .addClass('__error')
    });
};

const animate_contact_logo = () => {
    let $elm = $('.-svg-logo'),
        $rings = $elm.find('.-svg-rings'),
        $bird = $elm.find('.-svg-bird'),
        dur = 0.3;

    contacting_animation = new TimelineMax()
        .to($(window), 0.3, {scrollTo: {y: 0}})
        .to($bird, dur, {scale: 0.75, transformOrigin: '50% 50%'})
        .fromTo($rings, dur, {rotation: 0}, {
            rotation: -360,
            repeat: -1,
            transformOrigin: '50% 50%'
        }, '-=' + (dur / 1.5))
};

const animate_contact_end = ($form, success) => {
    let $elm = $('.-svg-logo'),
        $rings = $elm.find('.-svg-rings'),
        $bird = $elm.find('.-svg-bird'),
        dur = 0.3;

    contacting_animation = new TimelineMax({delay: success ? 1 : 0})
        .call(media.sound.play, [success ? 'Success' : 'Error'])
        .to([$rings, $bird], dur, {scale: 1, transformOrigin: '50% 50%', rotation: 0}, '-=' + (dur / 1.5))
        .fromTo($form.children('.-cover'), 0.3, {left: '100%'}, {left: !success ? '100%' : 0})
};
