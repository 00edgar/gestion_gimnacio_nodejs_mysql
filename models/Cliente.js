export class Cliente {
  constructor(datos) { Object.assign(this, datos); }
  static validar(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.length < 3) errores.push('Nombre inválido (mín 3 caracteres)');
    if (!datos.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) errores.push('Correo inválido');
    if (!datos.telefono || !/^\d{7,15}$/.test(datos.telefono)) errores.push('Teléfono inválido (solo dígitos)');
    return errores;
  }
}
