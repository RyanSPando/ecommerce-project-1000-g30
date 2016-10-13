$(function() {
  'use strict';
  console.log('sanity check');
  Stripe.setPublishableKey('pk_test_IDkwCdtBuXpEeMz1Nq5JOHe1'); //Stripe.js card validator api

  $('#copy').click(function() { //copy shipping to billing
    $('#firstNameBilling').val($('#firstNameShipping').val());
    $('#lastNameBilling').val($('#lastNameShipping').val());
    $('#companyBilling').val($('#companyShipping').val());
    $('#address1Billing').val($('#address1Shipping').val());
    $('#address2Billing').val($('#address2Shipping').val());
    $('#stateBilling').val($('#stateShipping').val());
    $('#zipBilling').val($('#zipShipping').val());
    $('#cityBilling').val($('#cityShipping').val());
  });

});
//Close doc ready

//Start Form Validation
//Start Credit Validation

$('form').on('submit', function(event) {
  if ($('#lastNameShipping').val() !== 'Trump') {

    event.preventDefault();
    console.log('hijacked');
    var creditNumber = $('#creditNumber').val();
    var creditExpiration = $('#creditExpiration').val();
    var creditCvc = $('#creditCvc').val();

    var errorsPresent = false; // if any error is triggered record, if not display success message at bottom

    if (Stripe.card.validateCardNumber($('#creditNumber').val()) === false) {
      errorsPresent = true;
      $('#creditNumber').css('border-color', 'red'); //error causes input field border to turn red
      $('#warning').append('<p>Not a Valid Credit Card Number</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#creditNumber').css('border-color', 'silver');}  //if no error set border color to normal

    if (Stripe.card.validateExpiry($('#creditExpiration').val()) === false) {
      errorsPresent = true;
      $('#creditExpiration').css('border-color', 'red');
      $('#warning').append('<p>Not a Valid Credit Card Expiration</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else {$('#creditExpiration').css('border-color', 'silver');}

    if (Stripe.card.validateCVC($('#creditCvc').val()) === false) {
      errorsPresent = true;
      $('#creditCvc').css('border-color', 'red');
      $('#warning').append('<p>Not a Valid Credit Card CVC</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#creditCvc').css('border-color', 'silver');}
    //End Credit Validation

    //Start Regular Form Shipping Validation
    if (($('#firstNameShipping').val()).length < 1) {
      $('#firstNameShipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a First Name for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#firstNameShipping').css('border-color', 'silver');
    }

    if (($('#lastNameShipping').val()).length < 1) {
      $('#lastNameShipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a Last Name for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#lastNameShipping').css('border-color', 'silver');
    }

    if (($('#address1Shipping').val()).length < 1) {
      $('#address1Shipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include an Address Line 1 for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#address1Shipping').css('border-color', 'silver');
    }

    if (($('#cityShipping').val()).length < 1) {
      $('#cityShipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a City for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#cityShipping').css('border-color', 'silver');
    }

    if (($('#stateShipping').val()) == 'NULL') {
      $('#stateShipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a State for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else {$('#stateShipping').css('border-color', 'silver');
    }

    if (($('#zipShipping').val()).length < 5) {
      $('#zipShipping').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a Zip for Shipping</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#zipShipping').css('border-color', 'silver');
    }
    //End Regular Form Shipping Validation

    //Start Regular Form Billing Validation
    if (($('#firstNameBilling').val()).length < 1) {
      $('#firstNameBilling').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a First Name for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#firstNameBilling').css('border-color', 'silver');
    }

    if (($('#lastNameBilling').val()).length < 1) {
      $('#lastNameBilling').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a Last Name for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#lastNameBilling').css('border-color', 'silver');
    }

    if (($('#address1Billing').val()).length < 1) {
      $('#address1Billing').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include an Address Line 1 for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#address1Billing').css('border-color', 'silver');
    }

    if (($('#cityBilling').val()).length < 1) {
      $('#cityBilling').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a City for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#cityBilling').css('border-color', 'silver');
    }

    if (($('#stateBilling').val()) == 'NULL') {
      $('#stateBilling').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a State for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#stateBilling').css('border-color', 'silver');
    }

    if (($('#zipBilling').val()).length < 5) {
      $('#zipBilling').css('border-color', 'red');
      errorsPresent = true;
      $('#warning').append('<p>Please Include a Zip for Billing</p>');
      $('#warning').show().delay(5000).fadeOut();
    } else { $('#zipBilling').css('border-color', 'silver');
    }
    //End Regular Form Billing Validation

    if (errorsPresent === false) { //show success message if no errors
      $('#success').append('<p>Your Order has Been Submitted for Proccessing</p>');
      $('#success').show().delay(5000).fadeOut();
    }

    setTimeout(//wait 5 seconds for success/error message generation, then clear out messages for new submit
    function() {
      $('#warning p').remove(); // clear warning messages for re-submit
      $('#success p').remove(); //clear success message for re-submit
    }, 5000); // five second timeout setting
  }
  else {// hidden trump treasure below - src="assets/hidden/fileX"  to 176
    event.preventDefault();

    $('#trump').append('<div class="alert alert-success" id="success" style="margin-top:10px; font-size:2em;"><strong>Thank you Donald! All of our inventory has been added to your shopping cart, and your delivery is on the way!</strong></div>');
    loopTimeout(1, 176, 500, function(i) {
      $('#trump').append('<img src="assets/hidden/file' + i + '.jpg" class="img-responsive trump">');
    });
  }//end hidden trump

});
//End Form Validation

//Start Zipcode Autocomplete
//Will take a zip code and autofill state and city data
//Also a possibility from just address, but that might be a little wonky.....
//zip code api source: https://smartystreets.com/docs/us-zipcode-api
$('#zipShipping').focus(function() { //selecting zip, entering data, then leaving will trigger the zip ajax call. Do nothing focus, but fire ajax on blur
    console.log('in');
  }).blur(function() { // blur means a deselect of zip input, fires ajax call to zip code api
    console.log('out'); // Install Postman! on google chrome
    var id = $(this).val();
    var ajaxCall = new Promise(function(resolve) { //declare a promise, wait for variables to set before appending state/city form fields
      var state, state_abbreviation, city;
      var ajaxArr = [];
      $.ajax({ // build an object pass into promise function
        method: 'GET',
        dataType: 'json',
        url: 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=d2e53a05-7def-56b1-e9c4-bcd4315c4e43&auth-token=2UPToivZOHdNv903mqV8&zipcode=' + id
      }).done(function (result) {
        //state = result[0]['city_states'][0]['state'];
        state_abbreviation = result[0].city_states[0].state_abbreviation;
        city = result[0].city_states[0].city;
        ajaxArr = [state_abbreviation, city];
        resolve(ajaxArr);
      });

    });

    ajaxCall.then(function(value) { //after we get array variables set form field values
      console.log(value); // Success!
      $('#stateShipping').val(value[0]);
      $('#cityShipping').val(value[1]);
    }, function(reason) {
      console.log(reason); // Error!
    });

  });
//End Zipcode Autocomplete

//Start Loop Timeout Function
//will run a loop then delay after each iteration for var interval milliseconds. All for Trump! Make America Great Again!
function loopTimeout(i, max, interval, func) {
  if (i >= max) {
    return;
  }
  // Call the function
  func(i);
  i++;
  // "loop"
  setTimeout(function() {
        loopTimeout(i, max, interval, func);
      }, interval);
}
//End Loop Timeout Function
