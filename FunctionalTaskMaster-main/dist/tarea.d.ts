import type { Tarea } from './types.js';
export declare const ESTADOS: Readonly<{
    PENDIENTE: "Pendiente";
    EN_CURSO: "En Curso";
    TERMINADA: "Terminada";
    CANCELADA: "Cancelada";
}>;
export declare const DIFICULTADES: Readonly<{
    FACIL: "Fácil";
    MEDIO: "Medio";
    DIFICIL: "Difícil";
}>;
export declare const crearTarea: (titulo: string, descripcion?: string, vencimiento?: Date | null, dificultad?: number | string) => Tarea;
export declare const cambiarEstado: (tarea: Tarea, codigo: string) => Tarea;
export declare const mostrarDetalle: (tarea: Tarea) => string;
//# sourceMappingURL=tarea.d.ts.map