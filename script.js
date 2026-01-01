const song = document.querySelector(".song");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let fakeDuration = 600;
let timer = null;
let remainingTime = fakeDuration;

// format mm:ss
function updateDisplay(time) {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  timeDisplay.textContent = `${min}:${sec}`;
}

updateDisplay(fakeDuration);

// Play / Pause
playBtn.addEventListener("click", () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    song.pause();
    video.pause();
    playBtn.textContent = "Play";
  } else {
    song.play();
    video.play();
    playBtn.textContent = "Pause";

    timer = setInterval(() => {
      remainingTime--;
      updateDisplay(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        timer = null;
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.textContent = "Play";
      }
    }, 1000);
  }
});

// Change sound/video
soundButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    song.src = this.dataset.sound;
    video.src = this.dataset.video;
  });
});

// Change time
timeButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    fakeDuration = parseInt(this.dataset.time);
    remainingTime = fakeDuration;
    updateDisplay(fakeDuration);
  });
});
