Template.home.events({
    'click .btn-logout':function(){
        Meteor.logout();
    }
});

Template.registro.events({
    'submit .FormularioRegistro': function (event) {
 
        event.preventDefault();
 
 
        var email = event.target.email.value;
        var contrasena = event.target.contrasena.value;
        var nombreAcceso = event.target.nombreAcceso.value;
        var nombreUsuario = event.target.nombreUsuario.value;
 
        var usuarioApp = {email:email,profile:{nombreUsuario:nombreUsuario},username:nombreAcceso,password:contrasena};
        console.log(usuarioApp);
        Accounts.createUser(usuarioApp,function(err){
            if(!err) {
                Router.go('/');
            }
        });
    }
});

Template.acceso.events({
    'submit .FormularioAcceso': function (event) {
        event.preventDefault();
        var nombreAcceso = event.target.nombreAcceso.value;
        var contrasena = event.target.contrasena.value;
        
        Meteor.loginWithPassword(nombreAcceso,contrasena,function(err){
            if(!err) {
                Router.go('/');
            }
        });
    }
});
