/*
 * Created by Josh on 17/06/2017.
 */
//var pre_load = new Pre_load();
const pre_load = function () {

    function web_audio_buffered(buffer) {
        this.element = buffer;
        /*
         Data loaded and info is stored as buffer.
         */
        media.pre_load.load_finished({
            data: {
                asset: this
            },
            success: buffer
        });
        /*
            cold checks if the data has been played without being initially preloaded,
            Then it plays the audio after being loaded.

            if (cold) {
                play_web_audio(this);
            }
        */
    }

    function web_audio_load(data) {
         media.sound.CONTEXT.decodeAudioData(
            data.xhr.response,
            web_audio_buffered.bind(data.asset)
        );
    }

    function load(asset){

        return new Promise((resolve, reject) => {

            switch(asset.type){
                case 'html_asset':
                    asset.element['on' + asset.load_type] = function () {
                        resolve({
                            asset: asset
                        });
                    };
                    asset.element['onerror'] = function (error) {
                        reject(asset, error);
                    };
                    asset.element.src = asset.src;
                    break;

                case 'web_audio':
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", asset.src, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = function (progress) {
                        media.sound.CONTEXT.decodeAudioData(
                            xhr.response,
                            function(buffer){
                                if(!buffer){
                                    reject(asset, 'FAILED');
                                }
                                asset.element = buffer;
                                /*
                                 Data loaded and info is stored as buffer.
                                 */
                                resolve({asset : asset});
                                /*
                                    cold checks if the data has been played without being initially preloaded,
                                    Then it plays the audio after being loaded.

                                    if (cold) {
                                        play_web_audio(this);
                                    }
                                */
                            }
                        );
                    };
                    xhr.onerror = function (error) {
                        reject(asset, error);
                    };
                    try {
                        xhr.send();
                    }catch (e) {
                        reject(asset, 'FAILED: ' + e);
                    }
                    break;

                case 'video':
                    asset.element['onload'] = function () {
                        resolve({
                            asset: asset
                        });
                    };
                    asset.element['onerror'] = function (error) {
                        reject(asset, error);
                    };
                    asset.element.appendChild(document.createElement('source'));
                    asset.element.lastChild.type="video/mp4";
                    asset.element.lastChild.src = asset.src;
                case 'js':

                case 'font':

            }
        })
        .then((data)=>{
            /*
                Success handler for individual asset load success.
                TODO: have matching case to promise initializer
            */
            load_finished({data: data}, "SUCCESS");
        })
        .catch((error)=>{
            /*
                Error handler for individual asset load failure. data structure is a template to support load_finished
            */
            load_finished({data: {asset: error} }, "FAILED: " + error);
        })
    }

    function load_batch(batch, id) {
        var promises = [];
        for (var i = 0; i < batch.length; i++) {
            var asset = batch[i];
            build_asset_info(asset);
            promises.push(load(asset));
        }
        /*
         return promises.reduce((p, fn) =>
            p.then(fn), Promise.resolve([])
        )
         */
        return Promise.all(promises)
            .then(()=> {
                console.log('BATCH: ' + id + ' LOADED, at time: ' + Date.now() % 100000);
            })

    }

    function build_asset_url(asset) {
        asset.path = '';
        asset.path += asset.paths.forEach((piece) => {
            return piece;
        });
        return asset;
    }

    function build_responsive_size(asset) {
        if (!asset.r_size) {
            return;
        }
    }

    function build_asset_info(asset) {
        if(asset.info_generated){
            return;
        }
        if (asset.image) {
            //$(asset.element).webpify();
            /*
             Cloudinary jquery plugin detects for webp image format support (Chrome)
             */
            build_responsive_size(asset);
            build_asset_url(asset);
            asset.src = $.cloudinary.url(asset.src);
        } else {
            asset.volume = asset.volume || 1;
        }
        asset.init_time = Date.now() % 100000;
        asset.generated_info = true;
    }


    function pre_load(batch, call_back, call_back_params) {
        if (batch.loaded) {
            return;
        }
        load_batch(batch, call_back, call_back_params)
    }

    function load_finished(e, type) {
        /*
         Use Promises for this?
         Call back for all assets that have finished loading.
         Determines weather the asset has failed or successfully loaded.
         */

        var asset = e.data.asset,
            batch = e.data.batch;
        /*
         Calls the assets load function if assigned.
         */
        if (asset.load) asset.load.apply(asset, asset.load_params);
        if (asset.error) asset.error.apply(asset, asset.load_params);

        /*

         */
        if(asset.inject){
            $(asset.target).attr('src', asset.src);
        }

        /*
         Calls the next item in the pre load batch.
         */
        if (
            asset.load_time_limit &&
            Date.now() % 100000 - asset.init_time > asset.load_time_limit
        ) {
            /*
             Slow connection detected.
             */
        }
        /*
         Logs the result of the load.
         */
        console.log(
            'LOAD STATE: ' +
            type +
            ", For: " +
            asset.id +
            (asset.position != 9999 ? ", Load Position: " + asset.position : "") +
            (asset.group ? ", Load Group: " + asset.group : "") +
            (asset.init_time
                ? ", Initialized at: " +
            asset.init_time +
            " and Loaded at: " +
            Date.now() % 100000
                : "")
        );
    }

    return {
        act(type, parameters) {
            if (parameters && parameters.constructor != Array) parameters = [parameters];
            return act[type].apply(this, parameters);
        },

        asset_loaded(e) {
            load_finished(e, "SUCCESS");
        },

        asset_error(e) {
            load_finished(e, "FAILED");
        },

        load_finished(e){
            load_finished(e, e.success ? 'SUCCESS' : 'FAILED')
        },

        load(type, call_back, call_back_parameters) {
            pre_load(
                type.constructor === Array ? type : media.get(type),
                call_back,
                call_back_parameters
            );
        },
        chain_load(type, id, resolved) {
           return load_batch(type.constructor === Array ? type : media.get(type), id, resolved);
        },

        init() {
            load("images");
            load("sounds");
            //if(device.o_s === 'Android') {
            //    load("videos");
            //}
        }
    }
}()

export default pre_load
