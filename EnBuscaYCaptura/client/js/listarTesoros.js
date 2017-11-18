import '../templates/application/tesoro.html'

Template.listarTesoros.onCreated(function bodyOnCreated() {
  //this.state = new ReactiveDict();
  Meteor.subscribe('tesoros');
});

Template.listarTesoros.helpers({
  tesorosGuardados() {
    return tesoros.find({}, { sort: { createdAt: -1 } });
  },
});