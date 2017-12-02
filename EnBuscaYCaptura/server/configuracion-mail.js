Meteor.startup(function() {
  Accounts.emailTemplates.from = 'En busca y captura op <no-reply@tesoros.meteor.com>';
  Accounts.emailTemplates.siteName = 'En busca y captura';
  Accounts.emailTemplates.verifyEmail = {
       subject() {
          return "Activate your account now!";
       },
       text(user, url) {
        console.log(user);
          return `Hey ${user.username}! Verify your e-mail by following this link: ${url}`;
       }
    };


});