'use strict';

$(function() {
    var _toggleNavHeader,
        _animateCover,
        _expand,
        $defaultHeader,
        $homeButton,
        $cover,
        isOpen;

    isOpen = location.hash === '#open';
    $defaultHeader = $('#default-header');
    $homeButton = $defaultHeader.find('#home-button');
    $cover = $('.cover');

    _animateCover = function() {
        $cover.addClass('animated');
    };

    _toggleNavHeader = function() {
        $defaultHeader.toggleClass('expanded');
    };

    _expand = function(options) {
        $('main, .cover, .links > li, html').toggleClass('expanded');
        _toggleNavHeader()
        return KelyvinTheme.search.form(options.form);
    };

    $homeButton.click(function() {
        location.hash = '';
        _animateCover();
        return _expand({
            form: 'hide'
        });
    });

    $('.nav-blog > a').click(function(event) {
        if (KelyvinTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            location.hash = '#open';
            return _expand({
                form: 'toggle'
            });
        }
    });

    $('#avatar-link, #aside-close-button').click(function (event) {
        var device = KelyvinTheme.device();

        if (KelyvinTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            location.hash = '#open';
            return _expand({
                form: 'toggle'
            });
        } else if (device !== 'desktop') {
            event.preventDefault();
            _animateCover();
            return _expand({
                form: 'hide'
            });
        }
    });

    if (KelyvinTheme.is('page', 'home')) {
        if (!isOpen) {
            _toggleNavHeader();
            return _expand({
                form: 'hide'
            });
        } else {
            _toggleNavHeader();
        }
    } else {
        _toggleNavHeader();
    }
});
