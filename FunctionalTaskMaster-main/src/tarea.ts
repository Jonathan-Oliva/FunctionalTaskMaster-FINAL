import type { Tarea, Estado, Dificultad } from './types.ts';
// Definición de constantes para los estados y dificultades de las tareas
export const ESTADOS = Object.freeze({
  PENDIENTE: 'Pendiente',
  EN_CURSO: 'En Curso',
  TERMINADA: 'Terminada',
  CANCELADA: 'Cancelada',
});

export const DIFICULTADES = Object.freeze({
  FACIL: 'Fácil',
  MEDIO: 'Medio',
  DIFICIL: 'Difícil',
});
// Función para crear una nueva tarea con validaciones y valores predeterminados 
export const crearTarea = (
  titulo: string, 
  descripcion: string = '', 
  vencimiento: Date | null = null, 
  dificultad: number | string = 1
): Tarea => {
  if (!titulo || titulo.length > 100) throw new Error('Título obligatorio (máx 100 caracteres)');
  const ahora = new Date();
  const fechaVencimiento = vencimiento ? new Date(vencimiento) : null;
// Retorna un objeto tarea inmutable
  return Object.freeze({
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    descripcion: (descripcion || '').substring(0, 500),
    estado: ESTADOS.PENDIENTE as Estado, 
    creacion: ahora,
    ultimaEdicion: ahora,
    vencimiento: fechaVencimiento,
    dificultad: parsearDificultad(dificultad),
    relacionadas: [] // ← NUEVO
  });
};

// Función para parsear dificultad desde número o texto, si es 1/2/3 o 'Fácil', 'Medio', 'Difícil'
const parsearDificultad = (valor: number | string): Dificultad => {
  const mapa: { [key: number]: Dificultad } = { 1: 'Fácil', 2: 'Medio', 3: 'Difícil' };
  if (typeof valor === 'number') return mapa[valor] || 'Fácil';
  
  const v = (valor || '').toLowerCase().trim();
  if (['fácil', 'facil', 'f'].includes(v)) return 'Fácil';
  if (['medio', 'm'].includes(v)) return 'Medio';
  if (['difícil', 'dificil', 'd'].includes(v)) return 'Difícil';
  return 'Fácil';
};

export const cambiarEstado = (tarea: Tarea, codigo: string): Tarea => {
  const mapa: { [key: string]: Estado } = { P: 'Pendiente', E: 'En Curso', T: 'Terminada', C: 'Cancelada' };
  const nuevo = mapa[codigo.toUpperCase()];
  if (!nuevo) return tarea;
  return Object.freeze({ ...tarea, estado: nuevo, ultimaEdicion: new Date() });
};

// Función para mostrar los detalles de una tarea en formato de emojis y texto
export const mostrarDetalle = (tarea: Tarea): string => {
  const emojis: { [key: string]: string } = { 
    'Fácil': '★☆☆', 
    'Medio': '★★☆', 
    'Difícil': '★★★' 
  };
  const vencimiento = tarea.vencimiento 
    ? tarea.vencimiento.toLocaleDateString() 
    : 'No definido';
  const esVencida = tarea.vencimiento && tarea.vencimiento < new Date();
  return `
Título: ${tarea.titulo}
Descripción: ${tarea.descripcion || '(Sin descripción)'}
Creación: ${tarea.creacion.toLocaleString()}
Vencimiento: ${vencimiento}${esVencida ? ' (VENCIDA)' : ''}
Estado: ${tarea.estado}
Dificultad: ${tarea.dificultad} ${emojis[tarea.dificultad]}
Última edición: ${tarea.ultimaEdicion.toLocaleString()}
  `.trim();
};