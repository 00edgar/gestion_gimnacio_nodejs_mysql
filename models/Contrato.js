export class Contrato {
  constructor(datos) { Object.assign(this, datos); }
  static validar(datos) {
    const errores = [];
    if (!datos.cliente_id) errores.push('Cliente requerido');
    if (!datos.plan_id) errores.push('Plan requerido');
    if (!datos.fecha_inicio || !datos.fecha_fin) errores.push('Fechas requeridas');
    if (!datos.precio || datos.precio <= 0) errores.push('Precio inválido');
    return errores;
  }
}
