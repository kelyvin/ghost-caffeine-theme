/**
 * Subbscribe.js (http://www.subbscribe.com)
 * Copyright (c) 2014 (v2.0) Shlomi Nissan, 1ByteBeta (http://www.1bytebeta.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 */
"use strict";

(function($) {
    $.fn.subbscribe = function(options) {
        // Default settings
        var settings = $.extend({
            list: "MailChimp",
            url: "",
            title: "Never miss a post!",
            text: "Get our latest posts and announcements in your inbox. You won't regret it!",
            name: "Subbscribe",
            color: "#ee6262",
            thumbnail: "https://s3-ap-southeast-2.amazonaws.com/subbscribe/img/avatar.png",
            emailonly: false,
            cm_mail_field: "",
            delay: 0,

        }, options);

         /*
        ===============================================================================
          Helpers
        ===============================================================================
        */

        function isError(data) {
            console.log(data);

            if (settings.list === "MailChimp") {
                if (data.result !== "success") {
                    return true;
                }

                return false;
            } else if (settings.list === "CampaignMonitor") {
                if (data.Status === 400) {
                    return true;
                }

                return false;
            }

            return true;
        }

        function resetFormFields() {
            $("#subbscribe input").each(function() {
                $(this).val("");
            });
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function formValidation() {
            var valid = true;
            var name = $("#subb-NAME");
            var email = $("#subb-EMAIL");

            if (!settings.emailonly) {
                if (name.val().length < 2) {
                    valid = false;
                    name.addClass("error");
                } else {
                    name.removeClass("error");
                }
            }

            if (!validateEmail(email.val())) {
                valid = false;
                email.addClass("error");
            } else {
                email.removeClass("error");
            }

            return valid;
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }

                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }

            return "";
        }

        // Make sure a URL has been passed through
        if (settings.url === "") {
            console.log("Subbscribe Error: You must provide a valid MailChimp form URL.");
            return;
        }

        //make sure the cm_mail_field is set when using Campaign Monitor
        if (settings.list === "CampaignMonitor" && !settings.cm_mail_field.length) {
            console.log("You must provide the mail input name. Found in the form code from Campaign Monitor");
            return;

        }

        var _name = "";
        var _email = "";
        var _url = "";
        var _action = "";

        // Make sure list is either set to MailChimp or CampaignMonitor
        // Change field names if yours don’t match
        if (settings.list === "MailChimp") {
            _name = "NAME";
            _email = "EMAIL";
            _action = settings.url.replace("/post?", "/post-json?").concat("&c=?");
        } else if (settings.list === "CampaignMonitor") {
            _name = "cm-name";
            _email = settings.cm_mail_field;
            _action = settings.url + "?callback=?";
        } else {
            console.log("Subbscribe Error: list value must be set to MailChimp or CampaignMonitor");
            return;

        }

        // Separate the input fields from the HTML
        // if emailonly is set, nameInput should be blank
        var nameInput = "";
        var emailInput = '<input type="email" name="' + _email + '" id="subb-EMAIL" placeholder="Email Address" />';

        if (!settings.emailonly) {
            nameInput = ' <input type="text" name="' + _name + '" id="subb-NAME" placeholder="Name" />';
        }

        // HTML
        var html = '<div id="subbscribe" style="display: none"><div class="subb-title">' + settings.title + ' <img class="close-x" src="https://s3-ap-southeast-2.amazonaws.com/subbscribe/img/close.svg" />  </div> <div class="subb-body"> <div class="subb-hidden"> <div class="subb-thumbnail"> <img style="width: 40px; height: 40px;" src="' + settings.thumbnail + '" /> </div> <div class="subb-hidden"> <div class="subb-site"> &nbsp;' + settings.name + ' </div> <button class="subb-button show-form">Subscribe</button> </div> </div> <div class="subb-form" style="display: none"> <p>' + settings.text + '</p> <form id="mc-embedded-subbscribe-form" method="post" action="' + settings.url + '"> <div class="subbscribe-alert subbscribe-error" style="display: none">Oops! Check your details and try again.</div> <div class="subbscribe-alert subbscribe-success" style="display: none">Thanks! Check your email for confirmation.</div> <div class="text-input"> ' + nameInput + ' </div> <div class="text-input"> ' + emailInput + ' </div> <button class="subb-button submit-form" type="submit" style="width: 100%; margin-bottom: 10px;">Subscribe</button></form></div> </div> </div>';

        if (getCookie("subbscribe-hidden") !== 1 && $(this).find("#subbscribe").length === 0) {
            this.append(html);

            setTimeout(function() {
                $("#subbscribe").css("display", "block");
                $("#subbscribe").css("width", $(".subb-site").width() + 200);
                $("#subbscribe").addClass("animated slideInRight");
            }, settings.delay * 1000);
        }

        // Update CSS classes
        $("#subbscribe .subb-button").css("background-color", settings.color);

        /*
        ===============================================================================
          Events
        ===============================================================================
        */

        $("#subbscribe .close-x").click(function() {
            $("#subbscribe").toggleClass("slideInRight fadeOut");
            $("#subbscribe").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {

                $("#subbscribe").remove();
                // setCookie('subbscribe-hidden', 1, 1); // Hide for a day
            });

            if (typeof settings.onClose === "function") {
                settings.onClose.call();
            }
        });

        $("#subbscribe .show-form").click(function() {

            $("#subbscribe .subb-hidden").hide();
            $("#subbscribe .subb-form").show();

        });

        $("#mc-embedded-subbscribe-form").submit(function(e) {
            e.preventDefault();

            if (formValidation()) {
                $("#subbscribe .subbscribe-error").slideUp();
                $("#subbscribe .submit-form").attr("disabled", "disabled");

                $.ajax({
                    url: _action,
                    type: "post",
                    data: $(this).serialize(),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",

                    success: function(data) {
                        if (isError(data)) {
                            console.log("Subbscribe Error: submission failed.");
                        } else {
                            //SUCCESS
                            resetFormFields();
                            $(".subbscribe-success").slideDown();

                            setTimeout(function() { $("#subbscribe").addClass("animated fadeOut"); }, 2000);
                            $("#subbscribe").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                                $("#subbscribe").remove();
                                // setCookie('subbscribe-hidden', 1, 365); // Hide for a year

                                if (typeof settings.onSubbscribe === "function") {
                                    settings.onSubbscribe.call();
                                }
                            });
                        }
                    }
                });
            } else {
                $("#subbscribe .subbscribe-error").slideDown();
            }
        });
    };

}(jQuery));
