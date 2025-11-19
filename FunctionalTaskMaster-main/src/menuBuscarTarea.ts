// MÓDULO: BÚSQUEDA Y EDICIÓN DE TAREAS POR TÍTULO
// Permite buscar tareas por texto y editar una sola tarea seleccionada.
// Usa un "estado temporal" para reutilizar mostrarListado() sin afectar la lista completa.

import prompt from 'prompt';
import { buscarPorTitulo } from './todoList.ts';
import { mostrarListado } from './mostrarListado.ts';
import type { EstadoApp, Tarea } from './types.ts';

export const menuBuscarTarea = async (estado: EstadoApp): Promise<EstadoApp> => {
  let { tareas, guardar } = estado;

  console.clear();
  console.log('=== BUSCAR UNA TAREA ===\n');
// Solicita el texto de búsqueda al usuario
  const { texto } = await prompt.get({
    properties: { texto: { description: 'Texto a buscar' } }
  }) as { texto: string };

  if (!texto?.trim()) {
    console.log('Debe ingresar un texto para buscar.\n');
    await prompt.get(['enter']);
    return { tareas, guardar };
  }

  const resultados = buscarPorTitulo(tareas, texto.trim());

  if (resultados.length === 0) { // Valida si no hay resultados
    console.log('No se encontraron tareas.\n');
    await prompt.get(['enter']);
    return { tareas, guardar };
  }

  console.log(`\nResultados (${resultados.length})\n`);
  resultados.forEach((t, i) => {
    const vencimiento = t.vencimiento ? t.vencimiento.toLocaleDateString() : 'Sin vencimiento';
    console.log(`[${i + 1}] ${t.titulo} [${t.estado}] - ${vencimiento}`);
  });

  console.log('\nSelecciona una tarea por número o [0] para volver');
  const { num } = await prompt.get({
    properties: { num: { required: true } }
  }) as { num: string };
  const n = parseInt(num.trim(), 10);

  if (n === 0 || isNaN(n)) return { tareas, guardar };

  if (n > 0 && n <= resultados.length) {
    const tareaSeleccionada = resultados[n - 1];

    if (!tareaSeleccionada) {
      console.log('Tarea no encontrada.');
      await prompt.get(['enter']);
      return { tareas, guardar };
    }

    const estadoTemporal: EstadoApp = {
      tareas: [tareaSeleccionada],
      guardar: async (tareasActualizadas: Tarea[]) => {
        const tareaEditada = tareasActualizadas[0]!;
        const nuevasTareas = tareas.map(t =>
          t.id === tareaEditada.id ? tareaEditada : t
        );
        await guardar(nuevasTareas);
      }
    };

    const resultadoEdicion = await mostrarListado(estadoTemporal, 'todas', null);
    const tareaActualizada = resultadoEdicion.tareas[0]!;

    const tareasFinales = tareas.map(t =>
      t.id === tareaActualizada.id ? tareaActualizada : t
    );

    return { tareas: tareasFinales, guardar };
  }

  console.log('Número inválido.');
  await prompt.get(['enter']);
  return { tareas, guardar };
};
