export interface Agenda {
  id?: number;
  nombreEstudio?: string;
  fecha?: Date;
  localidad?: string;
  colonia?: string;
  direccion?: string;
  numExterior?: number;
  numInterior?: number;
  observaciones?: string;
  idMunicipio?: number;
  idEstado?: number;
  idIncidencia?: number;
  ageb?: string;
  seccion?: string;
  tipo?: number;
  folio?: string;
}

export interface Usuarios {
  id: number;
}

export interface Todo {
  id?: number;
  fecha?: Date;
  tipo?: number;
  tipovisita?: number;
  cliente?: number;
  vinculador: {
    [key: number]: Usuarios;
  };
  observaciones?: string;
}

export interface AgendaShow {
  id?: number;
  institucion?: string;
  direccion?: string;
  tipoVista?: string;
  fecha?: Date;
  tipo?: number;
}

export interface UpdateVinculacionData {
  id?: number;
  statusValue?: number;
}

export interface AllAgenda {
  id?: number;
  fecha?: Date;
  tipoVista?: string;
  institucion?: string;
  direccion?: string;
  nombreTitular?: string;
  cargo?: string;
  telfonoInstitucional?: string;
  nombreEnlace?: string;
}

export interface GetUserwithAgenda {
  id?: number;
  nombre?: string;
}
