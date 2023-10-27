import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate() {
  return /* html */ `
    <button class="films-list__show-more">Show more</button>
  `;
}

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }
}
