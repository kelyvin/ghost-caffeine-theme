"use strict";

$(function() {
    var $posts = $(".page-index ol.posts"),
        cardName = ".card",
        el;

    el = CaffeineTheme.app;

    if (el.dataset) {
        el.dataset.page = CaffeineTheme.context();
        el.dataset.device = CaffeineTheme.device();
    } else {
        $(el)
            .attr("data-page", CaffeineTheme.context())
            .attr("data-device", CaffeineTheme.device());
    }

    CaffeineTheme.readTime();

    if (window.profile_title) {
        $(".profile-title").text(window.profile_title);
    }

    if (window.profile_resume) {
        $("#profile-resume").text(window.profile_resume);
    }

    if (CaffeineTheme.is("page", "home")) {
        if (!CaffeineTheme.isOpen()) {
            CaffeineTheme.hideIndexPage();
        }

        // Sets up masonry effects
        if ($posts && $posts.masonry) {
            $posts.masonry({
                itemSelector: cardName,
                percentPosition: true
            });
        } else {
            $posts.find(cardName).css("width", "100%");
        }
    }

    if (CaffeineTheme.is("page", "post")) {
        $("main").readingTime({
            readingTimeTarget: ".reading-time > span"
        });
        $(".content").fitVids();
    }

    $(window).load(function() {
        if (CaffeineTheme.is("page", "home")) {
            $(".blog-header").addClass("animated fade-in");
            $posts.addClass("animated fade-in");

            // Sets up scroll reveal effects
            if (window.ScrollReveal && $(cardName).length > 0) {
                window.sr = window.ScrollReveal().reveal(cardName);
            } else {
                $posts.css("visibility", "visible");
            }
        }
    });
});
