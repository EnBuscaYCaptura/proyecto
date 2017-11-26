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
    Meteor.methods({
        'tesoros.insert' (nombre, descripcion, clave, latitud, longitud) {
            /* check(nombre, String);
            check(descripcion, String);
            check(clave, String);
            check(latitud, String);
            check(longitud, String);
*/
            // Make sure the user is logged in before inserting a task
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
            /*check(taskId, String);
            check(setChecked, Boolean);*/
            //const tesoro = tesoros.findOne(idTesoro);
            /*if (tesoro.private && task.owner !== Meteor.userId()) {
                // If the task is private, make sure only the owner can delete it
                throw new Meteor.Error('not-authorized');
            }*/
            tesoros.update(idTesoro, {
                $set: {
                    usado: setUsar
                }
            });
        },
    });
}