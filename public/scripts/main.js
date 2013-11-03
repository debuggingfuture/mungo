// Require JS  Config File
require.config({
	paths: {
		angular: "../bower_components/angular/angular",
		dangle: "//raw.github.com/fullscale/dangle/master/dist/dangle.min",
		d3: "//d3js.org/d3.v3.min",
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
		oauthpopup: "jquery.oauthpopup",
		"angular-animate": "../bower_components/angular-animate/angular-animate",
		underscore: "../bower_components/underscore/underscore",
		"angular-route": "../bower_components/angular-route/angular-route",
		"cookies-js": "../bower_components/cookies-js/src/cookies",
		"es5-shim": "../bower_components/es5-shim/es5-shim",
		requirejs: "../bower_components/requirejs/require"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		d3: {
			exports: "d3"
		},
		dangle: {
			deps: [
				"angular",
				"d3"
			]
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
		},
		"angular-route": {
			deps: [
				"angular"
			]
		}
	},
	baseUrl: "scripts/"
});

require(["app"], function(App) {
	App.initialize();
});

require(['loginModule'], function(loginModule) {
	// loginModule.ajaxLogin();
});



// require(["oauthpopup"], function() {
// 	/*
// 	 * Setup Oauths. not really need to use jQuery actually
// 	 * How to let angularjs handle callback?
// 	 */
// 	$("#authDropbox").oauthpopup({
// 		path: '/auth/dropbox',
// 		callback: function() {
// 			console.log('Dropbox Oauth Popup done');
// 		}
// 	});


// 	$("#authFacebook").oauthpopup({
// 		path: '/auth/facebook',
// 		callback: function() {
// 			console.log('Facebook Oauth Popup done');
// 		}
// 	});



// });