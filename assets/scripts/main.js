function renderWorks() {
    'use strict';
    var template, rendered;
    $.getJSON('/data/portfolio.json', function (data) {
        if (data) {
            for (var i = 0; i < data.works.length; i++) {
                data.works[i].index = i;
            }
            template = $('#works-template').html();
            Mustache.parse(template);
            rendered = Mustache.render(template, data);
            $('#works').html(rendered);
        }
    });
}

function hideWork() {
    'use strict';
    $('.work-showcase').removeClass('show');
    $('.portfolio').removeClass('showcase_shown');
}

$(function () {
    'use strict';
    renderWorks();

    $(document).on("click", ".close-buttom", function () {
        hideWork();
    });
    $(document).click(function (e) {
        if (    $(e.target).is(".work") === false && 
                $(e.target).is(".work *") === false ) {
            hideWork();
        }
    });
    $(document).on("click", ".work-box", function () {
        hideWork();
        var work_id = $(this).attr('work_id');
        $('.work-showcase' + '[work_id=' + work_id + ']').addClass('show');
    });
});
