import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');

let selectedTime = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
    console.log(options.defaultDate);
    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);

class Timer {
    constructor({onTick}) {
        this.isActive = false;
        this.onTick = onTick;
    }
    start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = convertMs(selectedTime - currentTime);
        console.log('setInterval  deltaTime', deltaTime);
        
        this.onTick(deltaTime);
    }, 1000);
    };
}
const timer = new Timer({
    onTick: updateClockFace,
});

startBtn.addEventListener('click', e => {
  timer.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateClockFace({ days, hours, minutes, seconds }) {
    d.textContent = `${days}`;
    h.textContent = `${hours}`;
    m.textContent = `${minutes}`;
    s.textContent = `${seconds}`;
 }