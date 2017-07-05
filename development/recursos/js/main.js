// Global variables

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}

var validation = {
  isEmailAddress:function(str) {
      var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str);  // returns a boolean
  },
  isNotEmpty:function (str) {
      var pattern =/\S+/;
      return pattern.test(str);  // returns a boolean
  },
  isNumber:function(str) {
      var pattern = /^\d+$/;
      return pattern.test(str);  // returns a boolean
  },
  isSame:function(str1,str2){
      return str1 === str2;
  },
  isExact:function(str) {
    return str.length == 4;
  },
  isYearsOld:function(str) {
    var dt1 = new Date(str,10,2);
    var dt2 = new Date();
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }
};
// Init
$(document).ready(function(){

  var x = readCookie('isOlderCookie')
  if (!x) {
    $('#isOlder').modal({
      backdrop: 'static'
    });
  }

  new WOW().init();

  /*
   * Menu top navigation
   */
  /* Navigation menu link */
  $("nav ul li a").on("click", function(e){
    e.preventDefault();
    var target = this.hash;
    var scrollAnimationTime = 1200,
        scrollAnimation = 'swing';
    $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
    }, scrollAnimationTime, scrollAnimation, function () {
        //window.location.hash = target;
    });
  }); // End navigation menu click event handler

  $(".rslices").responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
    pager: false,           // Boolean: Show pager, true or false
    nav: false,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: false,           // Boolean: Pause on hover, true or false
    pauseControls: false,    // Boolean: Pause when hovering controls, true or false
    prevText: "<i class='fa fa-angle-left' aria-hidden='true'></i>",   // String: Text for the "previous" button
    nextText: "<i class='fa fa-angle-right' aria-hidden='true'></i>",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides1",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });

  $(".rslides").responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
    pager: false,           // Boolean: Show pager, true or false
    nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: true,           // Boolean: Pause on hover, true or false
    pauseControls: false,    // Boolean: Pause when hovering controls, true or false
    prevText: "<i class='fa fa-angle-left' aria-hidden='true'></i>",   // String: Text for the "previous" button
    nextText: "<i class='fa fa-angle-right' aria-hidden='true'></i>",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides2",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });

  $('#isYearOn input[type="text"]').on('input', function() {
    var value = $('#isYearOn input[type="text"]').val();
    if(!(validation.isNumber(value))){
      $('#isYearOn input[type="text"]').val("");
    }else{
      if(!(validation.isExact(value))){
        return;
      }else{

      }
    }

  });

  $('#isYearOn').submit(function(e){

    e.preventDefault();
    var value = $('#isYearOn input[type="text"]').val();
    if(!(validation.isExact(value))){
      return;
    }else{
      createCookie('isOlderCookie','1',1);
      $("#isYearOn").addClass("hidden");
      $(".year").addClass("hidden");
      $(".welcome").removeClass("hidden");
      setTimeout(function(){
        $('#isOlder').modal("hide");
      }, 1500);
    }

  });

});

// Functions
