var express = require('express');
var app = express();
var routes = require('./routes');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('lodash');
var PORT = process.env.PORT || 3001 ;
var logins = {};

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.post('/register', function(req, res){
	var username = req.body.username;
	console.log(req.body);
	if (logins[username]) {
		res.status(400).send('user already exists');
	} else if (!(req.body.username && req.body.password)) {
		res.status(400).send('missing password or username');
	} else {
		logins[username] = req.body;
		res.send('submitted');
	}
});

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if (logins[username].password === password) {
		res.send(_.omit(logins[username], 'password'));
	} else {
		res.status(400).send('incorrect login');
	}
});

var data = [];
app.post('/data', function(req, res){
	if (req.body.data) {
		data.push(req.body.data);
		res.send('done');
	} else {
		res.status(400).send('incorrect data');
	}
})

app.get('/data', function(req, res){
	res.json(data);
});

app.get('/chat', require('./chat').get);

app.post('/chat', require('./chat').post);

app.listen(PORT, function() {
	console.log('microservice listening on PORT:' + PORT);
})

for (var i in routes){
	var route = routes[i];
	app[route.method.toLowerCase()](route.route, function(req, res){
		eval(route.code);
	})
}

