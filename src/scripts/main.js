$(document).ready(function () {

  $('#navbar-hamburguer').on('click', function (e) {
    $('#navbar').toggleClass('-mobile-closed');
  });
});

function trackEvent(action, category, label) {
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
}
