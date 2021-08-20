let fillbar = document.querySelector(".fill");
let audios = [
    "./mp3/Skriptonit_-_Polozhenie_izzamuzzic_remix_minus_66134991.mp3",
  "./mp3/Dan_Balan_-_Funny_Love_53300430.mp3",
  "./mp3/Jony - Мир Сошёл С Ума.mp3"
];

let currentTime = document.querySelector(".time");

// create an object of audio

let audio = new Audio();
let currentSong = 0;

// whenever the window load, song should play automaticly

window.onload = playSong;

// let's play the song by this function whenever window load

function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}
console.log(audio.namespaceURI);

function togglePlay() {
  if (audio.paused) {
    audio.play();
    let playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"><i/>';
    playBtn.style.paddingLeft = "33px";
  } else {
    audio.pause();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    playBtn.style.paddingLeft = "33px";
  }
}

// now let's make dynamc the fillbar

audio.addEventListener("timeupdate", function () {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";
  // let's work on the duration
  convertTime(Math.round(audio.currentTime));

  // let'is work on the play next song when current song completed
  if (audio.ended) {
    nextAudio();
  }
});

function convertTime(secunds) {
  let min = Math.floor(secunds / 60);
  let sec = secunds % 60;

  // lets fix the songle digit
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;

  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let mint = Math.floor(seconds / 60);
  let secnt = secunds % 60;
  // lets fix the songle digit

  mint = mint < 10 ? "0" + mint : mint;
  secnt = secnt < 10 ? "0" + secnt : secnt;
  currentTime.textContent += "&" + mint + ":" + secnt;
}

// now let's work on next and prev buttons

function nextAudio() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";

  // just one line jquery
  $(".img img").attr("src", covers[currentSong]);
}

function prevAudio() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 2;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";

  // just one line jquery for changing the covers
  $(".img img").attr("src", covers[currentSong]);
}

//let's work on volume up, down and mute

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}

// fix the spaker muted button
let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function () {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    audio.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});
