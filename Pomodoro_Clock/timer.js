var timer,
secondsEl = document.getElementById("seconds"), 
minutesEl = document.getElementById("minutes"),
pauseEl = document.getElementById("pause"),
addButtonEl = document.getElementById("addTime"),
subtractButtonEl = document.getElementById("subtractTime"),
stopEl = document.getElementById("stop");

pauseEl.style.backgroundColor = "#c6ffb3";

var countDown = function () {
  var currentSeconds = parseFloat(secondsEl.textContent);
  var currentMinutes = parseFloat(minutesEl.textContent);
  if (currentSeconds > 0 && currentSeconds < 11) {
    secondsEl.textContent = "0" + (currentSeconds - 1);
  }
  else if (currentSeconds > 0) {
  secondsEl.textContent = currentSeconds - 1;
}
  else if (currentSeconds === 0 && currentMinutes > 0) {
    minutesEl.textContent = currentMinutes - 1;
    currentSeconds = 59;
    secondsEl.textContent = 59;
  }
  else {
    stopTimer();
    alert("You did it! Time for a break!")
  }
};


//STOP TIMER
var stopTimer = function() {
  window.clearInterval(timer);
  secondsEl.textContent = "00";
  minutesEl.textContent = "25";
    if (pauseEl.innerHTML == "Pause") {
      window.clearInterval(timer);
      pauseEl.style.backgroundColor = "#c6ffb3";
      pauseEl.innerHTML = "Start";
    }
};
stopEl.addEventListener("click", stopTimer);
//

//PAUSE TIMER
var pauseTimer = function() {
  if (pauseEl.innerHTML == "Pause") {
    window.clearInterval(timer);
    pauseEl.style.backgroundColor = "#c6ffb3";
    pauseEl.innerHTML = "Start";
  }
  else {
    pauseEl.style.backgroundColor = "#ffffb3";
    pauseEl.innerHTML = "Pause";
    startTimer();
  }
};
pauseEl.addEventListener("click", pauseTimer);
//

//START TIMER
var startTimer = function() {
timer = 
window.setInterval(countDown, 1000);
};
//

//ADD TIME
var addingTime = function() {
    minutesEl.textContent = parseFloat(minutesEl.textContent) + 1;
};
addButtonEl.addEventListener("click", addingTime);
//

//SUBTRACT TIME
var subtractingTime = function() {
  minutesEl.textContent = parseFloat(minutesEl.textContent) - 1;
};
subtractButtonEl.addEventListener("click", subtractingTime);
//