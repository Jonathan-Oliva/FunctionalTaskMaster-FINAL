import type { Tarea, EstadoApp } from './types.js';
export declare const menuDetallesTarea: (estado: EstadoApp, tareaId: string) => Promise<{
    tareas: Tarea[];
    guardar: (tareas: Tarea[]) => Promise<Tarea[]>;
}>;
//# sourceMappingURL=menuDetallesTareas.d.ts.map