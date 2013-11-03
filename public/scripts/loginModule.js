define(['jquery', 'oauthpopup', 'underscore', 'cookies-js'], function($, oauthpopup, _, cookie) {
    'use strict';
    // use app here
    var $loginButton = $("#loginDropdownButton");

    var ajaxLogin = function() {
        $.ajax({
            url: 'ajaxLogin',
            // dataType: "json",
            success: function(res) {
                console.log('Ajax login');

                // var $username = $("#username");
                // var authVendor = ['github', 'evernote'];
                // //TODO loop
                // if (!res[authVendor[0]]) {
                //     console.log('You are not logged in. Login first');
                // }


                // if (res.github) {

                //     if (!$username.length) {
                //         $("#loginDropdownGroup").prepend("<li id=\"username\"><a>User:" + res.github.name + '</a></li>');
                //         // var connectText = _.escape("Connect<b class=\"caret\">");
                //         var connectText = "Connect<b class=\"caret\"></b>";
                //         $loginButton.html(connectText);
                //         $("#authGitHubLabel").html('Logged in - Github');
                //         $("#authGitHub").unbind('click');

                //         $("#authGitHub").removeClass("connect-github").addClass("connected");
                //         cookie.set("githubUserName", res.github.name);
                //         console.log("Cookie set: githubUsername: " + cookie.get("githubUserName"));

                //     }
                //     // $("#username").text(res.session);


                // } //get more. eg photos, name
                // if (res.evernote) {
                //     // if ($username.length) {
                //     //refresh the name
                //     $("#authEvernoteLabel").text("Connected - Evernote");
                //     $("#authEvernote").removeClass("connect-evernote").addClass("connected");
                //     $("#authEvernote").unbind('click');

                //     // }
                //     // $("#loginDropdownGroup").prepend("<li><a>User:" + res.user.name + '</a></li>');
                //     // var connectText = _.escape("Connect<b class=\"caret\">");
                //     //if one didnt connect

                // }

                // //both
                // if (res.evernoteLoggedIn && res.gitHubLoggedIn) {
                //     $loginButton.html("");
                // }

                //also remove that button
                // $loginButton.html("Connect");

                // //if both conncet





            },
            error: function(err) {
                console.log('Not yet Logged in');
                console.log(err);
            }
        });
    }


    $("#authFacebook").oauthpopup({
        path: '/auth/github',
        callback: function() {

            console.log('Git Oauth Popup done');
            // window.location.reload();

            //or get username from session using ajax
            ajaxLogin();



        }
    });


    ajaxLogin();

    // return ajaxLogin();
    // /auth/evernote

});