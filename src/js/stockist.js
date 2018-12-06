let map;

$(() => {
    let data,
        map;

    $.get('/stockist/map')
        .done((res) => {
            data = res;
            map = new google.maps.Map(document.getElementById('map-1'), data.CONFIG);
        });

});