import BoardView from '../view/board-view.js';
import FilmsMainListView from '../view/main-list-view.js';
import FilmsMainListContainerView from '../view/main-list-films-container-view.js';
import FilmView from '../view/film-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../framework/render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsMainListComponent = new FilmsMainListView();
  filmsMainListContainerComponent = new FilmsMainListContainerView();
  // filmPopupComponent = new FilmPopupView();
  filmPopupComponent = null;

  constructor({bodyContainer, boardContainer, filmsModel}) {
    this.bodyContainer = bodyContainer;
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.boardFilms = [...this.filmsModel.get()];
    // console.log(`this.boardFilms: ${this.boardFilms}`);
    // this.boardFilms.forEach((film) => console.log(film));

    render(this.boardComponent, this.boardContainer);
    render(this.filmsMainListComponent, this.boardComponent.element);
    render(this.filmsMainListContainerComponent, this.filmsMainListComponent.element);

    for (let i = 0; i < this.boardFilms.length; i++){
      // console.log(`this.boardFilms[i]: ${this.boardFilms[i]}`);
      render(new FilmView({film: this.boardFilms[i]}), this.filmsMainListContainerComponent.element);
    }

    this.filmPopupComponent = new FilmPopupView({film: this.boardFilms[0]});
    render(this.filmPopupComponent, this.bodyContainer);

    render(new ShowMoreButtonView, this.filmsMainListComponent.element);
  }
}
