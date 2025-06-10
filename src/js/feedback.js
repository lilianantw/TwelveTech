import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { fetchFeedbacks } from './api';

let swiperInstance;

function renderSlides(feedbacks) {
    const wrapper = document.getElementById('feedback-list');
    wrapper.innerHTML = '';
    feedbacks.forEach(({ name, descr, rating }) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
            <div class="feedback-card">
                <div class="star-rating" data-rating="${Math.round(rating) || 0}"></div>
                <p class="feedback-text">"${descr}"</p>
                <p class="feedback-author">${name}</p>
            </div>`;
        wrapper.appendChild(slide);
    });
    initStarRatings();
}

function initStarRatings() {
    const starContainers = document.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        container.innerHTML = '';  // очищаємо контейнер перед ініціалізацією
        const rating = parseInt(container.dataset.rating, 10) || 0;
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('star', i <= rating ? 'on' : 'off');
            container.appendChild(star);
        }
    });
}


function updatePagination(activeIndex, slidesCount) {
    const firstBtn = document.getElementById('pagination-first');
    const middleBtn = document.getElementById('pagination-middle');
    const lastBtn = document.getElementById('pagination-last');

    if (!firstBtn || !middleBtn || !lastBtn) {
        console.error('Елементи пагінації не знайдено');
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

    // const swiperContainer = document.querySelector('.feedback-swiper');
    // if (!swiperContainer) {
    //     console.error('Контейнер .feedback-swiper не найден');
    //     return;
    // }

    swiperInstance = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
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
        console.error('Елементи пагінації не знайдено');
        return;
    }

    firstBtn.onclick = () => {
        console.log('Переход к первому слайду');
        swiperInstance.slideTo(0);
    };
    middleBtn.onclick = () => {
        if (slidesCount > 5) {
            console.log('Переход к среднему слайду');
            swiperInstance.slideTo(4);
        }
    };
    lastBtn.onclick = () => {
        console.log('Переход к последнему слайду');
        swiperInstance.slideTo(slidesCount - 1);
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const feedbacks = await fetchFeedbacks();
        if (!Array.isArray(feedbacks)) {
            console.error('Відгуки не масив:', feedbacks);
            return;
        }

        renderSlides(feedbacks);
        initSwiper(feedbacks.length);
    } catch (err) {
        console.error('Помилка ініціалізації відгуків:', err);
    }
});
