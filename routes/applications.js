var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/agora_dev');

router.get('/', function(req, res) {
	var collection = db.get('applications');
	
	collection.find({}, function(err, ccx){

		if (err) throw err;
		res.json(ccx);

	});

});

router.post('/', function(req, res) {

	var collection = db.get('applications');

	collection.insert(
		req.body,
		function(err, application) {
			if (err) throw err;

			res.json(application);
		}
	);

});

router.get('/:id', function(req, res) {

	var collection = db.get('applications');
	
	collection.findOne(
		{ _id: req.params.id }, 
		function(err, application) {
			if (err) throw err;
			res.json(application);
		}
	);

});

router.put('/:id', function(req, res) {

	var collection = db.get('applications');
	
	collection.update(
		{ _id: req.params.id },
		req.body,
		function(err, application){
			if (err) throw err;
			res.json(application);
		}
	);
});

router.delete('/:id', function(req, res) {

	var collection = db.get('applications');
	
	collection.remove(
		{ _id: req.params.id }, 
		function(err, application) {
			if (err) throw err;
			res.json(application);
		}
	);

});

module.exports = router;
