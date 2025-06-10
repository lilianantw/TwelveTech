const button = document.querySelector('.main-button')
    
button.addEventListener('click', function (e) {
    e.preventDefault();
document.querySelector('#artist-section').scrollIntoView({ behavior: 'smooth' });
});
