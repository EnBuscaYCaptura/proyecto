juego = new Mongo.Collection('juego');

if (Meteor.isServer) {

    Meteor.publish('juego', function juegoPublication(idJugador, bEncontrado, bAbandonado) {
        return juego.find({
            encontrado: bEncontrado,
            abandonado: bAbandonado,
            idUsuario: idJugador
        });
    });

    Meteor.methods({

        'juego.insert' (idTesoro, idUsuario) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            return juego.insert({
                idTesoro,
                idUsuario,
                horaInicial: new Date(),
                latitud: 0,
                longitud: 0,
                pista: 0,
                avisoEncontrado: false,
                encontrado: false,
                abandonado: false
            });
        },

        'juego.setPosicion' (idJuego, setLatitud, setLongitud) {
            var color;
            var jugada = juego.find({
                _id: idJuego
            });
            var tesoro = tesoros.find({
                _id: jugada.fetch()[0].idTesoro
            });
            var distancia = Meteor.call('getKilometros', setLatitud, setLongitud, tesoro.fetch()[0].latitud, tesoro.fetch()[0].longitud);
            if (distancia <= 0.5) {
                color = "rgb(0, 255, 0);"; //verde
            } else {
                if (distancia <= 2) {
                    color = "rgb(255, 255, 0);"; //amarillo
                } else {
                    color = "rgb(255, 0, 0);"; //rojo
                }
            }
            var aviso = distancia < 0.5;
            juego.update(idJuego, {
                $set: {
                    latitud: setLatitud,
                    longitud: setLongitud,
                    avisoEncontrado: aviso,
                    colorDistancia: color
                }
            });
        },

        'juego.comprobar' (idJuego, clave) {
            var jugada = juego.find({
                _id: idJuego
            });
            var tesoro = tesoros.find({
                _id: jugada.fetch()[0].idTesoro
            });
            if (clave === tesoro.fetch()[0].clave) {
                juego.update(idJuego, {
                    $set: {
                        avisoEncontrado: false,
                        horaFinal: new Date()
                    }
                });
            }
        },

        'juego.encontrar' (idJuego) {
            juego.update(idJuego, {
                $set: {
                    encontrado: true
                }
            });
        },

        'juego.abandonar' (idJuego) {
            var tesoro = juego.find({
                _id: idJuego
            });
            //Meteor.call('tesoros.setUsado', tesoro.fetch()[0].idTesoro, false);
            tesoros.update(tesoro.fetch()[0].idTesoro, {
                $set: {
                    usado: false
                }
            });
            juego.update(idJuego, {
                $set: {
                    abandonado: true
                }
            });
        },

    });
}