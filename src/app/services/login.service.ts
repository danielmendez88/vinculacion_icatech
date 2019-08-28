/**
 * representará una capa de acceso a datos que proveerá el resto de la aplicación
 * con modelos.
 * Desarrollado por Daniel Méndez Cruz v.1.0
 */
import { Injectable } from '@angular/core';
// importamos modelo
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  // mostrar el modelo
  model: Model[] = [
    {
      // tslint:disable-next-line:max-line-length
      name: 'vinculación', cols: 1, rows: 1, color: 'lightblue', mensaje: [], status: 'trabajos de vinculación por parte del personal', about: '', imagen: 'img/curso.jpg'
    },
    {
      // tslint:disable-next-line:max-line-length
      name: 'Capacitación', cols: 1, rows: 1, color: 'lightgreen', mensaje: [], status: 'Trabajos de capacitación para el mejoramiento', about: '', imagen: 'img/capacitacion.jpg'
    },
    {
      // tslint:disable-next-line:max-line-length
      name: 'certificación', cols: 1, rows: 1, color: 'lightpink', mensaje: [], status: 'Icatech certificando con validez oficial', about: '', imagen: 'img/certificacion.jpg'
    },
    {
      name: 'Quienes somos', cols: 1, rows: 1, color: 'lightblue', mensaje: [], status: 'xxx', about: '', imagen: 'img/somosicatech.jpg'
    },
    {
      name: 'Icatech', cols: 1, rows: 1, color: 'lightgreen', mensaje: [], status: 'xxx', about: '', imagen: 'img/icatech.jpg'
    },
    {
      name: 'Cursos a medida', cols: 1, rows: 1, color: 'lightpink', mensaje: [], status: 'xxx', about: '', imagen: 'img/cursosmedida.jpg'
    }
  ];

  getAll(): Model[] {
    return this.model;
  }
}
