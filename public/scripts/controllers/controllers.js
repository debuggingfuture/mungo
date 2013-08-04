function MainCtrl($scope) {

	$scope.world = "World";
}

function SearchResultListCtrl($scope, $http, ejsResource) {
	// $http.get('testdata.json').success(function(data) {
	// 	$scope.results = data;
	// });
	console.log('scope');
	console.log($scope);

	console.log('ejsResource');

	// console.log(ejsResource);
	var ejs = ejsResource('http://localhost:9200');
	console.log(ejs);


	$scope.getImage = function(result) {

		// if((result||{}).file_as_attachment
		var exif = {
			// model:result.file_as_attachment.model
		};
		//TODO
		var file_as_attachment = result.file_as_attachment;
		if (file_as_attachment) {
			if (file_as_attachment.model) {
				exif['model'] = file_as_attachment.model;
				// exif['imageHeight'] = file_as_attachment.imageHeight;
			}
		} else {
			exif['model'] = 'Unspecified';
		}


		// <img src="http://localhost:3001/get/dropbox/6a0105371bb32c970b017c329f3942970b.jpeg/dlurl">

		result.exif = exif;

		var path = result.fields.file_meta.path;
		//beware of the / prefix
		//can put in temaplate
		// http://localhost:3001/get/dropbox/6a0105371bb32c970b017c329f3942970b.jpeg/thumbnail
		result.url = 'http://localhost:3001/get/dropbox' + path + '/thumbnail'

		//here caused keep digesting
		// return {exif:exif,
		// 	url:'https://www.google.com/images/logos/logo.gif'};
		return result;
		// return 'https://www.google.com/images/logos/logo.gif'; 
	};

	$scope.getFileMeta = function(result) {

	}


	$scope.findDuplicated = function(index,result) {
		//field search
// console.log(arguments);
		console.log(index);
		var duplicatedCallBack = function(results) {
			//only take care first 3
			// console.log(arguments;)
			console.log('Duplicated Found:');
			console.log(results.hits.hits.length);

			var duplicatedResultToShow =[];
			duplicatedResultToShow[0]=results.hits.hits[0];
			console.log($scope.results);
			// console.log($index);
				$scope.results[index].duplicated = duplicatedResultToShow;
				console.log(duplicatedResultToShow.length);
		}
		//TODO
		var query = ejs.TermQuery("_all", $scope.query);
		var r = ejs.Request()
			.fields(["file_attachment", 'file_meta'])
		// .collections("mydocs")
		// .types("file_attachment")
		.query(query);

		r.doSearch(duplicatedCallBack);

		console.log('find duplicated');
	}
	$scope.search = function() {

		// file_attachment as fields
		var query = ejs.TermQuery("_all", $scope.query);



		// ImKeyWord

		// var query = ejs.QueryStringQuery($scope.query);

		// name,postDate,


		/* a function to display results */
		var resultsCallBack = function(results) {
			console.log('callback %o', results);
			console.log(results.hits.hits.length);
			if (results.hits) {
				var hits = results.hits.hits;
				for (var i = 0; i < hits.length; i++) {
					var hit = hits[i];
					// console.log(hit._source.message);
				}
				$scope.results = results.hits.hits;

				console.log($scope.results);
			}
		};

		/* execute the request */
		var r = ejs.Request()
			.fields(["file_attachment", 'file_meta'])
		// .collections("mydocs")
		// .types("file_attachment")
		.query(query);

		r.doSearch(resultsCallBack);



		//use watch instead in case of directives?

		// $http.get('http://localhost:9200/mydocs/_search?q=' + $scope.query + '&fields=file_attachment').success(function(data) {
		// 	console.log(data);
		// 	$scope.results = data.hits.hits;


		// });
		// $scope.results = client
		// 	.query(oQuery.query($scope.queryTerm || '*'))
		// 	.doSearch();
	};



	$scope.orderProp = 'age';
}

var ModalDemoCtrl = function($scope) {

	$scope.open = function() {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function() {
		$scope.closeMsg = 'I was closed at: ' + new Date();
		$scope.shouldBeOpen = false;
	};

	$scope.items = ['item1', 'item2'];

	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

};