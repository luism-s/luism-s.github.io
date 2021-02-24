function toggleNavbar() {
  document.getElementById('navbar').classList.toggle('-mobile-closed');
}

function trackEvent(action, category, label) {
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
}
