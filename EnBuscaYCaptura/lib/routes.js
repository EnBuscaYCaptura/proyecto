//ruta principal y plantilla base
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

Router.route('/registro', function () {
    this.render('registro');
});
 
Router.route('/acceso', function () {
    this.render('acceso');
});

Router.route('/modificar' , function () {
    this.render('modificarUsuario');
}); 
 
Router.route('/', function () {
    this.render('home');
});

/*Router.route('/', {
    name: 'home',
    template: 'home'
});*/

Router.route('/agregarTesoro', {
    name: 'agregarTesoro'
});
Router.route('/listarTesoros', {
    name: 'listarTesoros'
});
Router.route('/juego/:_id', {
    name: 'visorMapa',
   /* onAfterAction: function () {
        juego.insert(
                tesoro: _id,
                usuario: Meteor.userid(),
                latitud: 0,
                longitud: 0,
                createdAt: new Date(),
                encontrado: false
            );
    }*/
    data: function() { return juego.findOne({_id: this.params._id}); }
});
//Router.onBeforeAction('dataNotFound', {only: 'agregarTesoro'});

/*Router.route('/checkYourEmail',{
    template: 'checkYourEmail'
});

Router.route('/emailverified',{
    template: 'emailVerified'
});
Router.route('/verifyEmail/:token',{
    controller: 'AccountController',
    action: 'verifyEmail'
});

AccountController = RouteController.extend({
    verifyEmail: function(){
        Accounts.verifyEmail(this.params.token, function(){
            Router.go('/listarTesoros');
        });
    }
});*/
