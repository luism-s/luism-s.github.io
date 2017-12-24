
$( function () {
  'use strict';

  $( document ).on( 'click', '.js-contact-link a', function () {
    ga( 'send', 'event', 'Contacts', 'click', $( this ).html() );
  } );
  
} );
