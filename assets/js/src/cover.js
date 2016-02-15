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
        _defaultLogoNavEvent,
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

    // Animate the cover page
    _animateCover = function() {
        $cover.addClass('animated');
    };

    _expand = function() {
        $('main, .cover, .links > li, html').toggleClass('expanded');
        _toggleNavHeader();
    };

    // Checks if the home page is currently opened
    _isOpen = function() {
        return location.hash === openHash;
    };

    // Toggle the mobile nav header
    _toggleNavHeader = function() {
        $mobileHeader.toggleClass('expanded');
    };

    // Toggles the current home page between the cover and the opened page
    _toggleLocation = function() {
        if (_isOpen()) {
            location.hash = "";
        } else {
            location.hash = openHash;
        }
    };

    // Toggles the search/tags overlay
    _toggleTagsOverlay = function() {
        $tagsOverlay.toggleClass("show");
        $tagsButton.find('i').toggleClass("fa-search fa-close");
    };

    // Checks if the search/tags overlay is visible
    _isTagsOverlayOpen = function() {
        return $tagsOverlay.hasClass("show");
    };

    // Sets the default event when you click on the logo
    // If on any page that is not the home page, the logo will redirect to the home page
    // Otherwise, toggle the cover
    _defaultLogoNavEvent = function (event) {
        var device = CaffeineTheme.device();

        if (CaffeineTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            _toggleLocation();

            return _expand();
        }
    };

    $tagsButton.click(function() {
        _toggleTagsOverlay();
    });

    $('.nav-blog > a').click(function(event) {
        var isOpen = _isOpen();

        if (CaffeineTheme.is('page', 'home')) {
            event.preventDefault();
            _animateCover();
            location.hash = openHash;

            // Only toggle the cover if it wasn't already open
            if (!isOpen) {
                return _expand();
            }
        }
    });

    $homeButton.click(_defaultLogoNavEvent);
    $('#avatar-link, #aside-close-button').click(_defaultLogoNavEvent);

    if (CaffeineTheme.is('page', 'home')) {
        if (!_isOpen()) {
            _toggleNavHeader();
            return _expand();
        } else {
            _toggleNavHeader();
        }
    } else {
        _toggleNavHeader();
    }
});
