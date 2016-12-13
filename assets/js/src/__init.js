"use strict";

$(function() {
    var CaffeineTheme,
        openHash = "#open";

    window.CaffeineTheme = CaffeineTheme = {
        version: "2.8.2",
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
        redirect: function (pageNum) {
            var redirectUrl = "";

            if (pageNum > 1) {
                redirectUrl += "/page/" + pageNum + "/#open";
            } else {
                redirectUrl += "/#open";
            }

            window.location.href = redirectUrl;
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
        getLastPageNum: function() {
            var pageNum = "";

            if (window.store && window.store.enabled) {
                pageNum = window.store.get("pageNum") || "";
            }

            return pageNum;
        },
        setLastPageNum: function() {
            var pageNum = $("#pageNum").text() || "";

            if (pageNum.length > 0 && window.store && window.store.enabled) {
                window.store.set("pageNum", pageNum);
            }
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
        },
        showNotification: function() {
            if (window.notificationOptions && window.toastr) {
                var message = window.notificationOptions.message || "",
                    type = window.notificationOptions.type || "info",
                    isShownOnce = window.notificationOptions.isShownOnce || true,
                    notificationStore = "notification",
                    storeValue = "",
                    setNotificationStore;

                setNotificationStore = function () {
                    if (window.store && window.store.enabled) {
                         if (storeValue) {
                             window.store.remove(notificationStore);
                        }

                        if (isShownOnce) {
                            window.store.set(notificationStore, message);
                        }
                    }
                };

                window.toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "escapeHtml": window.notificationOptions.escapeHtml || false,
                    "timeOut": window.notificationOptions.timeOut || "25000",
                    "extendedTimeOut": window.notificationOptions.extendedTimeOut ||  "10000",
                    "onHidden": setNotificationStore
                };

                if (window.store && window.store.enabled) {
                    storeValue = window.store.get(notificationStore) || "";
                }

                if (storeValue === undefined || storeValue !== message) {
                    window.toastr[type](message);
                }
            }
        },
        getGridWidth: function(numColumns) {
            var width = null;

            if (!isNaN(numColumns) && numColumns > 0 && numColumns !== 2) {
                width = Math.floor((100 - 2 * numColumns) / numColumns);
                width += "%";
            }

            return width;
        },
        mediaQueryListener: function (mediaQuery, onMatch, onNoMatch) {
            var mq = window.matchMedia(mediaQuery);

            if(mq.matches) {
                onMatch.call(this);
            } else {
                onNoMatch.call(this);
            }

            mq.addListener(function(changed) {
                if(changed.matches) {
                    onMatch.call(this);

                } else {
                    onNoMatch.call(this);
                }
            });
        }
    };
});
