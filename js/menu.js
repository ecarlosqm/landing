const closeMenu = (menu, menuButton, topBar) => {
    menuButton.getElementsByTagName('img')[0].setAttribute("src", "./images/icon-hamburger.svg");
    topBar.classList.remove("fixed");
    menu.classList.remove('openMenu');
}

const openMenu = (menu, menuButton, topBar) => {
    menuButton.getElementsByTagName('img')[0].setAttribute("src", "./images/icon-close.svg");
    topBar.classList.add("fixed");
    menu.classList.add('openMenu');
}

window.addEventListener('load', () => {
    let isOpen = false;
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menuButtn");
    const topBar = document.getElementById("topBar");

    menuButton.addEventListener('click', () => {

        isOpen = menu.classList.contains('openMenu');

        if (isOpen) {
            closeMenu(menu, menuButton, topBar);
        } else {
            openMenu(menu, menuButton, topBar);
        }

    });

    window.addEventListener('resize', (event) => {
        const topBar = document.getElementById("topBar");
    
        if (event.target.innerWidth >= 1024) {
            closeMenu(menu, menuButton, topBar);
        }
    
    });

    menu.addEventListener('click', (event) => {
        const topBar = document.getElementById("topBar");
    
        if (window.innerWidth < 1024) {
            closeMenu(menu, menuButton, topBar);
        }
    
    });

});


