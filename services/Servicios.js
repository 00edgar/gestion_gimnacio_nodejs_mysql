import { Repositorio } from '../repositories/Repositorio.js';
import { Cliente } from '../models/Cliente.js';
import { Plan } from '../models/Plan.js';
import { Pago } from '../models/Pago.js';
import { Egreso } from '../models/Egreso.js';
import dayjs from 'dayjs';

export class Servicios {

  // ==================== CLIENTES ====================
  static async crearCliente(datos) {
    const errores = Cliente.validar(datos);
    if (errores.length) throw new Error(errores.join(' | '));
    return await Repositorio.crearCliente(datos);
  }
  static async listarClientes() { return await Repositorio.listarClientes(); }
  static async obtenerCliente(id) { return await Repositorio.obtenerCliente(id); }
  static async actualizarCliente(id, datos) { return await Repositorio.actualizarCliente(id, datos); }
  static async eliminarCliente(id) { return await Repositorio.eliminarCliente(id); }

  // ==================== PLANES ====================
  static async crearPlan(datos) {
    const errores = Plan.validar(datos);
    if (errores.length) throw new Error(errores.join(' | '));
    return await Repositorio.crearPlan(datos);
  }
  static async listarPlanes() { return await Repositorio.listarPlanes(); }
  static async obtenerPlan(id) { return await Repositorio.obtenerPlan(id); }

  // ==================== CONTRATOS ====================
  static async asignarPlanAcliente(clienteId, planId, condiciones) {
    if (!condiciones) condiciones = '';
    const plan = await this.obtenerPlan(planId);
    if (!plan) throw new Error('Plan no encontrado');
    const cliente = await this.obtenerCliente(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    const fecha_inicio = dayjs().format('YYYY-MM-DD');
    const fecha_fin = dayjs().add(plan.duracion_meses, 'month').format('YYYY-MM-DD');
    return await Repositorio.crearContrato({ cliente_id: clienteId, plan_id: planId, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, precio: plan.precio, condiciones: condiciones });
  }
  static async listarContratos() { return await Repositorio.listarContratos(); }
  static async cancelarContrato(id) {
    await Repositorio.transaccion(async function(conn) {
      const [contrato] = await conn.execute('SELECT * FROM contratos WHERE id = ?', [id]);
      if (!contrato) throw new Error('Contrato no encontrado');
      await conn.execute('DELETE FROM registros_progreso WHERE contrato_id = ?', [id]);
      await conn.execute('UPDATE contratos SET estado = ? WHERE id = ?', ['cancelado', id]);
    });
  }
  static async finalizarContrato(id) { await Repositorio.actualizarEstadoContrato(id, 'finalizado'); }

  // ==================== PAGOS ====================
  static async registrarPago(datos) {
    const errores = Pago.validar(datos);
    if (errores.length) throw new Error(errores.join(' | '));
    return await Repositorio.registrarPago(datos);
  }
  static async listarPagos() { return await Repositorio.listarPagos(); }
  static async balancePorFecha(inicio, fin) { return await Repositorio.balancePorFecha(inicio, fin); }

  // ==================== EGRESOS ====================
  static async registrarEgreso(datos) {
    const errores = Egreso.validar(datos);
    if (errores.length) throw new Error(errores.join(' | '));
    return await Repositorio.registrarEgreso(datos);
  }
  static async listarEgresos() { return await Repositorio.listarEgresos(); }

// =====================valance por mes ===============================000
static async balanceMensual(mes) { return await Repositorio.balanceMensual(mes); }

  // ==================== PROGRESO ====================
  static async registrarProgreso(datos) { return await Repositorio.registrarProgreso(datos); }
  static async listarProgreso(id) { return await Repositorio.listarProgreso(id); }
  static async eliminarProgreso(id) { return await Repositorio.eliminarProgreso(id); }
}
