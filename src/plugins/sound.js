/*
 * Created by Josh on 17/06/2017.
 */

const sound = function () {
    var current_sound,
        gain_node,
        scratch_buffer,
        current_theme;

    const AUDIO_ELM = new Audio(),
        CONTEXT = createAudioContext(),
        ANALYSER = CONTEXT ? CONTEXT.createAnalyser() : false;

    function createAudioContext(desiredSampleRate) {
        var AudioCtor = window.AudioContext || window.webkitAudioContext;

        if (!AudioCtor) {
            return false;
        }
        desiredSampleRate = typeof desiredSampleRate === 'number'
            ? desiredSampleRate
            : 44100;
        var context = new AudioCtor();

        // Check if hack is necessary. Only occurs in iOS6+ devices
        // and only when you first boot the iPhone, or play a audio/video
        // with a different sample rate
        context.onstatechange = function () {
            if (context.state === 'suspended') {
                context.resume();
            }
        };
        return context
    }

    function unlock() {
         if (!CONTEXT) {
            return false;
        }
        scratch_buffer = CONTEXT.createBuffer(1, 1, 22050);


        // Call this method on touch start to create and play a buffer,
        // then check if the audio actually played to determine if
        // audio has now been unlocked on iOS, Android, etc.
        var unlock = function () {
            // Fix Android can not play in suspend state.
            // Create an empty buffer.
            var source = CONTEXT.createBufferSource();
            source.buffer = scratch_buffer;
            source.connect(CONTEXT.destination);
            //media.sound.iOS_unlocked = true;
            // Play the empty buffer.
            if (typeof source.start === 'undefined') {
                source.noteOn(0);
            } else {
                source.start(0);
            }

            // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
            if (typeof CONTEXT.resume === 'function') {
                CONTEXT.resume();
            }

            // Setup a timeout to check that we are unlocked on the next event loop.
            source.onended = function () {
                source.disconnect(0);

                // Update the unlocked state and prevent this check from happening again.
                //self._mobileEnabled = true;
                //self.mobileAutoEnable = false;

                // Remove the touch start listener.
                document.removeEventListener('touchstart', unlock, true);
                document.removeEventListener('touchend', unlock, true);
            };
        };

        // Setup a touch start listener to attempt an unlock in.
        document.addEventListener('touchstart', unlock, true);
        document.addEventListener('touchend', unlock, true);
    }

    function play_blank() {

        var buffer = CONTEXT.createBuffer(1, 1, 44100);
        var dummy = CONTEXT.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(CONTEXT.destination);
        dummy.start(0);
        dummy.disconnect();

        //CONTEXT.close(); // dispose old context
        //context = new AudioCtor();
    }

    function delay_play(sound, dep, dep_args, volume) {
        if ((dep && dep(dep_args)) || (sound.prevent && sound.prevent())) {
            return;
        }

        if (current_theme && current_theme.isTheme && sound.isTheme) {
            this.stop(current_theme);
        }
        CONTEXT ? play_web_audio(sound, volume) : play_elm_audio(sound, volume);
        current_sound = sound;
        if (sound.isTheme)current_theme = sound;
        console.log("SOUND PLAYED: " + sound.id);
    }

    function web_audio_buffered(batch, cold, buffer) {
        this.element = buffer;
        /*
         Data loaded and info is stored as buffer.
         Runs the loaded/error callbacks in media.js
         */
        media.pre_load.load_finished({
            data: {
                asset: this,
                batch: batch
            },
            success: buffer
        });
        /*
         cold checks if the data has been played without being initially preloaded,
         Then it plays the audio after being loaded. This will come with a delay frrom the preload time
         */
        if (cold) {
            play_web_audio(this);
        }
    }

    function web_audio_load(asset, batch, cold) {
        CONTEXT.decodeAudioData(
            this.response,
            web_audio_buffered.bind(asset, batch, cold)
        );
    }

    function load_web_audio(asset, batch, cold) {
        return asset.promise = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", asset.src, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function (progress) {
                resolve(this, progress);
            };
            xhr.onerror = function () {
                reject(error);
            };
            xhr.send();
        })
            .then(function (xhr, progress) {
                CONTEXT.decodeAudioData(
                    xhr.response,
                    web_audio_buffered.bind(asset, batch, cold)
                );
            })
    }

    function stop_elm_audio(data) {
        data.element.pause();
        data.element.currentTime = 0;
    }

    function stop_web_audio(data) {
        data.source[data.source.stop ? "stop" : "noteOff"](0);
    }

    function play_elm_audio(data, volume) {
        data.element.currentTime = 0;
        data.element.volume = 0;
        data.element.play();
    }

    function play_web_audio(data, volume) {
        if (!data) {
            /*
             If the sound is yet to be preloaded,
             load the web audio then play after its loaded.
             */
            load_web_audio(data, false, true);
            return;
        }
        var source = CONTEXT.createBufferSource();
        source.buffer = data.element;

        if (data.volume) {
            gain_node = CONTEXT.createGain
                ? CONTEXT.createGain()
                : CONTEXT.createGainNode();
            source.connect(gain_node);
            gain_node.connect(CONTEXT.destination);
            gain_node.gain.value = data.volume * (volume || 1);
        } else {
            source.connect(CONTEXT.destination);
        }
        source.loop = !!data.loop;
        if (CONTEXT.state === "suspended") {
            CONTEXT.resume();
        }
        source[source.start ? "start" : "noteOn"](0);
        data.source = source;
    }

    unlock();

    return {
        SOUND_PATH: 'sounds/',
        WEB_AUDIO: !!CONTEXT,
        CONTEXT: CONTEXT,
        EXTENSION: !!(
        AUDIO_ELM.canPlayType &&
        AUDIO_ELM.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")
        )
            ? ".ogg"
            : ".mp3",

        /*
         Plays any audio matching the id.
         */
        play(id, del, dep, dep_args, volume, media) {
            if (id === 'blank') {
                play_blank();
                return;
            }
            //if(device.o_s === 'iOS' && !media.sound.iOS_unlocked){
            //    return;
            //}
            var sound = id.key ? id : media.get("sounds", id);
            if (del) {
                TweenMax.delayedCall(del, delay_play, [
                    sound,
                    dep,
                    dep_args,
                    volume
                ]);
            } else {
                delay_play(sound, dep, dep_args, volume);
            }
        },
        /*
         Stops any audio matching the id.
         */
        stop(id, media) {
            var sound = id.key ? id : media.get("sounds", id);
            CONTEXT ? stop_web_audio(sound) : stop_elm_audio(sound);
            console.log('SOUND STOPPED: ' + id);
        },
        /*
         Loads any audio matching the id. This is only supported for webAudio
         */
        load(id, batch) {
            var sound = id.id ? id : media.get("sounds", id);
            if (CONTEXT) load_web_audio(sound, batch);
        }
    }
}()

export default sound
