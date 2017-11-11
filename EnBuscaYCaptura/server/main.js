import { Meteor } from 'meteor/meteor';
import '../imports/api/tesoros.js';

Meteor.startup(() => {
  SSLProxy({
       port: 3100, //or 443 (normal port/requires sudo)
       ssl : {
            key: Assets.getText("localhost.key"),
            cert: Assets.getText("localhost.crt"),
            passphrase: 'local'
            //Optional CA
            //Assets.getText("ca.pem")
       }
    });
});
