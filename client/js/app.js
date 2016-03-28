var app = angular.module('Pictimize',['ngRoute', 'angularSpinner']);

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when("/",{
		templateUrl: "./view/home.html",
		controller: "HomeController"
	})
	.when("/media",{
		templateUrl: "./view/media.html",
		controller: "MediaController"
	})
	.when("/favorites",{
		templateUrl: "./view/favorite.html",
		controller: "FavoriteController"
	})
	.when("/tag",{
		templateUrl:"./view/users.html",
		controller: "TagController"
	})
	.when("/finduser",{
		templateUrl:"./view/findusers.html",
		controller: "FindUserController"
	})
	// $locationProvider.html5Mode({enabled: true});
})