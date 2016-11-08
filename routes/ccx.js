var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/agora_dev');

/* GET home page. */
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

module.exports = router;
