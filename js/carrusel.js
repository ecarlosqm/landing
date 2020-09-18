

window.addEventListener('load', () => {

    const carrusel = new Carrusel('carrusel').init();

});

class Carrusel {
    constructor(carruselId) {
        this.carrusel = document.getElementById(carruselId);
        this.elementsInCarrusel = 1;
        this.steps = 0;
        this.intervalTime;
    }

    init() {

        window.addEventListener('resize', () => {
            this.addjustToWindowsWidth();
        });

        this.addjustToWindowsWidth();

    }

    clearCarruselInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    setCarruselInterval(interval) {
        this.clearCarruselInterval();
        this.interval = this.intervalTime = setInterval(() => {

            this.steps += this.elementsInCarrusel;

            var currentIndex = this.steps % this.carrusel.children.length;
            var currentElement = this.carrusel.children[currentIndex];
            
            this.carrusel.scroll(
                {
                    left: currentElement.offsetLeft - this.carrusel.offsetLeft,
                    behavior: 'smooth'
                }
            );

            this.carrusel.addEventListener('scroll', (event)=>{
                event.preventDefault();
            })
            window.addEventListener('scroll', (event)=>{
                event.preventDefault();
            })
        }, interval);
    }

    addjustToWindowsWidth() {

        if (window.innerWidth >= 1024) {
            this.elementsInCarrusel = 4;
            this.setCarruselInterval(3000);
        } else if (window.innerWidth >= 768) {
            this.elementsInCarrusel = 2;
            this.setCarruselInterval(4000);
        } else {
            this.elementsInCarrusel = 1;
            this.setCarruselInterval(3000);
        }
    }
}