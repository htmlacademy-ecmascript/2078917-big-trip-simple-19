import SortPanelView from './view/sort-panel.js';
import FilterPanelView from './view/filter-panel.js';
import EventListPresenter from './presenter/event-list.js';
import NewEventButtonView from './view/new-event-button.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const tripMainHeader = siteHeaderElement.querySelector('.trip-main');
render(new NewEventButtonView(), tripMainHeader);
render(new FilterPanelView(), filterContainer);

const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter({listContainer: tripEvents});
render(new SortPanelView(), tripEvents);
eventListPresenter.init();
