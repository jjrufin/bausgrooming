/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * topslider
  * autoHeight
  * testimonialCarousel
  * toggles
  * tabs
  * roll_appointment
  * rollNewCarousel
  * rollGallery
  * ajaxContactForm
  * ajaxSubscribe
  * blogSlider
  * blogIsotop
  * galleryIsotope
  * gallery_single_slider
  * gmapSetup
  * swClick
  * responsiveVideo
  * goTop
  * retinaLogos
  * twitterFeed
  * parallax
  * rollAnimation
  * alertBox
  * removePreloader
*/

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').find('.header-wrap').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixed = function() {
        if ( $('body').hasClass('header-sticky') ) {
            $('#header').sticky();
        }
    }

    var topslider = function() {
        if ( $().flexslider ) {
            $('.top-slider .flexslider').flexslider({
                animation: "fade",
                controlNav: true,
                directionNav: false,
                slideshow: true,
                prevText: "",
                nextText: ""
            });
        }
    };

    var autoHeight = function() {
        if ( $().matchHeight ) {
            $('.container-fluid').each(function(){
                $(this).find('.item').matchHeight();
            });
        }
    };

    var testimonialCarousel = function() {
        $('.roll-row.testimonials').each(function(){
            if ( $().owlCarousel ) {
                $(this).find('.roll-testimonials').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: false,
                    dots: true,
                    autoplay: false,
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 1
                        },
                        991:{
                            items: 1
                        }
                    }
                });
            }
        });
    };

    var toggles = function() {
        var args = {duration: 600};
        $('.roll-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.roll-toggle.enable .toggle-title').on('click', function() {
            $(this).closest('.roll-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle

        $('.roll-accordion .toggle-title').on('click', function () {
            if( !$(this).is('.active') ) {
                $(this).closest('.roll-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }
        }); // accordion
    };

    var tabs = function() {
        $('.roll-tabs').each(function() {
           var content = $('.content-tab .content-inner');
            content.hide();
            content.first().show();
            $(this).find('ul li').on('click',function(e) {
                var hid = $(this).index();
                e.preventDefault();
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                var contentActive = $(this).parents('.menu-tab').siblings('.content-tab').children('.content-inner').eq(hid);
                content.not(':eq(hid)').hide();
                contentActive.fadeIn(300);
            })
        });
    };

    var roll_appointment = function() {
        $('select').each(function() {
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;
            $this.addClass('s-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="styledSelect"></div>');
            var $styledSelect = $this.next('div.styledSelect');
            $styledSelect.text($this.children('option').eq(0).text());
            var $list = $('<ul />', {
                'class': 'options'
            }).insertAfter($styledSelect);
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
            var $listItems = $list.children('li');
            $styledSelect.on('click', function(e) {
                e.stopPropagation();
                $('div.styledSelect.active').each(function() {
                    $(this).removeClass('active').next('ul.options').hide();
                });
                $(this).toggleClass('active').next('ul.options').toggle();
            });

            $listItems.on('click', function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
            });

            $(document).on('click',function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    }

    var rollNewCarousel = function() {
        $('.roll-row').each(function() {
            if ( $().owlCarousel ) {
                $(this).find('.roll-news').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                });
            }
        });
    };

    var rollGallery = function() {
        $('.roll-gallery').each(function(){
            if ( $().owlCarousel ) {
                window.owl = $(this).find('.owl-carousel').owlCarousel({
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: false,
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                });
            }
        });
    };

    var ajaxAppointment = function() {
        $('#appointment-form').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });
                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.send-wrap').append(loading);
                        },


                        success: function( msg ) {
                            var result, cls;
                            console.log(msg);
                            if ( msg == 'Success' ) {
                                result = 'Your message has been sent. Thank you!';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'roll-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i> x</a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };

    var datepicker = function() {
        $( "#datepicker" ).datepicker();
    }

    var ajaxContactForm = function() {
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.send-wrap').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;

                            if ( msg == 'Success' ) {
                                result = 'Your message has been sent. Thank you!';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'roll-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i> x</a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list.<br>Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">There was a problem processing your submission.</div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function(action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                    subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                        case "email-required":
                            messageDiv.html(objUse.noticeError.replace('{msg}','Email is required.'));
                            break;
                        case "email-err":
                            messageDiv.html(objUse.noticeError.replace('{msg}','Email invalid.'));
                            break;
                        case "duplicate":
                            messageDiv.html(objUse.noticeError.replace('{msg}','Email is duplicate.'));
                            break;
                        case "filewrite":
                            messageDiv.html(objUse.noticeInfo.replace('{msg}','Mail list file is open.'));
                            break;
                        case "undefined":
                            messageDiv.html(objUse.noticeInfo.replace('{msg}','undefined error.'));
                            break;
                        case "api-error":
                            objUse.subscribeContent.fadeOut(500, function () {
                                messageDiv.html(objUse.failure_message);
                            });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var blogSlider = function() {
        if ( $().flexslider ) {
            $('.blog-slider').each(function() {
                var $this = $(this),
                    easing = ( $this.data('effect') == 'fade' ) ? 'linear' : 'easeInOutExpo';

                $this.find('.flexslider').flexslider({
                    animation      :  $this.data('effect'),
                    direction      :  $this.data('direction'), // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  easing,
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  true,
                    directionNav   :  false,
                    slideshow      :  $this.data('auto'),
                    prevText       :  '<i class="icon-arrow-left"></i>',
                    nextText       :  '<i class="icon-arrow-right"></i>',
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    };

    var blogIsotop = function() {
        if ( $().isotope ) {
            $('.main-content.blog-full-width .items .row').isotope({ filter: '*' });
        };
    };

	var galleryIsotope = function() {
		if ( $().isotope ) {
			var $container = $('.project-wrap');

			$container.imagesLoaded(function(){
				$container.isotope({
					itemSelector: '.project-item',
					transitionDuration: '1s'
				});
			});

			$('.project-filter li').on('click',function() {
				var selector = $(this).find("a").attr('data-filter');

				$('.project-filter li').removeClass('active');
				$(this).addClass('active');
				$container.isotope({ filter: selector });
				return false;
			});
		};
	};

    var gallery_single_slider = function() {
        if ( $().flexslider ) {
            $('.gallery-single-slider').each(function() {
                var $this = $(this),
                    easing = ( $this.data('effect') == 'fade' ) ? 'linear' : 'easeInOutExpo';

                $this.find('.flexslider').flexslider({
                    animation      :  $this.data('effect'),
                    direction      :  $this.data('direction'), // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  easing,
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  false,
                    directionNav   :  true,
                    slideshow      :  $this.data('auto'),
                    prevText       :  '<i class="icon-arrow-left"></i>',
                    nextText       :  '<i class="icon-arrow-right"></i>',
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    };

    var gmapSetup = function() {
        if ( $().goMap ) {
            $("#map").goMap({ // load map
                markers: [{
                    address: 'PO Box 97845 Baker st. 567, Los Angeles, California, United States',
                    title: 'My company',
                }],
                scrollwheel: false,
                disableDoubleClickZoom: false,
                zoom: 15,
                maptype: 'ROADMAP'
            });
        }
    };

    var swClick = function () {
        function activeLayout () {
            $(".switcher-container" ).on( "click", "a.un-activebox", function() {
                $(this).addClass('active');
                $('body').addClass('boxed');
                galleryIsotope();
            }).on( "click", "a.active.box", function() {
                $(this).removeClass('active').addClass('un-activebox');
                $('body').removeClass('boxed');
                return false;
            }).on( "click", "a.un-activemargin", function() {
                $(this).addClass('active');
                $('body').addClass('body-margin');
                return false;
            }).on( "click", "a.active.vmargin", function() {
                $(this).removeClass('active').addClass('un-activemargin');
                $('body').removeClass('body-margin');
                return false;
            }).on( "click", "a.sw-arrow", function() {
                $(this).addClass('active');
                $('.switcher-container .sw-form, .switcher-container .pattern').css('display', 'block');
                return false;
            }).on( "click", "a.sw-arrow.active", function() {
                $(this).removeClass('active');
                $('.switcher-container .sw-form, .switcher-container .pattern').css('display', 'none');
                return false;
            })
        }
        activeLayout();
    }

    var responsiveVideo= function() {
        if ( $().fitVids ) {
            $('.container').fitVids();
        }
    };

    // Go Top
    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        });

        $('.go-top').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;

        if(retina) {
            $('.header .logo').find('img').attr({src:'./images/logo@2x.png',width:'300',height:'150'});
            $('.home-dark .header .logo').find('img').attr({src:'./images/logo_dark2@2x.png',width:'300',height:'150'});
            $('.home-2 .header .logo').find('img').attr({src:'./images/logo_3@2x.png',width:'300',height:'150'});
            $('.header .logo.small').find('img').attr({src:'./images/logo_small@2x.png',width:'454',height:'120'});
        }
    };

    var twitterFeed = function () {
        if ( $().tweet ) {
            $('.list-tiwtter').each(function () {
                var $this = $(this);
                $this.tweet({
                    username: $this.data('username'),
                    join_text: "auto",
                    avatar_size: null,
                    count: $this.data('number'),
                    template: "{text}",
                    loading_text: "loading tweets...",
                    modpath: $this.data('modpath')
                }); // tweet
            }); // lastest-tweets each
        };
    };

    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0.3);
            $('.parallax2').parallax("50%", 0.4);
            $('parallax4').parallax("50%", 0.4);
            $('parallax5').parallax("50%", 0.4);
        }
    };

    var rollAnimation = function() {
        if ( isMobile.any() == null ) {
            $('.roll-animation').each( function() {
                var rollElement = $(this),
                    rollAnimationClass = rollElement.data('animation'),
                    rollAnimationDelay = rollElement.data('animation-delay'),
                    rollAnimationOffset = rollElement.data('animation-offset');

                rollElement.css({
                    '-webkit-animation-delay':  rollAnimationDelay,
                    '-moz-animation-delay':     rollAnimationDelay,
                    'animation-delay':          rollAnimationDelay
                });

                rollElement.waypoint(function() {
                    rollElement.addClass('animated').addClass(rollAnimationClass);
                },{
                    triggerOnce: true,
                    offset: rollAnimationOffset
                });
            });
        }
    };


    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.roll-alert').remove();
            e.preventDefault();
        })
    }

    var removePreloader = function() {
        $('.loader').fadeOut('slow',function () {
            $(this).remove();
        });
    };

   	// Dom Ready
	$(function() {
        headerFixed();
        responsiveMenu();
        topslider();
        autoHeight();
        testimonialCarousel();
        toggles();
        tabs();
        roll_appointment();
        rollNewCarousel();
        rollGallery();
        ajaxAppointment();
        datepicker();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        blogSlider();
        blogIsotop();
        galleryIsotope();
        gallery_single_slider();
        swClick();
        goTop();
        responsiveVideo();
        retinaLogos();
        alertBox();
        removePreloader();
        twitterFeed();
        gmapSetup();
        parallax();
        rollAnimation();
   	});

})(jQuery);
