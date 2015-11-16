'use strict';

$(function() {
    var hideSearch, showSearch;
    showSearch = function() {
        $(".content").hide();
        return $('#search-results').addClass('active');
    };
    hideSearch = function() {
        $(".content").show();
        return $('#search-results').removeClass('active');
    };
    return $("#search-field").ghostHunter({
        results: "#search-results",
        zeroResultsInfo: false,
        onKeyUp: true,
        displaySearchInfo: true,
        result_template: "<a class=\"result\" href='{{link}}'>\n  <h2>{{title}}</h2>\n  <h4>{{pubDate}}</h4>\n</a>",
        onComplete: function(query) {
            if (query.length > 0) {
                return showSearch();
            } else {
                return hideSearch();
            }
        }
    });
});
