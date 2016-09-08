$(function() {

        $.getJSON('/data/portfolio.json', function(data) {
                var template = $('#works-template').html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, data);
                $('#works').html(rendered);
        });
        $(document).on("click", ".close-buttom", function() {
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
        $(document).on("click", ".work", function() {

                var work_name = $(this).attr('work_name');
                $('.showcase' + '[work_name=' + work_name + ']').addClass('show');
                $('.portfolio').addClass('showcase_shown');

        });

});


function hideWork() {
    $('.showcase').removeClass('show');
    $('.portfolio').removeClass('showcase_shown');
}
function ola() {
   console.log("ola");
}