const playPause = document.getElementById('playPause');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const volume = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const timeLeft = document.getElementById('timeLeft');
const artist = document.getElementById('artist');
const songName = document.getElementById('songName');
const albumCover = document.getElementById('albumCover');
const mainCont = document.getElementById('mainCont');
const upNextAlbumCover = document.getElementById('upNextAlbumCover');
const nextSongUp = document.getElementById('nextSongUp');

const progressSize = 290;
const progress = document.getElementById('progressI');
const progressDone = document.getElementById('progressDoneI');


const playlist = ["Bonk sound effect.mp3","Ladyfingers.mp3","The Beatles - Don't Let Me Down.mp3","Zabranjeno Pušenje - Možeš imat moje tijelo.mp3",  "Clear The Lane.mpeg", "Pravo Ja.mp3"]
const albumCoverArr = ['doom.jpeg', 'ladyfingers.jpg', 'dontletmedown.jpg', 'mozesimat.jpg', 'clearthelane.jpg', 'hladnopivo.jpg']
const artistArr = ['Bonk', 'Herb Alpert', 'The Beatles', 'Zabranjeno Pušenje', 'Pero Jazvo', 'Hladno Pivo']
const songNameArr = ['Bonk', 'Ladyfingers', "Don't Let Me Down", "Možeš imat' moje tijelo", 'Clear The Lane', 'Pravo Ja']
const playlistLen = playlist.length -1; 
const song = new Audio();
let i = 0;
let j = 1;




function playSong(){
    song.src = playlist[i];
    song.play()
    artist.innerHTML = artistArr[i];
    songName.innerHTML = songNameArr[i];
    albumCover.src = albumCoverArr[i];
    upNextAlbumCover.src = albumCoverArr[j];
    nextSongUp.innerHTML = songNameArr[j] + ' - ' + artistArr[j];
    mainCont.style.backgroundImage = "url("+albumCoverArr[i]+")"
}


function pauseSong(){
    song.pause()
}

function nextSong(){
    i++;
    if(i > playlistLen){
        i = 0;
    }

    j++;
    if(j > playlistLen){
        j = 0;
    }

    playSong()

}

function prevSong(){
    i--;
    if(i < 0){
        i = playlistLen;
    }

    j--;
    if(j < 0){
        j = playlistLen;
    }

    playSong();
   
}

function progressBar(){
     const size = parseInt(song.currentTime*progressSize/song.duration)
     progressDone.style.width = size + 'px';
 }

function songDuration(){

    let duration = song.duration.toFixed(0);
    let current = song.currentTime.toFixed(0)
    let minutes = Math.floor(current / 60);
    let seconds = Math.floor(current - minutes * 60);
    if(seconds < 10){
        currentTime.innerHTML = '0' + minutes + ':' + '0' +seconds;
    } else {
        currentTime.innerHTML = '0' + minutes + ':' + seconds;
    }
    let minutesD = Math.floor(duration / 60);
    let secondsD = Math.floor(duration - minutesD * 60);
    let minutesLeft = minutesD - minutes;
    let secondsLeft = secondsD - seconds;
    if(secondsLeft < 10){
        timeLeft.innerHTML = '0' + minutesLeft + ':' + '0' + secondsLeft;
    } else {
        timeLeft.innerHTML = '0' + minutesLeft + ':' + secondsLeft;
    }
}

let songPlaying = false;


playPause.addEventListener('click', function(){

    if(songPlaying === false){
        if(song.currentTime === 0){
            songPlaying = true;
            playPause.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
            playSong()
        } else if(song.currentTime != 0){
            songPlaying = true;
            playPause.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
            song.play()
        }
    } else if(songPlaying === true){
        songPlaying = false;
        playPause.innerHTML = '<i class="fas fa-play fa-3x">';
        pauseSong()
    }

    setInterval(progressBar, 500)
    setInterval(songDuration, 1000)
})


song.addEventListener('ended', function(){
    i++;
    playSong()

})

next.addEventListener('click', function(){
    nextSong();
    playPause.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
})

prev.addEventListener('click', function(){
    prevSong();
    playPause.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
})

volume.addEventListener('change', function(e){
    song.volume = e.currentTarget.value / 100;
})