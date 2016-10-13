$(function() {
  'use strict';
});

function initMap() {
  var myLatLng = {lat: 39.7320, lng: -104.9839};

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 16,
    center: myLatLng,
    mapTypeId:'hybrid'
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'We are here!'
  });
}
