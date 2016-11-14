var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/agora_dev');

router.get('/', function(req, res, next) {

	var users = db.get('users');
	
	users.find({}, function(err, users){

		if (err) throw err;
		res.json(users);

	});

});

router.get('/:username', function(req, res) {

	var users = db.get('users');
	
	users.findOne(
		{ username: req.params.username }, 
		function(err, user) {
			if (err) throw err;
			res.json( user );
		}
	);

});

module.exports = router;
