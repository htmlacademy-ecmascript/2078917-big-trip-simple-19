import Model from './model';

/**
 * Модель для взаимодействия с хранилищем
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;
  #filter;
  #sort;

  /**
  * @type {Item[]}
  */
  #items;

  /**
   * @param {Object} setup
   * @param {Store<Item>} setup.store
   * @param {FilterCallback<ItemAdapter>} [setup.filter]
   * @param {SortCallback<ItemAdapter>} [setup.sort]
   * @param {AdaptCallback<Item,ItemAdapter>} setup.adapt
   */
  constructor(setup) {
    super();

    this.#store = setup.store;
    this.#adapt = setup.adapt;
    this.#filter = setup.filter;
    this.#sort = setup.sort;
  }

  /**
   * @override
   */
  async ready() {
    this.#items = await this.#store.list();
  }

  /**
  * @param {FilterCallback<ItemAdapter>} filter callback-функция для фильтрации
  * @param {boolean} notify true - вызвать событие "filter"
  */
  setFilter(filter, notify = true) {
    this.#filter = filter;
    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }
  }

  getFilter() {
    return this.#filter;
  }

  /**
  * @param {SortCallback<ItemAdapter>} sort - callback-функция для сортировки
  * @param {boolean} notify true - вызвать событие "sort"
  */
  setSort(sort, notify = true) {
    this.#sort = sort;
    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }
  }

  getSort() {
    return this.#sort;
  }

  /**
   * Получить отсортированный, отфильтрованный, адаптированный список точек маршрута из локлаьной коллекции
   * @param {FilterCallback<ItemAdapter>} filter - callback-функция для фильрации, задана по умолчанию
   * @param {SortCallback<ItemAdapter>} sort - callback-функция для сортировки, задана по умолчанию
   * @returns ItemAdapter[] - отсортированный, отфильтрованный, адаптированный локальная коллекция
   */
  list(
    filter = this.getFilter(),
    sort = this.getSort()
  ) {
    return this.listAll().filter(filter).sort(sort);
  }

  /**
   * Получить адаптированный массив точек маршрута из локальной коллекции
   * @returns адаптированный массив точек маршрута
   */
  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
  * @param {number} [index]
  * @returns {ItemAdapter}
  */
  item(index) {
    if (arguments.length) {
      const item = this.#items[index];
      return item && this.#adapt(item);
    }
    return this.#adapt();
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
 * @param {string} id
 */
  findById(id) {
    return this.findBy('id', id);
  }

  /**
  * @param {string} key
  * @param {*} value
  */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
  * @param {string} id
  */
  findIndexById(id) {
    return this.findIndexBy('id', id);
  }

  /**
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);
    this.dispatchEvent(new CustomEvent('add', {detail}));

    return detail;
  }

  /**
  * @param {ItemAdapter} item
  */
  async update(item) {
    const newItem = await this.#store.update(item.toJSON());
    const index = this.findIndexById(item.id);
    const detail = {
      'oldItem': this.item(index),
      'newItem': this.#adapt(newItem)
    };

    this.#items.splice(index, 1, newItem);
    this.dispatchEvent(new CustomEvent('update', {detail}));

    return detail;
  }

  /**
  * @param {string} id
  */
  async delete(id) {
    await this.#store.delete(id);

    const index = this.findIndexById(id);
    const detail = this.item(index);

    this.#items.splice(index, 1);
    this.dispatchEvent( new CustomEvent('delete', {detail}));

    return detail;
  }

}
