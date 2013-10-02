
var googleMap = googleMap || (function(){
    var lat;
    var lng;

    return {
        init : function(Args) {
            lat = Args[0];
            lng = Args[1];
        },
        pin : function() {
          google.maps.event.addDomListener(window, 'load', function() {

          var myLatlng = new google.maps.LatLng( lat, lng );
          var mapOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

          var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: 'max station'
          });           
          });
        }
    };
}());