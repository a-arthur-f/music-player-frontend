//==================== OBJETOS DOM ====================
const audio = document.querySelector('#audio');
const play = document.querySelector('.playBtn');
const avancar = document.querySelector('.avancar');
const retroceder = document.querySelector('.retroceder');
const progressBar = document.querySelector('.progress_bar');
const progress = document.querySelector('.progress');
const volumeBar = document.querySelector('.volume-bar');
const currentVolume = document.querySelector('.current-volume');
const name = document.querySelector('.name');
const image = document.querySelector('.image img');
let state = 0; // 0 = pausado / 1 = tocando
let index = 0;

// Array com src das músicas disponiveis
const tracks = ['./musics/Earfquake.mp3', './musics/o_medo_e_a_licao.mp3'];

// Define a música inicial
audio.src = tracks[index];

//==================== FUNÇÕES ====================

// Função de play
const playAudio = () => {
    audio.play();
    play.firstChild.classList = 'fa fa-pause-circle-o'; // Muda o ícone de play para o de pause 
    state = 1; 
}

// Função de pause
const pauseAudio = () => {
    audio.pause();
    play.firstChild.classList = 'fa fa-play-circle-o'; // Muda o ícone de pause para o de play
    state = 0;
}

// Avança para a próxima música
const pularTrack = ( ) => {
    /*
    Atribui o valor da duração toal da música ao tempo atual, o que gera o efeito de pular
    para a próxima track
    */
    audio.currentTime = audio.duration;
}

// Volta a track anterior ou ao ínicio da música
const retrocederTrack = () => {
    // Se o tempo atual da música for maior que 2 segundos volta ao inicio da música
    if(audio.currentTime > 2)
        audio.currentTime = 0;

    // Senão volta pra track anterior
    else {
        // Se o index da track atrual for maior que o index da ultima track acrescenta 1 ao index
        if(index < tracks.length - 1) {
            ++index;
            audio.src = tracks[index];
            audio.load();
            playAudio();
        }

        // Senão reduz 1 do index
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
        image.src = './covers/Earfquake.jpg';

    else if(index === 1)
        image.src = './covers/o_medo_e_a_licao.jpg';
}

//==================== EVENTOS ====================

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

avancar.addEventListener('click', pularTrack);
retroceder.addEventListener('click', retrocederTrack);

