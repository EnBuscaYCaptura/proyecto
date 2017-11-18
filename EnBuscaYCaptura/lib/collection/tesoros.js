tesoros = new Mongo.Collection('tesoros');

if (Meteor.isServer) {
    Meteor.publish('tesoros', function tasksPublication() {
        return tesoros.find({}, {
            fields: {
                clave: false,
                latitud: false,
                longitud: false,
                createdAt: false,
            }
        });
    });
}