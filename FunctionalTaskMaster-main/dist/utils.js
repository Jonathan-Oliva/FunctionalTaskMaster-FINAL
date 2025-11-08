export const parseFecha = (fecha) => {
    if (!fecha || fecha === '0')
        return null;
    const partes = fecha.split(/[-/]/);
    if (partes.length !== 3)
        return null;
    // <-- CAMBIO: Parseamos de forma segura para evitar 'undefined'
    const [dStr, mStr, aStr] = partes;
    const d = parseInt(dStr || '', 10);
    const m = parseInt(mStr || '', 10);
    const a = parseInt(aStr || '', 10);
    if (isNaN(d) || isNaN(m) || isNaN(a))
        return null;
    const date = new Date(a, m - 1, d);
    return date.getFullYear() === a && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
};
//# sourceMappingURL=utils.js.map