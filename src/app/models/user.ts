export interface Usuario {
  id?: string;
  numeroEnlace?: string;
  email?: string;
  categoria?: string;
  nombre?: string;
  activo?: boolean;
  role: string;
  token?: string;
}
