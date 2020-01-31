export interface Seguimientos {
  idCurso: number;
  curso: string;
  costo: string;
  clasificacion: string;
  especialidad: string;
}

export interface CursoVendidos {
  agendaId: number;
  cursoId: number;
  numeroPersona: number;
  costoPersona: string;
  subtotal: string;
  curso: string;
}
