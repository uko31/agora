var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/agora_dev');

router.get('/', function(req, res) {
	var collection = db.get('socles');
	
	collection.find({}, function(err, json_data){

		if (err) throw err;
		res.json(json_data);

	});

});

router.post('/', function(req, res) {

	var collection = db.get('socles');

	collection.insert(
		req.body,
		function(err, json_data) {
			if (err) throw err;

			res.json(json_data);
		}
	);

});

router.get('/:id', function(req, res) {

	var collection = db.get('socles');
	
	collection.findOne(
		{ _id: req.params.id }, 
		function(err, json_data) {
			if (err) throw err;
			res.json(json_data);
		}
	);

});

router.put('/:id', function(req, res) {

	var collection = db.get('socles');
	
	collection.update(
		{ _id: req.params.id },
		req.body,
		function(err, json_data){
			if (err) throw err;
			res.json(json_data);
		}
	);
});

router.delete('/:id', function(req, res) {

	var collection = db.get('socles');
	
	collection.remove(
		{ _id: req.params.id }, 
		function(err, json_data) {
			if (err) throw err;
			res.json(json_data);
		}
	);

});

module.exports = router;
