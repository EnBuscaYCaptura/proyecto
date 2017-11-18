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
 
Router.route('/', function () {
    this.render('home');
});

Router.route('/agregarTesoro', {
    name: 'agregarTesoro'
});
Router.route('/listarTesoros', {
    name: 'listarTesoros'
});
Router.route('/tesoro/:_id', {
    name: 'mapa',
   // data: function() { return tesoro.findOne(this.params._id); }
});
//Router.onBeforeAction('dataNotFound', {only: 'agregarTesoro'});
