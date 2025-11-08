import type { Tarea } from './types.js';
export declare const serializarTarea: (tarea: Tarea) => {
    creacion: string;
    ultimaEdicion: string;
    vencimiento: string | null;
    id: string;
    titulo: string;
    descripcion: string;
    estado: import("./types.js").Estado;
    dificultad: import("./types.js").Dificultad;
};
export declare const deserializarTarea: (obj: any) => Tarea;
export declare const guardarEnArchivo: (ruta: string) => (tareas: Tarea[]) => Promise<Tarea[]>;
export declare const cargarDesdeArchivo: (ruta: string) => (fallback?: Tarea[]) => Promise<Tarea[]>;
export declare const iniciarConPersistencia: (ruta: string, fallback: Tarea[]) => Promise<Tarea[]>;
//# sourceMappingURL=persistencia.d.ts.map