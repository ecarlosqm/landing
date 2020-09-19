var carrusel;

window.addEventListener('load', () => {

    let carruselId = null;

    const carrusel = new CarruselController({
        elementId: 'carrusel',
    })

    const configureCarrusel = () => {
        if (carruselId) {
            clearInterval(carruselId);
        }

        if (window.innerWidth >= 1440) {
            carruselId = setInterval(() => carrusel.next(), 7000);
            carrusel.changeItemsToShow(4);
        } else

        if (window.innerWidth >= 1024) {
            carruselId = setInterval(() => carrusel.next(), 8000);
            carrusel.changeItemsToShow(4);
        } else

        if (window.innerWidth >= 768) {
            carruselId = setInterval(() => carrusel.next(), 5000);
            carrusel.changeItemsToShow(2);
        } else {
            carruselId = setInterval(() => carrusel.next(), 4000);
            carrusel.changeItemsToShow(1);
        }
    }

    configureCarrusel();

    window.addEventListener('resize', () => {
        configureCarrusel();
    });

});

class CarruselModel {

    constructor({ children, itemsToshow = 1 }) {
        this.children = children;
        this.itemsToShow = itemsToshow;
        this.currentSlide = 0;

        this.observers = [];

    }

    get itemPosition() { return this.currentSlide * this.itemsToShow }

    changeItemsToShow(itemsToShow) {
        this.itemsToShow = itemsToShow;
        this.notifySlideChange();
    }

    onSlideChange(callback) {
        this.observers.push(callback);
        return () => this.observers.filter((observer) => observer != callback);
    }

    notifySlideChange(previusSlide) {
        this.observers.forEach(observer => {
            observer(this.slideItems, previusSlide ?? this.currentSlide, this.currentSlide);
        });
    }

    get slideItems() {
        let currentItems = []
        for (let index = this.itemPosition; index < this.itemPosition + this.itemsToShow; index++) {
            currentItems.push(this.children[index % this.children.length]);
        }
        return currentItems;
    }

    get numberOfSlides() {
        return Math.ceil(this.children.length / this.itemsToShow);
    }

    numberToValidSlidePosition(number) {
        if (number < 0) {
            return this.numberOfSlides - (Math.abs(number) % this.numberOfSlides);
        }
        return number % this.numberOfSlides;
    }

    previusSlide() {
        const prevSlide = this.currentSlide;
        this.currentSlide = this.numberToValidSlidePosition(this.currentSlide - 1);
        this.notifySlideChange(prevSlide);
    }

    nextSlide() {
        const prevSlide = this.currentSlide;
        this.currentSlide = this.numberToValidSlidePosition(this.currentSlide + 1);
        this.notifySlideChange(prevSlide);
    }

    goToSlide(slide) {
        const prevSlide = this.currentSlide;
        this.currentSlide = this.numberToValidSlidePosition(slide);
        this.notifySlideChange(prevSlide);
    }

}


class CarruselController {

    constructor({ elementId, itemsToShow = 1 }) {

        this.carrusel = document.getElementById(elementId);
        this.children = [];

        for (const child of this.carrusel.children) {
            this.children.push(child.cloneNode(true));
        }

        this.carruselModel = new CarruselModel({
            children: this.children,
            itemsToshow: itemsToShow,
        });

        this.carruselModel.onSlideChange((items, previusSlide, curentSlide) => {
            this.render(items, previusSlide, curentSlide);
        });

        this.render(this.carruselModel.slideItems, null, this.carruselModel.currentSlide);
    }

    next() {
        this.carruselModel.nextSlide();
    }

    previusSlide() {
        this.carruselModel.previusSlide();
    }

    goToSlide(slide) {
        this.carruselModel.goToSlide(slide);
    }

    changeItemsToShow(itemsToShow){
        this.carruselModel.changeItemsToShow(itemsToShow)
    }

    clearCarrusel() {
        let carruselChildren = this.carrusel.querySelectorAll('*');
        carruselChildren.forEach((element) => element.remove());
    }

    selectAnimation(previusSlide, currentSlide) {
        if (previusSlide === this.carruselModel.numberOfSlides - 1 && currentSlide === 0) return "carruselFadeInRight";
        if (previusSlide === 0 && currentSlide === this.carruselModel.numberOfSlides - 1) return "carruselFadeInLeft";
        if (previusSlide < currentSlide) return "carruselFadeInRight";
        if (previusSlide > currentSlide) return "carruselFadeInLeft";
        return "carruselFadeIn";
    }

    render(slideItems, previusSlide, curentSlide) {
        this.clearCarrusel();

        this.carrusel.style.gridTemplateColumns = `repeat(${this.carruselModel.itemsToShow}, 1fr)`;
        this.carrusel.style.gridColumnGap = `16px`;

        const animationName = this.selectAnimation(previusSlide, curentSlide);

        slideItems.forEach((element) => {
            const clone = element.cloneNode(true);
            clone.classList.add(animationName);
            this.carrusel.appendChild(clone);
        });

    }

}