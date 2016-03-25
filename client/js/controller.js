app.controller('HomeController', function($scope, $http, flickr){
	$scope.toDoList = [];
	$scope.data;
	$scope.token;
	$scope.media;
	$scope.token;
	
	// console.log($scope.token)	
})
app.controller('MediaController', function($scope, $http, flickr){
	$scope.pics;
	$scope.userInfo;
	$scope.search;
	$scope.show = true;

	$scope.addFavorite = function(id){
		flickr.addFavorite(id,$scope.userInfo.id);
	}
	document.querySelector('.menu-button').onclick = function(e) {
	   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
	}
	var items = document.querySelectorAll('.circle a');

	for(var i = 0, l = items.length; i < l; i++) {
	  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	}
	$scope.ctx = $("#myChart").get(0).getContext("2d");
	$scope.myNewChart = new Chart($scope.ctx);
	flickr.userid(function(data){

			flickr.getProfilePhoto(function(data){
				$scope.userInfo=data;
				console.log($scope.userInfo)
			})
			flickr.getPhoto(function(data){
				$scope.pics = data;
				console.log(data)
				new Promise(function(resolve, reject){
					resolve(data)
				}).then(function(responses){
					$scope.grid = $('.grid').isotope({
				    itemSelector: '.grid-item',
				    percentPosition: true,
				    masonry: {
				      columnWidth: '.grid-sizer'
				    }
				});
				  // layout Isotope after each image loads
				 $scope.grid.imagesLoaded().progress( function() {
				    $scope.grid.isotope('layout');

				});
				})
			});
		})	
})

app.controller('FavoriteController', function($scope, $http, flickr){
	$scope.pics = [];
	$scope.userInfo
	document.querySelector('.menu-button').onclick = function(e) {
	   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
	}
	var items = document.querySelectorAll('.circle a');

	for(var i = 0, l = items.length; i < l; i++) {
	  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	}
	flickr.getFavorite(function(dataPic){
		console.log(dataPic)
		flickr.userid(function(data){
		$scope.userInfo = data.profile._json.data
		console.log($scope.userInfo)
		flickr.media(function(data){
			console.log(data)
			for(var j = 0; j < dataPic.length; j++){
				for(var i = 0; i < data.length; i++){
					if(dataPic[j].favoriteid === data[i].id){
						$scope.pics.push(data[i])
					}
				}
			}
			console.log($scope.pics)
			
		})
	})
	})
	$scope.deleteFavorite = function(id){
		flickr.deleteFavorite(id, $scope.userInfo.id)
		for(var i = 0; i < $scope.pics.length; i++){
			if($scope.pics[i].id === id){
				$scope.pics.splice(i,1)
			}
		}
		console.log($scope.pics)
	}
		
})


app.controller("TagController", function($scope,$http,flickr){	
	$scope.tag;
	$scope.pics;
	$scope.count=1;



	document.querySelector('.menu-button').onclick = function(e) {
	   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
	}
	var items = document.querySelectorAll('.circle a');

	for(var i = 0, l = items.length; i < l; i++) {
	  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	}
	$scope.submit = function(){
		if ($('.wow').hasClass('animated')) {
            $(this).removeClass('animated');
            $(this).removeAttr('style');
            new WOW().init();
		}
		else
			new WOW().init();
		$scope.loadPics = [];
		$scope.pics = [];
		$scope.count=1;
		flickr.getTagPhotos($scope.tag, $scope.count, function(data){

			for(var i = 0; i < data.photo.length; i++){
				var picPromise = new Promise(function(resolve,reject){
					resolve(data.photo[i])
				})
				$scope.pics.push(data.photo[i])
				$scope.loadPics.push(picPromise);
			}
			Promise.all($scope.loadPics).then(function(responses){
				// console.log($scope.loadPics)
				$scope.grid = $('.grid').isotope({
				    itemSelector: '.grid-item',
				    percentPosition: true,
				    masonry: {
				      columnWidth: '.grid-sizer'
				    }
				});
				  // layout Isotope after each image loads
				 $scope.grid.imagesLoaded().progress( function() {
				    $scope.grid.isotope('layout');

				});  
			})
			
		})
	}
	$scope.more = function(){
		var tmpPics = [];
		//add $scope.pics to tempPics
		$scope.loadPics = [];
		$scope.count++;
		flickr.getTagPhotos($scope.tag, $scope.count, function(data){
			console.log(data)
			for(var i = 0; i < data.photo.length; i++){
				// Add the new pic data to tmpPics
				var morePic = new Promise(function(resolve, reject){
					resolve(data.photo[i]);
				})
				tmpPics.push(data.photo[i]);
				$scope.loadPics.push(morePic)
			}
			// Now $scope.pics = tempPics;
			$scope.pics = tmpPics
			Promise.all($scope.loadPics).then(function(responses){
				  // layout Isotope after each image loads
				 $scope.grid = $('.grid').isotope({
				    itemSelector: '.grid-item',
				    percentPosition: true,
				    masonry: {
				      columnWidth: '.grid-sizer'
				    }
				});
				  // layout Isotope after each image loads
				 $scope.grid.imagesLoaded().progress( function() {
				    $scope.grid.isotope('reloadItems');

				}); ;
			})

		})
	}
		
			
})

app.controller("FindUserController", function($scope,$rootScope, $http, flickr, usSpinnerService){
	$scope.test = new WOW().init();
	$scope.test;

	$scope.pics;
	$scope.count=1;
	$scope.userInfo;
	$scope.chartTime = {};
	$scope.chartFav = [];
	$scope.show = true;
	
    $scope.startcounter = 0;
    $scope.startSpin = function() {
      if (!$scope.spinneractive) {
        usSpinnerService.spin('spinner-1');
      }
    };

    $scope.stopSpin = function() {
      if ($scope.spinneractive) {
        usSpinnerService.stop('spinner-1');
      }
    };
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
	  
	



	document.querySelector('.menu-button').onclick = function(e) {
	   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
	}
	var items = document.querySelectorAll('.circle a');

	for(var i = 0, l = items.length; i < l; i++) {
	  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	}
	
	$scope.more = function(){
		$scope.count++;
		flickr.getTagPhotos($scope.tag, $scope.count, function(data){
			// console.log(data)
			for(var i = 0; i < data.photo.length; i++){
				$scope.pics.push(data.photo[i]);
			}
		})
	}
	

	$scope.submit = function(){
		if ($('.wow').hasClass('animated')) {
            $(this).removeClass('animated');
            $(this).removeAttr('style');
            new WOW().init();
		}
		else
			new WOW().init();

		$scope.ctx = $("#myChart").get(0).getContext("2d");
		$scope.myNewChart = new Chart($scope.ctx);
		$scope.startSpin();

		flickr.findUser($scope.search, function(data){
			flickr.getProfilePhoto(function(data){
				$scope.userInfo=data;
				 console.log($scope.userInfo)
				
			})
			flickr.getPhoto(function(data){
				$scope.pics = data;
				var time = [];
					var fav = [];
				for(var i = 0; i < $scope.pics.length; i++){
					// Time Promise Generation
					var p1 = new Promise(function(resolve, reject) {
						flickr.getChartTime($scope.pics[i].id, generatePromiseCB(resolve, reject, i));

					})

					time.push(p1);
					// Fav Promise Generation
					var p2 = new Promise(function(resolve, reject) {
						flickr.getChartFav($scope.pics[i].id, generatePromiseCB(resolve, reject, i));
					})
					fav.push(p2)

				}
				Promise.all(time).then(function(responses){
					$scope.chartTime = responses;
					Promise.all(fav).then(function(responses){
						$scope.chartFav = responses; 
						console.log("FAV",$scope.chartFav)
						console.log("TIME",$scope.chartTime)
						//Building chart data
						Chart.types.Line.extend({
						    name: "LineAlt",
						    draw: function () {
					        Chart.types.Line.prototype.draw.apply(this, arguments);
					        
					        var ctx = this.chart.ctx;
					        ctx.save();
					        // text alignment and color
					        ctx.textAlign = "center";
					        ctx.textBaseline = "bottom";
					        ctx.fillStyle = this.options.scaleFontColor;
					        // position
					        // console.log(this.scale.xScalePaddingLeft)
					        var x = this.scale.xScalePaddingLeft * 0.4;
					        var y = this.chart.height / 2;
					        // change origin
					        ctx.translate(x, y)
					        // rotate text
					        ctx.rotate(-90 * Math.PI / 180);
					        ctx.fillText(this.datasets[0].label, 0, 0);
					        ctx.restore();
					    	}
						});

						$scope.data = {
						    labels: [],
						    datasets: [
						        {
						            label: "Likes",
						            fillColor: "rgba(151,187,205,0.2)",
						            strokeColor: "rgba(151,187,205,1)",
						            pointColor: "rgba(151,187,205,1)",
						            pointStrokeColor: "#fff",
						            pointHighlightFill: "#fff",
						            pointHighlightStroke: "rgba(151,187,205,1)",
						            data: []
						        }
						    ]
						};
						var monthCounts = {};
						var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December",]
			
						//converts millisecond to month and year
						for(var i = $scope.chartTime.length-1; i > 0; i--){	
							var d = new Date(parseInt($scope.chartTime[i].data.photo.dateuploaded) * 1000)
							var year = d.getFullYear();
							var month = d.getMonth()
							if(!monthCounts[year + " " +monthNames[month]]){
								monthCounts[year + " " +monthNames[month]] = parseInt($scope.chartFav[i].data.photo.total);
							}
							else{
								monthCounts[year + " " +monthNames[month]] += parseInt($scope.chartFav[i].data.photo.total);
							}
							
						}
						for(var key in monthCounts){
							
							$scope.data.labels.push(key);
							$scope.data.datasets[0].data.push(monthCounts[key]);
						}

						var options = { 
							    responsive: true,
							    scaleGridLineColor : "rgba(0,0,0,0)",
							    maintainAspectRatio: true
							}
						$scope.myLineChart = new Chart($scope.ctx).LineAlt($scope.data, options, {
						    // make enough space on the right side of the graph
						    scaleLabel: "<%=value%>"
						});
						$scope.stopSpin()
						$scope.grid = $('.grid').isotope({
						    itemSelector: '.grid-item',
						    percentPosition: true,
						    masonry: {
						      columnWidth: '.grid-sizer'
						    }
						});
						  // layout Isotope after each image loads
						 $scope.grid.imagesLoaded().progress( function() {
						    $scope.grid.isotope('layout');

						});  

						
					})
					
				})
			})
		})
	}

})

function generatePromiseCB(resolve, reject, additionalData) {
	return function(data) {
		data.additionalData = additionalData
		resolve(data);
	}
}
