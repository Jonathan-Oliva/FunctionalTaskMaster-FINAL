import prompt from 'prompt';
import { filtrarTareas, ordenarTareas } from './todoList.js';
import { mostrarListado } from './mostrarListado.js';
import type { EstadoApp } from './types.js'; 

export const menuVerMisTareas = async (estado: EstadoApp) => {
  console.clear();
  console.log(`
¿Qué tareas deseas ver?

[1] Todas
[2] Pendientes
[3] En curso
[4] Terminadas
[5] Canceladas
[0] Volver
  `);
  const { opcion } = await prompt.get(['opcion']);
  if (opcion === '0') return estado;

  const filtros: { [key: string]: string } = { '1': 'todas', '2': 'pendiente', '3': 'en curso', '4': 'terminada', '5': 'cancelada' };
  const filtro = filtros[opcion as string] || 'todas';

  console.log('\n¿Ordenar? [1] A-Z [2] Vencimiento [3] Creación [4] Dificultad [0] No');
  const { orden } = await prompt.get(['orden']);

  const ordenTipo: { [key: string]: string } = { 
    '1': 'titulo', 
    '2': 'vencimiento', 
    '3': 'creacion',
    '4': 'dificultad' 
  };
  const ordenFinal = ordenTipo[orden as string] || null;

  return await mostrarListado(estado, filtro, ordenFinal);
};