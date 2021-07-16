const carousel = new SwipeCarousel({
    containerID: '.my-carousel',
    slide: '.item',
    isPlaying: false,
    interval: 1000
});
carousel.init();





// const carousel = new SwipeCarousel('.my-carousel', '.item', 1000);
// carousel.init();


// (function () {
//     const slides = document.querySelectorAll(".slide");
//     const indicatorsContainer = document.querySelector('#indicators-container');
//     const indicators = document.querySelectorAll('.indicator');
//     const pauseBtn = document.querySelector('#pause-btn');
//     const prevBtn = document.querySelector('#prev-btn');
//     const nextBtn = document.querySelector('#next-btn');
//     let slidesCount = slides.length;

//     let currentSlide = 0;
//     let isPlaying = true;
//     let timerID;
//     let interval = 1000;

//     const SPACE = ' ';
//     const LEFT_ARROW = 'ArrowLeft';
//     const RIGHT_ARROW = 'ArrowRight';
//     const FA_PAUSE = '<i class ="far fa-pause-circle"></i>';
//     const FA_PLAY = '<i class ="far fa-play-circle"></i>';

//     function gotoSlide(n) {
//         slides[currentSlide].classList.toggle('active');
//         indicators[currentSlide].classList.toggle('active');
//         currentSlide = (n + 5) % 5;
//         slides[currentSlide].classList.toggle('active');
//         indicators[currentSlide].classList.toggle('active');
//     }
//     const prevSlide = () => gotoSlide(currentSlide - 1);
//     const nextSlide = () => gotoSlide(currentSlide + 1);
//     function pause() {
//         if (isPlaying) {
//             clearInterval(timerID);
//             isPlaying = !isPlaying;
//             pauseBtn.innerHTML = FA_PLAY;
//         }

//     }
//     function play() {
//         timerID = setInterval(nextSlide, interval);
//         isPlaying = !isPlaying;
//         pauseBtn.innerHTML = FA_PAUSE;
//     }
//     const pausePlay = () => isPlaying ? pause() : play();

//     function prev() {
//         pause();
//         prevSlide();
//     }
//     function next() {
//         pause();
//         nextSlide();
//     };

//     function indicate(e) {
//         let target = e.target;
//         const index = target.getAttribute('data-slide-to');
//         if (target && target.classList.contains('indicator')) {
//             pause();
//             gotoSlide(+index);
//         }
//     }
//     function pressKey(e) {
//         if (e.key === LEFT_ARROW) prev();
//         if (e.key === RIGHT_ARROW) next();
//         if (e.key === SPACE) pausePlay();

//     }


//     function initListeners() {
//         pauseBtn.addEventListener('click', pausePlay);
//         prevBtn.addEventListener('click', prev);
//         nextBtn.addEventListener('click', next);
//         indicatorsContainer.addEventListener('click', indicate);
//         document.addEventListener('keydown', pressKey);
//     }

//     function init() {
//         initListeners();
//         timerID = setInterval(nextSlide, interval);
//     }
//     init();
// }());




