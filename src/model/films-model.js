import {getMockFilms} from '../mocks/index.js';
// import { FILMS_COUNT } from '../mocks/index.js';

export default class FilmsModel {
  // films = Array.from({length: FILMS_COUNT}, getMockFilms);
  // console.log(`getMockFilms: ${getMockFilms}`);
  #films = getMockFilms();

  get () {
    // this.films.forEach((film) => console.log(film));
    return this.#films;
  }
}
