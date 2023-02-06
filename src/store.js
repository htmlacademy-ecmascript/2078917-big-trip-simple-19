/**
 * Хранилище. Класс для взаимодействия с сервером
 * @template Item - тип объекта для хранения
 */
export default class Store {
  #base;
  #auth;
  /**
   * @constructor
   * @param {string} base - основной URL
   * @param {string} auth - заголовок Authorization
   */
  constructor(base, auth) {
    this.#base = base;
    this.#auth = auth;
  }

  /**
   * @return {Promise<Item[]>}
   */
  list() {
    return this.request('/', {
      'method': 'get'
    });
  }

  /**
   * @param {Omit<Item, 'id'>} item
   * @return {Promise<Item>}
   */
  add(item) {
    return this.request('/', {
      'method': 'post',
      'body': JSON.stringify(item)
    });
  }

  /**
   * @param {Item} item
   * @return {Promise<Item>}
   */
  update(item) {

    // @ts-ignore
    return this.request(`/${item.id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {string} id
   * @return {Promise<string>}
   */
  delete(id) {
    return this.request(`/${id}`, {
      method: 'delete'
    });
  }

  /**
   * Запрос к серверу
   * @param {string} path - дополнительный путь к основному
   * @param {RequestInit} options - параметры
   */
  async request(path, options = {}) {
    const headers = {
      'content-type': 'application/json',
      'authorization': this.#auth,
      ...options.headers
    };

    const response = await fetch(this.#base + path, {...options, headers});
    const {assert, parse} = /** @type {typeof Store} */ (this.constructor);

    await assert(response);
    return parse(response);
  }

  /**
   * Проверка успешности ответа от сервера
   * @param {Response} response - ответ от сервера
   */
  static async assert(response) {
    if (!response.ok) {
      const message = `${response.status}. ${response.statusText}`;
      throw new Error(message, {
        cause: await response.json()
      });
    }
  }

  /**
   * Преобразование ответа в JSON или текст
   * @param {Response} response - ответ от сервера
   * @returns Промис ответа
   */
  static parse(response) {
    if (response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }
    return response.text();
  }
}
