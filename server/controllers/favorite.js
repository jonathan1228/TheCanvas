var express = require('express');
var router = express.Router();
var knex = require('../../db/knex.js')

router.post('/share',function(req,res){
	// console.log(req.body)
	knex('favorites').where({
		favoriteid: req.body.pic
	}).then(function(data){
		if(data.length === 0){
			knex('favorites').insert({
				userid: req.body.user,
				favoriteid: req.body.pic,
				senderid: req.body.sender
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
	console.log(req.body)
	knex('favorites').where({favoriteid: req.body.picid, userid: req.body.userid}).del().then(function(){

	})
	
})
router.get('/get', function(req,res){
	var favData = {};
	knex('favorites').then(function(data){
		favData.picData = data;
		knex('users').then(function(data){
			favData.userData = data
			console.log(favData)
			res.json({data: favData});
		})
		
	})
})
router.get('/', function(req,res){
	res.send("HI")
})


module.exports = router;
