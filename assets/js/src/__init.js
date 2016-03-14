"use strict";

$(function() {
    var CaffeineTheme,
        openHash = "#open";

    window.CaffeineTheme = CaffeineTheme = {
        version: "2.4.1",
        search: {
            container: function() {
                return $("#results");
            },
            form: function(action) {
                return $("#search-container")[action]();
            }
        },
        context: function() {
            var className;
            className = document.body.className.split(" ")[0].split("-")[0];
            if (className === "") {
                return "error";
            } else {
                return className;
            }
        },
        app: (function() {
            return document.body;
        })(),
        is: function(property, value) {
            if (this.app.dataset) {
                return this.app.dataset[property] === value;
            } else {
                return this.app.getAttribute("data-" + property) === value;
            }

        },
        isOpen: function () {
            return location.hash === openHash;
        },
        getOpenHashFragment: function() {
            return openHash;
        },
        open: function() {
             window.history.replaceState(null, null, openHash);
        },
        close: function() {
             window.history.replaceState(null, null, "#");
        },
        readTime: function() {
            var DateInDays;
            DateInDays = function(selector) {
                return $(selector).each(function() {
                    var publishDate,
                        timeAgo;

                    publishDate = $(this).attr("datetime");
                    timeAgo = $(this).html();

                    $(this).mouseover(function() {
                        return $(this).html(publishDate);
                    });

                    return $(this).mouseout(function() {
                        return $(this).html(timeAgo);
                    });
                });
            };

            return new DateInDays(".meta > time");
        },
        device: function() {
            var h, w;
            w = window.innerWidth;
            h = window.innerHeight;
            if (w <= 480) {
                return "mobile";
            }
            if (w <= 1024) {
                return "tablet";
            }
            return "desktop";
        },
        hideIndexPage: function () {
            $("#default-nav-header, .blog-header, .material-cover, .page-index").addClass("transparent");
        },
        showIndexPage: function () {
            $("#default-nav-header, .blog-header, .material-cover, .page-index").removeClass("transparent");
        }
    };
});
