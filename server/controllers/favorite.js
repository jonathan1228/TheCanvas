var express = require('express');
var router = express.Router();
var knex = require('../../db/knex.js')

router.post('/add',function(req,res){
	console.log(req.body)
	knex('favorites').where({
		favoriteid: req.body.imgid
	}).then(function(data){
		if(data.length === 0){
			knex('favorites').insert({
				userid: req.body.userid,
				favoriteid: req.body.imgid
				}).then(function(data){
					console.log("favorite added")
			})
		}
			else{
				console.log('img already exists')
			}
	})
})
router.post('/delete', function(req,res){
	knex('favorites').where({favoriteid: req.body.imgid}).del().then(function(){

	})
	console.log(req.body.imgid)
})
router.get('/get', function(req,res){
	knex('favorites').then(function(data){
		res.json({data: data});
	})
})
router.get('/', function(req,res){
	res.send("HI")
})


module.exports = router;
