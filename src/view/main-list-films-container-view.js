import AbstractView from '../framework/view/abstract-view.js';

function createFilmsMainListContainerTemplate() {
  return /* html */ `
    <div class="films-list__container"></div>
  `;
}

export default class FilmsMainListContainerView extends AbstractView {
  get template() {
    return createFilmsMainListContainerTemplate();
  }
}
