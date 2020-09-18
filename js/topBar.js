window.addEventListener('load', () => {
    const topBar = document.getElementById("topBar");

    window.addEventListener('scroll', (e) => {

        const topBar = document.getElementById('topBar');
         const topBarBottomOffset = topBar.offsetHeight;

        if(window.pageYOffset >= topBarBottomOffset + 200){
            topBar.classList.add('floatingTopBar');
        } else {
            topBar.classList.remove('floatingTopBar');
        }

    });

});
