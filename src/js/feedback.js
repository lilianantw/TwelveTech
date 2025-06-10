import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Raty from 'raty-js';

let swiperInstance;

async function fetchFeedbacks() {
  try {
    const response = await fetch(
      'https://sound-wave.b.goit.study/api/feedbacks'
    );
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data = await response.json();
    console.log('Полученные отзывы:', data);
    return data.data;
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    throw error;
  }
}

function renderSlides(feedbacks) {
  const wrapper = document.getElementById('feedback-list');
  if (!wrapper) {
    console.error('Элемент #feedback-list не найден');
    return;
  }
  wrapper.innerHTML = '';

  feedbacks.forEach(({ id, name, descr, rating }) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.dataset.id = id;

    slide.innerHTML = `
      <div class="feedback-card">
        <h4>${name}</h4>
        <p>${descr}</p>
        <div class="star-rating" data-rating="${Math.round(rating) || 0}"></div>
      </div>`;

    wrapper.appendChild(slide);
  });
}

function initStarRatings() {
  const starContainers = document.querySelectorAll('.star-rating');
  console.log('Найдено star-rating элементов:', starContainers.length);
  starContainers.forEach(container => {
    const rating = parseInt(container.dataset.rating, 10) || 0;
    console.log('Рейтинг для элемента:', rating);
    new Raty(container, {
      readOnly: true,
      score: rating,
      starType: 'svg',
      starSize: 20,
      hints: [],
      callbacks: {
        initialized: () => {
          console.log('Raty инициализирован для контейнера:', container);
          console.log(
            'SVG элементы:',
            container.querySelectorAll('svg').length
          );
        },
      },
    });
  });
}

function updatePagination(activeIndex, slidesCount) {
  const firstBtn = document.getElementById('pagination-first');
  const middleBtn = document.getElementById('pagination-middle');
  const lastBtn = document.getElementById('pagination-last');

  if (!firstBtn || !middleBtn || !lastBtn) {
    console.error('Один или несколько элементов пагинации не найдены');
    return;
  }

  firstBtn.classList.remove('active');
  middleBtn.classList.remove('active');
  lastBtn.classList.remove('active');

  if (activeIndex === 0) {
    firstBtn.classList.add('active');
  } else if (activeIndex === slidesCount - 1) {
    lastBtn.classList.add('active');
  } else {
    middleBtn.classList.add('active');
  }
}

function initSwiper(slidesCount) {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  const swiperContainer = document.querySelector('.feedback-swiper');
  if (!swiperContainer) {
    console.error('Контейнер .feedback-swiper не найден');
    return;
  }

  swiperInstance = new Swiper('.feedback-swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    on: {
      init: function () {
        console.log('Swiper инициализирован, activeIndex:', this.activeIndex);
        initStarRatings();
        updatePagination(this.activeIndex, slidesCount);
      },
      slideChange: function () {
        console.log('Слайд изменён, activeIndex:', this.activeIndex);
        initStarRatings();
        updatePagination(this.activeIndex, slidesCount);
      },
    },
  });

  const firstBtn = document.getElementById('pagination-first');
  const middleBtn = document.getElementById('pagination-middle');
  const lastBtn = document.getElementById('pagination-last');
  if (!firstBtn || !middleBtn || !lastBtn) {
    console.error('Один или несколько элементов пагинации не найдены');
    return;
  }

  firstBtn.onclick = () => {
    console.log('Переход к первому слайду');
    swiperInstance.slideTo(0);
  };
  middleBtn.onclick = () => {
    if (slidesCount > 2) {
      console.log('Переход к среднему слайду');
      swiperInstance.slideTo(1);
    }
  };
  lastBtn.onclick = () => {
    console.log('Переход к последнему слайду');
    swiperInstance.slideTo(slidesCount - 1);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  fetchFeedbacks()
    .then(feedbacks => {
      renderSlides(feedbacks);
      initSwiper(feedbacks.length);
    })
    .catch(err => console.error('Ошибка инициализации:', err));
});
