import ProfileView from './view/profile-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsModel from './model/films-model.js';
import {render} from './framework/render.js';
import {generateFilters} from './mocks/filter.js';

// нужно #bodyContainer?
const bodyContainer = document.querySelector('body');
const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerStatisticsContainer = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
// const boardPresenter = new BoardPresenter({boardContainer: mainContainer, filmsModel});
// const boardPresenter = new BoardPresenter({bodyContainer: bodyContainer, boardContainer: mainContainer, filmsModel});
const boardPresenter = new BoardPresenter({bodyContainer, boardContainer: mainContainer, filmsModel});

const filters = generateFilters(filmsModel.get());
// filters.forEach((item) => {
//   console.log(`item: ${Object.entries(item)}`);
// });
// console.log(`filters: ${filters}`);

render(new ProfileView(), headerContainer);
// render(new FilterView({filters}), mainContainer);
render(new FilterView(filters), mainContainer);
render(new SortView(), mainContainer);

boardPresenter.init();

render(new FooterStatisticsView(), footerStatisticsContainer);
