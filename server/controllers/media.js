var express = require('express');
var router = express.Router();


router.get('/user',function(req,res){
	console.log(req.session.passport.user)
	res.json({
		user: req.user
	})
})
router.get('/pics',function(req,res){
	// console.log(req.session.passport.user.accessToken)
	res.json({
		user: req.user
	})
})

module.exports = router;