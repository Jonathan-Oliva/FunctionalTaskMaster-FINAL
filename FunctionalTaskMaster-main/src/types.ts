// EN ESTE ARCHIVO DEFINIMOS LOS TIPOS USADOS EN LA APLICACIÓN
// → Tipos para tareas, estados y la estructura principal de la aplicación.
export type Dificultad = 'Fácil' | 'Medio' | 'Difícil';

export type Estado = 'Pendiente' | 'En Curso' | 'Terminada' | 'Cancelada';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: Estado;
  creacion: Date;
  ultimaEdicion: Date;
  vencimiento: Date | null;
  dificultad: Dificultad;
  relacionadas?: string[]; 
}

export type EstadoApp = {
  tareas: Tarea[];
  guardar: (tareas: Tarea[]) => Promise<void>; 
};