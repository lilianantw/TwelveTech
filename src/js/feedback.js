import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Raty from 'raty-js'; 

let swiperInstance;

async function fetchFeedbacks() {
    const response = await fetch('https://sound-wave.b.goit.study/api/feedbacks');
    if (!response.ok) {
        throw new Error('Помилка завантаження');
    }

    const data = await response.json();
    console.log('Отримані відгуки:', data);
    return data.data;
}

function renderSlides(feedbacks) {
    const wrapper = document.getElementById('feedback-list');
    wrapper.innerHTML = '';

    feedbacks.forEach(({ id, name, descr, rating }) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.dataset.id = id;

        slide.innerHTML = `
        <div class="feedback-card">
            <h4>${name}</h4>
            <p>${descr}</p>
            <div class="star-rating" data-rating="${Math.round(rating)}"></div>
        </div>`;

        wrapper.appendChild(slide);
    });
}

function initStarRatings() {
    const starContainers = document.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        const rating = parseInt(container.dataset.rating, 10);
        Raty({
            element: container,
            readOnly: true,
            score: rating,
            starType: 'svg',
            starSize: 20,
            hints: [],
        });
    });
}

function updatePagination(activeIndex, slidesCount) {
    const firstBtn = document.getElementById('pagination-first');
    const middleBtn = document.getElementById('pagination-middle');
    const lastBtn = document.getElementById('pagination-last');

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

    swiperInstance = new Swiper('.feedback-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
    });

    swiperInstance.on('slideChange', () => {
        updatePagination(swiperInstance.activeIndex, slidesCount);
    });

    updatePagination(swiperInstance.activeIndex, slidesCount);

    document.getElementById('pagination-first').onclick = () => swiperInstance.slideTo(0);
    document.getElementById('pagination-last').onclick = () => swiperInstance.slideTo(slidesCount - 1);
    document.getElementById('pagination-middle').onclick = () => {
        if (slidesCount > 2) {
            swiperInstance.slideTo(1);
        }
    };
    initStarRatings();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchFeedbacks()
        .then(feedbacks => {
            renderSlides(feedbacks);
            initSwiper(feedbacks.length);
        })
        .catch(err => console.error(err));
});
