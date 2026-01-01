//your JS code here. If required.
const song=document.querySelector(".song") ;
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play") ;
const timeDisplay = document.querySelector(".time-display");


const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let fakeDuration = 600;

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
/* change sound and video */
soundButtons.forEach((btn)=>{
    btn.addEventListener("click",function(){
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");


        song.play();
        video.play();
        playBtn.textContent="Pause";
    })
})

/*  */
timeButtons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        fakeDuration=this.getAttribute("data-time");
        updateTime(fakeDuration);
    })
})

function updateTime(time){
    let min = Math.floor(time/60);
    let sec = time % 60;
    timeDisplay.textContent = `${min}:${sec}`
}

/* countodwn */
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let remaining = fakeDuration - currentTime;

  let minutes = Math.floor(remaining / 60);
  let seconds = Math.floor(remaining % 60);

  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= fakeDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    playBtn.textContent = "Play";
  }
};