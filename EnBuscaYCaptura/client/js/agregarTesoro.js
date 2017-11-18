import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import { Tesoro } from '../api/tasks.js';

Template.agregarTesoro.events({
  'submit .nuevo-tesoro'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const nombre = target.nombre.value;
    const descripcion = target.descripcion.value; 
    const clave = target.clave.value;
    const latitud = target.latitud.value;
    const longitud = target.longitud.value;
 
    // Insert a task into the collection
    //Meteor.call('tesoros.insert', nombre, descripcion, clave, latitud, longitud);
    tesoros.insert({
      nombre,
      descripcion,
      clave,
      latitud,
      longitud,
      createdAt: new Date(),
    });
    // Clear form
    target.nombre.value = '';
    target.descripcion.value = ''; 
    target.clave.value = '';
    target.latitud.value = '';
    target.longitud.value = '';
  }
});