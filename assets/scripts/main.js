$(function() {

        $.getJSON('/data/portfolio.json', function(data) {
                for (var i in data.works) {
                        data.works[i].index = i;
                }

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

                var work_id = $(this).attr('work_id');
                $('.showcase' + '[work_id=' + work_id + ']').addClass('show');
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