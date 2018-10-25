"use strict";

(function (w) {
    var font1 = new w.FontFaceObserver("Raleway", {
        weight: 400
    });

    var font2 = new w.FontFaceObserver("Raleway", {
        weight: 700
    });

    var font3 = new w.FontFaceObserver("Roboto Slab", {
        weight: 300
    });

    var font4 = new w.FontFaceObserver("Roboto Slab", {
        weight: 400
    });

    w.Promise
        .all([font1.load(), font2.load(), font3.load(), font4.load()])
        .then(function () {
            if (w.document.documentElement.className.indexOf("fonts-loaded") == -1) {
                w.document.documentElement.className += " fonts-loaded";
            }
            try {
                var storage = window.sessionStorage;
                if (storage) {
                    storage.setItem('fonts-loaded', '1');
                }
            }
            catch (e) {
            }
        })
        .catch(function () {
            w.document.documentElement.className += " fonts-unavailable";
        });
} (this));