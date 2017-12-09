Meteor.startup(function() {
  Accounts.emailTemplates.from = 'En busca y captura op <no-reply@tesoros.meteor.com>';
  Accounts.emailTemplates.siteName = 'En busca y captura';
  Accounts.emailTemplates.verifyEmail = {
       subject() {
          return "Activar a la cuenta";
       },
       text(user, url) {
      //  console.log(user);
        // return `${user.username}! Verifica tu e-mail a través de este link: ${url}`;
          let emailAddress   = user.emails[0].address,
              urlWithoutHash = url.replace( '#/', '' ),
              emailBody      = `${user.username}! Verifica tu e-mail a través de este link: ${urlWithoutHash}`;

          return emailBody;
       }



    };


});