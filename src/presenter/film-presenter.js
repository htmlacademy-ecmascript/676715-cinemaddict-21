import FilmView from '../view/film-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import {remove, render, replace} from '../framework/render.js';
import {Mode} from '../const.js';

export default class FilmPresenter {
  #filmsMainListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #filmComponent = null;
  #filmPopupComponent = null;
  #film = null;
  #mode = Mode.DEFAULT;

  constructor({filmsMainListContainer, onDataChange, onModeChange}) {
    this.#filmsMainListContainer = filmsMainListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(film) {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmView({film: this.#film, onCardClick: this.#handleCardClick, onInWachlistClick: this.#handleInWachlistClick, onAlreadyWatchedClick: this.#handleAlreadyWatchedClick, onFavoriteClick: this.#handleFavoriteClick});
    this.#filmPopupComponent = new FilmPopupView ({film: this.#film, onCloseClick: this.#handleCloseClick, onInWachlistClick: this.#handleInWachlistClick, onAlreadyWatchedClick: this.#handleAlreadyWatchedClick, onFavoriteClick: this.#handleFavoriteClick});

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmComponent, this.#filmsMainListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    // if (this.#filmsMainListContainer.contains(prevFilmComponent.element)) {
    //   replace(this.#filmComponent, prevFilmComponent);
    // }

    // if (this.#filmsMainListContainer.contains(prevFilmPopupComponent.element)) {
    //   replace(this.#filmPopupComponent, prevFilmPopupComponent);
    // }

    // remove(prevFilmComponent);
    // remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  }

  resetView() {
    if (this.#mode === !Mode.DEFAULT) {
      this.#closePopup();
    }
  }

  #openPopup() {
    render(this.#filmPopupComponent, document.body);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  }

  #closePopup() {
    remove(this.#filmPopupComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleCardClick = () => {
    this.#openPopup();
  };

  #handleCloseClick = (film) => {
    this.#handleDataChange(film);
    this.#closePopup();
  };

  #handleInWachlistClick = () => {
    this.#handleDataChange({...this.#film, inWachlist: !this.#film.userDetails.inWatchlist});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange({...this.#film, alreadyWatched: !this.#film.userDetails.alreadyWatched});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#film, isFavorite: !this.#film.userDetails.isFavorite});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closePopup();
      // document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
