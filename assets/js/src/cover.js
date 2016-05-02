"use strict";

$(function() {
    var _expandCover,
        _isTagsOverlayOpen,
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

        // Toggles the current page between the cover and the current page
        if ($cover.hasClass("expanded")) {
            CaffeineTheme.close();
        } else {
            CaffeineTheme.open();
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

        if (CaffeineTheme.is("page", "home")) {
            CaffeineTheme.showNotification();
        }

        return _expandCover();
    };

    $tagsButton.click(function() {
        _toggleTagsOverlay();
    });

    $(".home-link").click(function(event) {
        if (CaffeineTheme.is("page", "home")) {
            event.preventDefault();
            CaffeineTheme.showIndexPage();
            CaffeineTheme.showNotification();

            // Only toggle the cover if it wasn't already open
            if (!CaffeineTheme.isOpen()) {
                return _expandCover();
            }
        }
    });

    $(".subscribe-link").click(function(event) {
        event.preventDefault();

        if (window.toastr) {
            window.toastr.remove();
        }

        if (window.mailchimp_url) {
            $("body").subbscribe({
                title: "Never miss a post!",
                text: "Stay up to the date with the latest posts from Caffeine Coding!",
                name: "<a href='https://www.facebook.com/caffeinecoding' target='_blank'>@caffeinecoding</a>",
                color: "#56817A",
                thumbnail: "http://i.imgur.com/39erIwp.png",
                list: "MailChimp",
                url : window.mailchimp_url
            });
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
