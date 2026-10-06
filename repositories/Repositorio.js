import db from '../config/db.js';
import { Cliente } from '../models/Cliente.js';
import { Plan } from '../models/Plan.js';
import { Contrato } from '../models/Contrato.js';
import { Pago } from '../models/Pago.js';
import { Egreso } from '../models/Egreso.js';

export class Repositorio {

  static factory(tipo, datos) {
    const mapa = { cliente: Cliente, plan: Plan, contrato: Contrato, pago: Pago, egreso: Egreso };
    const Clase = mapa[tipo];
    if (!Clase) throw new Error('Tipo ' + tipo + ' no soportado');
    return new Clase(datos);
  }

  static async ejecutar(sql, params) {
    if (!params) params = [];
    const [filas] = await db.execute(sql, params);
    return filas;
  }

  static async transaccion(callback) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const resultado = await callback(conn);
      await conn.commit();
      return resultado;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // ==================== CLIENTES ====================
  static async crearCliente(datos) {
    const sql = 'INSERT INTO clientes (nombre, correo, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
    const resultado = await this.ejecutar(sql, [datos.nombre, datos.correo, datos.telefono, datos.direccion, datos.fecha_nacimiento]);
    return this.factory('cliente', Object.assign({ id: resultado.insertId }, datos));
  }

  static async listarClientes() {
    return await this.ejecutar('SELECT * FROM clientes ORDER BY nombre');
  }

  static async obtenerCliente(id) {
    const filas = await this.ejecutar('SELECT * FROM clientes WHERE id = ?', [id]);
    return filas[0];
  }

  static async actualizarCliente(id, datos) {
    await this.ejecutar('UPDATE clientes SET nombre=?, correo=?, telefono=?, direccion=? WHERE id=?', [datos.nombre, datos.correo, datos.telefono, datos.direccion, id]);
  }

  static async eliminarCliente(id) {
    await this.ejecutar('DELETE FROM clientes WHERE id = ?', [id]);
  }

  // ==================== PLANES ====================
  static async crearPlan(datos) {
    const sql = 'INSERT INTO planes_entrenamiento (nombre, descripcion, duracion_meses, meta, nivel, precio) VALUES (?, ?, ?, ?, ?, ?)';
    const resultado = await this.ejecutar(sql, [datos.nombre, datos.descripcion, datos.duracion_meses, datos.meta, datos.nivel, datos.precio]);
    return this.factory('plan', Object.assign({ id: resultado.insertId }, datos));
  }

  static async listarPlanes() {
    return await this.ejecutar('SELECT * FROM planes_entrenamiento WHERE esta_activo = 1');
  }

  static async obtenerPlan(id) {
    const filas = await this.ejecutar('SELECT * FROM planes_entrenamiento WHERE id = ?', [id]);
    return filas[0];
  }

  // ==================== CONTRATOS ====================
  static async crearContrato(datos) {
    return await this.transaccion(async function(conn) {
      const sql = 'INSERT INTO contratos (cliente_id, plan_id, fecha_inicio, fecha_fin, precio, condiciones) VALUES (?, ?, ?, ?, ?, ?)';
      const [resultado] = await conn.execute(sql, [datos.cliente_id, datos.plan_id, datos.fecha_inicio, datos.fecha_fin, datos.precio, datos.condiciones]);
      return new Contrato(Object.assign({ id: resultado.insertId }, datos));
    });
  }

  static async listarContratos() {
    const sql = 'SELECT c.*, cl.nombre AS cliente, p.nombre AS plan FROM contratos c JOIN clientes cl ON c.cliente_id = cl.id JOIN planes_entrenamiento p ON c.plan_id = p.id ORDER BY c.fecha_inicio DESC';
    return await this.ejecutar(sql);
  }

  static async actualizarEstadoContrato(id, estado) {
    await this.ejecutar('UPDATE contratos SET estado = ? WHERE id = ?', [estado, id]);
  }

  // ==================== PAGOS ====================
  static async registrarPago(datos) {
    return await this.transaccion(async function(conn) {
      const sql = 'INSERT INTO pagos (cliente_id, contrato_id, monto, tipo, descripcion, fecha_pago, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const [resultado] = await conn.execute(sql, [datos.cliente_id, datos.contrato_id, datos.monto, datos.tipo, datos.descripcion, datos.fecha_pago, datos.metodo_pago]);
      return new Pago(Object.assign({ id: resultado.insertId }, datos));
    });
  }

  static async listarPagos() {
    return await this.ejecutar('SELECT * FROM pagos ORDER BY fecha_pago DESC');
  }

  static async balancePorFecha(inicio, fin) {
    const ingresos = await this.ejecutar('SELECT COALESCE(SUM(monto),0) AS total FROM pagos WHERE fecha_pago BETWEEN ? AND ?', [inicio, fin]);
    const egresos = await this.ejecutar('SELECT COALESCE(SUM(monto),0) AS total FROM egresos WHERE fecha_egreso BETWEEN ? AND ?', [inicio, fin]);
    return { ingresos: ingresos[0].total, egresos: egresos[0].total, balance: ingresos[0].total - egresos[0].total };
  }


  // ==================== EGRESOS ====================
  static async registrarEgreso(datos) {
    const sql = 'INSERT INTO egresos (cliente_id, contrato_id, monto, categoria, descripcion, fecha_egreso) VALUES (?, ?, ?, ?, ?, ?)';
    const resultado = await this.ejecutar(sql, [datos.cliente_id || null, datos.contrato_id || null, datos.monto, datos.categoria, datos.descripcion, datos.fecha_egreso]);
    return this.factory('egreso', Object.assign({ id: resultado.insertId }, datos));
  }

  static async listarEgresos() {
    return await this.ejecutar('SELECT * FROM egresos ORDER BY fecha_egreso DESC');
  }

  // ==================== Balance Mensual===============
  static async balanceMensual(mes) {
    const ingresos = await this.ejecutar(
      'SELECT COALESCE(SUM(monto), 0) AS total FROM pagos WHERE MONTH(fecha_pago) = ?',
      [mes]
    );
    const egresos = await this.ejecutar(
      'SELECT COALESCE(SUM(monto), 0) AS total FROM egresos WHERE MONTH(fecha_egreso) = ?',
      [mes]
    );
    return {
      ingresos: ingresos[0].total,
      egresos: egresos[0].total,
      balance: ingresos[0].total - egresos[0].total
    };
  }


  // ==================== PROGRESO ====================
  static async registrarProgreso(datos) {
    const sql = 'INSERT INTO registros_progreso (cliente_id, contrato_id, fecha_registro, peso, grasa_corporal, pecho, cintura, cadera, brazos, piernas, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await this.ejecutar(sql, [datos.cliente_id, datos.contrato_id, datos.fecha_registro, datos.peso, datos.grasa_corporal, datos.pecho, datos.cintura, datos.cadera, datos.brazos, datos.piernas, datos.comentarios]);
  }

  static async listarProgreso(clienteId) {
    return await this.ejecutar('SELECT * FROM registros_progreso WHERE cliente_id = ? ORDER BY fecha_registro', [clienteId]);
  }

  static async eliminarProgreso(id) {
    await this.ejecutar('DELETE FROM registros_progreso WHERE id = ?', [id]);
  }
}
