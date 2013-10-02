/**
 *  Retrieves JSON data for stations, helmets, and bikes.
 */
 
// var Citibike = require('..')
//   , citibike = new Citibike;
var Citibike = require('Citibike'),
      citibike = new Citibike;

/** Retrieves Citibike Stations JSON Data and prints to console */
citibike.getStations(null, function(data) {
  console.log("Getting Citibike Stations...");
  console.log(data);
  var maxStation;
  for (var i = data["results"].length - 1; i >= 0; i--) {
  	var Station = data["results"] [i];
	var bikes = Station ["availableBikes"];
	
	// if maxStation isn't set yet, set it to this one

	if (maxStation == undefined ) { 
		maxStation = Station;
	};
	if(maxStation["availableBikes"] < bikes) {
		maxStation = Station;
	}
	//check if bike in this station is more than max bikestation
	//if yes, set max station to this one
	
	console.log(maxStation["latitude"] );
	console.log(maxStation["longitude"] );
  	console.log(maxStation["availableBikes"] );
  	console.log(bikes);
  };

}
  console.log(maxStation);

  exports.index = function(req, res) {
	
	console.log(maxStation);
	console.log("maxStation");
	var maxBikeData = {
		maxBikeNumber : maxStation["availableBikes"] ;
		CitiMaxStation.lat: maxStation["latitude"];
		CitiMaxStation.lng: maxStation["longitude"]
	};
	res.render('index.html', templateData);
}


/**
  var minStation;
  for (var i = data["results"].length - 1; i >= 0; i--) {
  	var Station = data["results"] [i];
  	
	var bikes = Station ["availableBikes"];
	
	// if maxStation isn't set yet, set it to this one

	if (minStation == undefined ) { 
		minStation = Station;
	};
	if(minStation["availableBikes"] > bikes) {
		minStation = Station;
	}
	//check if bike in this station is more than max bikestation
	//if yes, set max station to this one
	
  	  console.log(minStation["availableBikes"] );
  };
  console.log(minStation);
});
*/
