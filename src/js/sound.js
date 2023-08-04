import advertiseSound from '@/audio/advertise2.mp3'
import greatSound from '@/audio/great.mp3'
import goodSound from '@/audio/good.mp3'
import failedSound from '@/audio/failed.ogg'
import failedSound2 from '@/audio/failed2.ogg'
import sparksSound from '@/audio/sparks.ogg'

// import {delay} from '@/js/library/math.js'
import store from '@/store/store'
import {playerOptions} from '@/js/status/options.js'

const audio = {
    advertise: advertiseSound,
    great: greatSound,
    good: goodSound,
    failed: failedSound,
    failed2: failedSound2,
    sparks: sparksSound
};
(async function(){
    //preload files
    for (let aud in audio){
        const response = await fetch(audio[aud]);  // Adjust the path accordingly
        if (response.ok) {
            const blob = await response.blob();
            audio[aud] = URL.createObjectURL(blob);
        }
    }
})();

const playSound = track => {
    const sound = new Audio(audio[track])
    const volumeValue = playerOptions.volume.value
    sound.volume = volumeValue >= 100 ? 1 : volumeValue <= 0 ? 0 : Number(`0.${volumeValue}`)
    sound.play()
}

export default async function playTrack(track) {
    if (audio[track]) {

        if (track !== 'great' && track !== 'good' && track !== 'failed') {
            playSound(track)
        } else {
            if (track == 'great') {
                playSound(track)
            }
            if (track == 'good') {
                playSound('good')
            }

            if (track == 'failed' && store.state.gameStatus.now.gameMode !== 'ds') {
                const failedSounds = ['failed', 'failed2']    
                playSound(failedSounds[~~(Math.random() * failedSounds.length)])
            }
        }
    } else {
        // console.log(`'${track}' sound is not defined.`)
    }
}
