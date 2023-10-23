import BoardView from '../view/board-view.js';
import FilmsMainListView from '../view/main-list-view.js';
import FilmsMainListContainerView from '../view/main-list-films-container-view.js';
import FilmsCardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../framework/render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsMainListComponent = new FilmsMainListView();
  filmsMainListContainerComponent = new FilmsMainListContainerView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.filmsMainListComponent, this.boardComponent.element);
    render(this.filmsMainListContainerComponent, this.filmsMainListComponent.element);

    for (let i = 0; i < 5; i++){
      render(new FilmsCardView(), this.filmsMainListContainerComponent.element);
    }
    render(new ShowMoreButtonView, this.filmsMainListComponent.element);
  }
}
