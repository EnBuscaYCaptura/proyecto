tesoros = new Mongo.Collection('tesoros');

if (Meteor.isServer) {

    Meteor.publish('tesoros', function tesorosPublication(bUsado) {
        return tesoros.find({usado: bUsado}, {
            fields: {
                clave: false,
                latitud: false,
                longitud: false,
                createdAt: false,
            }
        });
    });

    Meteor.methods({

        'tesoros.insert' (nombre, descripcion, clave, latitud, longitud) {

            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            tesoros.insert({
                nombre,
                descripcion,
                clave,
                latitud,
                longitud,
                createdAt: new Date(),
                usado: false
            });
        },

        'tesoros.setUsado' (idTesoro, setUsar) {
            tesoros.update(idTesoro, {
                $set: {
                    usado: setUsar
                }
            });
        },
    });

}