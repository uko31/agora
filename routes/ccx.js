var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/agora_dev');

router.get('/', function(req, res) {
	var collection = db.get('ccx');
	
	collection.find({}, function(err, ccx){

		if (err) throw err;
		res.json(ccx);

	});

});

router.post('/', function(req, res) {

	var collection = db.get('ccx');

	collection.insert(
		req.body,
		function(err, ccx) {
			if (err) throw err;

			res.json(ccx);
		}
	);

});

router.get('/:id', function(req, res) {

	var collection = db.get('ccx');
	
	collection.findOne(
		{ _id: req.params.id }, 
		function(err, ccx) {
			if (err) throw err;
			res.json(ccx);
		}
	);

});

router.put('/:id', function(req, res) {

	var collection = db.get('ccx');
	
	collection.update(
		{ _id: req.params.id },
		req.body,
		function(err, ccx){
			if (err) throw err;
			res.json(ccx);
		}
	);
});

router.delete('/:id', function(req, res) {

	var collection = db.get('ccx');
	
	collection.remove(
		{ _id: req.params.id }, 
		function(err, ccx) {
			if (err) throw err;
			res.json(ccx);
		}
	);

});

module.exports = router;
