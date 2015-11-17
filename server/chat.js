var msgs = [{user: 'yang', message: 'Welcome to GA'}, {user: 'yang', message: 'Hi there'}];

module.exports = {
	post: function(req, res){
		if (req.body.user && req.body.message) {
			msgs.unshift({user: req.body.user, message: req.body.message});
			res.send('success');
		} else {
			res.status(400).send('error');
		}
	},
	get: function(req, res){
		res.json(msgs);
	}
}