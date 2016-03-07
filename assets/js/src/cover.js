"use strict";

$(function() {
    var _expandCover,
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

    // Toggles the current home page between the cover and the opened page
    _toggleLocation = function() {
        if (CaffeineTheme.isOpen()) {
            location.hash = "";
        } else {
            location.hash = CaffeineTheme.getOpenHash();
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
        CaffeineTheme.showIndexPage();
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
        var isOpen = CaffeineTheme.isOpen();

        if (CaffeineTheme.is("page", "home")) {
            event.preventDefault();
            location.hash = CaffeineTheme.getOpenHash();
            CaffeineTheme.showIndexPage();

            // Only toggle the cover if it wasn't already open
            if (!isOpen) {
                return _expandCover();
            }
        }
    });

    $homeButton.click(_defaultLogoNavEvent);
    $(".open-link").click(_defaultLogoNavEvent);

    if (CaffeineTheme.is("page", "home")) {
        if (!CaffeineTheme.isOpen()) {
            return _expandCover();
        }
    }
});
