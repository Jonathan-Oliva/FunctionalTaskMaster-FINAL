import prompt from 'prompt';
import { actualizarTareaPorId } from './todoList.js';
import { parseFecha } from './utils.js';
import type{ Tarea, EstadoApp } from './types.js'; 


export const menuDetallesTarea = async (estado: EstadoApp, tareaId: string) => {
  let { tareas, guardar } = estado;

  const tarea = tareas.find((t: Tarea) => t.id === tareaId);
  if (!tarea) return { tareas, guardar };

  console.clear();
  console.log(`\nTAREA: "${tarea.titulo}"\n`);
  console.log('[1] Cambiar Estado');
  console.log('[2] Editar Vencimiento');
  console.log('[3] Editar Descripción');
  console.log('[4] Editar Dificultad');
  console.log('[0] Volver');

const { opcion } = await prompt.get(['opcion']);
  if (opcion === '0') return { tareas, guardar };

let cambios: Partial<Tarea> = {};
  if (opcion === '1') {
    const { est } = await prompt.get(['Nuevo estado (P/E/T/C)']);
    const codigo = (est as string)?.trim().toUpperCase();

    const mapa: { [key: string]: any } = { P: 'Pendiente', E: 'En Curso', T: 'Terminada', C: 'Cancelada' };
    cambios.estado = codigo && mapa[codigo] || tarea.estado;
  }
  if (opcion === '2') {
    const { fecha } = await prompt.get(['Nueva fecha (D-M-YYYY o 0 para eliminar)']);
    cambios.vencimiento = fecha === '0' ? null : parseFecha(fecha);
  }
  if (opcion === '3') {
    const { desc } = await prompt.get(['Nueva descripción']);
    cambios.descripcion = (desc as string)?.substring(0, 500) || ''; // Fix
  }
  if (opcion === '4') {
    const { dif } = await prompt.get(['Dificultad (1/2/3)']);
    const d = parseInt(dif as string);
    // Agregamos 'index signature' al mapa
    const mapa: { [key: number]: any } = { 1: 'Fácil', 2: 'Medio', 3: 'Difícil' };
    cambios.dificultad = mapa[d] || tarea.dificultad;
  }

  tareas = actualizarTareaPorId(tareas, tareaId, cambios);
  console.log('Actualizado.\n');
await prompt.get(['enter']);

return { tareas, guardar };
};