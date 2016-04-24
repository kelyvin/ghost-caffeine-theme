"use strict";

$(function() {
    var $posts = $("ol.posts"),
        cardName = ".card",
        $postsGrid,
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

    // Dynamically generate tags in tags overlay
    if (window.tag_names) {
        for (var i = 0; i < window.tag_names.length; i++) {
            var tag = window.tag_names[i],
                link = "/tag/" + tag + "/" + CaffeineTheme.getOpenHashFragment();

            $("<a>", {
                "href": link,
                "text": tag
            }).appendTo("#popular-tags .tags");
        }
    }

    // Subscribe button
    if (window.mailchimp_url) {
        $(".subscribe-button").removeClass("hide");
    }

    if (CaffeineTheme.is("page", "home")) {
        if (!CaffeineTheme.isOpen()) {
            CaffeineTheme.hideIndexPage();
        }
    }

    if (CaffeineTheme.is("page", "post")) {
        $("main").readingTime({
            readingTimeTarget: ".reading-time > span"
        });
        $(".content").fitVids();
    }

    // Sets up masonry effects
    if ($posts && $posts.masonry) {
        $postsGrid = $posts.masonry({
            itemSelector: cardName,
            percentPosition: true
        });

        if ($postsGrid.imagesLoaded) {
            $postsGrid.imagesLoaded()
                .done( function( instance ) {
                    $postsGrid.masonry("layout");
                })
                .progress(function() {
                    $postsGrid.masonry("layout");
                });
        }
    } else {
        $posts.find(cardName).css("width", "100%");
    }

    $(window).load(function() {
        if (CaffeineTheme.is("page", "home")) {
            $(".blog-header").addClass("animated fade-in");
        }

        $posts.addClass("animated fade-in");

        // Sets up scroll reveal effects
        if (window.ScrollReveal && $(cardName).length > 0) {
            window.sr = window.ScrollReveal().reveal(cardName, {
                afterReveal: function () {
                    if ($postsGrid) {
                        $postsGrid.masonry("layout");
                    }
                }
            });
        } else {
            $posts.css("visibility", "visible");
        }
    });
});
