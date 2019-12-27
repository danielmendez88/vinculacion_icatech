export interface CategoriaCursos {
  id?: number;
  nombreCurso?: string;
  descripcion?: string;
}

export interface Cursos {
  id?: number;
  especialidad?: string;
}

export interface CursosbyId {
  curso?: string;
  especialidad?: string;
  objetivo?: string;
  perfilIngreso?: string;
  duracion?: number;
  modalidad?: string;
  clasificacion?: string;
  costo?: string;
}

export interface CursoById {
  id?: number;
  curso?: string;
  especialidad?: string;
  objetivo?: string;
  perfilIngreso?: string;
  duracion?: number;
  modalidad?: string;
  clasificacion?: string;
  costo?: string;
}
export interface CursoVendido {
  agendaId?: number;
  cursoId?: number;
  numeroPersona?: number;
  costoPersona?: string;
  subtotal?: string;
}
