var express = require('express');
var app = express();
var routes = require('./routes');
var request = require('request');

var PORT = process.env.PORT || 3001 ;

var yahoo = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22{stock}.AX%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

app.get('/finance/:stock', function(req, res){
	request(yahoo.replace('{stock}', req.params.stock), function(error, response, body){
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			if (body.query.results.quote.Ask) {
				res.send(body.query.results.quote.Ask);
			} else {
				res.send('error');
			}
	  	} else {
	  		res.send('error');
	  	}
		
	});
});

app.listen(PORT, function() {
	console.log('microservice listening on PORT:' + PORT);
})

for (var i in routes){
	var route = routes[i];
	app[route.method.toLowerCase()](route.route, function(req, res){
		eval(route.code);
	})
}

