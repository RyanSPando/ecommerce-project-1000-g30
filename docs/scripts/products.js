$(function() {
  'use strict';
  console.log('sanity check');

  var urlProduct = 'http://galvanize-student-apis.herokuapp.com/gcommerce/products';

  //create promise object for ajax call
  var productObj = ajaxCall(urlProduct);

  //populate shopping cart
  productObj.then(function(results) {
    var arr = [];
    for (var i = 0; i < 3; i++) {
      arr.push(results[Math.floor(Math.random() * results.length)]);
    }
    var basketPrice = 0;
    arr.forEach(function(object) {
      basketPrice += parseFloat(object.price.replace('$', ''));
    });
    createShoppingList(arr, basketPrice);
  });

  //populate products
  fullProductList(productObj);
  $('#button').on('click',function() {
    $('#shoppin').show();
  });

  //adds all products back to page on click
  $('#clear-selection').on('click', function() {
    fullProductList(productObj);
  });

  //grab on click from a size link and return only those items that equal that size category
  $('#sort-by-size div a').on('click', function(event) {
    event.preventDefault();
    console.log('yo');
    var key = parseInt($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products) {
      var sortedSize = products.filter(function(index) {
        return key === index.size;
      });
      createProductElement(sortedSize);
      checkOffset();
    });
  });

  // grab on click from a price link and return only those items that are within the twenty dollar range, or all those greater than 80.
  $('#sort-by-price div a').on('click', function(event) {
    event.preventDefault();
    var key = parseFloat($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products) {
      var sortedPrice = products.filter(function(index) {
        var noDollarSign = index.price.replace('$', '');
        if (key === 80) {
          return (noDollarSign > key);
        }
        else {
          return (noDollarSign <= (key + 20) && noDollarSign > key);
        }
      });
      createProductElement(sortedPrice);
      checkOffset();
    });
  });

  //sidebar must not go into footer
  $(document).scroll(function() {
    checkOffset();
  });

  $('#shoppin').mouseleave(function() {
    $('#shoppin').css('display','none');
  });
});

//get Ajax Object as a promise
function ajaxCall(url) {
  return Promise.resolve($.ajax(url));
}

//create a div element on page per object in array
function createProductElement(productObjArr) {
  productObjArr.forEach(function(value) {
    $('#product-display').append('<div class="products float-left bg-info"><img src="assets/' + value.id + '.png" alt="foobar"><div><strong>Rating:</strong> ' + randomStar() + '</div><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info child"> <strong>Price:</strong> ' + value.price + '</p><div class="purchase bg-prime text-center" style=" display: none"><h3>Purchase</h3></div></div>');
  });

  //wrap every increment of four product elements in a row Div
  var $divs = $('#product-display > div');
  for (var i = 0; i < $divs.length; i += 4) {
    $divs.slice(i, i + 4).wrapAll('<div class="row relative"></div>');
  }
}

//clear product display div
function clearOutputDiv() {
  $('#product-display').empty();
}

//create full list of products and place on page
function fullProductList(productObj) {
  productObj.then(function(products) {
    createProductElement(products);
  });
}

//makes a randomly filled star bar from .5 to 5 stars.
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

function createShoppingList(productObjArr, totalPrice) {
  $('#shoppingList').append('<h3><strong>Total Price: $' + totalPrice.toFixed(2) + '</strong></h3>');
  productObjArr.forEach(function(value) {
    $('#shoppingList').append('<li class="bg-info products-cart"><img src="assets/' + value.id + '.png" alt="foobar"><div><strong>Rating:' + randomStar() + '</strong></div><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info child"> <strong>Price:</strong> ' + value.price + '</p><div class="purchase bg-prime text-center" style=" display: none"><h3>Purchase</h3></div></li>');
  });
}
//check on scroll to see if floating div is going to run into footer, if it is then set position absolute, if page is pulled back up then set fixed.
function checkOffset() {
  if ($('#sidebar').offset().top + $('#sidebar').height() >= $('#footer').offset().top - 10) {
    $('#sidebar').css('position', 'absolute');
  }

  if ($(document).scrollTop() + window.innerHeight < $('#footer').offset().top) {
    $('#sidebar').css('position', 'fixed'); // restore when you scroll up
  }
}
