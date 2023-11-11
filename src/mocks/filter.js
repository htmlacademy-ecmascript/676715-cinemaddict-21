import {filter} from '../utils/filter.js';

// console.log(`filter in mock: ${Object.entries(filter)}`);
// filter.forEach((item) => {
//   console.log(`filter-item: ${Object.entries(item)}`);
// });


function generateFilters (films) {
  return Object.entries(filter).map(([filterType, filterFilms]) => ({type: filterType, hasFilms: filterFilms(films).length}));
}

export {generateFilters};
