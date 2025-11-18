import prompt from 'prompt';
import { menuVerMisTareas } from './menuVerMisTareas.ts';
import { menuBuscarTarea } from './menuBuscarTarea.ts';
import { crearTarea, cambiarEstado } from './tarea.ts';
import { parseFecha } from './utils.ts';
import { obtenerEstadisticas } from './todoList.ts'; 
import type { Tarea, EstadoApp } from './types.ts';

prompt.start();

export const menuPrincipal = async (estado: EstadoApp) => {
  let { tareas, guardar } = estado;

  while (true) {
    console.clear();
    
    const stats = obtenerEstadisticas(tareas);
    console.log(`
=== GESTOR DE TAREAS ===
Tareas: ${stats.total} | Pendientes: ${stats.porEstado.Pendiente} | En curso: ${stats.porEstado['En Curso']} | Terminadas: ${stats.porEstado.Terminada} | Canceladas: ${stats.porEstado.Cancelada}

[1] Ver Mis Tareas
[2] Buscar una Tarea
[3] Agregar una Tarea
[4] Eliminar una Tarea
[0] Salir
    `);

    const { opcion } = await prompt.get({
      properties: { opcion: { required: true } }
    }) as { opcion: string };

    if (opcion === '0') {
      await guardar(tareas);
      break;
    }

    if (opcion === '1') {
      const result = await menuVerMisTareas({ tareas, guardar });
      tareas = result.tareas;
      continue;
    }

    if (opcion === '2') {
      const resultado = await menuBuscarTarea({ tareas, guardar });
      tareas = resultado.tareas;
      guardar = resultado.guardar;
      continue;
    }

    if (opcion === '3') {
      console.log('=== AGREGAR TAREA ===\n');

      let titulo = '';
      while (!titulo.trim()) {
        const { value } = await prompt.get({
          properties: { value: { description: 'Título (obligatorio)', required: true } }
        }) as { value: string };
        titulo = value.trim();
        if (!titulo) console.log('Error: El título no puede estar vacío.\n');
      }

      const { desc } = await prompt.get({
        properties: { desc: { description: 'Descripción (opcional)', required: false } }
      }) as { desc: string };

      const { fecha } = await prompt.get({
        properties: { fecha: { description: 'Vencimiento (D-M-AAAA o 0 para eliminar)', required: false } }
      }) as { fecha: string };

      let dificultad = 1;
      while (true) {
        const { value } = await prompt.get({
          properties: { value: { description: 'Dificultad (1=Fácil, 2=Medio, 3=Difícil)' } }
        }) as { value: string };
        const d = parseInt(value, 10);
        if (d >= 1 && d <= 3) {
          dificultad = d;
          break;
        }
        console.log('Dificultad inválida. Usa 1, 2 o 3.\n');
      }

      const { est } = await prompt.get({
        properties: { est: { description: 'Estado (P=E/T/C)', required: false } }
      }) as { est: string };

      try {
        const nueva = crearTarea(titulo, desc || '', parseFecha(fecha), dificultad);
        const tareaFinal = est?.trim() ? cambiarEstado(nueva, est.trim().toUpperCase()) : nueva;
        tareas = [...tareas, tareaFinal];
        console.log('\nTarea creada con éxito!\n');
      } catch (error: any) {
        console.log(`\nError: ${error.message}\n`);
      }
      await prompt.get(['enter']);
    }

    if (opcion === '4') {
      if (tareas.length === 0) {
        console.log('No hay tareas para eliminar.\n');
        await prompt.get(['enter']);
        continue;
      }

      console.log('=== ELIMINAR TAREA ===\n');
      tareas.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo} (ID: ${t.id})`));
      console.log('\nEscribe el número o [0] para cancelar');
      const { num } = await prompt.get({
        properties: { num: { required: true } }
      }) as { num: string };
      const n = parseInt(num.trim());

      if (n === 0 || isNaN(n)) {
        console.log('Eliminación cancelada.\n');
        await prompt.get(['enter']);
        continue;
      }

      if (n > 0 && n <= tareas.length) {
        tareas = tareas.filter((_, i) => i !== n - 1);
        console.log(`\nTarea eliminada.\n`);
      } else {
        console.log('Número inválido.\n');
      }
      await prompt.get(['enter']);
    }
  }

  return { tareas };
};