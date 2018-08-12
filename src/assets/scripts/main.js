$(document).ready(function() {
/* 
    new IScroll('#site-navbar-wrapper', { 
        scrollX: true, 
        scrollY: false,
        mouseWheel: true,
        freeScroll: true,
        scrollbars: true,
        wheelHorizontal: true
    }); */

    $('#navbar-hamburguer').on('click', function(e) {
        $('#navbar').toggleClass('-mobile-closed');
    });
    

});