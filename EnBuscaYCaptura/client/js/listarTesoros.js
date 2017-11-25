import '../templates/application/tesoro.html'

Template.listarTesoros.onCreated(function bodyOnCreated() {
  //this.state = new ReactiveDict();
  Meteor.subscribe('tesoros');
  Meteor.subscribe('juego');
});

Template.listarTesoros.helpers({
  tesorosGuardados() {
    return tesoros.find({}, { sort: { createdAt: -1 } });
  },

});

Template.listarTesoros.events({
  'click .iniciar-busqueda'(event) {
    var idTesoro = this._id;
    var idUsuario = Meteor.userId();
    var idjuego = juego.insert({
        idTesoro,
        idUsuario,
        latitud: 0,
        longitud: 0,
        encontrado: false
    });
    setTimeout(function(){Router.go('visorMapa', {_id: idjuego})}, 1000);
  }
});
