import type { Tarea } from './types.js';
export declare const agregarTarea: (lista: Tarea[], titulo: string, desc?: string, venc?: null, dif?: number) => Tarea[];
export declare const filtrarTareas: (lista: Tarea[], filtro?: string) => Tarea[];
export declare const ordenarTareas: (lista: Tarea[], criterio: string | null) => Tarea[];
export declare const buscarPorTitulo: (lista: Tarea[], texto: string) => Tarea[];
export declare const actualizarTareaPorId: (lista: Tarea[], id: string, cambios: Partial<Tarea>) => Tarea[];
//# sourceMappingURL=todoList.d.ts.map