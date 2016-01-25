'use strict';

$(function() {
    var openHash = "#open",
        _animateCover,
        _expand,
        _isOpen,
        _isTagsOverlayOpen,
        _toggleNavHeader,
        _toggleLocation,
        _toggleTagsOverlay,
        $mobileHeader,
        $tagsButton,
        $homeButton,
        $cover,
        $tagsOverlay;

    $mobileHeader = $('#mobile-header');
    $tagsButton = $('.tags-button');
    $homeButton = $mobileHeader.find('#home-button');
    $cover = $('.cover');
    $tagsOverlay = $('.tags-overlay');

    _animateCover = function() {
        $cover.addClass('animated');
    };

    _expand = function(options) {
        $('main, .cover, .links > li, html').toggleClass('expanded');
        _toggleNavHeader();
    };

    _isOpen = function() {
        return location.hash === openHash;
    };

    _isTagsOverlayOpen = function() {
        return $tagsOverlay.hasClass("show");
    };

    _toggleNavHeader = function() {
        $mobileHeader.toggleClass('expanded');
    };

    _toggleLocation = function() {
        if (_isOpen()) {
            location.hash = "";
        } else {
            location.hash = openHash;
        }
    };

    _toggleTagsOverlay = function() {
        $tagsOverlay.toggleClass("show");
        $tagsButton.find('i').toggleClass("fa-search fa-close");
    };

    $homeButton.click(function() {
        if (_isTagsOverlayOpen()) {
            _toggleTagsOverlay();
        }

        location.hash = '';
        _animateCover();
        return _expand({
            form: 'hide'
        });
    });

    $tagsButton.click(function() {
        _toggleTagsOverlay();
    });

    $('.nav-blog > a').click(function(event) {
        var isOpen = _isOpen();

        if (KelyvinTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            location.hash = '#open';

            // Only toggle the cover if it wasn't already open
            if (!isOpen) {
                return _expand({
                    form: 'toggle'
                });
            }
        }
    });

    $('#avatar-link, #aside-close-button').click(function (event) {
        var device = KelyvinTheme.device();

        if (KelyvinTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            _toggleLocation();

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
        if (!_isOpen()) {
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
