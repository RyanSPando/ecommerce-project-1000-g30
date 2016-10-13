$(function() {
  'use strict';

  //console.log('sanity check');
  $.ajax({
    url:'http://galvanize-student-apis.herokuapp.com/gcommerce/products/',
    method: 'GET'
  }).done(function(results) {
        var arr = [];
        for (var i = 0; i < 3; i++) {
          arr.push(results[Math.floor(Math.random() * results.length)]);
        }
        var basketPrice = 0;
        arr.forEach(function(object) {
          basketPrice += parseFloat(object.price.replace('$', ''));
        });
        createShoppingList(arr, basketPrice);
        createProductElement(arr);
      });
  //<----Image Carousel Start---->//
  //Set carousel variables and transition time
  var $carousel = $('.carousel');
  var $slide = 'li';
  var $transition_time = 1000;
  var $time_between_slides = 4000;
  //Slides function defines where carousel starts
  function slides() {
    return $carousel.find($slide);
  }
  slides().fadeOut();
  //Set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);
  //Set up auto scroll function
  var $interval = setInterval(function() {
          var $i = $carousel.find($slide + '.active').index();
          slides().eq($i).removeClass('active');
          slides().eq($i).fadeOut($transition_time);
          //Start looping through images
          if (slides().length === $i + 1) $i = -1;
          slides().eq($i + 1).fadeIn($transition_time);
          slides().eq($i + 1).addClass('active');
        }, $transition_time +  $time_between_slides);

  //<----Image Carousel Finish---->//
  //<----Click High-Jack---->//
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('#form-output').append('<h3>You have been added to our email list!</h3>');
    $('#form-output').show().delay(5000).fadeOut();
  });

  $('#emailSignup').on('keyup', function(event) {
    var email = $('#emailSignup').val();
    if (!emailToCheck(email)) {
      $('#emailSignup').effect('shake');
      $('#emailSignup').addClass('errorClass');
    }
  });

  //<----Back and Next Click Listeners---->
  $('#next').on('click',function() {
    clearInterval(slides);
    var $i = $carousel.find($slide + '.active').index();
    slides().eq($i).removeClass('active');
    slides().eq($i).hide();
    //Start looping through images
    if (slides().length === $i + 1) $i = -1;
    slides().eq($i + 1).fadeIn();
    slides().eq($i + 1).addClass('active');
  });

  $('#back').on('click',function() {
    clearInterval(slides);
    var $i = $carousel.find($slide + '.active').index();
    slides().eq($i).removeClass('active');
    slides().eq($i).hide();
    //Start looping through images
    if (slides().length === $i - 1) $i = +1;
    slides().eq($i - 1).fadeIn();
    slides().eq($i - 1).addClass('active');
  });

  $('#button').on('click',function() {
    $('#shoppin').show();
  });
  $('#shoppin').mouseleave(function() {
    $('#shoppin').css('display','none');
  });
});
//Generte 3 random products for homepage//
function createProductElement(productObjArr) {
  productObjArr.forEach(function(value) {
    $('#product-display').append('<figure class="col-md-4 products float-left bg-info"><img src="assets/' + value.id + '.png" alt="foobar"><div><strong>Rating:' + randomStar() + '</strong></div><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info child"> <strong>Price:</strong> ' + value.price + '</p><div class="purchase bg-prime text-center" style=" display: none"><h3>Purchase</h3></div></figure>');
  });
  var $divs = $('#product-display > figure');
  for (var i = 0; i < $divs.length; i += 4) {
    $divs.slice(i, i + 4).wrapAll('<div class="row"></div>');
  }
}
function createShoppingList(productObjArr, totalPrice) {
  $('#shoppingList').append('<h3><strong>Total Price: $' + totalPrice.toFixed(2) + '</strong></h3>');
  productObjArr.forEach(function(value) {
    $('#shoppingList').append('<li class="bg-info products-cart"><img src="assets/' + value.id + '.png" alt="foobar"><div><strong>Rating:' + randomStar() + '</strong></div><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info child"> <strong>Price:</strong> ' + value.price + '</p><div class="purchase bg-prime text-center" style=" display: none"><h3>Purchase</h3></div></li>');
  });
}
function randomStar() {
  var starNumber = Math.floor((Math.random() * 10) + 1) / 2;
  var fullStarBar = [];

  for (var i = 0; i < 5; i++) {
    if (starNumber > 0.5) {
      fullStarBar.push('<i class="fa fa-star" aria-hidden="true"></i>');
    }
    else if (starNumber === 0.5) {
      fullStarBar.push('<i class="fa fa-star-half-o" aria-hidden="true"></i>');
    }
    else {
      fullStarBar.push('<i class="fa fa-star-o" aria-hidden="true"></i>');
    }
    starNumber--;
  }
  return fullStarBar.toString().replace(/,/g, '');
}
//email validater
function emailVal(emailToCheck) {
  emailNoWS = emailToCheck.trim();
  var bool = true;
  if (emailNoWS[0] === '@' ||  emailNoWS.indexOf('@') + 1 === emailNoWS.indexOf('.') || emailNoWS.indexOf('@') === -1) {
    bool = false;
  }
  return bool;
}
