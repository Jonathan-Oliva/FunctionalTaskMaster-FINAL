// MÓDULO: VISOR + EDITOR PRINCIPAL DE TAREAS
// Recibe tareas filtradas/ordenadas, las muestra con estilo y permite:
// → Seleccionar una tarea
// → Ver detalles completos
// → Editar cualquier campo
// Todo con inmutabilidad, persistencia y UX profesional.

import prompt from 'prompt';
import { filtrarTareas, ordenarTareas, actualizarTareaPorId } from './todoList.ts';
import { parseFecha } from './utils.ts';
import type { Tarea, EstadoApp, Estado, Dificultad } from './types.ts';

export const mostrarListado = async (estado: EstadoApp, filtro: string, orden: string | null) => {
  let { tareas, guardar } = estado;
  let tareasFiltradas = filtrarTareas(tareas, filtro);
  tareasFiltradas = ordenarTareas(tareasFiltradas, orden);

  console.clear();
  console.log(`\nTAREAS (${filtro.toUpperCase()}) - ${tareasFiltradas.length}\n`);

  if (tareasFiltradas.length === 0) {
    console.log('No hay tareas.\n');
    await prompt.get(['enter']);
    return { tareas, guardar };
  }

  const hoy = new Date();
  tareasFiltradas.forEach((t, i) => {
    const esVencida = t.vencimiento && t.vencimiento < hoy;
    const vencimiento = t.vencimiento 
      ? `${t.vencimiento.toLocaleDateString()}${esVencida ? ' \x1b[31m(VENCIDA)\x1b[0m' : ''}` 
      : 'Sin vencimiento';
    console.log(`[${i + 1}] ${t.titulo} [${t.estado}] - ${vencimiento}`);
  });

  console.log('\nSelecciona una tarea por número o [0] para volver');
  const { num } = await prompt.get({
    properties: { num: { required: true } }
  }) as { num: string };
  const n = parseInt(num.trim());

  if (n === 0 || isNaN(n)) return { tareas, guardar };

  if (n > 0 && n <= tareasFiltradas.length) {
    const tareaSeleccionada = tareasFiltradas[n - 1];
    if (!tareaSeleccionada) {
      console.log('Índice inválido.');
      await prompt.get(['enter']);
      return { tareas, guardar };
    }

    let tareaOriginal = tareaSeleccionada;

    const mostrarDetalle = () => {
      console.clear();
      console.log('=== DETALLE DE TAREA ===\n');
      console.log(`ID: ${tareaOriginal.id}`);
      console.log(`Título: ${tareaOriginal.titulo}`);
      console.log(`Descripción: ${tareaOriginal.descripcion || '(Sin descripción)'}`);
      console.log(`Estado: ${tareaOriginal.estado}`);
      console.log(`Creación: ${tareaOriginal.creacion.toLocaleString()}`);
      console.log(`Última edición: ${tareaOriginal.ultimaEdicion.toLocaleString()}`);
      
      const vencimiento = tareaOriginal.vencimiento 
        ? tareaOriginal.vencimiento.toLocaleDateString() 
        : 'No definido';
      const esVencida = tareaOriginal.vencimiento && tareaOriginal.vencimiento < new Date();
      console.log(`Vencimiento: ${vencimiento}${esVencida ? ' \x1b[31m(VENCIDA)\x1b[0m' : ''}`);
      
      const emojis = { 'Fácil': '★☆☆', 'Medio': '★★☆', 'Difícil': '★★★' };
      console.log(`Dificultad: ${tareaOriginal.dificultad} ${emojis[tareaOriginal.dificultad]}\n`);
    };

    mostrarDetalle();
    
    while (true) {
      console.log('[1] Editar Título');
      console.log('[2] Editar Descripción');
      console.log('[3] Editar Estado');
      console.log('[4] Editar Vencimiento');
      console.log('[5] Editar Dificultad');
      console.log('[0] Volver al listado');

      const { opcion } = await prompt.get({
        properties: { opcion: { required: true } }
      }) as { opcion: string };

      if (opcion === '0') break;

      let cambios: Partial<Tarea> = {};
      const ahora = new Date();

      if (opcion === '1') {
        const { titulo } = await prompt.get({
          properties: { titulo: { description: 'Nuevo título' } }
        }) as { titulo: string };
        if (titulo.trim()) cambios.titulo = titulo.trim();
      }
      if (opcion === '2') {
        const { desc } = await prompt.get({
          properties: { desc: { description: 'Nueva descripción' } }
        }) as { desc: string };
        cambios.descripcion = (desc || '').substring(0, 500);
      }
      if (opcion === '3') {
        const { est } = await prompt.get({
          properties: { est: { description: 'Estado (P/E/T/C)' } }
        }) as { est: string };
        const codigo = est.trim().toUpperCase();
        const mapa: Record<string, Estado> = { P: 'Pendiente', E: 'En Curso', T: 'Terminada', C: 'Cancelada' };
        if (mapa[codigo]) cambios.estado = mapa[codigo];
      }
      if (opcion === '4') {
        const { fecha } = await prompt.get({
          properties: { fecha: { description: 'Vencimiento (D-M-AAAA o 0)' } }
        }) as { fecha: string };
        cambios.vencimiento = fecha === '0' ? null : parseFecha(fecha);
      }
      if (opcion === '5') {
        const { dif } = await prompt.get({
          properties: { dif: { description: 'Dificultad (1/2/3)' } }
        }) as { dif: string };
        const d = parseInt(dif, 10);
        if (d >= 1 && d <= 3) {
          cambios.dificultad = { 1: 'Fácil', 2: 'Medio', 3: 'Difícil' }[d as 1|2|3] as Dificultad;
        }
      }

      if (Object.keys(cambios).length > 0) {
        cambios.ultimaEdicion = ahora;
        tareas = actualizarTareaPorId(tareas, tareaOriginal.id, cambios);

        const actualizada = tareas.find(t => t.id === tareaOriginal.id);
        if (actualizada) {
          tareaOriginal = actualizada;
        }

        console.log('Cambios guardados.\n');
        await prompt.get(['enter']);
        mostrarDetalle();
      }
    }
  } else {
    console.log('Número inválido.');
    await prompt.get(['enter']);
  }

  return { tareas, guardar };
};