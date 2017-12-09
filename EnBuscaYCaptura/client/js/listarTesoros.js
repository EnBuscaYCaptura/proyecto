import '../templates/application/tesoro.html'

Template.listarTesoros.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tesoros');
});

Template.listarTesoros.helpers({
  tesorosGuardados() {
    return tesoros.find({
      usado: false
    }, {
      sort: {
        createdAt: -1
      }
    });
  },

});

Template.listarTesoros.events({
  'click .iniciar-busqueda' (event) {
    var idTesoro = this._id;
    var idUsuario = Meteor.userId();
    tesoros.update(idTesoro, {
      $set: {
        usado: true
      }
    });
    var idjuego = juego.insert({
      idTesoro,
      idUsuario,
      horaInicial: new Date(),
      latitud: 0,
      longitud: 0,
      encontrado: false,
      abandonado: false
    });
    setTimeout(function() {
      Router.go('visorMapa', {
        _id: idjuego
      })
    }, 1000);
  },

  'click .segunda-verificacion-email' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verifiación enviada a ${ email }!`, 'success' );
      }
    });
  }



});