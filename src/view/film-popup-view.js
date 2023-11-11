import AbstractView from '../framework/view/abstract-view.js';
import {getArrayElementsInRow} from '../utils/common.js';
import {formatStringToDate, getFilmDurationInHours, formatStringToDateTime} from '../utils/film.js';
import {getMockComments} from '../mocks/index.js';

function createCommentsListElementTemplate(listElement) {
  const {author, comment, date, emotion} = listElement;
  return /* html */ `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatStringToDateTime(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
}

function createCommentsListTemplate(comments) {
  let list = '';
  comments.forEach((comment) => getMockComments().find((mockComment) => {
    if (mockComment.id === comment) {
      list += createCommentsListElementTemplate(mockComment);
    }
  }));
  return list;
}

function createControlsTemplate({inWatchlist, alreadyWatched, isFavorite}) {
  const inWatchlistClassName = inWatchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClassName = alreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClassName = isFavorite ? 'film-details__control-button--active' : '';
  return /* html */ `
    <button type="button" class="film-details__control-button film-details__control-button--watchlist ${inWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
  `;
}

function createGenresListTemplate(genres) {
  return /* html */ genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
}

function createFilmPopupTemplate({comments, filmInfo, userDetails}) {
  // const {title, totalRating, poster, release, duration, genres, description} = filmInfo;
  const {title, altTitle, totalRating, poster, ageRating, director, writers, actors, release, duration, genres, description} = filmInfo;
  return /* html */ `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${altTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${getArrayElementsInRow(actors)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatStringToDate(release.date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${getFilmDurationInHours(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${createGenresListTemplate(genres)}
                    <!--<span class="film-details__genre">${genres}</span>
                    <span class="film-details__genre">рыба-Drama</span>
                    <span class="film-details__genre">рыба-Film-Noir</span>
                    <span class="film-details__genre">рыба-Mystery</span>-->
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            ${createControlsTemplate(userDetails)}
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
            ${createCommentsListTemplate(comments)}
            </ul>

            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  `;
}

export default class FilmPopupView extends AbstractView {
  #film = null;
  #handleCloseClick = null;
  #handleInWachlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({film, onCloseClick, onInWachlistClick, onAlreadyWatchedClick, onFavoriteClick}) {
    super();
    this.#film = film;
    this.#handleCloseClick = onCloseClick;
    this.#handleInWachlistClick = onInWachlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);

    const cardControls = this.element.querySelector('.film-details__controls');
    cardControls.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#inWachlistClickHandler);
    cardControls.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
    cardControls.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createFilmPopupTemplate(this.#film);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick(this.#film);
    // this.element.querySelector('.film-details__close-btn').removeEventListener('click', this.#closeClickHandler);
  };

  #inWachlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleInWachlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAlreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
