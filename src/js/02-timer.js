import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('input#datetime-picker');

const deysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEL = document.querySelector('.value[data-seconds]');

let timerId = null;
let selectedDate = '';

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    checkValidDate(selectedDate);
    getTimerValues();
  },
};

flatpickr(dateTimePicker, options);

function checkValidDate(date) {
  if (date < options.defaultDate) {
    Notify.failure('Please choose a date in the future', {
      timeout: 2000,
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    btnStart.setAttribute('disabled', true);
    return;
  }

  btnStart.removeAttribute('disabled');
}

function getTimerValues() {
  const startTime = Date.now();
  const resultTime = selectedDate - startTime;
  const time = convertMs(resultTime);
  if (resultTime > 0) {
    updateClockFace(time);
  }

  if (resultTime < 1000) {
    clearInterval(timerId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  deysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEL.textContent = addLeadingZero(seconds);
}

// function updateClockFace({ days, hours, minutes, seconds }) {
//   deysEl.textContent = days < 10 ? '0' + days : days;
//   hoursEl.textContent = hours < 10 ? '0' + hours : hours;
//   minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
//   secondsEL.textContent = seconds < 10 ? '0' + seconds : seconds;
// }

btnStart.addEventListener('click', () => {
  // if (timerId) {
  //   return;
  // }
  timerId = setInterval(getTimerValues, 1000);
  btnStart.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
