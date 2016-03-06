"use strict";

$(function() {
    var openHash = "#open",
        _expandCover,
        _isOpen,
        _isTagsOverlayOpen,
        _toggleLocation,
        _toggleTagsOverlay,
        _defaultLogoNavEvent,
        $navHeader,
        $tagsButton,
        $homeButton,
        $cover,
        $tagsOverlay;

    $cover = $(".cover");
    $navHeader = $("#default-nav-header");
    $tagsButton = $(".tags-button");
    $homeButton = $navHeader.find("#home-button");
    $tagsOverlay = $(".tags-overlay");

    _expandCover = function() {
        $cover.toggleClass("expanded");
    };

    // Checks if the home page is currently opened
    _isOpen = function() {
        return location.hash === openHash;
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
        $tagsButton.find("i").toggleClass("fa-search fa-close");
    };

    // Checks if the search/tags overlay is visible
    _isTagsOverlayOpen = function() {
        return $tagsOverlay.hasClass("show");
    };

    _defaultLogoNavEvent = function (event) {
        event.preventDefault();

        if (_isTagsOverlayOpen()) {
            _toggleTagsOverlay();
        }

        _toggleLocation();
        return _expandCover();
    };

    $tagsButton.click(function() {
        _toggleTagsOverlay();
    });

    $(".nav-blog > a").click(function(event) {
        var isOpen = _isOpen();

        if (CaffeineTheme.is("page", "home")) {
            event.preventDefault();
            location.hash = openHash;

            // Only toggle the cover if it wasn't already open
            if (!isOpen) {
                return _expandCover();
            }
        }
    });

    $homeButton.click(_defaultLogoNavEvent);
    $(".open-link").click(_defaultLogoNavEvent);

    if (CaffeineTheme.is("page", "home")) {
        if (!_isOpen()) {
            return _expandCover();
        }
    }
});
