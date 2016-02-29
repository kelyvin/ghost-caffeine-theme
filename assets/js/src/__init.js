'use strict';

$(function() {
    var CaffeineTheme;
    return window.CaffeineTheme = CaffeineTheme = {
        version: '2.1.0',
        search: {
            container: function() {
                return $('#results');
            },
            form: function(action) {
                return $('#search-container')[action]();
            }
        },
        context: function() {
            var className;
            className = document.body.className.split(' ')[0].split('-')[0];
            if (className === '') {
                return 'error';
            } else {
                return className;
            }
        },
        app: (function() {
            return document.body;
        })(),
        is: function(property, value) {
            return this.app.dataset[property] === value;
        },
        readTime: function() {
            var DateInDays;
            DateInDays = function(selector, cb) {
                return $(selector).each(function() {
                    var postDate, postDateInDays, postDateNow;
                    postDate = $(this).html();
                    postDateNow = new Date(Date.now());
                    postDateInDays = Math.floor((postDateNow - new Date(postDate)) / 86400000);
                    if (postDateInDays === 0) {
                        postDateInDays = 'today';
                    } else if (postDateInDays === 1) {
                        postDateInDays = "yesterday";
                    } else {
                        postDateInDays = postDateInDays + " days ago";
                    }
                    $(this).html(postDateInDays);
                    $(this).mouseover(function() {
                        return $(this).html(postDate);
                    });
                    return $(this).mouseout(function() {
                        return $(this).html(postDateInDays);
                    });
                });
            };
            return DateInDays('.meta > time');
        },
        device: function() {
            var h, w;
            w = window.innerWidth;
            h = window.innerHeight;
            if (w <= 480) {
                return 'mobile';
            }
            if (w <= 1024) {
                return 'tablet';
            }
            return 'desktop';
        }
    };
});
