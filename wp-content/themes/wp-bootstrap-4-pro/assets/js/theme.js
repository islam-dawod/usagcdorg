// Set all carousel items to the same height
function carouselNormalization() {
  window.heights = [], //create empty array to store height values
  window.tallest; //create variable to make note of the tallest slide
  function normalizeHeights() {
      jQuery('.carousel-inner .carousel-item').each(function() { //add heights to array
          window.heights.push(jQuery(this).outerHeight());
      });
      window.tallest = Math.max.apply(null, window.heights); //cache largest value
      jQuery('.carousel-inner .carousel-item').each(function() {
          jQuery(this).css('min-height',tallest + 'px');
      });
  }
  normalizeHeights();
  jQuery(window).on('resize orientationchange', function () {
      window.tallest = 0, window.heights.length = 0; //reset vars
      jQuery('.carousel-inner .carousel-item').each(function() {
          jQuery(this).css('min-height','0'); //reset min-height
      }); 
      normalizeHeights(); //run it again 
  });
}

jQuery(document).ready(function (jQuery) {
  "use strict";
  // For changing body class on scroll
  jQuery(window).on("scroll resize", function () {
    // Default was 250
    if (jQuery(window).scrollTop() >= 250) {
      jQuery(".trans-header").addClass("body-scrolled");
    } else {
      return jQuery(".trans-header").removeClass("body-scrolled");
    }
  });

  // Dropdown toggle 
  jQuery('.dropdown-menu .dropdown-toggle').on('click', function (e) {
    if (!jQuery(this).next().hasClass('show')) {
      jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $subMenu = jQuery(this).next('.dropdown-menu');
    $subMenu.toggleClass('show');

    jQuery(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
      jQuery('.dropdown-submenu .show').removeClass('show');
    });

    return false;
  });

  // Soft scroll to anchor on nav links
  if (jQuery('header').hasClass("sticky-top")) {
    var headerHeight = jQuery('header').height();
    var ofset = headerHeight;
  } else {
    var ofset = 0;
  }
  
  jQuery('.nav-link:not([data-toggle="tab"])').on('click', function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname ==
      this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        jQuery('html, body').animate({
          scrollTop: target.offset().top - ofset
        }, 1000, function () {
          var $target = jQuery(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });
  
  // Set all carousel items to the same height
  carouselNormalization();
  // Bootstrap Carousel swipe function
  jQuery(".carousel").carousel({
    // interval: false,
    // pause: true
  });
  jQuery( ".carousel .carousel-inner" ).swipe( {
    swipeLeft: function ( event, direction, distance, duration, fingerCount ) {
      this.parent( ).carousel( 'next' );
    },
    swipeRight: function ( ) {
      this.parent( ).carousel( 'prev' );
    },
    threshold: 0,
    tap: function(event, target) {
      //window.location = jQuery(this).find('.carousel-item.active a').attr('href');
    },
    excludedElements:"label, button, input, select, textarea, .noSwipe"
  });
  jQuery('.carousel .carousel-inner').on('dragstart', 'a', function () {
    return false;
  }); 
	
	// Slick slider init
    var lang = jQuery("html").attr("dir");
	var rtl = false;
	if (lang === 'rtl') {
		rtl = true;
	}

	if(jQuery('.slick-marquee').length) {
		var $sliderMarquee = jQuery('.slick-marquee').on('init', function(slick) {
			jQuery('.slick-marquee').fadeIn(1000);
		})
		.slick({
			speed: 4000,
			autoplay: true,
			autoplaySpeed: 0,
			centerMode: true,
			centerPadding: '0px',
			cssEase: 'linear',
			slidesToShow: 4,
			slidesToScroll: 4,
			variableWidth: true,
			infinite: true,
			//initialSlide: 6,
			pauseOnHover: true,
			draggable: false,
			focusOnSelect: false,
			swipeToSlide: true,
			arrows: false,
			buttons: false,
			rtl: rtl,
		});  
	}
});

// Arrow on scroll up and down
if (document.getElementById("onTop")) {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("onTop").style.cssText = "opacity: 1; visibility: visible";
    } else {
        document.getElementById("onTop").style.cssText = "opacity: 0; visibility: hidden";
    }

    prevScrollpos = currentScrollPos;
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        document.getElementById("onTop").style.cssText = "opacity: 1; visibility: visible";
    }
    if ((window.innerHeight + window.pageYOffset) == window.innerHeight) {
        document.getElementById("onTop").style.cssText = "opacity: 0; visibility: hidden";
    }
  }
}
