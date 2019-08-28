export interface Cliente {
  id?: number;
  institucion?: string;
  dirección?: string;
  nombreTitular?: string;
  cargo?: string;
  telfonoInstitucional?: string;
  nombreEnlace?: string;
  cargoEnlace?: string;
  telefonoEnlace?: string;
  correoEnlace?: string;
}

/**
 * vinculadores
 */
export interface Vinculador {
  id?: number;
  nombre?: string;
  administrative_id?: number;
  adscription_id?: number;
  puesto?: string;
  categoria?: string;
}
