import type MobileMenuType from './mobile-menu-async';

const burgerEl = document.querySelector('.burger');
let mobileMenu: MobileMenuType;

burgerEl.addEventListener('click', () => {
  void (async () => {
    try {
      if (!mobileMenu) {
        const MobileMenu = (await import('./mobile-menu-async')).default;
        mobileMenu = new MobileMenu();
      }

      mobileMenu.open();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  })();
});
