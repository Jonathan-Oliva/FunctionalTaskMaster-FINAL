import type { Tarea } from './types.js'; 
import { readFile, writeFile } from 'fs/promises';

export const serializarTarea = (tarea: Tarea) => ({
  ...tarea,
  creacion: tarea.creacion.toISOString(),
  ultimaEdicion: tarea.ultimaEdicion.toISOString(),
  vencimiento: tarea.vencimiento ? tarea.vencimiento.toISOString() : null,
});

export const deserializarTarea = (obj: any): Tarea => ({
  ...obj,
  creacion: new Date(obj.creacion),
  ultimaEdicion: new Date(obj.ultimaEdicion),
  vencimiento: obj.vencimiento ? new Date(obj.vencimiento) : null,
});

export const guardarEnArchivo = (ruta: string) => async (tareas: Tarea[]): Promise<Tarea[]> => {
  const datos = tareas.map(serializarTarea);
  await writeFile(ruta, JSON.stringify(datos, null, 2), 'utf-8');
  return tareas;
};

export const cargarDesdeArchivo = (ruta: string) => async (fallback: Tarea[] = []): Promise<Tarea[]> => {
  try {
  
    const data = await readFile(ruta, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.map(deserializarTarea);
  } catch {
    console.log('No se encontró archivo. Usando datos por defecto.');
    return fallback;
  }
};

export const iniciarConPersistencia = (ruta: string, fallback: Tarea[]) => 
  cargarDesdeArchivo(ruta)(fallback);