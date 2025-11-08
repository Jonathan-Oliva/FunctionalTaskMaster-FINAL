import { crearTarea } from './tarea.js';
export const agregarTarea = (lista, titulo, desc = '', venc = null, dif = 1) => {
    const nueva = crearTarea(titulo, desc, venc, dif);
    return [...lista, nueva];
};
export const filtrarTareas = (lista, filtro = 'todas') => {
    const f = filtro.toLowerCase();
    return lista.filter(t => f === 'todas' || t.estado.toLowerCase() === f);
};
export const ordenarTareas = (lista, criterio) => {
    const copia = [...lista];
    if (criterio === 'titulo')
        return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    if (criterio === 'vencimiento')
        return copia.sort((a, b) => 
        // CAMBIO: Usamos getTime() para comparar fechas de forma segura
        (!a.vencimiento ? 1 : !b.vencimiento ? -1 : a.vencimiento.getTime() - b.vencimiento.getTime()));
    if (criterio === 'creacion')
        return copia.sort((a, b) => a.creacion.getTime() - b.creacion.getTime());
    return copia;
};
export const buscarPorTitulo = (lista, texto) => lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));
// CAMBIO: Usamos Partial<Tarea> para el objeto de cambios
export const actualizarTareaPorId = (lista, id, cambios) => lista.map(t => t.id === id ? Object.freeze({ ...t, ...cambios, ultimaEdicion: new Date() }) : t);
//# sourceMappingURL=todoList.js.map