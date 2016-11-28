var a = 1;
var template, rendered;

function toggleWork(work_showcase) {
    'use strict';
    if (work_showcase.hasClass('show')) {
        work_showcase.removeClass('show');
        $('.portfolio').removeClass('showcase_shown');
    } else {
        work_showcase.addClass('show');
        $('.portfolio').removeClass('showcase_shown');
    }

}
function hideWork() {
    'use strict';
    $('.work-showcase').removeClass('show');
    $('.portfolio').removeClass('showcase_shown');
}

$(function () {
    'use strict';
    $.getJSON('/data/portfolio.json', function (data) {
        var i = 0;
        if (data) {
            for (i; i < data.works.length; i++) {
                data.works[i].index = i;
            }
        }

        template = $('#works-template').html();
        Mustache.parse(template);
        rendered = Mustache.render(template, data);
        $('#works').html(rendered);
    });
    $(document).on("click", ".close-buttom", function () {
        hideWork();
    });
    $(document).click(function (e) {
        if ($(e.target).is(".showcase") === false && $(e.target).is(".showcase *") === false &&
                $(e.target).is(".work") === false && $(e.target).is(".work *") === false
                ) {
            hideWork();
        }
    });
    $(document).on("click", ".work-box", function () {
        hideWork();
        var work_id = $(this).attr('work_id');
        $('.work-showcase' + '[work_id=' + work_id + ']').addClass('show');
        $('.portfolio').addClass('showcase_shown');
    });
});
