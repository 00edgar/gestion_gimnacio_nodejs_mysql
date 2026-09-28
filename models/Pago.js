export class Pago {
  constructor(datos) { Object.assign(this, datos); }
  static validar(datos) {
    const errores = [];
    if (!datos.cliente_id) errores.push('Cliente requerido');
    if (!datos.monto || datos.monto <= 0) errores.push('Monto debe ser mayor a 0');
    if (!['mensualidad', 'sesion_individual', 'otro_ingreso'].includes(datos.tipo)) errores.push('Tipo inválido');
    if (!datos.fecha_pago) errores.push('Fecha requerida');
    return errores;
  }
}
