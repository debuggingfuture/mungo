'use strict';
define(
	["angular", "underscore"], function(angular, __) {
		console.log("underscore" + _);


		var controllers = {};
		controllers.MainCtrl = function($scope, $locale) {
			console.log('controller');
			$scope.world = "World";

		};

		controllers.SearchResultListCtrl = function($scope, $http, ejsResource) {
			console.log('SearchResultListCtrl');
			var ejs = ejsResource('http://localhost:9200');
			var fieldsToReturn = ["title", "image_url", "desc", "locationArea"];

			$scope.getImage = function(result) {
				var fields = result.fields;
				return result;
			}
			// 		// <img src="http://localhost:3001/get/dropbox/6a0105371bb32c970b017c329f3942970b.jpeg/dlurl">

			// 		result.exif = exif;

			// 		var path = result.fields.file_meta.path;
			// 		//beware of the / prefix
			// 		//can put in temaplate
			// 		// http://localhost:3001/get/dropbox/6a0105371bb32c970b017c329f3942970b.jpeg/thumbnail
			// 		result.url = 'http://localhost:3001/get/dropbox' + path + '/thumbnail'

			// 		//here caused keep digesting
			// 		// return {exif:exif,
			// 		// 	url:'https://www.google.com/images/logos/logo.gif'};
			// 		return result;
			// 		// return 'https://www.google.com/images/logos/logo.gif'; 

			// 	$scope.getFileMeta = function(result) {

			// 	}

			// 	$scope.moreLikeThis = function(index, result) {
			// 		var currentChecksum = $scope.results[index].fields["file_as_attachment.checksum"];
			// 		// var mltFields = ["file_as_attachment.image_exif.creation_date",
			// 		// 	"file_as_attachment.image_exif.model",
			// 		// 	"file_as_attachment.image_exif.image_height",
			// 		// 	"file_as_attachment.image_exif.image_width",
			// 		// 	"file_as_attachment.author",
			// 		// 	"file_meta.mimeType"
			// 		// ];
			// 		var mltFields = ["file_meta.name"];

			// 		// $scope.results[index]
			// 		//smilar modified time
			// 		var fields = $scope.results[index].fields;
			// 		// var likeText = ' '+
			// 		// // fields["file_as_attachment.image_exif.model"] +' '
			// 		// + fields.file_meta.path +
			// 		// // ' '+ fields.file_meta.mimeType
			// 		// +' ';

			// 		var likeText = fields.file_meta.name;
			// 		//TODO bost the type field
			// 		console.log('MLT' + likeText);

			// var query =
			// 	ejs.FilteredQuery(
			// 		mltQuery,
			// 		ejs.NotFilter(ejs.QueryFilter(
			// 			ejs.FieldQuery("file_as_attachment.checksum", currentChecksum)
			// 		))
			// );

			// 	$scope.findDuplicated = function(index, result) {
			// 		// console.log(arguments);
			// 		var currentChecksum = $scope.results[index].fields["file_as_attachment.checksum"];
			// 		var duplicatedCallBack = function(results) {
			// 			console.log(results);
			// 			//only take care first 3
			// 			// console.log(arguments;)
			// 			console.log('Duplicated Found:');
			// 			console.log(results.hits.total.length);

			// 			//limit result to be 3. do here or in ng-repeat
			// 			// var duplicatedResultToShow = [];
			// 			var duplicatedResultToShow = results.hits.hits;
			// 			// console.log($index);
			// 			$scope.results[index].duplicatedTotal = results.hits.total;

			// 			$scope.results[index].duplicated = duplicatedResultToShow;
			// 			console.log(duplicatedResultToShow.length);
			// 		}
			// 		//TODO
			// 		var query = ejs.FilteredQuery(ejs.FieldQuery("file_as_attachment.checksum", currentChecksum), ejs.NotFilter(ejs.IdsFilter($scope.results[index]._id)));

			// 		var r = ejs.Request()
			// 			.fields(fieldsToReturn)
			// 		// .collections("mydocs")
			// 		// .types("file_attachment")
			// 		.query(query);

			// 		r.doSearch(duplicatedCallBack);

			// 		console.log('find duplicated');
			// 	}
			$scope.search = function() {
				console.log('query for ' + $scope.query);
				// var query = ejs.QueryStringQuery($scope.query);
				// var resultsCallBack = function(results) {
				// 	console.log('callback %o', results);
				// 	console.log(results.hits.hits.length);
				// 	if (results.hits) {
				// 		var hits = results.hits.hits;
				// 		for (var i = 0; i < hits.length; i++) {
				// 			var hit = hits[i];
				// 			// console.log(hit._source.message);
				// 		}
				// 		$scope.results = results.hits.hits;
				// 		console.log($scope.results);
				// 	}
				// }

				// var r = ejs.Request()
				// 	.indices("ubid")
				// 	.fields(fieldsToReturn)
				// 	.query(query);

				// r.doSearch(resultsCallBack);
				var searchResults = {
					took: 3,
					timed_out: false,
					_shards: {
						total: 5,
						successful: 5,
						failed: 0
					},
					hits: {
						total: 4,
						max_score: 1,
						hits: [{
							_index: "ubid",
							_type: "item",
							_id: "cZZ_rmG1S-mdNTEbGX2RAg",
							_score: 1,
							_source: {
								title: "Couch",
								desc: "2 years ago",
								locationArea: "University of Hong Kong",
								type: "furniture",
								image_url: "http://homeimprovementbasics.com/wp-content/uploads/2013/09/couchget-off-the-couch-fatty-bollywood4ever-1edkknzi.jpg"
							}
						}]
					}
				};
				$scope.results = searchResults.hits.hits;
				$scope.results[0].fields = $scope.results[0]._source;
				console.log($scope.results);


			}

			// $scope.search();
			// 		if ($scope.onTypeFilter) {
			// 			console.log('on');
			// 			if ($scope.typeFilter) {
			// 				console.log('filter result by tpye' + $scope.typeFilter);

			// 				var filteredQuery =
			// 					ejs.FilteredQuery(
			// 						query,
			// 						ejs.QueryFilter(

			// 							ejs.FieldQuery("file_meta.mimeType", $scope.typeFilter).escape(true)
			// 						)
			// 				);

			// 				query = filteredQuery;
			// 			}
			// 		}


			// 		console.log('get Search Result Facet');
			// 		$scope.getSearchResultFacet(query);



			// 		/* execute the request */


			// 		//use watch instead in case of directives?

			// 		// $http.get('http://localhost:9200/mydocs/_search?q=' + $scope.query + '&fields=file_attachment').success(function(data) {
			// 		// 	console.log(data);
			// 		// 	$scope.results = data.hits.hits;


			// 		// });
			// 		// $scope.results = client
			// 		// 	.query(oQuery.query($scope.queryTerm || '*'))
			// 		// 	.doSearch();
			// 	};

			// 	//must be dropbox
			// 	//better do file type
			// 	// $scope.getFacet = function() {
			// 	// 	console.log('get facet');

			// 	// 	var facetCb = function() {
			// 	// 		console.log('facet');
			// 	// 	}

			// 	// 	var r = ejs.Request()
			// 	// 		.indices('stackoverflow')
			// 	// 		.types('question')
			// 	// 		.facet(
			// 	// 			ejs.TermsFacet('providers')
			// 	// 			.field('file_meta.provider')
			// 	// 			.size(10));

			// 	// 	r.doSearch(facetCb);
			// 	// }

			// 	$scope.getSearchResultFacet = function(query) {
			// 		console.log('get facet');

			// 		var facetCb = function(r) {
			// 			console.log('Search Result Facet');
			// 			console.log(r);
			// 			$scope.facetResult = r.facets.mimeType.terms;
			// 			$scope.facetResultFacet = r.facets.mimeType;

			// 			//override result for all
			// 		}


			// 		// 

			// 		// var facet = ejs.QueryFacet(ejs.FieldQuery("file_as_attachment.checksum", ));
			// 		var facet = ejs.TermsFacet('mimeType')
			// 			.field('file_meta.mimeType')
			// 			.size(5);
			// 		if (query) {
			// 			facet = facet.facetFilter(
			// 				ejs.QueryFilter(query)
			// 			)
			// 		}

			// 		var r = ejs.Request()
			// 			.indices('mydocs')
			// 			.types('file')
			// 			.facet(facet);

			// 		r.doSearch(facetCb);
			// 	}


			// 	$scope.filterSearchByType = function(results, type) {
			// 		console.log('filter search by type' + type);
			// 		$scope.onTypeFilter = !$scope.onTypeFilter;
			// 		console.log('onFilter:' + $scope.onTypeFilter)
			// 		$scope.typeFilter = type;
			// 		//trigger search when filter toggle
			// 		//TODO better way to watch such global
			// 		$scope.search();
			// 	}


			// 	$scope.orderProp = 'age';
			// }

			// var ModalDemoCtrl = function($scope) {

			// 	$scope.open = function() {
			// 		$scope.shouldBeOpen = true;
			// 	};

			// 	$scope.close = function() {
			// 		$scope.closeMsg = 'I was closed at: ' + new Date();
			// 		$scope.shouldBeOpen = false;
			// 	};

			// 	$scope.items = ['item1', 'item2'];

			// 	$scope.opts = {
			// 		backdropFade: true,
			// 		dialogFade: true
			// 	};

			// };

		};
		return controllers;

	});