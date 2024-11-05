import { disableBodyScroll, enableBodyScroll } from '../utils/body-scroll-lock';
import resizeCallback from '../utils/resize-callback';

export default class MobileMenu {
  #bodyEl = document.body;

  #burgerEl = this.#bodyEl.querySelector('.burger');

  #menuOpened = false;

  #resizeObserver: { removeCallback: () => void };

  #boundCloseHandler: EventListener;

  constructor() {
    this.#boundCloseHandler = this.#closeHandler.bind(this) as EventListener;
  }

  open(): void {
    if (this.#menuOpened) return;

    this.#menuOpened = true;
    disableBodyScroll();

    setTimeout(() => {
      this.#bodyEl.addEventListener('click', this.#boundCloseHandler);
      this.#resizeObserver = resizeCallback(() => {
        this.#close.call(this, 0);
      });
    });

    setTimeout(() => {
      this.#bodyEl.classList.add('mobile-menu-active', 'mobile-menu-opened');
      this.#burgerEl.classList.add('b-active');
    });
  }

  #close(time = 400): void {
    if (!this.#menuOpened) return;

    this.#menuOpened = false;
    this.#bodyEl.removeEventListener('click', this.#boundCloseHandler);
    this.#resizeObserver.removeCallback();

    this.#bodyEl.classList.remove('mobile-menu-opened');
    this.#burgerEl.classList.remove('b-active');
    setTimeout(() => {
      this.#bodyEl.classList.remove('mobile-menu-active');
      enableBodyScroll();
    }, time);
  }

  #closeHandler(e: Event): void {
    const target = e.target as Element;

    if (!target.closest('.mobile-menu')) {
      this.#close();
    }
  }
}
