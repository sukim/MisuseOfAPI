<!-- Load the Google Maps JS API. Your Google maps key will be rendered. -->


  var geocoder;
  var map;
  var places;
  var markers = [];
 
  function initialize() {

    console.log('map::initialize');
 
    // create the geocoder
    geocoder = new google.maps.Geocoder();
    
    // set some default map details, initial center point, zoom and style
    var mapOptions = {
      center: new google.maps.LatLng(latitude,longitude),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // create the map and reference the div#map-canvas container
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
 
    // fetch the existing places (ajax) 
    // and put them on the map
    fetchPlaces();
  }
 
  // when page is ready, initialize the map!
  google.maps.event.addDomListener(window, 'load', initialize);

// add location button event
  jQuery("form").submit(function(e){
 
    // the name form field value
    var name = jQuery("#place_name").val();
    
    // get the location text field value
    var loc = jQuery("#location").val();
    console.log("user entered location = " + loc);
 
    geocoder.geocode( { 'address': loc }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
 
        // log out results from geocoding
        console.log("geocoding results");
        console.log(results);
        
        // reposition map to the first returned location
        map.setCenter(results[0].geometry.location);
        
        // put marker on map
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
 
        bindInfoWindow(marker, map, infowindow, places[p].name + "<br>" + places[p].geo_name);
 
    // not currently used but good to keep track of markers
    markers.push(marker);
        
        // preparing data for form posting
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var loc_name = results[0].formatted_address;
 
        // send first location from results to server as new location
        jQuery.ajax({
          url : '/add_place',
          dataType : 'json',
          type : 'POST',
          data : {
            name : name,
            latlng : lat + "," + lng,
            geo_name : loc_name
          },
          success : function(response){
            // success - for now just log it
            console.log(response);
 
          },
          error : function(err){
 
            // do error checking
            alert("something went wrong");
            console.error(err);
          }
        });
 
 
      } else {
        alert("Try again. Geocode was not successful for the following reason: " + status);
      }
    });
  
 
    e.preventDefault();
    return false;
 
  });
 
 
  // fetch Places JSON from /data/places
  // loop through and populate the map with markers
  var fetchPlaces = function() {
 
    var infowindow =  new google.maps.InfoWindow({
        content: ''
    });
 
    jQuery.ajax({
      url : 'http://appservices.citibikenyc.com/data2/stations.php?updateOnly=true',
      dataType : 'jsonp',
      success : function(response) {
        
        //console.log(response.response.recent);
        if (response.status == 'OK') {
 
          places = response.response.recent;
 
          // loop through places and add markers
          for (p in places) {
 
            //create gmap latlng obj
            console.log(places[p].venue);
            tmpLatLng = new google.maps.LatLng( places[p].venue.location.lat, places[p].venue.location.lng);
 
            // make and place map maker.
            var marker = new google.maps.Marker({
                map: map,
                position: tmpLatLng,
                title : places[p].name + "<br>" + places[p].geo_name
            });
 
            bindInfoWindow(marker, map, infowindow, '<b>'+places[p].name + "</b><br>" + places[p].geo_name);
 
            // not currently used but good to keep track of markers
            markers.push(marker);
 
          }
 
        }
      }
    })
 
 
  };
 
  // binds a map marker and infoWindow together on click
  var bindInfoWindow = function(marker, map, infowindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(html);
          infowindow.open(map, marker);
      });
  } 