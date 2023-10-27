import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function formatStringToYear(date) {
  return dayjs(date).format('YYYY');
}

function formatStringToDate(date) {
  return dayjs(date).format('DD MMMM YYYY');
  // return dayjs(date).format('DD YYYY');
}

function getFilmDurationInHours(filmDuration) {
  if (filmDuration < 60) {
    return dayjs.duration(filmDuration, 'minutes').format('mm[m]');
  } else {
    return dayjs.duration(filmDuration, 'minutes').format('H[h] mm[m]');
  }
}

function formatStringToDateTime(date) {
  // return dayjs(date).format('YYYY/MM/DD HH:mm');
  return dayjs(date).format('YYYY/MM/DD HH:mm');
}

function getArrayElementsInRow(array) {
  let x;
  if (array.length > 1) {
    x = array.join(', ');
  } else {
    x = array;
  }
  return x;
}

export {formatStringToYear, formatStringToDate, getFilmDurationInHours, formatStringToDateTime, getArrayElementsInRow};
