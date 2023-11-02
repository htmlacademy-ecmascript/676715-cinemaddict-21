import BoardView from '../view/board-view.js';
import FilmsMainListView from '../view/main-list-view.js';
import FilmsMainListContainerView from '../view/main-list-films-container-view.js';
import NoFilmView from '../view/no-film-view.js';
import FilmView from '../view/film-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {remove, render} from '../framework/render.js';

const FILMS_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  // нужно #bodyContainer?
  #bodyContainer = null;
  #boardContainer = null;
  #filmsModel = null;

  #boardComponent = new BoardView();
  #filmsMainListComponent = new FilmsMainListView();
  #filmsMainListContainerComponent = new FilmsMainListContainerView();
  #filmPopupComponent = null;
  #showMoreButtonComponent = null;

  #boardFilms = [];
  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  constructor({bodyContainer, boardContainer, filmsModel}) {
    this.#bodyContainer = bodyContainer;
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#boardFilms = [...this.#filmsModel.get()];
    // console.log(`this.boardFilms: ${this.boardFilms}`);
    // this.boardFilms.forEach((film) => console.log(film));

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    const isEmpty = (this.#boardFilms.length === 0);
    if (isEmpty) {
      render(new NoFilmView(), this.#boardComponent.element);
      return;
    }

    render(this.#filmsMainListComponent, this.#boardComponent.element);
    render(this.#filmsMainListContainerComponent, this.#filmsMainListComponent.element);

    for (let i = 0; i < Math.min(this.#boardFilms.length, FILMS_COUNT_PER_STEP); i++){
      this.#renderFilm(this.#boardFilms[i]);
    }

    if (this.#boardFilms.length > FILMS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
      render(this.#showMoreButtonComponent, this.#filmsMainListComponent.element);
    }
  }

  // #renderNoFilms = () => {
  //   const isEmpty = (this.#boardFilms.length === 0);
  //   this.#filmsListEmptyComponent = new NoFilmView ({filterType: this.#filterType, isEmpty});

  //   render(this.#filmsListEmptyComponent, this.#pointsListContainer);
  // }

  #renderFilm(film) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const filmComponent = new FilmView({film, onCardClick: () => {
      openPopup();
    }});

    const filmPopupComponent = new FilmPopupView ({film, onCloseClick: () => {
      closePopup();
    }});

    render(filmComponent, this.#filmsMainListContainerComponent.element);

    function openPopup() {
      render(filmPopupComponent, document.body);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function closePopup() {
      remove(filmPopupComponent);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  }

  #handleShowMoreButtonClick = () => {
    this.#boardFilms.slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP).forEach((film) => this.#renderFilm(film));
    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}
