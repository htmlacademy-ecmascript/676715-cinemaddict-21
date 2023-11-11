import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function formatStringToYear(date) {
  return dayjs(date).format('YYYY');
}

function formatStringToDate(date) {
  return dayjs(date).format('DD MMMM YYYY');
}

function getFilmDurationInHours(filmDuration) {
  if (filmDuration < 60) {
    return dayjs.duration(filmDuration, 'minutes').format('mm[m]');
  } else {
    return dayjs.duration(filmDuration, 'minutes').format('H[h] mm[m]');
  }
}

function formatStringToDateTime(date) {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
}

function isFilmInWachlist(inWatchlist) {
  // console.log(`userDetails.inWatchlist: ${inWatchlist}`);
  return inWatchlist === true;
}

function isFilmAlreadyWatched(alreadyWatched) {
  // console.log(`userDetails.alreadyWatched: ${alreadyWatched}`);
  return alreadyWatched === true;
}

function isFilmInFavorites(isFavorite) {
  // console.log(`userDetails.isFavorite: ${isFavorite}`);
  return isFavorite === true;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortFilmDate(filmA, filmB) {
  return new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);
}

function sortFilmRating(filmA, filmB) {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
}

export {formatStringToYear, formatStringToDate, getFilmDurationInHours, formatStringToDateTime, isFilmInWachlist, isFilmAlreadyWatched, isFilmInFavorites, capitalizeFirstLetter, sortFilmDate, sortFilmRating};
// export {formatStringToYear, formatStringToDate, getFilmDurationInHours, formatStringToDateTime, isFilmInWachlist};
