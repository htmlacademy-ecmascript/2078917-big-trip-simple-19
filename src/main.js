import './views/hello-world';
import './views/filter-view';
import './views/sort-view';
import './views/list-view';
import './views/point-view';
import './views/point-view.css';
import './views/new-point-editor-view';
import Store from './store.js';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic er882jdzhcw';

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);

/**
 * @type {Store<Offer>}
 */
const offerGroupsStore = new Store(`${BASE}/offers`, AUTH);

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
pointsStore.list().then(async (items) => {
  const {log} = console;

  log('Points: List', items);

  const date = new Date().toJSON();
  const item = await pointsStore.add({
    'base_price': 100,
    'date_from': date,
    'date_to': date,
    'destination': 1,
    'offers': [],
    'type': 'bus'
  });

  log('Points: Add', item);

  item['base_price'] = 200;
  log('Points: Update', await pointsStore.update(item));

  log('Points: Delete', await pointsStore.delete(item.id));

  log('Destinations: List', await destinationsStore.list());

  log('offerGroups: List', await offerGroupsStore.list());
});


// const siteHeaderElement = document.querySelector('.page-header');
// const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
// const tripMainHeader = siteHeaderElement.querySelector('.trip-main');
// render(new NewEventButtonView(), tripMainHeader);
// render(new FilterPanelView(), filterContainer);

// const siteMainElement = document.querySelector('.page-main');
// const tripEvents = siteMainElement.querySelector('.trip-events');
// const eventListPresenter = new EventListPresenter({listContainer: tripEvents});
// render(new SortPanelView(), tripEvents);
// eventListPresenter.init();
