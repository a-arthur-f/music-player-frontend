let audio = document.querySelector('#audio');
let play = document.querySelector('.playBtn');
let avancar = document.querySelector('.avancar');
let retroceder = document.querySelector('.retroceder');
let progress = document.querySelector('.progress');
let state = 0;
let index = 0;

let tracks = ['./musics/o_medo_e_a_licao.mp3', './musics/in da club.mp3'];

audio.src = tracks[index];



const playAudio = () => {
    audio.play();
    play.firstChild.classList = 'fa fa-pause-circle-o'; 
    state = 1;
}

const pauseAudio = () => {
    audio.pause();
    play.firstChild.classList = 'fa fa-play-circle-o'; 
    state = 0;
}

const avancarAudio = ( ) => {
    audio.currentTime = audio.duration;
}

const retrocederAudio = () => {
    if(audio.currentTime > 2)
        audio.currentTime = 0;

    else {
        if(index < tracks.length - 1) {
            ++index;
            audio.src = tracks[index];
            audio.load();
            playAudio();
        }

        else {
            --index;
            audio.src = tracks[index];
            audio.load();
            playAudio();
        }
    }
        
}

const verificaFim = () => {
    if(audio.ended) {
        if(index < tracks.length - 1) {
            ++index;
            audio.src = tracks[index];
            audio.load();
            playAudio();
        }

        else {
            --index;
            audio.src = tracks[index];
            audio.load();
            playAudio();
        }
    }
}

const atualizaProgresso = () => {
    let porcentagem = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${porcentagem}%`;
}

play.addEventListener('click', () => {
    if(state === 0) {
        playAudio();
    }
    else {
        pauseAudio();
    }  
});

audio.onended = verificaFim;

audio.ontimeupdate = () => {
    atualizaProgresso();
}

avancar.addEventListener('click', avancarAudio);
retroceder.addEventListener('click', retrocederAudio);