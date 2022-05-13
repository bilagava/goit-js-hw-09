import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

// const dateTimePicker = document.querySelector('input#datetime-picker');
// console.log(dateTimePicker);
const btnStart = document.querySelector('button[data-start]');
const timerEl = document.querySelector('.timer');
const deysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEL = document.querySelector('.value[data-seconds]');

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  timerEl = setInterval(() => {
    return selectedDates - defaultDate;
  }, 1000);
});
console.log(timerEl);
