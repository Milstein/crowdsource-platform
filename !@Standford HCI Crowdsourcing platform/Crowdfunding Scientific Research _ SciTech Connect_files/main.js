$(document).ready(function () {
    /*
    var areaHight = $('.maincontent .postArea').height();
    $('.maincontent .postArea .rightpane').animate({height: areaHight}, 500);
    */
    
    $(document).on('cycle-initialized', '.postImgCycle', function(event, optionHash) {
        var slides = optionHash.slides;
        var slideNr = slides.length;
        var i = 0;
        var arr = [];
        
        $.each(slides, function() {
            arr.push({
                title: $(this).find('.postTitle').text(),
                href: $(this).find('.postTitle').attr('href')
            });
        });
        
        $.each($('.postlist li'), function() {
            $(this).html('<a href="'+arr[i].href+'">'+arr[i].title+'</a>');
            i++;
            
            if (slideNr == i) {
                $(this).addClass('last');
            }
        });
        
    });
    
    $('.gallery').addClass('group');
    
    $('.gallery').append('<div class="galleryPrev">< prev</div>');
    $('.gallery').append('<div class="galleryNext">next ></div>');
    $('.gallery').cycle({
        fx: 'carousel',
        speed: 0,
        timeout: 0,
        manualSpeed: 500,
        carouselVisible: 3,
        slides: '.gallery-item',
        prev: '.galleryPrev',
        next: '.galleryNext',
        carouselFluid: true,
        swipe: true
    });
    
    $('.subjectLb').click(function() {
        if (!$('.descLoader').hasClass('active')) {
            $('.descLoader').slideDown(250, function() {
                $(this).addClass('active');
            });
        } else {
            $('.descLoader').slideUp(250, function() {
                $(this).removeClass('active');
            });
        }
        return false;
    });

    $('blockquote').each(function(){
        $(this).addClass('quote tabletHide');
        var bloquequote=$(this).children('p').html();
        $(this).html('<span class="quoteChar">&ldquo;</span><span class="mainQuote">'+bloquequote+'</span><span class="quoteChar">&rdquo; <span class="quoteShare"><a href="http://twitter.com/share?text=Lorem ipsum dolor sit amet, consectetur adipiscing elit." target="_blank">share this quote</a></span></span>');
    });
    
    $('.postImgCycle').cycle({
        slides: '.slide',
        pager: '.sliderControlsInner ul, .postlist',
        pagerEvent: 'mouseover',
        pagerTemplate: '<li></li>',
        prev: '.cyclePrevBtn',
        next: '.cycleNextBtn',
        swipe: true,
        speed: 1000
    });
    
    //CALL CAROUSEL ONLY ON ARTICLE PAGE
    if ($(window).width() > 959 && $('#article').length > 0) {
        $('.tabletHide .carouselCycle').cycle({
            fx: 'carousel',
            speed: 0,
            manualSpeed: 500,
            timeout: 0,
            carouselVisible: 4,
            slides: '> li',
            prev: '.cycleLeft',
            next: '.cycleRight',
            swipe: true
        });

        
        $('.articlePopup .closeBtn').click(function() {
            if ($('.articlePopup.tabletHide').hasClass('active')) {
                var wpx = '-'+w+'px';
                $('.articlePopup.tabletHide').animate({right: wpx}, 1000).removeClass('active');
            }
        });
        
        var w = $('.articlePopup.tabletHide').width();
        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var a = $('.section.disqus').visible(true);
            var b = $('#headcontainer').visible(true);
            
            if (a && !$('.articlePopup.tabletHide').hasClass('active')) {
                $('.articlePopup.tabletHide').animate({right: 0}, 1000).addClass('active');
            }
            
           var st = $(this).scrollTop();
           if (st > lastScrollTop){
               $('#article .toStick').removeClass('sticky');
           } else {
              $('#article .toStick').addClass('sticky');
           }
           lastScrollTop = st;
            
            if (!b) {
                var paneW = $('.col.span_8_of_11.leftpane').width();
                $('#article .scrollsharehide').css('display', 'none');
                $('#article .scrollshareshow').css({width: paneW, display: 'block'});
                //$('#article .toStick').addClass('sticky');
            } else {
                $('#article .scrollsharehide').css('display', 'block');
                $('#article .scrollshareshow').css('display', 'none');
                //$('#article .toStick').removeClass('sticky');
            }
            
        });
        
    } else if ($(window).width() < 959) {
        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var b = $('#headcontainer').visible(true);
            
            var st = $(this).scrollTop();
            if (st > lastScrollTop){
                $('#article .toStick').removeClass('sticky');
            } else {
                $('#article .toStick').addClass('sticky');
            }
            lastScrollTop = st;

            if (!b) {
                //$('#article .toStick').addClass('sticky');
                $('#headcontainer .menuBlock').addClass('sticky');
            } else {
                //$('#article .toStick').removeClass('sticky');
                $('#headcontainer .menuBlock').removeClass('sticky');
            }
        });
    }
    
    if ($(window).width() < 600 && $('.mobileShow .carouselCycle').length > 0) {
        var slideNum = 2;
        if ($(window).width() < 480) {
            slideNum = 1;
        }
        
        $('.mobileShow .carouselCycle').cycle({
            fx: 'carousel',
            speed: 0,
            manualSpeed: 500,
            timeout: 0,
            carouselVisible: slideNum,
            slides: '> li',
            prev: '.cycleLeft',
            next: '.cycleRight',
            swipe: true
        });
        
        var isAnimating = false;
        $(window).scroll(function() {
            var a = $('.section.disqus').visible(true);

            //console.log(isAnimating);
            if (!isAnimating) {
                if (a && !$('.articlePopup.mobileShow').hasClass('stick')) {
                    $('.mobileShow .carouselCycle').width($(window).width()-50);
                    $('.articlePopup.mobileShow').animate({bottom: 0}, 500, function() {
                        $('.articlePopup.mobileShow').addClass('stick');
                        isAnimating = false;
                    });
                } else if (!a && $('.articlePopup.mobileShow').hasClass('stick')) {
                    $('.articlePopup.mobileShow').animate({bottom: '-166px'}, 500, function() {
                        $('.articlePopup.mobileShow').removeClass('stick');
                        isAnimating = false;
                    });
                }
            }
        });
    } else if ($(window).width() < 600 && $('.articlePopup.mobileShow .carouselContainer').children().length <= 0) {
        //HIDE RELATED POSTS POPUP WITHOUT CONTENT
        $('.articlePopup.mobileShow').css('display', 'none');
        
    } else if ($(window).width() > 600) {
        //DISABLE CLICK ON # MENU HREFS
        $('.menu .menu-item > a').click(function() {
            if ($(this).attr('href') == '#') {
                return false;
            }
        });
        
    }
    
    $('.mobileSearch').click(function() {
        if (!$('.searchbarMobile').hasClass('active') && $('.dropmenuMobile').hasClass('active')) {
            $('.dropmenuMobile').fadeOut(250, function() {
                $(this).removeClass('active');
                $('.searchbarMobile').fadeIn(250).addClass('active');
            });
        } else if (!$('.searchbarMobile').hasClass('active') && !$('.dropmenuMobile').hasClass('active')) {
            $('.searchbarMobile').fadeIn(250).addClass('active');
        } else if ($('.searchbarMobile').hasClass('active') && !$('.dropmenuMobile').hasClass('active')) {
            $('.searchbarMobile').fadeOut(250).removeClass('active');
        }
    });
    
    $('.mobileHide .menu .menu-item-has-children').hoverIntent(
        function() {
            $(this).children('ul').fadeIn(250);
        }, function() {
            $(this).children('ul').fadeOut(500);
        }
    );
    
    $('.quoteShare a').attr('href', 'http://twitter.com/share?text='+$('.mainQuote').text());
    
    //+++++++++++++++MOBILE MENU
    var html,
        htmlH,
        origH;
    
    $('.mobileMenu').click(function() {
        if (!$('.dropmenuMobile').hasClass('active') && $('.searchbarMobile').hasClass('active')) {
            $('.searchbarMobile').fadeOut(250, function() {
                $(this).removeClass('active');
                $('.dropmenuMobile').fadeIn(250).addClass('active');
            });
        } else if (!$('.dropmenuMobile').hasClass('active') && !$('.searchbarMobile').hasClass('active')) {
            $('.dropmenuMobile').fadeIn(250).addClass('active');
        } else if ($('.dropmenuMobile').hasClass('active') && !$('.searchbarMobile').hasClass('active')) {
            $('.dropmenuMobile').fadeOut(250).removeClass('active');
        }
    });
    
    $('.dropmenuMobile .menu .sub-menu').addClass('group');
    
    $('.dropmenuMobile .menu .menu-item-has-children').click(function(e) {
        e.preventDefault();
        
        $('.dropmenuMobile').addClass('menuClicked');
        origH = $('.dropmenuMobile .menu').height();
        
        html = $(this).children('.sub-menu').clone();
        //htmlH = $(this).children('.sub-menu').children().length;
        
        $('.dropmenuMobile .mobileSubLoader .innerLoader').append(html);
        
        $('.dropmenuMobile .menu').animate({left: '-100%'}, 750);
        $('.dropmenuMobile').animate({height: 250}, 500);
        $('.dropmenuMobile .mobileSubLoader').animate({right: 0}, 750);
        $('.dropmenuMobile .innerLoader').perfectScrollbar();
        return false;
    });
    
    $('.dropmenuMobile .back').click(function() {
        $(this).removeClass('menuClicked');
        $(this).parent().animate({right: '-100%'}, 750);
        $('.dropmenuMobile').animate({height: origH}, 500);
        $('.dropmenuMobile .menu').animate({left: 0}, 750, function() {
            $('.dropmenuMobile .mobileSubLoader .innerLoader').html('');
        });
        return false;
    });
    
    $('.mobileSubLoader').on('swiperight', function() {
        $(this).removeClass('menuClicked');
        $(this).animate({right: '-100%'}, 750);
        $('.dropmenuMobile').animate({height: origH}, 500);
        $('.dropmenuMobile .menu').animate({left: 0}, 750, function() {
            $('.dropmenuMobile .mobileSubLoader .innerLoader').html('');
        });
    });
    
    //+++++++++++++++
    
    //FULL POST CLICK
    $('.leftposts .post a, .rightposts .post a').click(function(e) {
        e.preventDefault();
    });
    $('.leftposts .post, .rightposts .post, .postlist li').click(function() {
        var href = $(this).children('a').attr('href');
        window.location.href = href;
    });
    
    $('.slide.cycle-slide').click(function() {
        var href = $('.postTitle').attr('href');
        window.location.href = href;
    });
    
})

$(window).resize(function () {
    if ($(window).width() <= 639 && $('.mobileShow .carouselCycle').length > 0) {
        var slideNum = 2;
        if ($(window).width() < 480) {
            slideNum = 1;
        }
        
        $('.mobileShow .carouselCycle').cycle({
            fx: 'carousel',
            speed: 0,
            manualSpeed: 500,
            timeout: 0,
            carouselVisible: slideNum,
            slides: '> li',
            prev: '.cycleLeft',
            next: '.cycleRight',
            swipe: true
        });
    } else if ($(window).width() > 600) {
        $('#article .toStick').removeClass('sticky');
        $('#headcontainer .menuBlock').removeClass('sticky');
    }
    //$.refreshBackgroundDimensions( $('.head') ); 

});

/*	$.getScript( "js/jquery.backgroundSize.js", function( data ) {
		$('.bannercontainer').css({'backgroundSize': "cover"});
	})*/