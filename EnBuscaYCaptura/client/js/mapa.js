//import '../templates/application/distancia.html'

Template.mapa.onCreated(function bodyOnCreated() {
    //this.state = new ReactiveDict();
    Meteor.subscribe('tesoros');
    Meteor.subscribe('juego');
    posicion = {};
});


/*Template.mapa.helpers({
    guardar() {
        var url = window.location.pathname.split("/");
        var idtesoro=url[url.length -1];
        var tesoro = tesoros.find({
                '_id': idtesoro
            });
        console.log(idtesoro);
        console.log(tesoro.nombre);
        console.log(tesoro.count());
        if (tesoro.count() == 1){
            console.log("insertamos en mongo");
           º juego.insert({
                latitud: 0,
                longitud: 0,
                tiempo: 0,
                usuario: 1,
                tesoro: idtesoro,
                encontrado:0,
            });
        } else {
            console.log("URL invalida");
        }
    }
});
   /*     
        //var todos = tesoros.find();
        //latLng = Geolocation.currentLocation().coords;
        //console.log(latLng);
     /*   if (!latLng)
            return;
        juego.insert({
            latitud: latLng.latitud,
            longitud: latLng.longitude,
            tiempo: 0,
            usuario,
            tesoro,
            encontrado:0,
        });

        /*navigator.geolocation.getCurrentPosition(function(pos) {
            //console.log(pos.coords);
            debugger;
            alert("aaaa");
            return pos.coords;
        }, function(err) {
            debugger;
            console.warn('ERROR(' + err.code + '): ' + err.message);
            //distancias();
        }, {
            enableHighAccuracy: true,
            //timeout: 5000,
            maximumAge: 0
        });
        /*var a = (todos.forEach(function(elem) {
            console.log("entro");
            console.log("id:"+elem._id +" latitud:"+ latLng.latitude +" longitud:"+ latLng.longitude);
            debugger;
            console.log(Meteor.call('tesoros.distancia', elem._id, latLng.latitude, latLng.longitude));
            console.log("return");
            return Meteor.call('tesoros.distancia', elem._id, latLng.latitude, latLng.longitude);
        }));
        console.log("fuera");
        console.log(a);
        // return todos.forEach(function(elem) {
        //   return Meteor.call('tesoros.distancia', elem._id, latLng.lat, latLng.lng);
        //});
    }
});*/