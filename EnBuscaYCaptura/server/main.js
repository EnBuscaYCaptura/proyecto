import { Meteor } from 'meteor/meteor';
import '../imports/api/tesoros.js';

Meteor.startup(() => {
  SSLProxy({
       port: 443, //or 443 (normal port/requires sudo)
       ssl : {
            key: Assets.getText("enbuscaycaptura.key"),
            cert: Assets.getText("enbuscaycaptura.crt"),
            passphrase: 'enbuscaycaptura'
            //Optional CA
            //Assets.getText("ca.pem")
       }
    });
});