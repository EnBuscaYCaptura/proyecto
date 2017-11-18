/*Router.configure({
  layoutTemplate: 'layout'
});*/

/*Router.route('/', {
    name: 'pepe'
})*/

Router.route('/registro', function () {
    this.render('registro');
});
 
Router.route('/acceso', function () {
    this.render('acceso');
});
 
Router.route('/', function () {
    this.render('home');
});