import Swiper from 'swiper';
import { Pagination, Thumbs, Navigation } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import resizeCallback from './utils/resize-callback';

const MOBILE_MAX_WIDTH = 767;
let isMobile: boolean;
let swiperThumbs: Swiper;
let swiper: Swiper;

const swiperThumbsOptions: SwiperOptions = {
  spaceBetween: 10,
  slidesPerView: 3,
  direction: 'vertical',
  watchSlidesProgress: true,
};

const swiperOptions: SwiperOptions = {
  modules: [Pagination, Thumbs, Navigation],
  slidesPerView: 1,
  spaceBetween: 40,
  initialSlide: 1,
  pagination: {
    el: '#swiper-pagination2',
    clickable: true,
  },
};

const initializeSwiper = (width: number) => {
  isMobile = width <= MOBILE_MAX_WIDTH;

  if (!isMobile) {
    swiperThumbs = new Swiper('#swiper2-thumbs', swiperThumbsOptions);
    swiperOptions.thumbs = { swiper: swiperThumbs };
    swiperOptions.navigation = false;
  } else {
    swiperOptions.thumbs = null;
    swiperOptions.navigation = {
      nextEl: '#swiper-button-next2',
      prevEl: '#swiper-button-prev2',
    };
  }

  swiper = new Swiper('#swiper2', swiperOptions);
};

initializeSwiper(window.innerWidth);

resizeCallback((width) => {
  const isMobileNew = width <= MOBILE_MAX_WIDTH;

  if (isMobile !== isMobileNew) {
    isMobile = isMobileNew;

    swiperThumbs?.destroy(true, true);
    swiper?.destroy(true, true);
    swiperThumbs = null;
    swiper = null;

    initializeSwiper(width);
  }
});
