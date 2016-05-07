"use strict";

(function (w) {
    if (w.document.documentElement.className.indexOf("fonts-loaded") > -1) {
        return;
    }
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
        .all([font1.check(), font2.check(), font3.check(), font4.check()])
        .then(function () {
            w.document.documentElement.className += " fonts-loaded";
        })
        .catch(function(){
            w.document.documentElement.className += " fonts-unavailable";
        });
} (this));