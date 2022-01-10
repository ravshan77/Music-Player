let fillbar = document.querySelector(".fill");
let audios = [
    "./mp3/Skriptonit_-_Polozhenie_izzamuzzic_remix_minus_66134991.mp3",
  "./mp3/Otnicka_where_are_you_slowed_black_trap_remix.mp3",
  "./mp3/Coolio-feat-LV_-_Ganstas-paradise.mp3"
];

let currentTime = document.querySelector(".time");

// audio obektni yaratib olamiz

let audio = new Audio();
let currentSong = 0;

// oyna yuklanganda, qo'shiq avtomatik ravishda ijro etilishi kerak

window.onload = playSong;

//  har doim oyna yuklanganda qo'shiqni shu funksiya orqali ijro qilnadi

function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}


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

// Endi to'ldirish panelini Dynamc qilamiz

audio.addEventListener("timeupdate", function () {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";

  // Davomiylik bulishini taminlamiz
  convertTime(Math.round(audio.currentTime));

  // qo'shiq tugagandan kiyin, navbatdagi qo'shiqqa o'tkazamiz
  if (audio.ended) {
    nextAudio();
  }
});

function convertTime(secunds) {
  let min = Math.floor(secunds / 60);
  let sec = secunds % 60;

  // timer vatlarini belgilaymiz
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;

  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let mint = Math.floor(seconds / 60);
  let secnt = secunds % 60;
  // qo'shiqning jami vaqtini belgilaymiz 

  mint = mint < 10 ? "0" + mint : mint;
  secnt = secnt < 10 ? "0" + secnt : secnt;
  currentTime.textContent += "&" + mint + ":" + secnt;
}

// o'tkazish va qaytarish buttonlarini belgilamiz

function nextAudio() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";

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

}

// ovozni kutarish va passaytirish buttonlarini belgilaymiz

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}

// ovozni uchirib quyish funksiyasini yozamiz
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
