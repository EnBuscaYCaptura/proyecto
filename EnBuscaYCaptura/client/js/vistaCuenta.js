import {
    Accounts
} from 'meteor/accounts-base';
import {
    Meteor
} from 'meteor/meteor';
import {
    Bert
} from 'meteor/themeteorchef:bert';
import {
    GoogleAccounts
} from 'meteor/accounts-google';
import {
    ServiceConfiguration
} from 'meteor/service-configuration';

$(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("/img/fondo.jpeg");

});
/*
Meteor.startup(function() {
    $.backstretch("/img/fondo.jpeg");
});
/*Template.registro.onCreated(function(){
     $(document).ready(function() {
       $.backstretch("/img/fondo.jpeg");
    });
});
Template.modificarUsuario.onCreated(function(){
     $(document).ready(function() {
       $.backstretch("/img/fondo.jpeg");
    });
});
Template.acceso.onCreated(function(){
     $(document).ready(function() {
       $.backstretch("/img/fondo.jpeg");
    });
});*/
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

        var usuarioApp = {
            email: email,
            profile: {
                nombreUsuario: nombreUsuario
            },
            username: nombreAcceso,
            password: contrasena
        };
        //  console.log(usuarioApp);
        Accounts.createUser(usuarioApp, function(err) {
            if (!err) {
                // debugger;
                // Accounts.sendVerificationEmail(Meteor.userId(), email);
                Meteor.call('sendVerificationLink', Meteor.userId(), email, function(err) {
                    if (!err) {
                        Router.go('/');
                    }
                });
                //Router.go('/');
            }
            Meteor.logout();
            /*Meteor.call('sendVerificationLink',email,Meteor.userId(),function(err,res){
                    if(!err){
                        console.log('An email verification link has been sent to your account....Click the link to verify.');
                        Router.go('/checkYourEmail');
                    }
                    else{
                        console.log(err.reason);
                    }

            });*/
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
                    Bert.alert('Por favor, revise todos los campos', 'danger');
                } else
                /*if(!err)*/
                {
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
            /*         Bert.alert({
                         message: 'Debes completar todos los campos',
                         type: 'success'
                     });*/
            //Bert.alert( '<h1>Hiya</h1>', 'danger', 'growl-top-right' );
        }

    },

    /*'click .acceso-google': function (event) {
        event.preventDefault();
        Meteor.loginWithGoogle();
    },*/

    'click [data-social-login]' (event, template) {
        const service = event.target.getAttribute('data-social-login'),
            options = {
                requestPermissions: ['email']
            };
        Meteor.loginWithGoogle();
        if (service === 'loginWithGoogle') {
            delete options.requestPermissions;
        }

        Meteor[service](options, (error) => {
            if (error) {
                Bert.alert(error.message, 'danger');
            }
        });
    },
    'submit .olvidarContrasenia' (event) {
        event.preventDefault();
        var email = event.target.email.value;
        Meteor.call('enviarCorreoOlvidoContraseniaEmail', email, function(err) {
            if (!err) {
                Meteor.logout();
                Router.go('/');
            } else {
                Bert.alert('Nigun correo coincide con el introducido', 'danger');
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

        //get old email
        console.log(Meteor.userId());
        const emailAntiguo = (Meteor.users.findOne(Meteor.userId())).emails[0].address;
        //console.log(oldEmail);
        //console.log(emailMod);
        //add new email
        //Accounts.addEmail(Meteor.userId(), emailMod);
        console.log(emailAntiguo);
        console.log(emailMod);
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

        //remove old email
        //Accounts.removeEmail(Meteor.userId(), oldEmail);

        //Meteor.users.update({ _id: Meteor.userId(),  $set: { 'emails.address': emailMod }});
    },
    'click .eliminar-cuenta': function() {
        //console.log("wii");
        Meteor.call('eliminarUsuario', function(err) {
            if (!err) {
                Router.go('/');
            }
        });
    }

});

/*
    AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Router.go('/');
        });
    }
});*/