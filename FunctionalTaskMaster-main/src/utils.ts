// EN ESTE ARCHIVO DEFINIMOS FUNCIONES UTILITARIAS GENÉRICAS
// → Funciones para parsear fechas y otros datos comunes en la aplicación.
export const parseFecha = (fecha: any): Date | null => {
  if (!fecha || fecha === '0') return null;
  const partes = (fecha as string).split(/[-/]/);
  if (partes.length !== 3) return null;

  const [dStr, mStr, aStr] = partes;
  const d = parseInt(dStr || '', 10);
  const m = parseInt(mStr || '', 10);
  const a = parseInt(aStr || '', 10);

  if (isNaN(d) || isNaN(m) || isNaN(a)) return null;
  const date = new Date(a, m - 1, d);
  return date.getFullYear() === a && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
};