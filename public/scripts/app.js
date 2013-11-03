'use strict';

define(
	["angular",
		"controllers/controllers",
		"services/services",
		"elastic",
		"elastic-angular-client", "angular-bootstrap", 'dangle', "angular-route"
	],
	// "Directives/directives",
	// "Filters/filters",

	// Services, Directives, Filters

	function BaseManager(angular, controllers, services, _ejs, esAngularClient, dangle, angluar_route) {
		console.log(arguments)
		console.log("elasticjs");
		console.log(_ejs);
		console.log(ejs);
		console.log(esAngularClient);
		// ejs.client = ejs.jQueryClient('http://localhost:9200');

		//dont work directly on mimeType. but only supported types
		var getFileType = function(_content_type) {
			if (!_content_type) {
				return 'text';
			};
			if (_content_type.match(/^image.*/)) {
				return 'image';
			} else if (_content_type.match(/^text.*/)) {
				return 'text';
			} else {
				return 'text';
			}

		};

		var initialize = function() {

			var app = angular.module('angularPocApp', ['ngRoute', 'elasticjs.service', 'ui.bootstrap', 'dangle'])
				.config(function($routeProvider, $locationProvider) {
					$routeProvider
						.when('/', {
							templateUrl: 'views/main.html',
							controller: 'MainCtrl'
						})
						.otherwise({
							redirectTo: '/'
						});


					$locationProvider.html5Mode(true);

				}).controller('MainCtrl', controllers.MainCtrl)
				.controller('SearchResultListCtrl', controllers.SearchResultListCtrl)



			// //dirty trick. how to put it into scope not using filter?
			// 				.filter('fileTypeModelFileter', function() {
			// 					return function(result) {
			// 						return {
			// 							result:result,
			// 							key2:'2'
			// 						}
			// 					}
			// 				})
			.filter('fileTypeTemplateFilter', function() {
				return function(result) {

					//first met file_meta, then file_as_attachment?
					var content_type = result.fields.file_meta.mimeType;

					//logic 
					// console.log($scope);
					// console.log($rootScope);
					//strategy
					var type = getFileType(content_type);
					// console.log('type' + type);
					if (type === 'image') {
						return 'views/file_type_image.html';
					} else {
						return 'views/file_type_text.html';
					}



				};
			})
				.filter('autocompleteHighlight', function() {

					function escapeRegexp(queryToEscape) {
						return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
					}

					return function(matchItem, query) {
						return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : query;
					};
				})
				.filter('isFolderFilter', function() {
					//or use isFile
					//icon-tag
					return function(isFolder) {
						return isFolder ? '<i class="icon-folder-close"></i><small>Folder</small>' :
							'<i class="icon-file"></i><small>File</small>';
					};
				}).filter('previewPath', function() {
					return function(result) {
						var file_meta = result.fields.file_meta;
						var provider = file_meta.provider;
						var path = file_meta.path;
						//TODO if path not start with /, prepend
						var previewPath = provider + path + '/url';
						return previewPath;
					};
				})
				.filter('downloadPath', function() {
					return function(result) {
						var file_meta = result.fields.file_meta;
						var provider = file_meta.provider;
						var path = file_meta.path;
						//TODO if path not start with /, prepend
						var previewPath = provider + path + '/dlurl?dl=1';
						return previewPath;
					};
				})

			angular.bootstrap(document, ["angularPocApp"]);

		};
		return {
			initialize: initialize
		};
	});