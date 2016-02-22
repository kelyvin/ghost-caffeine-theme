'use strict';

$(function() {
    var el,
        $posts = $('.page-index ol.posts');

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

    if ($posts && $posts.masonry) {
        $posts.masonry({
            itemSelector: '.card',
            percentPosition: true
        });
    } else {
        $posts.find('.card').css('width', '100%');
    }

    /*
    if (CaffeineTheme.is('device', 'desktop')) {
        $('a').not('[href*="mailto:"]').click(function() {
            if (this.href.indexOf(location.hostname) === -1) {
                window.open($(this).attr('href'));
                return false;
            }
        });
    }
    */
});
