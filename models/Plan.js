export class Plan {
  constructor(datos) { Object.assign(this, datos); }
  static validar(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.length < 3) errores.push('Nombre del plan inválido');
    if (!datos.duracion_meses || datos.duracion_meses < 1) errores.push('Duración debe ser mayor a 0');
    if (!['principiante', 'intermedio', 'avanzado'].includes(datos.nivel)) errores.push('Nivel inválido');
    if (!datos.precio || datos.precio <= 0) errores.push('Precio debe ser mayor a 0');
    return errores;
  }
}
