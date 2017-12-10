import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import './const.js';

import './const.js';
Meteor.startup(() => {
  
  smtp = {
    username: 'enbuscaycaptura.daw@gmail.com',
    password: PASSCORREO,
    server: 'smtp.gmail.com',
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':'
    + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  //process.env.MAIL_URL = "smtp://enbuscaycaptura.daw@gmail.com:contraseña@smtp.gmail.com:587";
  SSL(URLCERTIFICADOSSL + 'private/buscacaptura.key',URLCERTIFICADOSSL + 'private/buscacaptura.crt', 443);
});

Meteor.methods({
  'getKilometros' (lat1, lon1, lat2, lon2) {
    rad = function(x) {
      return x * Math.PI / 180;
    }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(parseFloat(lat2) - parseFloat(lat1));
    var dLong = rad(parseFloat(lon2) - parseFloat(lon1));
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
  },



  anadirEmail: function(email) {
    'use strict';

    Accounts.addEmail(this.userId, email);
    Accounts.sendVerificationEmail(this.userId, email);
    /* Email.send({
       to: "to.address@email.com",
       from: "from.address@email.com",
       subject: "Example Email",
       text: "The contents of our email in plain text.",
     });*/
    return true;
  },

  eliminarEmail: function(email) {
    'use strict';
    Accounts.removeEmail(this.userId, email);
    return true;
  },

  cambiarPass: function(contrasena) {
    'use strict';
    Accounts.setPassword(this.userId, contrasena, {
      logout: false
    });
    return true;
  },

  /*sendVerificationLink: function(email,id){
    Accounts.sendVerificationEmail(id,email);
  }*/
  eliminarUsuario: function() {
    'use strict';
    Meteor.users.remove(this.userId);
    return true;
  },
  enviarCorreoOlvidoContraseniaEmail: function(email) {
    var usuario = Accounts.findUserByEmail(email);
    if (usuario._id) {
      Accounts.sendResetPasswordEmail(usuario._id, email);
    }
  }

});
