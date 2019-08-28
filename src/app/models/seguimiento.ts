/**
 * exporta una interface de la ruta para mostrar los datos del nav
 */
export interface Seguimiento {
  nombreArchivo: string|any;
  imagen: string|any;
  propuesta: string;
  agenda_id: number;
  isincidence: any;
}

export interface DetalleSeguimiento {
  id?: number;
  propuesta?: string|any;
  seguimiento?: boolean;
  archivo?: string|any;
  extension?: string|any;
  ruta?: string|any;
  seg_id?: number;
  file_id?: number;
}

export interface Archivos {
  id?: number;
  nombreArchivo?: string | any;
  ruta: string|any;
  seguimiento_id?: number;
}
