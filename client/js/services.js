app.factory('flickr', ['$http', function($http){
	var token;
	var user_id;
	var api_key = "0e437bfe1461cc90165d2991f57bc5de";
	var url ="https://api.instagram.com/v1/users/self/media/recent/?callback=JSON_CALLBACK&access_token=";
	return {
	userid: function(callback){
		$http.get('/media/pics').then(function successCallback(response) {
			token = response.data.user.token
			user_id = response.data.user.profile.id
			callback(response.data.user.profile);
			console.log(response)
		  }, function errorCallback(response) {

 	 	});
	},
	getPhoto: function(callback){
		$http({
			method: "GET",
        	url: "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key="+api_key+ "&user_id="+user_id+"&format=json&nojsoncallback=1"
        
	    }).then(function successCallback(response) {
	    	
				callback(response.data.photos.photo)

			  }, function errorCallback(response) {

	 	 });
	},
	getProfilePhoto: function(callback){
		$http({
			method: "GET",
			url: "https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key="+api_key+ "&user_id="+user_id+"&format=json&nojsoncallback=1"
		}).then(function successCallback(response){
			// console.log(response.data.person)
			callback(response.data.person)
		})
	},
	getTagPhotos: function(tag, count, callback){
		$http({
			method:"GET",
			url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+api_key+"&tags="+tag+"&page="+count+"&format=json&nojsoncallback=1"
		}).then(function successCallback(response){
			callback(response.data.photos)
		})
	},
	findUser: function(username, callback){
		$http({
			method:"GET",
			url: "https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key="+api_key+"&username="+username+"&format=json&nojsoncallback=1"
		}).then(function successCallback(response){
			user_id = response.data.user.id
			callback(response.data)
		})
	},
	getChartTime: function(picID, callback){

		$http({
			method: "GET",
			url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+api_key+"&photo_id="+picID+"&format=json&nojsoncallback=1"
		}).then(function successCallback(data){

			callback(data)
		})
		
		
	},
	getChartFav: function(picID, callback){

		$http({
			method: "GET",
			url: "https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key="+api_key+"&photo_id="+picID+"&format=json&nojsoncallback=1"
		}).then(function successCallback(data){
			callback(data)
		})
		
		
	},
	followers: function(callback){
		$http({
			method: "GET",
        	url: "https://api.instagram.com/v1/users/self/follows?callback=JSON_CALLBACK&access_token=" + token
        
	    }).then(function successCallback(response) {
				
				callback(response.data.data)
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
		    // or server returns response with an error status.
	 	 });
		},
	addFavorite: function(id, userid){
		$http({
			method:"POST",
			url:"/favorite/add",
			data:{ 
				imgid: id,
				userid: userid
			 }
			}).then(function(data){
			
				})
		},
	getFavorite: function(callback){
		$http({
			method:"GET",
			url: "/favorite/get"
			}).then(function successCallback(response){
				// console.log(response)
				callback(response.data.data)
			})
		},
	deleteFavorite: function(id, userid){
	$http({
		method:"POST",
		url:"/favorite/delete",
		data:{ 
			imgid: id,
			userid: userid
		 }
		}).then(function(data){
			
			})
		}

	}
}]);
