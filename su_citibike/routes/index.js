var request = require('request');

//get Citibike API
var Citibike = require('Citibike'),
      citibike = new Citibike;

var maxStation = null;

/** Retrieves Citibike Stations JSON Data and prints to console */
citibike.getStations(null, function(data) {
	// console.log("Getting Citibike Stations...");
	// console.log(data);
  
 	for (var i = data["results"].length - 1; i >= 0; i--) {
	  	var Station = data["results"] [i];
		var bikes = Station ["availableBikes"];
		
		// if maxStation isn't set yet, set it to this one

		if (maxStation == undefined ) { 
			maxStation = Station;
		}
		if(maxStation["availableBikes"] < bikes) {
			maxStation = Station;
		}
		//check if bike in this station is more than max bikestation
		//if yes, set max station to this one
		
		console.log(maxStation["latitude"] );
		console.log(maxStation["longitude"] );
	  	console.log(maxStation["availableBikes"] );
	  	console.log(bikes);
	}

	console.log('maxStation',maxStation);
});
  
exports.index = function(req, res) {
	
	console.log("main page requested");
	var templateData = {
		pageTitle : 'Sign Up for a CitiBike Spinning Class!',
		maxBikeNumber : maxStation["availableBikes"],
		CitiMaxStationLat: maxStation["latitude"],
		CitiMaxStationLng: maxStation["longitude"],
		CitiMaxStationAddress: maxStation["label"]
	};

	res.render('index.html', templateData);
}
