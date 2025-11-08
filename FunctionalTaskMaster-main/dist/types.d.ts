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
}
export type EstadoApp = {
    tareas: Tarea[];
    guardar: (tareas: Tarea[]) => Promise<Tarea[]>;
};
//# sourceMappingURL=types.d.ts.map