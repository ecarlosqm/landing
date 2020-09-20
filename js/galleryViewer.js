window.addEventListener('DOMContentLoaded', () => {
    const gallery = new GalleryViewer('gallery-photos');
    gallery.init();
})

class GalleryViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.images = {};
        this.photoElements;
        this.controlElements;

    }

    init() {
        this.getImages();
        this.getControls();
    }

    getImages() {
        this.photoElements = this.container.querySelectorAll('[data-image-id]');
        this.photoElements.forEach(element => {

            this.images[element.getAttribute('data-image-id')] = {
                url: element.getAttribute('src'),
                id: element.getAttribute('data-image-id')
            };

        });
    }

    getControls() {
        this.controlElements = this.container.querySelectorAll('[data-image-zoom]');
        this.controlElements.forEach((element) => {
            let imageId = element.getAttribute('data-image-zoom');
            element.addEventListener('click', () => {
                this.openModal(imageId);
            })
        });
    }

    openModal(imageId) {
        const modal = document.body.appendChild(document.createElement('div'));
        modal.setAttribute('id', 'gallery-modal');

        modal.addEventListener('click', (event) => {
            this.closeModal(event);
        })

        const image = document.createElement('img');
        image.setAttribute('id', 'gallery-image');
        image.setAttribute('src', this.images[imageId].url);
        modal.appendChild(image);

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('id', 'gallery-btn');
        const closeBtnImage = closeBtn.appendChild(document.createElement('img'));
        closeBtnImage.setAttribute('src', './images/icon-close-image-viewer.svg')
        modal.addEventListener('click', (event) => {
            this.closeModal(event);
        })

        modal.appendChild(closeBtn);
    }

    closeModal(event) {
        const modal = document.getElementById('gallery-modal');
        if (modal) {
            if (event.target.getAttribute('id') !== 'gallery-image') {
                modal.remove();

            }
        }
    }
}