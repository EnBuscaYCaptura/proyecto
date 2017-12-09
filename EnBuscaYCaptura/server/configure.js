/*Accounts.loginServiceConfiguration.remove({ 
  service: "google" 
});

Accounts.loginServiceConfiguration.insert({ 
  service: "google", 
  clientId: "605869571439-r53mhkahk4a15d6p91len2lbseojgjm7.apps.googleusercontent.com",
  secret: "11Kt9O-HfgIcsuY6JXQV4BV6" 
}); */ /*
ServiceConfiguration.configurations.remove(
    { service: 'google' },
  );

ServiceConfiguration.configurations.insert(
{
    service: "google", 
      clientId: "605869571439-r53mhkahk4a15d6p91len2lbseojgjm7.apps.googleusercontent.com",
      secret: "11Kt9O-HfgIcsuY6JXQV4BV6" 
  });
*/
ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: "popup",
      clientId: "605869571439-r53mhkahk4a15d6p91len2lbseojgjm7.apps.googleusercontent.com", // See table below for correct property name!
      secret: "11Kt9O-HfgIcsuY6JXQV4BV6",
      loginStyle: "redirect"
    }
  }
);