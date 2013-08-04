// Require JS  Config File

require.config({
	paths: {
		angular: "../bower_components/angular/angular",
		"angular-cookies": "../bower_components/angular-cookies/angular-cookies",
		"angular-mocks": "../bower_components/angular-mocks/angular-mocks",
		"angular-resource": "../bower_components/angular-resource/angular-resource",
		"angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
		"angular-scenario": "../bower_components/angular-scenario/angular-scenario",
		jquery: "../bower_components/jquery/jquery",
		json3: "../bower_components/json3/build",
		elastic: "../bower_components/elastic.js/dist/elastic",
		"elastic-angular-client": "../bower_components/elastic.js/dist/elastic-angular-client",
		"angular-bootstrap": "../bower_components/angular-bootstrap/ui-bootstrap-tpls",
		oauthpopup: "jquery.oauthpopup"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		"elastic-angular-client": {
			deps: [
				"angular"
			],
			exports: "angular"
		},
		"angular-bootstrap": {
			deps: [
				"angular"
			]
		},
		oauthpopup: {
			deps: [
				"jquery"
			],
			exports: "jquery"
		}
	},
	baseUrl: "scripts/"
});

require(["app"], function(App) {
	App.initialize();
});

require(["oauthpopup"],function() {
/*
* Setup Oauths. not really need to use jQuery actually
* How to let angularjs handle callback?
*/
   $("#authDropbox").oauthpopup({
            path: '/auth/dropbox',
            callback: function() {

                console.log('Dropbox Oauth Popup done');


            }
        });


});

