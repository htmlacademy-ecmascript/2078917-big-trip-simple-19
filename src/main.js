import './views/hello-world';
import './views/filter-view';
import './views/sort-view';
import ListView from './views/list-view';
import './views/point-view';
import './views/point-view.css';
import './views/new-point-editor-view';

import Store from './store.js';

import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestinationAdapter from './adapters/destination-adapter';
import OfferGroupAdapter from './adapters/offer-group-adapter';

import {FilterType, SortType} from './enums';
import {filterCallbackMap, sortCallbackMap} from './maps';

import ListPresenter from './presenters/list-presenter';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic er882jdzhcw';

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (x) => new DestinationAdapter(x)
});

/**
 * @type {Store<OfferGroup>}
 */
const offerGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offerGroupsModel = new CollectionModel({
  store: offerGroupsStore,
  adapt: (x) => new OfferGroupAdapter(x)
});

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (x) => new PointAdapter(x),
  filter: filterCallbackMap[FilterType.EVERYTHING],
  sort: sortCallbackMap[SortType.DAY]
});

const models = [pointsModel, destinationsModel, offerGroupsModel];

const listView = document.querySelector(String(ListView));


const {log/*, table*/} = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {
    new ListPresenter(listView, models);
    // table(pointsModel.list());
    // log('Points', pointsModel.listAll());
    // log('Point id=1', pointsModel.item(1));
    // log('Point id=2', pointsModel.findById('2'));
    // log('Point bp=800', pointsModel.findBy('basePrice', 800));
    // log('Point id for bp=800', pointsModel.findIndexBy('basePrice', 800));
    // log('Destinations', destinationsModel.listAll());
    // log('Offer groups', offerGroupsModel.listAll());
    // const logEvent = (event) => log(event.type, event.detail);

    // pointsModel.addEventListener('add', logEvent);
    // pointsModel.addEventListener('update', logEvent);

    // const item = pointsModel.item();

    // item.basePrice = 100;
    // item.startDate = new Date().toJSON();
    // item.endDate = item.startDate;
    // item.destinationId = '1';
    // item.offerIds = [];
    // item.type = 'bus';

    // const addedItem = await pointsModel.add(item);

    // addedItem.basePrice = 200;
    // addedItem.type = 'taxi';

    // await pointsModel.update(addedItem);
  })

  .catch((error) => {
    log(error);
  });
/*pointsStore.list().then(async (items) => {
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
*/

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
