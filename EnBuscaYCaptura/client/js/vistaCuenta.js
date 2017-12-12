import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';


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
        if((!email || email.length === 0) || (!contrasena ||  contrasena.length === 0) || (!nombreAcceso || nombreAcceso.length === 0) || (!nombreUsuario || nombreUsuario.length === 0)){
            Bert.alert( 'Es necesario rellenar todos los campos', 'danger' );
        } else {
            if(nombreAcceso.indexOf('@') === -1) {
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
            } else {
                Bert.alert( 'El nombre de acceso a la App no debe contener el caracter @', 'danger' );
            }
            
        }
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
                  Bert.alert({
                  hideDelay: 6000,
                  message: 'Recuerde verificar el nuevo email para seguir usando la aplicación',
                  type: 'info',
                  icon: 'fa-envelope-o'
                  });
                  Router.go('/listarTesoros');

                }
            });
        }
        if (contrasena && contrasena.lenght !== 0) {
            Meteor.call('cambiarPass', contrasena);
            Router.go('/listarTesoros');
        }

        if (nombreU && nombreU.lenght !== 0) {
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $set: {
                    'profile.nombreUsuario': nombreU
                }
            });
            Router.go('/listarTesoros');
        }
        Bert.alert('Datos modificados', 'success');
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
    },
        'click .btn-logout': function() {
        Meteor.logout();
        Router.go('/');
    }

});