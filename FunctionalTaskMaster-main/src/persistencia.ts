// ESTE ARCHIVO GUARDA Y CARGA TUS TAREAS EN UN ARCHIVO
// → Usamos las funciones asíncronas de Node.js para leer y escribir archivos.

import type { Tarea } from './types.ts'; 
import { readFile, writeFile } from 'fs/promises';

// Funciones para serializar la fecha
// → Las fechas no se pueden guardar directamente, así que las convertimos en texto para guardarlas.

export const serializarTarea = (tarea: Tarea) => ({
  ...tarea,
  creacion: tarea.creacion.toISOString(),
  ultimaEdicion: tarea.ultimaEdicion.toISOString(),
  vencimiento: tarea.vencimiento ? tarea.vencimiento.toISOString() : null,
});

// Función para deserializar la fecha
// → Convierte las cadenas de texto de vuelta a objetos Date al cargar.
export const deserializarTarea = (obj: any): Tarea => ({
  ...obj,
  creacion: new Date(obj.creacion),
  ultimaEdicion: new Date(obj.ultimaEdicion),
  vencimiento: obj.vencimiento ? new Date(obj.vencimiento) : null,
});

// Funciones para guardar y cargar tareas desde un archivo JSON
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

// Función combinada para iniciar la aplicación con persistencia 
export const iniciarConPersistencia = (ruta: string, fallback: Tarea[]) => 
  cargarDesdeArchivo(ruta)(fallback);