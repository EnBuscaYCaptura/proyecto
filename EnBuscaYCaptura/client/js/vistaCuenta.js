import {
    Accounts
} from 'meteor/accounts-base';
import {
    Meteor
} from 'meteor/meteor';
import {
    Bert
} from 'meteor/themeteorchef:bert';

$(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("/img/fondo.jpeg");

});
/*
    username: a unique String identifying the user.

    emails: an Array of Objects with keys address and verified; an email address may belong to at most one user. 
        verified is a Boolean which is true if the user has verified the address with a token sent over email.

    createdAt: the Date at which the user document was created.

    profile: an Object which the user can create and update with any data. 
        Do not store anything on profile that you wouldn’t want the user to edit unless you have a deny rule on the Meteor.users collection.

    services: an Object containing data used by particular login services.
        For example, its reset field contains tokens used by forgot password links,
        and its resume field contains tokens used to keep you logged in between sessions.
*/
Template.home.events({
    'click .btn-logout': function() {
        Meteor.logout();
    }
});

Template.registro.events({
    'submit .FormularioRegistro': function(event) {

        event.preventDefault();


        var email = event.target.email.value;
        var contrasena = event.target.contrasena.value;
        var nombreAcceso = event.target.nombreAcceso.value;
        var nombreUsuario = event.target.nombreUsuario.value;
        var usuarioApp = {email:email,profile:{nombreUsuario:nombreUsuario},username:nombreAcceso,password:contrasena};
        Accounts.createUser(usuarioApp,function(err){
            if (err ) {
                Bert.alert( err.reason, 'danger' );
              } else {
                Meteor.call( 'sendVerificationLink', ( err, response ) => {
                  if ( err ) {
                    Bert.alert( error.reason, 'danger' );
                  } else {
                    Bert.alert({
                    hideDelay: 9000,
                    message: 'Correo de verificación enviado',
                    type: 'success'
                    });
                  }
                });
              }
              Meteor.logout();
              Router.go('/');
        });
    }
});

Template.acceso.events({
    'submit .FormularioAcceso': function(event) {
        event.preventDefault();
        var nombreAcceso = event.target.nombreAcceso.value;
        var contrasena = event.target.contrasena.value;
        if (nombreAcceso || contrasena) {
            Meteor.loginWithPassword(nombreAcceso, contrasena, function(err) {
                if (err) {
                    /*
                    if(err.message === 'User not found [403]') {
                        Bert.alert('Usuario no encontrado', 'danger');
                    }*/
                    Bert.alert( 'Por favor, revise todos los campos', 'danger' );
                } else {
                    Router.go('/');
                }
            });
        } else {
            Bert.alert({
                message: 'Debes completar todos los campos',
                type: 'danger',
                style: 'fixed-top',
                icon: 'fa-times'
            });
        }

    },

    'submit .olvidarContrasenia' (event) {
        event.preventDefault();
        var email = event.target.email.value;
        Meteor.call('enviarCorreoOlvidoContraseniaEmail', email, function(err) {
            if (!err) {
                $('#modalContrasena').modal('hide');
                Meteor.logout();
                Router.go('/');
                Bert.alert('Email enviado correctamente', 'success');
            } else {
                Bert.alert('Ningún correo coincide con el introducido', 'danger');
            }
        });

    }
});

Template.modificarUsuario.events({
    'submit .FormularioModificarUsuario': function(event) {
        event.preventDefault();
        var nombreU = event.target.nombreUsuario.value;
        var contrasena = event.target.contrasena.value;
        var emailMod = event.target.email.value;

        const emailAntiguo = (Meteor.users.findOne(Meteor.userId())).emails[0].address;
        if (emailMod && emailMod.lenght !== 0) {
            Meteor.call('eliminarEmail', emailAntiguo)
            Meteor.call('anadirEmail', emailMod, function(err) {
                if (!err) {
                    Router.go('/listarTesoros');
                }
            });
        }
        if (contrasena && contrasena.lenght !== 0) {
            Meteor.call('cambiarPass', contrasena);
        }

        if (nombreU && nombreU.lenght !== 0) {
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $set: {
                    'profile.nombreUsuario': nombreU
                }
            });
        }
    },
    
    'click .eliminar-cuenta': function () {
        Meteor.call('eliminarUsuario', function(err){
            if(!err) {
                Bert.alert({
                  hideDelay: 6000,
                  message: 'Hasta pronto, camarada',
                  type: 'info',
                  icon: 'fa-remove'
                  });
                Router.go('/');
            }
        });
    }

});

/*
    AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Bert.alert( 'Email verificado! Gracias!', 'success' );
            Router.go('/');
        });
    }
});*/