Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

//Router.route('/', {name: 'inicio'});

Router.route('/', function() {
    this.render('inicio');
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
//Router.route('/distancia',{name:'distancias'})
//Router.onBeforeAction('dataNotFound', {only: 'agregarTesoro'});