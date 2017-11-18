import {
  Meteor
} from 'meteor/meteor';
//import '../imports/api/tesoros.js';

Meteor.startup(() => {
  SSLProxy({
    port: 443, //or 443 (normal port/requires sudo)
    ssl: {
      key: Assets.getText("enbuscaycaptura.key"),
      cert: Assets.getText("enbuscaycaptura.crt"),
      passphrase: 'enbuscaycaptura'
        //Optional CA
        //Assets.getText("ca.pem")
    }
  });
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
  }
});