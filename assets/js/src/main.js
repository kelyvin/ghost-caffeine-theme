'use strict';

$(function() {
    var $posts = $('.page-index ol.posts'),
        cardName = '.card',
        el;

    el = CaffeineTheme.app;
    el.dataset.page = CaffeineTheme.context();
    el.dataset.device = CaffeineTheme.device();
    CaffeineTheme.readTime();
    if (!CaffeineTheme.is('device', 'desktop')) {
        FastClick.attach(el);
    }
    if (window.profile_title) {
        $('.profile-title').text(window.profile_title);
    }
    if (window.profile_resume) {
        $('#profile-resume').text(window.profile_resume);
    }
    if (CaffeineTheme.is('page', 'post')) {
        $('main').readingTime({
            readingTimeTarget: '.reading-time > span'
        });
        $('.content').fitVids();
    }

    // Sets up masonry effects
    if ($posts && $posts.masonry) {
        $posts.masonry({
            itemSelector: cardName,
            percentPosition: true
        });
    } else {
        $posts.find(cardName).css('width', '100%');
    }

    $(window).load(function() {
        $('.cover').addClass('animated');

        if (window.ScrollReveal && $(cardName).length > 0) {
            window.sr = ScrollReveal();
            sr.reveal(cardName);
        }
    });
});
