//import { GoogleMaps } from 'meteor/dburles:google-maps';
//import { Meteor } from 'meteor/meteor';

import {
    Template
} from 'meteor/templating';


if (Meteor.isClient) {
    var MAP_ZOOM = 17;

    Meteor.startup(function() {
        GoogleMaps.load({
            key: "AIzaSyD1jsmXmxDgSIamZGd9bi7KDE76A_KD0oY"
        });
    });

    Template.mapa.onCreated(function() {
        Meteor.subscribe('juego', Meteor.userId(), false, false);
        var self = this;

        GoogleMaps.ready('map', function(map) {
            var marker;

            // Create and move the marker when latLng changes.
            self.autorun(function() {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                if (!marker) {
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
                //Guardar la posicion en la coleccion cada 5 segundos
               // setTimeout(function() {
                    if ($("[name='idJuego']") && $("[name='idJuego']").val() !== "" 
                        && latLng.lat !== undefined && latLng.lng !== undefined) {
                        var idJuego = $("[name='idJuego']").val();
                        Meteor.call('juego.setPosicion', idJuego, latLng.lat, latLng.lng);
                    }
              //  }, 5000);
            });
        });
    });

    Template.mapa.helpers({
        juegoGuardado() {
            return juego.find({});
        },
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            GoogleMaps.load({
                key: "AIzaSyD1jsmXmxDgSIamZGd9bi7KDE76A_KD0oY"
            });
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                //$('.gmnoprint').hide();
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    });

    Template.mapa.events({
        'submit .avisoEncontrado': function(event) {
            event.preventDefault();

            const target = event.target;
            const clave = target.clave.value;
            var idJuego = $("[name='idJuego']").val();
            Meteor.call('juego.comprobar', idJuego, clave);

            target.clave.value = '';

        },
        'click .volver': function(event) {
            var idJuego = $("[name='idJuego']").val();
            Meteor.call('juego.encontrar', idJuego);
            Router.go('/');
        },
        'click .abandonar': function(event) {
            var idJuego = $("[name='idJuego']").val();
            Meteor.call('juego.abandonar', idJuego);
            Router.go('/');
        }
    });
}