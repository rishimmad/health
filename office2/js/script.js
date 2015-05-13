/* -----------------------------------------------------------------

Template Name: Voyo One - Responsive HTML5 and CSS3 Website Template 
Version: 1.0
Author: abusinesstheme
Website: http://abusinesstheme.com

 	[Content Structure]

 	01. Helper Functions
 	02. Megamenu
 	03. Fixed Header
 	04. Back to Top
 	05. Plugins configurations
	06. Bootstrap configurations
	07. Website Enhancement and bug fixes
	08. Animations
 	09. Carousels configurations (owl-carousel)
	10. Isotope configurations 
	11. Slider configarations (flexslider)
	12. Ajax contact form
	13. Charts initialization
	14. Preloader

------------------------------------------------------------------- */



(function($){
	"use strict";


/* *********************	Helper functions	********************* */


	/* Validate function */
	function validate(data, def) {
		return (data !== undefined) ? data : def;
	}

	var $win = $(window),

		// body 
		$body = $('body'),

		// Window width (without scrollbar)
		$windowWidth = $win.width(),

		// Media Query fix (outerWidth -- scrollbar) 
		// Media queries width include the scrollbar
		mqWidth = $win.outerWidth(true,true),

		// Detect Mobile Devices 
		isMobileDevice = (( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini|Mobi/i) || ($windowWidth < 768) ) ? true : false ),

		// detect IE browsers (fix isotope bug)
		ie = (function(){
		    var rv = 0,
		    	ua = window.navigator.userAgent,
		    	msie = ua.indexOf('MSIE '),
		    	trident = ua.indexOf('Trident/');

		    if (msie > 0) {
		        // IE 10 or older => return version number
		        rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		    } else if (trident > 0) {
		        // IE 11 (or newer) => return version number
		        var rvNum = ua.indexOf('rv:');
		        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
		    }

		    return ((rv > 0) ? rv : 0);
		}());



/* *********************	Megamenu	********************* */


	var menu = $(".menu"), 
		width = $windowWidth, 
		Megamenu = {
			desktopMenu: function() {

				menu.children("li").show(0);
				menu.children(".toggle-menu").hide(0);

				// Mobile touch for tablets > 768px
				if (isMobileDevice) {						
					
					menu.on("click touchstart","a", function(e){
						
						if ($(this).attr('href') === '#') {
							e.preventDefault();
							e.stopPropagation();
						}

						var $this = $(this),
							$sub = $this.siblings(".submenu, .megamenu");

						$this.parent("li").siblings("li").find(".submenu, .megamenu").stop(true, true).fadeOut(300);

						if ($sub.css("display") === "none") {
							$sub.stop(true, true).fadeIn(300);
						} else {
							$sub.stop(true, true).fadeOut(300);
							$this.siblings(".submenu").find(".submenu").stop(true, true).fadeOut(300);
						}
					});

					$(document).on("click.menu touchstart.menu", function(e){
						
						if ($(e.target).closest(menu).length === 0) {
							menu.find(".submenu, .megamenu").fadeOut(300);
						}
					});
					
				// Desktop hover effect	
				} else {

					menu.find('li').on({
						"mouseenter": function() {
							$(this).children(".submenu, .megamenu").stop(true, true).fadeIn(300);
						},
						"mouseleave": function() {
							$(this).children(".submenu, .megamenu").stop(true, true).fadeOut(300);
						}
					});
				}
			}, 
			mobileMenu: function() {

				var $children = menu.children("li"), 
					$toggle = menu.children("li.toggle-menu"),
					$notToggle = $children.not("toggle-menu");


				$notToggle.hide(0);
				$toggle.show(0).on("click", function(){

					if ($children.is(":hidden")){
						$children.slideDown(300);
					} else {
						$notToggle.slideUp(300);
						$toggle.show(0);
					}
				});

				// Click (touch) effect
				menu.find("li").not(".toggle-menu").each(function(){

					var $this = $(this);

					if ($this.children(".submenu, .megamenu").length) {
						
						$this.children("a").on("click", function(e){

							if ($(this).attr('href') === '#') {
								e.preventDefault();
								e.stopPropagation();
							}

							var $sub = $(this).siblings(".submenu, .megamenu");

							if ($sub.hasClass("open")) {
								$sub.slideUp(300).removeClass("open");
							} else {
								$sub.slideDown(300).addClass("open");
							}
						});
					} 
				});
			},
			unbindEvents: function() {
				menu.find("li, a").off();
				$(document).off("click.menu touchstart.menu");
				menu.find(".submenu, .megamenu").hide(0);
			}
		}; // END Megamenu object



	if ($windowWidth < 768) {
		Megamenu.mobileMenu();
	} else {
		Megamenu.desktopMenu();
	}

	
	$win.resize(function() {

		var newWidth = $win.width();

		if (width <= 768 && newWidth > 768) {
			Megamenu.unbindEvents();
			Megamenu.desktopMenu();
		}

		if (width > 768 && newWidth <= 768) {
			Megamenu.unbindEvents();
			Megamenu.mobileMenu();
		}

		width = newWidth;

	});



/* *********************	Fixed Header	********************* */

	// Sticky js
	(function(e){var t={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:false,getWidthFrom:"",responsiveWidth:false},n=e(window),r=e(document),i=[],s=n.height(),o=function(){var t=n.scrollTop(),o=r.height(),u=o-s,a=t>u?u-t:0;for(var f=0;f<i.length;f++){var l=i[f],c=l.stickyWrapper.offset().top,h=c-l.topSpacing-a;if(t<=h){if(l.currentTop!==null){l.stickyElement.css("position","").css("top","");l.stickyElement.trigger("sticky-end",[l]).parent().removeClass(l.className);l.currentTop=null}}else{var p=o-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-t-a;if(p<0){p=p+l.topSpacing}else{p=l.topSpacing}if(l.currentTop!=p){l.stickyElement.css("position","fixed").css("top",p);if(typeof l.getWidthFrom!=="undefined"){l.stickyElement.css("width",e(l.getWidthFrom).width())}l.stickyElement.trigger("sticky-start",[l]).parent().addClass(l.className);l.currentTop=p}}}},u=function(){s=n.height();for(var t=0;t<i.length;t++){var r=i[t];if(typeof r.getWidthFrom!=="undefined"&&r.responsiveWidth===true){r.stickyElement.css("width",e(r.getWidthFrom).width())}}},a={init:function(n){var r=e.extend({},t,n);return this.each(function(){var n=e(this);var s=n.attr("id");var o=s?s+"-"+t.wrapperClassName:t.wrapperClassName;var u=e("<div></div>").attr("id",s+"-sticky-wrapper").addClass(r.wrapperClassName);n.wrapAll(u);if(r.center){n.parent().css({width:n.outerWidth(),marginLeft:"auto",marginRight:"auto"})}if(n.css("float")=="right"){n.css({"float":"none"}).parent().css({"float":"right"})}var a=n.parent();a.css("height",n.outerHeight());i.push({topSpacing:r.topSpacing,bottomSpacing:r.bottomSpacing,stickyElement:n,currentTop:null,stickyWrapper:a,className:r.className,getWidthFrom:r.getWidthFrom,responsiveWidth:r.responsiveWidth})})},update:o,unstick:function(t){return this.each(function(){var t=e(this);var n=-1;for(var r=0;r<i.length;r++){if(i[r].stickyElement.get(0)==t.get(0)){n=r}}if(n!=-1){i.splice(n,1);t.unwrap();t.removeAttr("style")}})}};if(window.addEventListener){window.addEventListener("scroll",o,false);window.addEventListener("resize",u,false)}else if(window.attachEvent){window.attachEvent("onscroll",o);window.attachEvent("onresize",u)}e.fn.sticky=function(t){if(a[t]){return a[t].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof t==="object"||!t){return a.init.apply(this,arguments)}else{e.error("Method "+t+" does not exist on jQuery.sticky")}};e.fn.unstick=function(t){if(a[t]){return a[t].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof t==="object"||!t){return a.unstick.apply(this,arguments)}else{e.error("Method "+t+" does not exist on jQuery.sticky")}};e(function(){setTimeout(o,0)})})(jQuery);


	if ( (!$('.static-menu').length) && ($windowWidth > 991) && (!isMobileDevice) ) {

      	$(".main-header").sticky({ 
      		topSpacing: 0,
      		className:"menu-fixed"
      	});

	} // END if




/* *********************	Back to Top	********************* */
	

 	$body.append($('<div class="back-to-top"><i class="fa fa-angle-up fa-2x"></i></div>'));

	$win.scroll(function(){

		if ($(this).scrollTop() > 1) {
			$('.back-to-top').css({bottom:"15px"});
		} else {
			$('.back-to-top').css({bottom:"-100px"});
		}
	});

	$('.back-to-top').click(function(){
		$('html, body').animate({scrollTop: '0'}, 500);
		return false;
	});



/* *********************	Misc plugins config	********************* */
	

	// FLickr Feed plugin
	if ( ($(".flickr-feed").length) && $().jflickrfeed ) {

		// Flickr Data
		var flickrData = {
			limit: 6,
	        qstrings: {
	        	// You have to put your flickr ID here
	            id: '52617155@N08'
	        },
	        itemTemplate: '<li><a href="{{link}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
		};

		// Flickr footer photos
		$('ul#flickr-footer').jflickrfeed(flickrData);

		// Flickr sidebar photos
	    $('ul#flickr-sidebar').jflickrfeed(flickrData);
	}



	// Zoom plugin configurations
	if (($().zoom) && ($(".zoom").length) && (isMobileDevice === false) ) {
		$(".zoom").zoom();
	}



	// Rati plugin configurations 
	if (($().raty) && $(".rating-system").length ) {
		
		// Rate product
		$(".rating-system.rate-product").raty({
			starOn:"inc/raty/img/star-on.png",
			starOff:"inc/raty/img/star-off.png",
			starHalf:"inc/raty/img/star-half.png",
			cancelOn:"inc/raty/img/cancel-on.png",
			cancelOff:"inc/raty/img/cancel-off.png",
			score:4.26,
			number:5
		});

		// Rate review - read only
		$(".rating-system.rate-review").raty({
			starOn:"inc/raty/img/star-on.png",
			starOff:"inc/raty/img/star-off.png",
			starHalf:"inc/raty/img/star-half.png",
			cancelOn:"inc/raty/img/cancel-on.png",
			cancelOff:"inc/raty/img/cancel-off.png",
			score:5,
			number:5,
			readOnly:true
		});

	}


	// Range Slider configarations 
	if (($().ionRangeSlider) && $(".range-slider").length) {
		$(".range-slider.range-price").ionRangeSlider({
		    min: 0,
		    max: 2000,
		    from:310,
		    to:1400,
		    type: 'double',
		    prefix: "$",
		    maxPostfix: "+",
		    prettify: false,
		    hasGrid: false,
		    onChange:function(obj) {
		    	$(".1s").text(obj.fromNumber);
		    	$(".2s").text(obj.toNumber);
		    }
		});
	}


	// OnePage plugin configurations 
	if (($().onePageNav) && $("#onepage").length) {
		
		$("#onepage").onePageNav();
	}


	// countTo plugin configarations
	if( ($().countTo) && ($('.timer').length) ) {

		if (isMobileDevice) {
				$('.stats-section .box-content').find(".timer").countTo();
		} else {
			// appear init and then countTo
			$(".stats-section .box-content").appear(function() {
				$(this).find(".timer").countTo();
			});
		}

	} // END if


	// vTicker configarations
	if( $().vTicker ) {

		// For Testimonials
		if ($("#vticker-testimonials").length) {

			$('#vticker-testimonials').vTicker('init', {
			 	speed: 700, 
			    pause: 6000
			});
		}

	} // END if

	// Magnific-popup configurations ( Gallery Template )
	if (($().magnificPopup) && ($(".init-popup").length) ) {

		// Popup Gallery
		$(".popup-gallery").magnificPopup({
			delegate:"a.init-popup",
			type:'image',
			tLoading: 'Loading image #%curr%...',
          	mainClass: 'mfp-img-mobile',
          	gallery: {
	            enabled: true,
	            navigateByImgClick: true,
	            preload: [0,1],
	            tCounter: '<span class="mfp-counter">%curr% / %total%</span>' 
	        },
	        image: {
	            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	            titleSrc: function(item) {
	            	return '<span class="main-text">' + item.el.attr("title") + '</span>';
	            }
	        }
		});

		// Popup Image
		$(".image-popup").magnificPopup({
			type:"image",
			closeOnContentClick:true,
			mainClass:"mfp-img-mobile",
			image: {
				tError: '<a href="%url%">The image</a> could not be loaded.',
				titleSrc: function(item) {
	            	return '<span class="main-text">' + item.el.attr("title") + '</span>';
	            },
	            verticalFit:true
			}
		});
	}

   

	// countDown configurations ( Coming soon Template )
	if (($().countdown) && ($(".init-countdown").length)) {
		$('.init-countdown').countdown({
	        date: "December 15, 2014 15:03:26", //Change this date, keep the format
	        render: function(data) {
	            var el = $(this.el);
	            el.empty()
	            	.append("<div class='col-sm-6 col-md-3'>" 
	            		+ "<div class='countdown'> <span class='counter'>"
	            		+ this.leadingZeros(data.days, 2) 
	            		+ "</span> <span class='time'>days</span></div></div>")
	            	.append("<div class='col-sm-6 col-md-3'>" 
	            		+ "<div class='countdown'> <span class='counter'>"
	            		+ this.leadingZeros(data.hours, 2) 
	            		+ "</span> <span class='time'>hours</span></div></div>")
	            	.append("<div class='col-sm-6 col-md-3'>" 
	            		+ "<div class='countdown'> <span class='counter'>"
	            		+ this.leadingZeros(data.min, 2) 
	            		+ "</span> <span class='time'>minutes</span></div></div>")
	            	.append("<div class='col-sm-6 col-md-3'>" 
	            		+ "<div class='countdown'> <span class='counter'>"
	            		+ this.leadingZeros(data.sec, 2) 
	            		+ "</span> <span class='time'>seconds</span></div></div>");
	        }
	    });
	}

	// Sharrre plugin 
	if (($().sharrre) && $(".sharrre").length) {

		$("#shareit").sharrre({
			share: {
				twitter:true,
				facebook:true,
				googlePlus:true
			},
			enableHover:false,
			urlCurl:"inc/sharrre/sharrre.php",
			enableTracking:((typeof(_gaq) != 'undefined') ? true : false), 
			template:"<ul class='social-icon with-bg rounded'><li><a href='#'><i class='fa fa-facebook'></i></a></li><li><a href='#'><i class='fa fa-twitter'></i></a></li><li><a href='#'><i class='fa fa-google-plus'></i></a></li></ul>",
			render: function(api, options) {
				$(api.element).on("click",".fa-twitter",function() {
					api.openPopup("twitter");
				});
				$(api.element).on("click",".fa-facebook",function() {
					api.openPopup("facebook");
				});
				$(api.element).on("click",".fa-google-plus",function() {
					api.openPopup("googlePlus");
				});
			}
		});
	}



/* *********************	Bootstrap config	********************* */
	
	/* Tooltips */
	if ( $().tooltip ) {
		$("[data-toggle='tooltip']").tooltip();
	} 

	if ( $().popover ) {
		$("[data-toggle='popover']").popover();
	}



/* *********************	Website enhancement & bug fixes	********************* */


	// Clients 
	if ( $('.client').length ) {

			setInterval(function() {

			$('.client.on').removeClass('on');

			var random = Math.floor(Math.random() * 5);
			$('#c-' + random).addClass('on');

			var imgOn = $('.client.on').find('.c-img.on').removeClass('on');

			if ( imgOn.next() && imgOn.next().length) {
				imgOn.next().addClass('on');
			} else {
				imgOn.siblings(':first').addClass('on');
			}

		}, 800);
	}

	// Fixed Foter padding 
	if ($windowWidth >= 768) {
		var fixedFooter = $('.footer-fixed-bottom');
		if ( fixedFooter) {
			var footerHeight = fixedFooter.outerHeight(true);
			$('#wrapper').css('margin-bottom',footerHeight);
		}
	}


	// remove from Cart
	$('.remove-product').click(function () {

        $(this).parent("td").parent("tr").hide();
        return false;

    });

    // Background parallax position : left or right 
    if ($windowWidth > 991) {
    	$('.custom-bg2').each(function() {
  		var bgLeftPos = (($windowWidth / 2) - 570),
	    		bgRightPos = (($windowWidth / 2));

	    	$('.bg-left').css('background-position', bgLeftPos + "px 50%");
	    	$('.bg-right').css('background-position', bgRightPos + 'px 50%');
	  	});
    }



    // Custom background
	$(".custom-bg").each(function () {
		var $this = $(this),
		    background = $this.attr("data-bg");

		if (validate(background, false)) {
			$this.css('background-image', 'url("' + background + '")');
		}
	});


	// Fix height attribute on iframes
	$('iframe').each(function() {
		
		var $this = $(this);
		$this.css('height', $this.attr('height') + 'px');

	});


	function rsEmbed() {


		$('.rs-video').each(function() {

			var $this = $(this),

				embedWidth = $this.width(),

				embedHeight = ( $this.hasClass('video-4by3') ? (embedWidth * 0.75) : (embedWidth * 0.5625) );

			$this.css('height', embedHeight + 'px');

		});

	}


	rsEmbed();

	$win.resize(function() {
		rsEmbed();
	});



	// Testimonials background position


	if ( ($windowWidth > 768) && $('.bg-testimonials').length ) {

		(function() {
			
			var c = 0;

			function bgTestimonials() {
				c -= 1;
				$('.bg-testimonials').css('background-position', c + "px 0" );
			}

			setInterval(bgTestimonials,20);

		})();
	}


	// Fix IE9 placeholder 
	if (ie === 9) {
		$.getScript('inc/jquery.placeholder.js',function() {
			$('input, textarea').placeholder();
		});
	}



	// Align middle
	$win.load(function() {
		$('.align-middle').each(function() {
			var $this = $(this),
				height = $this.height(),
				parentHeight = $this.parent().height(),
				paddingTop = (parentHeight - height) / 2;

			$this.css('padding-top',paddingTop);
		});
	});



	
	



/* *********************	Animations	********************* */

	// Animations
	if ( ($().appear) && (isMobileDevice === false) ) {

		$('.animated').appear(function () {
			var $this = $(this);

			$this.each(function () {

				var animation = $this.data('anim'),
					delay = ($this.data('delay') + 'ms'),
					speed= ($this.data('speed') + 'ms');

				$this.addClass('activate').addClass(animation).css({
					'-moz-animation-delay':delay,
					'-webkit-animation-delay':delay,
					'animation-delay':delay,
					'-webkit-animation-duration':speed,
					'animation-duration':speed
				});

			});
		}, {accX: 50, accY: -150});

	} else {

		$('.animated').removeClass("animated");
	}


	// Progress bars animations
	$(".progress").each(function() {

		var $this = $(this);

		if (($().appear) && (isMobileDevice === false) && ($this.hasClass("no-anim") === false) ) {	

			$this.appear(function () {

					var $bar = $this.find(".progress-bar");
					$bar.addClass("progress-bar-animate").css("width", $bar.attr("data-percentage") + "%");


			}, {accY: -150} );

		} else {

			var $bar = $this.find(".progress-bar");
			$bar.css("width", $bar.attr("data-percentage") + "%");
		}
	});



/* *********************	Carousel config	********************* */

	if (($().owlCarousel) && ($(".owl-carousel").length)) {


		$("#owl-project").owlCarousel({
			singleItem:true,
			stopOnHover:true,
			navigation:false,
			autoPlay:5500
		});

		$("#owl-office").owlCarousel({
			singleItem:true,
			stopOnHover:true,
			navigation:false,
			autoPlay:8500,
			transitionStyle: "fade"
		});

		$("#owl-shop").owlCarousel({
			singleItem:true,
			stopOnHover:true,
			navigation:true,
			navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
			pagination:false,
			autoPlay:false
		});

	} // END if 



/* *********************	Portfolio config	********************* */


	if (($().isotope) && ($('#portfolio-isotope').length)) {

		var $portfolio = $('.portfolio');

			if (ie) {

				var $item = $portfolio.find('.el'),
					itemWidth = $item.outerWidth(true) - 30;

					$('.portfolio-container').find('.row').css({
						"margin-left":0
					});

				(function() {

					function fixGrid() {
						$item.each(function() {
							$item.css({
								'width': itemWidth + 'px',
								'padding-left':0,
								'padding-right':0
							});
						});
					}
					fixGrid();

					$win.resize(function() {
						fixGrid();
					});

				})();

				$portfolio.isotope({
					itemSelector:'.el',
					filter: '*',
					layoutMode: 'masonry',
					transitionDuration:'0.6s',
					masonry: {
						columnWidth:'.el',
						gutter:30
					}
				});

			} else {

				// fix overlap issue
				$portfolio.imagesLoaded(function() {

					$portfolio.isotope({
						itemSelector:'.el',
						filter: '*',
						layoutMode: 'masonry',
						transitionDuration:'0.6s',
						masonry: {
							columnWidth:'.el',
						}
					});
				});

			}



		// Filter links
		$('.portfolio-filter a').on('click', function() {

			var $this = $(this),
				fv = $this.attr('data-filter');

			$portfolio.isotope({ filter: fv });

			$('.portfolio-filter a').removeClass('active');
			$this.addClass('active');

			return false;
		});

	} // END if 



/* *********************	Slider config	********************* */


	if ($('.rs_boxed').length) {
	    jQuery('.tp-banner').revolution({
			delay:9000,
			startwidth:1170,
			startheight:550,
			hideThumbs:10,
			hideTimerBar:"on",
			spinner:"spinner4",
			navigationStyle:"preview1"
		});
	} 

	if ($('.rs_fullscreen').length) {
		jQuery('.tp-banner').revolution({
			delay:9000,
			startwidth:1170,
			startheight:550,
			hideThumbs:10,
			fullWidth:"off",
			fullScreen:"on",
			fullScreenOffsetContainer:"#header",
			spinner:"spinner4",
			navigationStyle:"preview1"
		});
	} 

	if ($('.rs_fullwidth').length) { 
		jQuery('.tp-banner').revolution({
			delay:9000,
			startwidth:1170,
			startheight:550,
			hideThumbs:10,
			fullWidth:"on",
			spinner:"spinner4",
			navigationStyle:"preview1"
		});
	}



	if (($().flexslider) && ($(".flexslider").length)) {

		// strict mode "functions at first" issue
		(function() { 

			var $this = $(".flexslider");

			if ($('.flex-full-height').length) {
				var headerHeight = $('.header-wrapper').height(),
					bodyHeight = $('body').height(),
					sliderHieght = bodyHeight - headerHeight;
				$('#main-slider').css('height',sliderHieght);
				$('#main-slider').find('.slides > li').css('height',sliderHieght);
			}


			function showAnimations() {
				$this.find(".flex-active-slide").find("[data-anim]").each(function () {
					var $this = $(this),
						$delay = validate($this.data("delay"),false) + 'ms'; 

					$this.addClass($this.data("anim"))
						 .css({
							"-webkit-animation-delay":$delay,
							"-moz-animation-delay":$delay,
							"animation-delay":$delay
						 })
						 .addClass("activate");
				});
			}

			function hideAnimations() {
				$this.find(".flex-content").find("[data-anim]").each(function () {
					var $this = $(this);
					$this.removeClass($this.data("anim")).removeClass("activate");
				});
			}

			// init main slider
			$("#main-slider").flexslider({                                                
				slideshowSpeed: 8500,         
				animationSpeed: 700, 
				animationLoop: true,      
				controlNav: false, 
				directionNav:true,
				prevText:"<i class='fa fa-angle-left fa-2x'></i>", 
				nextText:"<i class='fa fa-angle-right fa-2x'></i>",
				start: function() {
					setTimeout(showAnimations, 750);
				},

				before: hideAnimations, 

				after: function() {

					// fade effect issue
					setTimeout(showAnimations, 200); 
				}

			});

		})(); // END function

	} // END if



/* *********************	Contact Form	********************* */


	if ($('.working-contact-form').length ) {

		var form = {

			init: false,

			initialize: function() {

				// if form is already initialized, skip 
				if (this.init) { 
					return; 
				} 
				this.init = true;


				var $form = $(".working-contact-form");
			
				$form.validate({
					submitHandler: function(form) {

						// Loading Button
						var btn = $(this.submitButton);
						btn.button("loading");

						// Ajax Submit
						$.ajax({
							type: "POST",
							url: $form.attr("action"),
							data: {
								"name": $form.find("#name").val(),
								"email": $form.find("#email").val(),
								"message": $form.find("#message").val()
							},
							dataType: "json",
							success: function(data) {

								var $success = $form.find("#contact-success"),
									$error = $form.find("#contact-error"); 

								if (data.response == "success") {

									$success.removeClass("hidden");
									$error.addClass("hidden");

									// Reset Form
									$form.find(".form-control")
										.val("")
										.blur()
										.parent()
										.removeClass("has-success")
										.removeClass("has-error")
										.find("label.error")
										.remove();


								} else {

									$error.removeClass("hidden");
									$success.addClass("hidden");
								}
							},
							complete: function () {
								btn.button("reset");
							}
						});
					},
					rules: {
						name: {
							required: true
						},
						email: {
							required: true,
							email: true
						},
						message: {
							required: true
						}
					},
					messages: {
						name: {
							required:"<span class='form-message-error'>Please enter your name!</span>"
						},
						email: {
							required:"<span class='form-message-error'>Please enter your email address!</span>",
							email:"<span class='form-message-error'>Please enter a valid email address!</span>"
						},
						message: {
							required: "<span class='form-message-error'>Please enter a message!</span>"
						}
					},
					highlight: function (element) {
						$(element)
							.parent()
							.removeClass("has-success")
							.addClass("has-error");
					},
					success: function (element) {
						$(element)
							.parent()
							.removeClass("has-error")
							.addClass("has-success")
							.find("label.error")
							.remove();
					}
				});


			} // END initialize

		}; // END form object

		form.initialize();

	}



/* *********************	Charts	********************* */


	if ($('.init-chart').length) {

		// Make sure that the canvas element exists before to execute any code

		if ($('#bar-chart').length) {

			// bar
			var bar = {
				labels : ["January","February","March","April","May","June","July"],
				datasets : [
					{
						fillColor : "#eee",
						strokeColor : "#ddd",
						data : [65,59,90,81,56,55,40]
					},
					{
						fillColor : "rgb(34,171,166)",
						strokeColor : "rgb(34,171,166)",
						data : [28,48,40,19,96,27,100]
					}
				]
				
			};

			if ($().appear && $('.animated-chart').length) {
				$('.animated-chart').appear(function() {
					var myBar = new Chart(document.getElementById("bar-chart").getContext("2d")).Bar(bar, {animation:true});
				});
			} else {
				var myBar = new Chart(document.getElementById("bar-chart").getContext("2d")).Bar(bar, {animation:false});
			}
		}

		if ($('#doughnut-chart').length) {

			//Doughnut
			var doughnut = [
					{
						value: 30,
						color:"#F7464A"
					},
					{
						value : 50,
						color : "#46BFBD"
					},
					{
						value : 100,
						color : "#FDB45C"
					},
					{
						value : 40,
						color : "#949FB1"
					},
					{
						value : 120,
						color : "#4D5360"
					}
				
				];

			if ($().appear && $('.animated-chart').length) {
				$('.animated-chart').appear(function() {
					var myDoughnut = new Chart(document.getElementById("doughnut-chart").getContext("2d")).Doughnut(doughnut,{animation:true});
				});
			} else {
				var myDoughnut = new Chart(document.getElementById("doughnut-chart").getContext("2d")).Doughnut(doughnut,{animation:false});
			}
		}

		if ($('#line-chart').length) {

			// Line 
			var line = {
				labels : ["January","February","March","April","May","June","July"],
				datasets : [
					{
						fillColor : "rgba(220,220,220,0.5)",
						strokeColor : "rgba(220,220,220,1)",
						pointColor : "rgba(220,220,220,1)",
						pointStrokeColor : "#fff",
						data : [65,59,90,81,56,55,40]
					},
					{
						fillColor : "rgba(34,171,166,0.5)",
						strokeColor : "rgba(34,171,166,1)",
						pointColor : "rgba(34,171,166,1)",
						pointStrokeColor : "#fff",
						data : [28,48,40,19,96,40,80]
					}
				]
				
			};
			
			if ($().appear && $('.animated-chart').length) {
				$('.animated-chart').appear(function() {
					var myLine = new Chart(document.getElementById("line-chart").getContext("2d")).Line(line,{animation:true});
				});
			} else {
				var myLine = new Chart(document.getElementById("line-chart").getContext("2d")).Line(line,{animation:false});
			}
			
		}

		if ($('#pie-chart').length) {

			// Pie 
			var pie = [
					{
						value: 30,
						color:"#4D5360"
					},
					{
						value : 50,
						color : "FDB45C"
					},
					{
						value : 100,
						color : "rgb(35,171,166)"
					}
				
				];

			if ($().appear && $('.animated-chart').length) {
				$('.animated-chart').appear(function() {
					var myPie = new Chart(document.getElementById("pie-chart").getContext("2d")).Pie(pie,{animation:true});
				});
			} else {
				var myPie = new Chart(document.getElementById("pie-chart").getContext("2d")).Pie(pie,{animation:false});
			}

		}

	}



/* *********************	Preloader	********************* */


	$win.load(function(){

		if ($("#preloader").length) {

			$('#status').fadeOut(); 
			$('#preloader').delay(350).fadeOut('slow');
			$body.delay(350).css({'overflow':'visible'}); 

		} // END if


	}); // END Window Load


})(jQuery);
/* END Document ready */
