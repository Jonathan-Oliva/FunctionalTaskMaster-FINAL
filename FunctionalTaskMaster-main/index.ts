import { menuPrincipal } from './menu.ts';
import { crearTarea } from './tarea.ts';
import { iniciarConPersistencia, guardarEnArchivo } from './persistencia.ts';
import type { Tarea } from './types.ts';

const RUTA_DATOS = 'tareas.json';

const guardar = async (tareas: Tarea[]): Promise<void> => {
  await guardarEnArchivo(RUTA_DATOS)(tareas);
};

const ejecutarApp = async () => {
  try {
    const tareasDemo: Tarea[] = [
      crearTarea("Aprender HTML", "Primer paso en desarrollo web", null, 2),
      crearTarea("Aprender CSS", "Para estilos y diseño", null, 1),
      crearTarea("Aprender JavaScript", "Para lógica y dinámicas", null, 3),
      crearTarea("Aprender React", "Para interfaces interactivas", null, 3),
      crearTarea("Revisar roadmap.sh", "Roadmap actualizado", null, 2),
    ];

    const tareas = await iniciarConPersistencia(RUTA_DATOS, tareasDemo);
    const { tareas: finales } = await menuPrincipal({ tareas, guardar });

    await guardar(finales);
    console.log(`¡Adiós! Tareas guardadas en ${RUTA_DATOS}`);
  } catch (error: any) {
    console.error('Error crítico:', error.message);
    process.exit(1);
  }
};

ejecutarApp();
