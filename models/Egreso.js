export class Egreso {
  constructor(datos) { Object.assign(this, datos); }
  static validar(datos) {
    const errores = [];
    if (!datos.monto || datos.monto <= 0) errores.push('Monto debe ser mayor a 0');
    if (!['suplementos', 'equipos', 'servicios', 'servicios_publicos', 'otros'].includes(datos.categoria)) errores.push('Categoría inválida');
    if (!datos.descripcion) errores.push('Descripción requerida');
    if (!datos.fecha_egreso) errores.push('Fecha requerida');
    return errores;
  }
}
