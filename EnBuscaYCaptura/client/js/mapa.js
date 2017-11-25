//import { GoogleMaps } from 'meteor/dburles:google-maps';
//import { Meteor } from 'meteor/meteor';

 import { Template } from 'meteor/templating';


if (Meteor.isClient) {
  var MAP_ZOOM = 17;

  Meteor.startup(function() {
    GoogleMaps.load({key: "AIzaSyD1jsmXmxDgSIamZGd9bi7KDE76A_KD0oY"});
  });

  Template.mapa.onCreated(function() {
    Meteor.subscribe('juego');
    var self = this;

    GoogleMaps.ready('map', function(map) {
      var marker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
console.log("se mueve");        
        //Guardar la posicion en la coleccion cada 5 segundos
        setTimeout(function(){
            if($(".idJuego") && $(".idJuego").val() !== ""){
                var idJuego = $(".idJuego").val();
                juego.update(idJuego, { $set: { latitud: latLng.lat, longitud: latLng.lng } });
            }
        }, 5000);
        
      });
    });
  });

  Template.mapa.helpers({
    juegoGuardado() {
        return juego.find({}, { sort: { createdAt: -1 } });
      },
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      GoogleMaps.load({key: "AIzaSyD1jsmXmxDgSIamZGd9bi7KDE76A_KD0oY"});
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
}