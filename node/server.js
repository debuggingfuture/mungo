var flash = require('connect-flash');
var express = require('express'),
	path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BadRequestError = require('passport-local').BadRequestError;

var DropboxStrategy = require('passport-dropbox').Strategy;

var app = express();

var http = require('http'),
	path = require('path');


var serverSetup = require('./serverSetup');
// app.set('view engine', 'html');

app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);
app.use(express.errorHandler());
// app.engine('html', require('hbs').__express);
serverSetup.setupEnv(app);

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
	secret: 'keyboard cat'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);



var nStore = require('nstore');
// Create a store
var usersStore = nStore.new('data/users.db', function() {

	usersStore.save(null, {
		name: "vincent",
		age: 24
	}, function(err, key) {
		if (err) {
			throw err;
		}
		// The save is finished and written to disk safely
		console.log(key);
	});

	// Load the document with the key "creationix"
	// usersStore.get("1", function(err, doc, key) {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	// You now have the document
	// });
	// It's loaded now
});


var users = [{
	id: 1,
	username: 'admin',
	password: 'admin',
	email: 'bob@example.com'
}];

function findById(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function(err, user) {
		done(err, user);
	});
});



passport.use(new LocalStrategy(function(username, password, done) {
	process.nextTick(function() {
		console.log("try login" + username);
		findByUsername(username, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Unknown user ' + username
				});
			}
			if (user.password != password) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		})

	});

}));



// app.get('/template', function(req, res) {
// 	res.render('template', {
// 		output: '123',
// 		message: req.flash('info')
// 	});
// })
// app.get('/search', function(req, res) {
// 	res.render('fit', {
// 		output: '123',
// 		message: req.flash('info')
// 	});
// })

app.get('/enter', function(req, res) {
	res.render('enter', {
		output: '123',
		message: req.flash('info'),
		error: req.flash('error')
	});
});

// token 7657qwvxmvd551km

var TOKEN = '7657qwvxmvd551km';
// tokenSecret y4qs8zd09ihcaru

var DROPBOX_APP_KEY = 'vncp1c3qcevdabo';
var DROPBOX_APP_SECRET = 'q69itpwk4gvgcv2';
var dropboxCbURL = 'http://localhost:' + app.get('port') + '/auth/dropbox/callback';

passport.use(new DropboxStrategy({
	consumerKey: DROPBOX_APP_KEY,
	consumerSecret: DROPBOX_APP_SECRET,
	callbackURL: dropboxCbURL
}, function(token, tokenSecret, profile, done) {
	// asynchronous verification, for effect...
	process.nextTick(function() {

		// To keep the example simple, the user's Dropbox profile is returned to
		// represent the logged-in user.  In a typical application, you would want
		// to associate the Dropbox account with a user record in your database,
		// and return that user instead.
		console.log(token);
		console.log(tokenSecret);
		console.log(profile);
		return done(null, profile);
	});
}));



app.get('/auth/dropbox/callback', passport.authenticate('dropbox', {
	failureRedirect: '/login'
}), function(req, res) {
	res.redirect('/');
});
app.get('/auth/dropbox', passport.authenticate('dropbox'), function(req, res) {
	// The request will be redirected to Dropbox for authentication, so this
	// function will not be called.
});


app.get('/auth/dropbox/callback', passport.authenticate('dropbox', {
	failureRedirect: '/login'
}), function(req, res) {
	res.redirect('/');
});

var dropboxUiConnector = require('./lib/dropboxUiConnector');
//or use file id, which also includes provider
app.get('/get/dropbox/:path/url', function(req, res) {
	var path = req.params.path;
	console.log('get file %s from dropbox', path);

	var token = require('../appConfig.json').services.dropbox.token;
	// var token = 
	dropboxUiConnector.getSharedLink(token, path, function(err, linkRes) {
		console.log(linkRes);
		//without url
		// res.send(linkRes); 

		res.redirect(linkRes.url);
	});

});

app.get('/get/dropbox/:path/thumbnail', function(req, res) {
	var path = req.params.path;
	var token = require('../appConfig.json').services.dropbox.token;
	console.log('get thumbnail from dropbox %s',path);

// var url = dropboxUiConnector.getThumbnailUrl(token, path);	
// res.redirect(url);
	dropboxUiConnector.getThumbnail(token, path, function(err, linkRes) {
		if(err){

		console.log('error in thumnbail')
		console.log(err);
		}
		console.log(linkRes);
				console.log('send thumbnail binary data back')
		res.send(linkRes);
		//without url
		// res.send(linkRes); 
		//TODO take care ? -> &
		// res.redirect(linkRes.url+'?dl=1');
	});
});
app.get('/get/dropbox/:path/dlurl', function(req, res) {
	var path = req.params.path;
	console.log('get file %s from dropbox', path);
	var token = require('../appConfig.json').services.dropbox.token;
	// var token = 
	dropboxUiConnector.getDirectLink(token, path, function(err, linkRes) {
		console.log(err);
		console.log(linkRes);
		//without url
		// res.send(linkRes); 
		//TODO take care ? -> &
		res.redirect(linkRes.url+'?dl=1');
	});

});

// file:///Users/lauchunyinvincent/fit-core/test/data/canon-ixus.jpg



// app.post('/login',
// 	passport.authenticate('local', {
// 	failureRedirect: '/enter',
// 	failureFlash: true
// }), function(req, res) {
// 	console.log("success");
// 	res.redirect('/search');
// });
// app.get('/flash', function(req, res) {
// 	// Set a flash message by passing the key, followed by the value, to req.flash().
// 	req.flash('info', 'Flash is back!')
// 	res.redirect('/template');
// });

// //didnt work
// app.get('/', function(req, res) {
// 	console.log('main');
// 	res.render('enter', {
// 		output: '123',
// 		message: req.flash('info'),
// 		error: req.flash('error')
// 	});
// });

// app.get('/index', function(req, res) {
// 	console.log('main');
// 	res.render('index', {
// 		output: '123',
// 		message: req.flash('info'),
// 		error: req.flash('error')
// 	});
// });



http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});