if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
var assert = require('chai').assert;
var expect = require('chai').expect;

var token = require('../../appConfig.json').services.dropbox.token;
define(['dropbox', '../lib/dropboxUiConnector'], function(dropbox, connector) {

	describe('#getSharedLink', function() {
		it('should return url', function(cb) {
			connector.getSharedLink(token, 'testfile2.txt', function(err, res) {
				console.log(res);
				assert(res.url);
				expect(res.isDirect).equal(false);
				cb();
			});
		});
		it('should return err when file not exists', function(cb) {
			connector.getSharedLink(token, 'notexists.txt', function(err, res) {
				//to String get overriden. actually an object
				console.log(err);
				expect(err.status).equal(404);
				cb();
			});
		});
	});

	describe('#getDirectLink', function() {
		it('should return url', function(cb) {
			connector.getDirectLink(token, 'testfile2.txt', function(err, res) {
				console.log(res);
				expect(res.isDirect).equal(true);
				cb();
			});
		});
	});


	describe('#getThumbnail', function() {
		this.timeout(50 * 1000);
		it('should return data', function(cb) {
			connector.getThumbnail(token,'/6a0105371bb32c970b017c329f3942970b.jpeg',function(err,res){
			console.log(res);
			//binary
		})

		});
	});


	describe('#getThumbnailUrl', function() {

		it('should return url', function() {
			var url = connector.getThumbnailUrl(token, '/6a0105371bb32c970b017c329f3942970b.jpeg');
			//static url. but also used XHR inside client. need AUTH
			expect(url).equal('https://api-content.dropbox.com/1/thumbnails/auto/6a0105371bb32c970b017c329f3942970b.jpeg');
			// ',function(err,res){
			// 	console.log(res);
			// 	expect(res.isDirect).equal(true);
			// 	cb();
			// });
		});

		// it('should return 404', function(cb) {
		// 	connector.getThumbnailUrl(token,'notexists.jpeg',function(err,res){
		// 		console.log(res);
		// 		expect(res.isDirect).equal(true);
		// 		cb();
		// 	});
		// });
	});


});