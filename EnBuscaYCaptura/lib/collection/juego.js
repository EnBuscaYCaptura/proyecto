juego = new Mongo.Collection('juego');

if (Meteor.isServer) {
    Meteor.publish('juego', function tasksPublication() {
        return juego.find({});
    });
    Meteor.methods({
        'juego.distancia' (id, latitud, longitud) {
            var tesoro = juego.find({
                '_id': id
            });
            console.log("id:"+id);
            var a = Meteor.call('getKilometros', latitud, longitud, tesoro.fetch()[0].latitud, tesoro.fetch()[0].longitud);
            console.log(a);
            return Meteor.call('getKilometros', latitud, longitud, tesoro.fetch()[0].latitud, tesoro.fetch()[0].longitud);
        },
    });
}