import {ButtonState, FilterType, PointType, SortType} from './enums';

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
export const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (point) => point.endDateAsNumber > Date.now()
};

export const emptyListTitleMap = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

export const sortTitleMap = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFERS]: 'Offers'
};

export const sortDisabilityMap = {
  [SortType.DAY]: false,
  [SortType.EVENT]: true,
  [SortType.TIME]: true,
  [SortType.PRICE]: false,
  [SortType.OFFERS]: true
};

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
export const sortCallbackMap = {
  [SortType.DAY]: (point, nextPoint) => point.startDateAsNumber - nextPoint.endDateAsNumber,
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (point, nextPoint) => nextPoint.basePrice - point.basePrice,
  [SortType.OFFERS]: () => 0
};

export const pointTitleMap = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant'
};

export const filterTitleMap = {
  [FilterType.EVERYTHING]: 'Everything',
  [FilterType.FUTURE]: 'Future'
};

export const pointIconMap = Object.fromEntries(
  Object.values(PointType).map((item) => [item, `img/icons/${item}.png`])
);

export const saveButtonTextMap = {
  [ButtonState.DEFAULT]: 'Save',
  [ButtonState.PRESSED]: 'Saving...'
};

export const deleteButtonTextMap = {
  [ButtonState.DEFAULT]: 'Delete',
  [ButtonState.PRESSED]: 'Deleting...'
};
