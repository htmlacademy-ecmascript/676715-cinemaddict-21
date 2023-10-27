import AbstractView from '../framework/view/abstract-view.js';

function createBoardTemplate() {
  return /* html */ `
    <section class="films"></section>
  `;
}

export default class BoardView extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
