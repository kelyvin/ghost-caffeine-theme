'use strict';

$(function() {
    var el;
    el = KelyvinTheme.app;
    el.dataset.page = KelyvinTheme.context();
    el.dataset.device = KelyvinTheme.device();
    KelyvinTheme.readTime();
    if (!KelyvinTheme.is('device', 'desktop')) {
        FastClick.attach(el);
    }
    if (window.profile_title) {
        $('#profile-title').text(window.profile_title);
    }
    if (window.profile_resume) {
        $('#profile-resume').text(window.profile_resume);
    }
    if (KelyvinTheme.is('page', 'post')) {
        $('main').readingTime({
            readingTimeTarget: '.post.reading-time > span'
        });
        $('.content').fitVids();
    }

    /*
    if (KelyvinTheme.is('device', 'desktop')) {
        $('a').not('[href*="mailto:"]').click(function() {
            if (this.href.indexOf(location.hostname) === -1) {
                window.open($(this).attr('href'));
                return false;
            }
        });
    }
    */
});
