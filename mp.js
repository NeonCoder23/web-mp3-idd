
let playerContainer = document.querySelector(".player");
let now_playing = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".playpause-track")
let prevBtn = document.querySelector(".prev-track")
let nextBtn = document.querySelector(".next-track")

let seekSlider = document.querySelector(".seek-slider")
let volumeSlider = document.querySelector(".volume-slider")
let currTime = document.querySelector(".current-time")
let totalTime = document.querySelector(".total-duration")

let wave = document.querySelector("#wave");
let randomIcon = document.querySelector(".fa-random")

let currAudio = document.createElement("audio")

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;



const musicList = [

    {
        img: "./plimg.jpg",
        name: "Nemrud'un Kızı",
        artist: "Urfa Sıra Geceleri",
        music: "./Chuqur-Nemrudun_Kizi_(soundtrack).mp3"
    },
    {
        img: "./plimg.jpg",
        name: "33",
        artist: "Tohir Mahkamov & Mirzabek Xolmedov",
        music: "./33.mp3"
    },
    {
        img: "./plimg.jpg",
        name: "Shaytanat",
        artist: "Aziz Mullahonov",
        music: "./Shaytanat - shaytonlari_by AbYsmALLY records®.mp3"
    },
    {
        img: "./plimg.jpg",
        name: "Sunbula",
        artist: "Hamdam Sobirov",
        music: "./Xamdam Sobirov - Sunbula [www.Voydoda.Com].mp3"
    },
    {
        img: "./plimg.jpg",
        name: "Славянская душа",
        artist: "Михаил Шуфутинский",
        music: "./mihail-shufutinskiy-slavyanskaya-dusha.mp3"
    },

]

loadTrack(trackIndex);

function loadTrack(trackIndex) {
    clearInterval(updateTimer)
    reset();
    
    
    currAudio.src = musicList[trackIndex].music;
    currAudio.load();

    trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    now_playing.textContent = "Musiqa" + (trackIndex + 1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currAudio.addEventListener("ended", nextTrack)

    randomBgColor()


}


function randomBgColor() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e']
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }

    let color1 = populate("#")
    let color2 = populate("#")

    let angle = "to top right";
    let gradient = `linear-gradient(${angle}, ${color1}, ${color2})`;
    playerContainer.style.background = gradient;
}

function reset() {
    currTime.textContent = "00:00";
    totalTime.textContent = "00:00";
    seekSlider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add("randomActive");

}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove("randomActive");
}
playPauseBtn.addEventListener("click", playpauseTrack)
function repeatTrack() {
    let currIndex = trackIndex;
    loadTrack(currIndex);
    playTrack()
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    currAudio.play();
    isPlaying = true;
    trackArt.classList.add("rotate")
    wave.classList.add("loader")
    playPauseBtn.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
}
function pauseTrack() {
    currAudio.pause();
    isPlaying = false;
    trackArt.classList.remove("rotate")
    wave.classList.remove("loader")
    playPauseBtn.innerHTML = '<i class="fa fa-play fa-3x"></i>';
}
function nextTrack() { 
    if (trackIndex < musicList.length - 1 && isRandom === false) {
        trackIndex += 1;
    } else if (trackIndex < musicList.length - 1 && isRandom === true) {
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex;
    } else {
        trackIndex = 0;
    }

    loadTrack(trackIndex)
    playTrack()
}
function prevTrack() {
    if (trackIndex > 0) {
        trackIndex -= 1;

    } else {
        trackIndex = musicList.length - 1;

    }
    loadTrack(trackIndex)
    playTrack()
}

function seekTo() {
    let seekto = currAudio.duration * (seekSlider.value / 100);
    currAudio.currentTime = seekto;
}

function setVolume() {
    currAudio.volume = volumeSlider.value / 100;

}
function setUpdate() {
    let setPosition = 0;
    if (!isNaN(currAudio.duration)) {
        setPosition = currAudio.currentTime * (100 / currAudio.duration)
        seekSlider.value = setPosition;

        let currMinuts = Math.floor(currAudio.currentTime / 60)
        let currSeconds = Math.floor(currAudio.currentTime - currMinuts * 60)
        let durMinuts = Math.floor(currAudio.duration / 60);
        let durSeconds = Math.floor(currAudio.duration - durMinuts * 60)

        if (currSeconds < 10) {
            currSeconds = "0" + currSeconds;
        }
        if (durSeconds < 10) {
            durSeconds = "0" + durSeconds;
        }
        if (currMinuts < 10) {
            currMinuts = "0" + currMinuts;
        }
        if (durMinuts < 10) {
            durMinuts = "0" + durMinuts;
        }


        currTime.textContent = currMinuts + ":" + currSeconds;
        totalTime.textContent = durMinuts + ":" + durSeconds;

    }
}



