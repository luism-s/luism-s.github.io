
    
    
var gallery = $(".js-gallery");
var gallery_featured = $(".js-gallery-featured");

var work_item = $('.work');
var portfolio = $('.portfolio');
 
 $('.close-buttom').click(function(e) {
        hideWork();
});


$(document).click(function(e) {
        if (
                $(e.target).is(".showcase") === false &&
                $(e.target).is(".showcase *") === false &&
                $(e.target).is(".work") === false &&
                $(e.target).is(".work *") === false
                ) {
                hideWork();
        }
});

work_item.click(function(e) {
        var work_name = $(this).attr('work_name');
        $('.showcase' + '[work_name=' + work_name + ']').addClass('show');
        portfolio.addClass('showcase_shown');
});
function hideWork() {
    $('.showcase').removeClass('show');
    portfolio.removeClass('showcase_shown');
}