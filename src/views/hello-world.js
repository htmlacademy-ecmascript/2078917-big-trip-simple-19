import {html} from '../utils';

export default class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = html`<h1>Hello World</h1>`;
  }

  changeColor() {
    this.style.color = 'red';
  }
}

customElements.define('hello-world', HelloWorld);
