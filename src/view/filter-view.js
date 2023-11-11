import AbstractView from '../framework/view/abstract-view.js';
import {capitalizeFirstLetter} from '../utils/film.js';

function createMoviesCount(count) {
  return /* html */ `
    <span class="main-navigation__item-count">${count}</span>
  `;
}

// function createFilterItemTemplate(filter, isChecked) {
function createFilterItemTemplate(filter) {
  // console.log(`filter: ${filter}`);
  const {type, hasFilms} = filter;

  // console.log(`filter: ${Object.entries(filter)}`);
  // console.log(`type: ${type}`);
  // console.log(`hasFilms: ${hasFilms}`);
  // console.log(`isChecked: ${isChecked}`);

  // return /* html */ `
  // <!--<nav class="main-navigation">
  //   <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  //   <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  //   <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  //   <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  // </nav>
  // -->
  // `;

  return /* html */ `
    <a href="#${type}" class="main-navigation__item">${type === 'all' ? 'All movies' : capitalizeFirstLetter(type)} ${type === 'all' ? '' : createMoviesCount(hasFilms)}</a>
  `;
}

function createFilterTemplate(filterItems) {
  // console.log(`filterItems: ${filterItems}`);
  // const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join('');
  return /* html */ `
    <nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>
  `;
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
