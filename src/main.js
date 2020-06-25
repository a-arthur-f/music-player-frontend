let audio = document.querySelector('#audio');
let play = document.querySelector('.playBtn');
let avancar = document.querySelector('.avancar');
let retroceder = document.querySelector('.retroceder');
let state = 0;

const playAudio = () => {
    audio.play();
}

const pauseAudio = () => {
    audio.pause();
}

const avancarAudio = ( ) => {
    audio.currentTime += 10;
}

const retrocederAudio = () => {
    audio.currentTime -= 10;
}

play.addEventListener('click', () => {
    if(state === 0) {
        playAudio();
        state = 1;
    }
    else {
        pauseAudio();
        state = 0;
    }  
});

setInterval(() => {
    console.log(audio.currentTime)
}, 1000);

avancar.addEventListener('click', avancarAudio);
retroceder.addEventListener('click', retrocederAudio);