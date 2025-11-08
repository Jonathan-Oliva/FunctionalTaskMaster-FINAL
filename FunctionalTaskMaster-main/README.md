# Functional Task Master

**Gestor de tareas funcional en consola**  
Hecho con **TypeScript**, **inmutabilidad** y **persistencia JSON**.

---

## Características

- **Menú interactivo** con estadísticas en tiempo real
- **Filtros** por estado (todas, pendientes, en curso, terminadas, canceladas)
- **Ordenamiento** por título, vencimiento, creación o dificultad
- **Búsqueda** por título con coincidencia parcial
- **Edición completa** de tareas (título, descripción, estado, fecha, dificultad)
- **Persistencia automática** en `tareas.json`
- **Datos de ejemplo** si no existe archivo
- **Validaciones robustas** y UX clara
- **Tareas vencidas marcadas en rojo**
- **Emojis decorativos** para dificultad
- **ID único con UUID**
- **Eliminación física**
- **Estadísticas**: total, por estado, por dificultad
- **Consultas avanzadas**: tareas vencidas, prioridad alta

---

## Tecnologías

| Tecnología | Uso |
|----------|-----|
| **TypeScript** | Tipado fuerte, inmutabilidad |
| **Node.js** | Entorno de ejecución |
| **prompt** | Entrada interactiva |
| **fs/promises** | Persistencia JSON |
| **tsx** | Ejecución directa de `.ts` |

---

## Paradigmas Aplicados

| Paradigma | Aplicación |
|---------|-----------|
| **Funcional** | Inmutabilidad, funciones puras, currificación, composición |
| **Estructurada** | Modularización, nombres claros, validaciones |
| **Orientada a Objetos** | Modelado de `Tarea` como interfaz (no clases) |
| **Lógica** | Predicados declarativos (`filtrarTareas`) |

---

## Trabajo Practico

| **Asignatura:** | Paradigma de Programacion
| **Cátedra:** | [Walter Molina]  
| **Institución:** | Universidad Nacional de Villa Mercedes (UNVIME)  
| **Año:** | 2025  
| **Alumno:** | Alvaro Tomas Silvera, Jonathan Oliva, Luka Mercado

## Instalación

```bash
git clone <tu-repo>
cd FunctionalTaskMaster-main
npm install
(Ejecucion) npm run start

---

