import type { Tarea, EstadoApp } from './types.js';
export declare const mostrarListado: (estado: EstadoApp, filtro: string, orden: string | null) => Promise<{
    tareas: Tarea[];
    guardar: (tareas: Tarea[]) => Promise<Tarea[]>;
}>;
//# sourceMappingURL=mostrarListado.d.ts.map