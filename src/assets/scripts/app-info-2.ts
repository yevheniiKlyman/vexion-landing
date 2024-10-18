import Swiper from 'swiper';
import { Pagination, Thumbs } from 'swiper/modules';

const swiperThumbs = new Swiper('#swiper2-thumbs', {
  spaceBetween: 10,
  slidesPerView: 3,
  direction: 'vertical',
  watchSlidesProgress: true,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const swiper = new Swiper('#swiper2', {
  modules: [Pagination, Thumbs],
  slidesPerView: 1,
  spaceBetween: 20,
  initialSlide: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  thumbs: {
    swiper: swiperThumbs,
  },
});
