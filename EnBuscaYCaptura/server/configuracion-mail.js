import './const.js';

Meteor.startup(function() {
  Accounts.emailTemplates.from = 'En busca y captura op <no-reply@tesoros.meteor.com>';
  Accounts.emailTemplates.siteName = 'En busca y captura';
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "Activar a la cuenta";
    },
    text(user, url) {
      //console.log(user);
      /*  urlWithoutHash = url.replace( '#/', '' ),
          return `${user.username}! Verifica tu e-mail a través de este link: ${urlWithoutHash}`;*/
      let emailAddress = user.emails[0].address,
        urlWithoutHash = url.replace('#/', ''),
        urlFinal = urlWithoutHash.replace('localhost', IPMAIL),
        emailBody = `${user.username}! Verifica tu e-mail a través de este link: ${urlFinal}`;

      return emailBody;
    }
  };
  Accounts.emailTemplates.resetPassword = {
    subject() {
      return "Olvido su contraseña";
    },
    text(user, url) {
      //console.log(user);
      /*  urlWithoutHash = url.replace( '#/', '' ),
          return `${user.username}! Verifica tu e-mail a través de este link: ${urlWithoutHash}`;*/
      let emailAddress = user.emails[0].address,
        urlWithoutHash = url.replace('#/', ''),
        urlFinal = urlWithoutHash.replace('localhost', IPMAIL),
        emailBody = `${user.username}! Has pedido cambiar de contraseña, la nueva es "YCHh2ku7".Le recomendamos cambiar la contraseña desde el panel de modificar usuario. Ve a este enlace para finalizar el cambio de la contraseña: ${urlFinal}`;

      return emailBody;
    }
  };
});