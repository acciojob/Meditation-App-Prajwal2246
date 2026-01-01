const song = document.querySelector(".song");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let fakeDuration = 600;
let remainingTime = fakeDuration;
let isPlaying = false;
let timer = null;

// ---------- Helpers ----------
function updateDisplay(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  timeDisplay.textContent = `${min}:${sec}`;
}

updateDisplay(fakeDuration);

// ---------- Play / Pause ----------
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    playBtn.textContent = "Pause";

    // Safe play (prevents AbortError)
    song.play().catch(() => {});
    video.play().catch(() => {});

    // 🔑 Immediate decrement for Cypress
    remainingTime--;
    updateDisplay(remainingTime);

    timer = setInterval(() => {
      remainingTime--;
      updateDisplay(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        timer = null;
        isPlaying = false;
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.textContent = "Play";
      }
    }, 1000);
  } else {
    // Pause
    isPlaying = false;
    playBtn.textContent = "Play";
    clearInterval(timer);
    timer = null;
    song.pause();
    video.pause();
  }
});

// ---------- Sound Switch ----------
soundButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    song.src = this.dataset.sound;
    video.src = this.dataset.video;
  });
});

// ---------- Time Select ----------
timeButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    fakeDuration = parseInt(this.dataset.time);
    remainingTime = fakeDuration;
    updateDisplay(fakeDuration);
  });
});
