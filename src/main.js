let audio = document.querySelector('#audio');
let play = document.querySelector('.playBtn');
let avancar = document.querySelector('.avancar');
let retroceder = document.querySelector('.retroceder');
let progressBar = document.querySelector('.progress_bar');
let progress = document.querySelector('.progress');
let volumeBar = document.querySelector('.volume-bar');
let currentVolume = document.querySelector('.current-volume');
let name = document.querySelector('.name');
let image = document.querySelector('.image img');
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

const atualizaProgressoClick = (event) => {
    let porcentagem = event.offsetX / progressBar.offsetWidth;
    audio.currentTime = audio.duration * porcentagem;
}

const atualizaVolumeClick = (event) => {
    let porcentagem = event.offsetX / volumeBar.offsetWidth;
    audio.volume = porcentagem.toFixed(2);
}

const setName = (index) => {
    let arr = audio.src.split('/');
    let currentName = arr[arr.length - 1];
    name.innerHTML = currentName.replace(/%20|.mp3|.ogg|_/g, ' ');
}

const setImage = (index) => {
    if(index === 0) 
        image.src = './covers/o_medo_e_a_licao.jpg';

    else if(index === 1)
        image.src = './covers/in_da_club.jpg';
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
    const divCurrentTime = document.querySelector('.current-time');
    const divDurationTime = document.querySelector('.duration-time');

    let currentMinutes, durationMinutes, currentSeconds, durationSeconds;

    currentMinutes =  Math.floor(audio.currentTime / 60);
    durationMinutes = Math.floor(audio.duration / 60);
    currentSeconds = returnTime(Math.floor(audio.currentTime % 60));
    durationSeconds = returnTime(Math.floor(audio.duration % 60));

    divCurrentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
    divDurationTime.innerHTML = `${durationMinutes}:${durationSeconds}`;

    function returnTime(time) {
        return time < 10 ? `0${time.toString()}` : time;
    }
}

audio.onloadeddata = () => {
    setName(index);
    setImage(index);
}

currentVolume.style.width = `${audio.volume * 100}%`;

progressBar.onclick = atualizaProgressoClick;
volumeBar.addEventListener('click', atualizaVolumeClick);

audio.onvolumechange = () => {
    currentVolume.style.width = `${audio.volume * 100}%`;
}

avancar.addEventListener('click', avancarAudio);
retroceder.addEventListener('click', retrocederAudio);

