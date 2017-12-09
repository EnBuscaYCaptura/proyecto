import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';
import {
  ReactiveDict
} from 'meteor/reactive-dict';

Template.agregarTesoro.events({
  'submit .nuevo-tesoro' (event) {
    event.preventDefault();

    const target = event.target;
    const nombre = target.nombre.value;
    const descripcion = target.descripcion.value;
    const clave = target.clave.value;
    const latitud = target.latitud.value;
    const longitud = target.longitud.value;

    Meteor.call('tesoros.insert', nombre, descripcion, clave, latitud, longitud);

    target.nombre.value = '';
    target.descripcion.value = '';
    target.clave.value = '';
    target.latitud.value = '';
    target.longitud.value = '';
  }
});