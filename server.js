var express = require('express');
var app = express();
var knex = require('./db/knex.js')
var bodyParser = require('body-parser');
var http = require('http')
var server = http.createServer(app);
var auth = require('./server/controllers/auth.js')
var media = require('./server/controllers/media.js')
var favorite = require('./server/controllers/favorite.js')
var passport = require('passport');
var cookieSession = require('cookie-session');
var FlickrStrategy = require('passport-flickr').Strategy;
require('dotenv').load();

// Handle static assets and register middleware
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
 
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  
  done(null, obj);
});



 passport.use(new FlickrStrategy({
    consumerKey: process.env['FLICKR_API_KEY'],
    consumerSecret: process.env['FLICKR_SECRET_KEY'],
    callbackURL: process.env['HOST'] + "/auth/flickr/callback",
  },
  function(token, tokenSecret, profile, done) {
   console.log ( token, profile, tokenSecret)
    return done(null, {token:token, profile:profile, tokenSecret: tokenSecret});
  }
));

 

app.use('/auth', auth);
app.use('/media', media);
app.use('/favorite', favorite);



app.get('/', function(res,req){
	res.render('index')
})


server.listen(3000, function() {
    console.log('listening on port: 3000');
});
