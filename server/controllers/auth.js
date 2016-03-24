var express = require('express');
var router = express.Router();
var passport = require('passport');
var knex = require('../../db/knex.js')
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/');
// }
router.get('/flickr', passport.authenticate('flickr'), function(req,res){

});

router.get('/flickr/callback', passport.authenticate('flickr', {
	failureRedirect: '/'
}), function(req,res){

	// knex('users').where({userid: req.user.profile.id}).then(function(rows){
	// 	if(rows.length === 0){
	// 		knex('users').insert({
	// 			userid: req.user.profile.id, 
	// 			username: req.user.profile.username,
	// 			fullname: req.user.profile.displayName
	// 		}).then(function(data){
	// 			console.log('hi ' + data)
	// 			res.redirect('/');
	// 		})
	// 	}
	// 	else{
	// 		res.redirect('/')
	// 	}
	// })
	res.redirect('/')
});
// router.get('/instagram/access-token', function(req, res) {
// 	// res.cookie('instagramAccessToken', body.access_token);
//  //    res.cookie('instagramRefreshToken', body.refresh_token);
// 	// console.log(req.cookies.instagramAccessToken)
//   if(req.cookies.spotifyAccessToken) {
//     res.json({
//       'access_token': req.cookies.spotifyAccessToken
//     });
//   }
//   else if(req.cookies.spotifyRefreshToken) {
//     res.redirect('refresh-token?refresh_token=' + req.cookies.spotifyRefreshToken);
//   }
//   else {
//     res.status(403);
//     res.json({
//       'error': "User had no refresh token cookie so we could not fetch the access token."
//     });
//   }
// });
// router.get('/instagram/callback', function(req, res) {
// 	console.log("boojah");
// 	res.redirect('/');
// })
// router.get('/logout',ensureAuthenticated, function(req, res){
	
// 		delete pad.users[req.session.passport.user.displayName];


//   	req.logout();
//   res.redirect('/pad');

// });

module.exports = router;
