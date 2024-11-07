import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import resizeCallback from './utils/resize-callback';

const MOBILE_MAX_WIDTH = 767;
let isMobile: boolean;
let swiper: Swiper;

const initializeSwiper = (width: number) => {
  isMobile = width <= MOBILE_MAX_WIDTH;

  if (isMobile) {
    swiper = new Swiper('#swiper', {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 40,
      maxBackfaceHiddenSlides: 0,
      pagination: {
        el: '#swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '#swiper-button-next',
        prevEl: '#swiper-button-prev',
      },
    });
  }
};

initializeSwiper(window.innerWidth);

resizeCallback((width) => {
  const isMobileNew = width <= MOBILE_MAX_WIDTH;

  if (isMobile === isMobileNew) return;

  isMobile = isMobileNew;

  if (isMobile) {
    initializeSwiper(width);
  } else {
    swiper?.destroy(true, true);
    swiper = null;
  }
});
