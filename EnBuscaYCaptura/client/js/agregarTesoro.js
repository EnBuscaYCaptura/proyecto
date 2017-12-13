import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';
import {
  ReactiveDict
} from 'meteor/reactive-dict';
import { Bert } from 'meteor/themeteorchef:bert';

Template.agregarTesoro.events({
  'submit .nuevo-tesoro' (event) {
    event.preventDefault();

    const target = event.target;
    const nombre = target.nombre.value;
    const descripcion = target.descripcion.value;
    const clave = target.clave.value;
    const latitud = target.latitud.value;
    const longitud = target.longitud.value;

    if(nombre.length != 0 && descripcion.length != 0 && clave.length != 0 &&  latitud.length != 0 && longitud.length != 0){
      if(!isNaN(latitud) && !isNaN(longitud)) {
        if(parseFloat(latitud) >= -90 && parseFloat(latitud) <= 90 && parseFloat(longitud) >= -180 && parseFloat(longitud) <= 180) {
          Meteor.call('tesoros.insert', nombre, descripcion, clave, latitud, longitud);
          Bert.alert("Tesoro guardado", "success");
          target.nombre.value = '';
          target.descripcion.value = '';
          target.clave.value = '';
          target.latitud.value = '';
          target.longitud.value = '';
        } else{
          Bert.alert( 'La latitud va entre 90 y -90 y la longitud entre 180 y -180', 'danger' );
        }
      }else{
        Bert.alert( 'Comprueba la ubicacion', 'danger' );
      }
    } else{
      Bert.alert( 'Todos los campos son obligatorios', 'danger' );
    }
  }
});