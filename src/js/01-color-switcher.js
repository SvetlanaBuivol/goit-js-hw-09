const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerID = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick(e) {
        timerID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000
        );
    startBtn.disabled = true;
}

function onStopClick(e) {
    clearInterval(timerID);
    startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
