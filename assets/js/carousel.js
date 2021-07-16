class Carousel {
    constructor(p) {

        //let settings = this._initConfig(p);
        let settings = (() =>({...{containerID: '#carousel',slide:'.slide',isPlaying:true,interval:5000},...p}))();

        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slide);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
    }
//var 3 ничего
//var2
//     _initConfig(o){
//         const p = {containerID: '#carousel',slide:'.slide',isPlaying:true,interval:5000};
//         return {...p, ...o};
// }
//var 1
    // _initConfig(o){
    //     console.log(o);
    //     let settings = {containerID: '#carousel',slide:'.slide',isPlaying:true,interval:5000};
    //
    //     if (typeof o !== 'undefined'){
    //         settings.containerID = o.containerID || settings.containerID;
    //         settings.slide = o.slide || settings.slide;
    //         settings.isPlaying = o.isPlaying === false ? false : settings.isPlaying;
    //         settings.interval = o.interval || settings.interval;
    //     }
    //     return settings;
    // }
    _initProps(){
        this.slidesCount = this.slides.length;
        this.currentSlide = 0;


        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.FA_PAUSE = '<i class ="far fa-pause-circle"></i>';
        this.FA_PLAY = '<i class ="far fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    }
    _initControls(){
        const controls = document.createElement('div');
        const pause =`<span id="pause-btn" class="control control-pause" >${this.FA_PAUSE}</span>`;
        const prev =`<span id="prev-btn" class="control control-prev" >${this.FA_PREV}</span>`;
        const next =`<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = pause + prev + next;

        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initIndicators(){
        const indicators = document.createElement('ol');

        indicators.setAttribute('class', 'indicators');

        for (let i = 0, n = this.slidesCount; i < n; i++) {
            const indicator = document.createElement('li');

            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;

            i === 0 && indicator.classList.add('active');

            indicators.appendChild(indicator);


        }
        this.container.appendChild(indicators);

        this.indContainer = this.container.querySelector('.indicators');
        this.indItems = this.container.querySelectorAll('.indicator');
    }
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
    }

    gotoSlide(n) {
        console.log(this.currentSlide, n);
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItems[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItems[this.currentSlide].classList.toggle('active');
    }
    prevSlide() {
        this.gotoSlide(this.currentSlide - 1);
    }
    nextSlide() {
        this.gotoSlide(this.currentSlide + 1);
    }
    pause() {

        if (this.isPlaying) {
            clearInterval(this.timerID);
            this.isPlaying = !this.isPlaying;
            this.pauseBtn.innerHTML = this.FA_PLAY;
        }
        console.log('pause',this.isPlaying);
    }
    play() {
        console.log('play');
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
        this.isPlaying = !this.isPlaying;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
    }

    pausePlay () {
        console.log('isPlaing',this.isPlaying);

        this.isPlaying ? this.pause() : this.play();
    }

    prev() {
        this.pause();
        this.prevSlide();
    }
    next() {
        this.pause();
        this.nextSlide();
    }

    indicate(e) {
        let target = e.target;
        if (target && target.classList.contains('indicator')) {
            this.pause();
            this.gotoSlide(+target.dataset.slideTo);
        }
    }
    pressKey(e) {
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        if (this.isPlaying) this.timerID = setInterval(() => this.nextSlide(), this.interval);

    }

}
class SwipeCarousel extends Carousel{


    _swipeStart(e){
        this.swipeStartX = e.changedTouches[0].pageX;
};
    _swipeEnd (e){
        this.swipeEndX = e.changedTouches[0].pageX;

        if(this.swipeStartX - this.swipeEndX > -100) this.prev();
        if(this.swipeStartX - this.swipeEndX <  100) this.next();
};

    _initListeners(){
        super._initListeners();
        this.container.addEventListener('touchstart',this._swipeStart.bind(this));
        this.container.addEventListener('touchend',this._swipeEnd.bind(this));

};
}
//proto !

// function Carousel(containerID = '#carousel',slide = '.slide',interval = 5000) {
//
//     this.container = document.querySelector(containerID);
//     this.slides = this.container.querySelectorAll(slide);
//
//     this.interval = interval;
// }
//
// Carousel.prototype = {
//     _initProps(){
//         this.slidesCount = this.slides.length;
//
//         this.currentSlide = 0;
//         this.isPlaying = true;
//
//         this.SPACE = ' ';
//         this.LEFT_ARROW = 'ArrowLeft';
//         this.RIGHT_ARROW = 'ArrowRight';
//         this.FA_PAUSE = '<i class ="far fa-pause-circle"></i>';
//         this.FA_PLAY = '<i class ="far fa-play-circle"></i>';
//         this.FA_PREV = '<i class="fas fa-angle-left"></i>';
//         this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
//     },
//     _initControls(){
//         const controls = document.createElement('div');
//         const pause =`<span id="pause-btn" class="control control-pause" >${this.FA_PAUSE}</span>`;
//         const prev =`<span id="prev-btn" class="control control-prev" >${this.FA_PREV}</span>`;
//         const next =`<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`;
//
//         controls.setAttribute('class', 'controls');
//         controls.innerHTML = pause + prev + next;
//
//         this.container.appendChild(controls);
//
//         this.pauseBtn = this.container.querySelector('#pause-btn');
//         this.prevBtn = this.container.querySelector('#prev-btn');
//         this.nextBtn = this.container.querySelector('#next-btn');
//     },
//
//     _initIndicators(){
//         const indicators = document.createElement('ol');
//
//         indicators.setAttribute('class', 'indicators');
//
//         for (let i = 0, n = this.slidesCount; i < n; i++) {
//             const indicator = document.createElement('li');
//
//             indicator.setAttribute('class', 'indicator');
//             indicator.dataset.slideTo = `${i}`;
//
//             i === 0 && indicator.classList.add('active');
//
//             indicators.appendChild(indicator);
//
//
//         }
//         this.container.appendChild(indicators);
//
//         this.indContainer = this.container.querySelector('.indicators');
//         this.indItems = this.container.querySelectorAll('.indicator');
//     },
//     _initListeners() {
//         //console.log('click pause',this.pauseBtn);
//         this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
//         this.prevBtn.addEventListener('click', this.prev.bind(this));
//         this.nextBtn.addEventListener('click', this.next.bind(this));
//         this.indContainer.addEventListener('click', this.indicate.bind(this));
//         document.addEventListener('keydown', this.pressKey.bind(this));
//     },
//
//     gotoSlide(n) {
//         console.log(this.currentSlide, n);
//         this.slides[this.currentSlide].classList.toggle('active');
//         this.indItems[this.currentSlide].classList.toggle('active');
//         this.currentSlide = (n + this.slidesCount) % this.slidesCount;
//         this.slides[this.currentSlide].classList.toggle('active');
//         this.indItems[this.currentSlide].classList.toggle('active');
//     },
//     prevSlide() {
//         this.gotoSlide(this.currentSlide - 1);
//     },
//     nextSlide() {
//         this.gotoSlide(this.currentSlide + 1);
//     },
//     pause() {
//
//         if (this.isPlaying) {
//
//             clearInterval(this.timerID);
//             this.isPlaying = !this.isPlaying;
//             this.pauseBtn.innerHTML = this.FA_PLAY;
//         }
//         console.log('pause',this.isPlaying);
//     },
//     play() {
//         console.log('play');
//         this.timerID = setInterval(() => this.nextSlide(), this.interval);
//         this.isPlaying = !this.isPlaying;
//         this.pauseBtn.innerHTML = this.FA_PAUSE;
//     },
//
//     pausePlay () {
//         console.log('isPlaing',this.isPlaying);
//
//         this.isPlaying ? this.pause() : this.play();
//     },
//
//     prev() {
//         this.pause();
//         this.prevSlide();
//     },
//     next() {
//         this.pause();
//         this.nextSlide();
//     },
//
//     indicate(e) {
//         let target = e.target;
//         if (target && target.classList.contains('indicator')) {
//             this.pause();
//             this.gotoSlide(+target.dataset.slideTo);
//         }
//     },
//     pressKey(e) {
//         if (e.key === this.LEFT_ARROW) this.prev();
//         if (e.key === this.RIGHT_ARROW) this.next();
//         if (e.key === this.SPACE) this.pausePlay();
//     },
//
//     init() {
//         this._initProps();
//         this._initControls();
//         this._initIndicators();
//         this._initListeners();
//         this.timerID = setInterval(() => this.nextSlide(), this.interval);
//     }
//
// };
//
// function SwipeCarousel(){
//     Carousel.apply(this,arguments);
// }
//
// SwipeCarousel.prototype = Object.create(Carousel.prototype);
// SwipeCarousel.prototype.constructor = SwipeCarousel;
//
// SwipeCarousel.prototype._swipeStart = function (e){
//     this.swipeStartX = e.changedTouches[0].pageX;
// };
// SwipeCarousel.prototype._swipeEnd = function (e){
//     this.swipeEndX = e.changedTouches[0].pageX;
//
//     if(this.swipeStartX - this.swipeEndX > -100) this.prev();
//     if(this.swipeStartX - this.swipeEndX <  100) this.next();
// };
//
// SwipeCarousel.prototype._initListeners = function (){
//     Carousel.prototype._initListeners.apply(this);
//     this.container.addEventListener('touchstart',this._swipeStart.bind(this));
//     this.container.addEventListener('touchend',this._swipeEnd.bind(this));
//
// };


