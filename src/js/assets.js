/*
 * Created by Josh on 17/06/2017.
 */

const assets = {


    sounds: [
        {
            id: "Chirp",
            key: "chirp",
            volume: 0.5,
            group: "a",
            position: 1,
            template: 'index',
            load: ()=>{
                media.sound.play('Chirp')
                animate()
            },
            error: ()=>{
                animate()
            }
        },
        {
            id: "Woosh",
            key: "woosh",
            volume: 0.5,
            group: "a",
            template: 'contact',
            position: 1
        },
        {
            id: "Click",
            key: "click",
            volume: 0.5,
            group: "a",
            template: 'contact',
            position: 1
        },
        {
            id: "Error",
            key: "error",
            template: 'contact',
            volume: 0.5,
            group: "a",
            position: 1
        },
        {
            id: "Success",
            key: "success",
            template: 'contact',
            volume: 0.5,
            group: "a",
            position: 1
        }
    ],
    images: [
        //{
        //    id: 'middle',
        //    key: 'home/Middle-f',
        //    template: 'landing',
        //    target: '#landing-image-4',
        //    load: function () {
        //        $(this.target).attr('src', this.src);
        //    },
        //    speed: {
        //        cap: 3000
        //    },
        //    errorType: 'connection-iffy'
        //}
    ]
}

export default assets
