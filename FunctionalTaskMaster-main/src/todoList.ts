// EN ESTE ARCHIVO GESTIONAMOS LA LISTA DE TAREAS CON FILTROS Y BÚSQUEDAS
// → Funciones puras para agregar, filtrar, ordenar y buscar tareas en la lista.
import { crearTarea } from './tarea.js';
import type { Tarea } from './types.ts'; 

export const agregarTarea = (lista: Tarea[], titulo: string, desc = '', venc = null, dif = 1): Tarea[] => {
  const nueva = crearTarea(titulo, desc, venc, dif);
  return [...lista, nueva];
};

export const filtrarTareas = (lista: Tarea[], filtro = 'todas'): Tarea[] => {
  const f = filtro.toLowerCase();
  return lista.filter(t => f === 'todas' || t.estado.toLowerCase() === f);
};

export const ordenarTareas = (lista: Tarea[], criterio: string | null): Tarea[] => {
  const copia = [...lista];
  if (criterio === 'titulo') return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
  
  if (criterio === 'vencimiento') {
    return copia.sort((a, b) => {
      if (!a.vencimiento) return 1;
      if (!b.vencimiento) return -1;
      return a.vencimiento.getTime() - b.vencimiento.getTime();
    });
  }
  
  if (criterio === 'creacion') return copia.sort((a, b) => a.creacion.getTime() - b.creacion.getTime());
  
  if (criterio === 'dificultad') {
    const orden = { 'Fácil': 1, 'Medio': 2, 'Difícil': 3 };
    return copia.sort((a, b) => orden[a.dificultad] - orden[b.dificultad]);
  }

  return copia;
};

export const buscarPorTitulo = (lista: Tarea[], texto: string): Tarea[] => 
  lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));

export const actualizarTareaPorId = (lista: Tarea[], id: string, cambios: Partial<Tarea>): Tarea[] => 
  lista.map(t => t.id === id ? Object.freeze({ ...t, ...cambios, ultimaEdicion: new Date() }) : t);

export const obtenerEstadisticas = (tareas: Tarea[]) => {
  const total = tareas.length;
  const porEstado = { 'Pendiente': 0, 'En Curso': 0, 'Terminada': 0, 'Cancelada': 0 };
  const porDificultad = { 'Fácil': 0, 'Medio': 0, 'Difícil': 0 };

  tareas.forEach(t => {
    porEstado[t.estado]++;
    porDificultad[t.dificultad]++;
  });

  return { total, porEstado, porDificultad };
};

export const tareasVencidas = (tareas: Tarea[]): Tarea[] => 
  tareas.filter(t => t.vencimiento && t.vencimiento < new Date());

export const tareasPrioridadAlta = (tareas: Tarea[]): Tarea[] => 
  tareas.filter(t => t.dificultad === 'Difícil');

export const tareasRelacionadas = (tareas: Tarea[], id: string): Tarea[] => 
  tareas.filter(t => t.relacionadas?.includes(id));