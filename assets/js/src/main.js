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
    if (window.mailchimpOptions && window.mailchimpOptions.url) {
        $(".subscribe-button").removeClass("hide");
    }

    // "Post" page setup
    if (CaffeineTheme.is("page", "post")) {
        $("main").readingTime({
            readingTimeTarget: ".reading-time > span"
        });
        $(".content").fitVids();

        $("#back-button").on("click", function (event) {
            var lastPageNum = CaffeineTheme.getLastPageNum();
            event.preventDefault();

            if (lastPageNum.length > 0) {
                CaffeineTheme.redirect(lastPageNum);
            } else {
                window.history.back();
            }
        });
    }

    // Sets up masonry effects
    if ($posts && $posts.masonry) {
        $postsGrid = $posts.masonry({
            itemSelector: cardName,
            percentPosition: true
        });

        if (window.gridOptions) {
            var gridOptions = window.gridOptions,
                width = CaffeineTheme.getGridWidth(gridOptions.columns),
                fullColumnWidth = function() {
                    $posts.find(cardName).css("width", "100%");
                },
                gridColumnWidth = function() {
                    $posts.find(cardName).css("width", width);
                };

            if (width) {
                CaffeineTheme.mediaQueryListener("all and (max-width: 700px)", fullColumnWidth, gridColumnWidth);
            }
        }

        if ($postsGrid.imagesLoaded) {
            $postsGrid.imagesLoaded()
                .done(function() {
                    $postsGrid.masonry("layout");
                })
                .progress(function() {
                    $postsGrid.masonry("layout");
                });
        }
    } else {
        $posts.find(cardName).css("width", CaffeineTheme.getGridWidth(1));
    }

    $(window).load(function() {
        if (CaffeineTheme.is("page", "home")) {
            $(".blog-header").addClass("animated fade-in");

            if (CaffeineTheme.isOpen()) {
                CaffeineTheme.showNotification();
            }
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

        CaffeineTheme.setLastPageNum();
    });
});
