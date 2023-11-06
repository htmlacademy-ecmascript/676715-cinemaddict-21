import {FilterType} from '../const.js';
import {isFilmInWachlist, isFilmAlreadyWatched, isFilmInFavorites} from './film.js';
// import {isFilmInWachlist} from './film.js';

const filter = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.WATCHLIST]: (films) => films.filter((film) => isFilmInWachlist(film.userDetails.inWatchlist)),
  [FilterType.HISTORY]: (films) => films.filter((film) => isFilmAlreadyWatched(film.userDetails.alreadyWatched)),
  [FilterType.FAVORITES]: (films) => films.filter((film) => isFilmInFavorites(film.userDetails.isFavorite))
};

export {filter};
