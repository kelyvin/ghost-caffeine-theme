'use strict';

$(function() {
    var _animate, _expand, isOpen;
    isOpen = location.hash === '#open';
    _animate = function() {
        return setTimeout(function() {
            return $('.cover').addClass('animated');
        }, 1000);
    };
    _expand = function(options) {
        $('main, .cover, .links > li, html').toggleClass('expanded');
        return KelyvinTheme.search.form(options.form);
    };
    $('#menu-button').click(function() {
        return $('.cover, main, #menu-button, html').toggleClass('expanded');
    });
    $('.nav-blog > a, #avatar-link').click(function(event) {
        if (KelyvinTheme.is('page', 'home')) {
            event.preventDefault();
            location.hash = location.hash === '' ? '#open' : '';
            if (!KelyvinTheme.is('device', 'desktop')) {
                return $('#menu-button').trigger('click');
            }
            return _expand({
                form: 'toggle'
            });
        }
    });
    if ((KelyvinTheme.is('device', 'desktop')) && (KelyvinTheme.is('page', 'home'))) {
        _animate();
        if (!isOpen) {
            return _expand({
                form: 'hide'
            });
        }
    }
});
