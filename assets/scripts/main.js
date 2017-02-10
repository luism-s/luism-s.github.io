function sendWorkTracking(work_id, behaviour) {
  var work_name = $('[work_id=' + work_id + '] .work__preview-title').html();
  ga('send', 'event', 'Works - ' + behaviour, 'click', work_name, work_id);
}

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
        $('[work_id=0] .button__navigation--left').addClass('button__navigation--inactive');
        $('[work_id=' + (data.works.length - 1) + '] .button__navigation--right').addClass('button__navigation--inactive');
    }
  });
}

function hideWork(work_id) {
  'use strict';
  if(work_id >= 0) {
    $('[work_id=' + work_id + '] .js-work-showcase').removeClass('work-showcase--shown');
  } else {
    $('.js-work-showcase').removeClass('work-showcase--shown');
  }
}

function showWork(work_id) {
  var showcase = '[work_id=' + work_id + '] .js-work-showcase';
  if( work_id >= 0 && !$(showcase).hasClass("work-showcase--shown") ) {
    $(showcase).addClass('work-showcase--shown');
    var work_name = $('[work_id=' + work_id + '] .work__preview-title').html();
    ga('send', 'event', 'Works', 'view', work_name);
  }
}

function switchWork(shown_work_id, next_work_id) {
  if(shown_work_id !== next_work_id) {
    hideWork(shown_work_id);
    showWork(next_work_id);
  }
}

$(function () {
  'use strict';
  renderWorks();

  $(document).on("click", ".js-close-work", function () {
    hideWork();
  });

  $(document).click(function (e) {
    if ( $(e.target).is(".work *") === false ) {
      hideWork();
    }
  });
  
  $(document).on("click", ".js-work-preview", function () {
    var work_id = $(this).parent().attr('work_id');
    hideWork();
    showWork(work_id);
    sendWorkTracking(work_id, 'Spontaneous');
  });


  $(document).on("click", ".js-switch-work", function () {
    var shown_work_id = Number($('.work-showcase--shown').parent().attr('work_id'));
    var next_work_id = shown_work_id;
    var number_of_works = $('.work').length;

    if( $(this).hasClass("js-switch-work--previous") && shown_work_id > 0 ) {
      next_work_id--;
      sendWorkTracking(next_work_id, 'Switch/Bakwards');
    } else if( $(this).hasClass("js-switch-work--next") && shown_work_id < number_of_works-1) {
      next_work_id++;
      sendWorkTracking(next_work_id, 'Switch/Forwards');
    }
    switchWork(shown_work_id, next_work_id);
  });

  $(document).on("click", ".js-contact-link a", function () {
    var link = $(this).html();
    ga('send', 'event', 'Contacts', 'click', link);
  });
});
