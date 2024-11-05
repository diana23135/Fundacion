
export function isDate(value) {
    // Expresión regular para el formato ISO 8601: YYYY-MM-DDTHH:MM:SS.sssZ
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return isoDatePattern.test(value);
}


export function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const day = String(d.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`; // Formato YYYY-MM-DD
}

