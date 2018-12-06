/*
 * Created by Josh on 17/06/2017.
 */
import sound from './sound'
import pre_load from './pre_load'
const media = function () {
    let sound = sound
    const act = {
        process_images(asset) {
            asset.load_type = "load";
            asset.type = "html_asset";
            asset.image_asset = true;
            asset.src =
                (asset.local || (media.PATH +
                "image/upload/f_auto,q_99/v20000/" +
                (asset.template || "") +
                (asset.category || "/product/") +
                asset.key));
            asset.element = new Image();
        },

        process_videos(asset) {
            /*
                Needs expanding to support .ogg
             */

            asset.load_type = "canplaythrough";
            asset.type = "video";
            asset.image_asset = true;
            asset.src = asset.local + asset.id + '.mp4';
            asset.element = document.createElement('video');
        },

        process_sounds(asset) {
            asset.sound_asset = true;
            asset.load_type = media.sound.WEB_AUDIO ? null : "canplaythrough";
            asset.type = media.sound.WEB_AUDIO ? 'web_audio' : "html_asset";
            asset.src = (asset.local || media.sound.SOUND_PATH + asset.key) + media.sound.EXTENSION;
        }


    };

    function process_assets(types, assets) {
        var t = types.constructor === Array ? types : [types];
        t.forEach(type => {
            assets[type].forEach(a => {
                a.position = a.position || 9999;
                act["process_" + type](a);
               // log("PROCESSED ASSET: " + a.id);
            });
            order(assets[type]);
        });
    }

    function Asset(settings) {
        var defaults = {
                id: '',
                src: ''
            },
            type = {
                sound: {
                    volume: 1
                },
                image: {
                    size: {
                        width: null,
                        height: null
                    }
                }
            }

        $.extend(defaults, settings, settings[type]);
        return defaults;
    }

    function order(batch) {
        /*
         Sorts the asset array after its been processed so that it can make a more dynamic load order.
         This sort, sorts by the Int value of position.
         */
        batch.sort(function (a, b) {
            return a.position - b.position;
        });
        return batch;
    }

    function group(assets, group, type) {
        /*
         Groups assets in the array into a smaller batch for mpre precise loading.
         This groups all assets with the variable (string) e.g. 'a' assigened to it.
         */
        return assets.filter(function (a) {
            if (group === 'id') {
                return a[group].indexOf(type) !== -1;
            }
            return a[group] === type;
        });
    }

    return {
        PATH: '/',
        play_video(elm) {
            elm[0].play();
        },
        pause_video(elm) {
            elm[0].pause();
        },
        sound: sound,
        pre_load: pre_load,
        get(type, id, assets) {
            var items = assets[type],
                i;
            if (!id) {
                return items;
            }
            return items.find((item) => {
                return item.id === id;
            });
        },
        init(group_items, template, assets) {
            process_assets(["sounds", 'images'], assets);
            /*
             Chain loading the assets by group.
             Syntatically; its hard to read, might need a better implementation.
             Promises might work well here.
             */

            media.pre_load.chain_load(
                    group(assets['sounds'], group_items, template))
                .then(function () {})
            /*
             Initializes loading of all assets assigned to the type e.g. 'sounds' or 'images'.
             */
        }
    }
}()

export default media




