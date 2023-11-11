import {SortType} from '../const.js';
import {sortFilmDate, sortFilmRating} from './film.js';

if(!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(fn) {
    return[...this].sort(fn);
  };
}

const sort = {
  // [SortType.DEFAULT]: (films) => [...films],
  [SortType.DATE]: (films) => films.toSorted(sortFilmDate),
  [SortType.RATING]: (films) => films.toSorted(sortFilmRating)
};

export {sort};
