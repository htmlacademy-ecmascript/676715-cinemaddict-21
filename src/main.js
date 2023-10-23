import ProfileView from './view/profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import SortView from './view/sort-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import {render} from './framework/render.js';

const headerContainer = document.querySelector('.header');
const siteMainContainer = document.querySelector('.main');
const boardPresenter = new BoardPresenter({boardContainer: siteMainContainer});
const footerStatisticsContainer = document.querySelector('.footer__statistics');

render(new ProfileView(), headerContainer);
render(new MainNavigationView(), siteMainContainer);
render(new SortView(), siteMainContainer);

boardPresenter.init();

render(new FooterStatisticsView(), footerStatisticsContainer);
