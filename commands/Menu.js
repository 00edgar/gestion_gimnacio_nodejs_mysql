import inquirer from 'inquirer';
import chalk from 'chalk';
import { Servicios } from '../services/Servicios.js';
import { mostrar, error, exito, mostrarTabla } from '../utils/helpers.js';

export class Menu {
  constructor() {
    this.comandos = {
      '1': () => this.gestionClientes(),
      '2': () => this.gestionPlanes(),
      '3': () => this.gestionContratos(),
      '4': () => this.seguimientoFisico(),
      '5': () => this.gestionFinanciera(),
      '0': () => process.exit(0)
    };
  }

  async iniciar() {
    while (true) {
      console.clear();
      console.log(chalk.cyan.bold('\n=== GESTOR DE GIMNASIO ===\n'));
      console.log('1. Clientes');
      console.log('2. Planes de entrenamiento');
      console.log('3. Contratos');
      console.log('4. Seguimiento físico');
      console.log('5. Gestión financiera');
      console.log('0. Salir');
      const respuesta = await inquirer.prompt([{ type: 'input', name: 'op', message: 'Opción:' }]);
      if (this.comandos[respuesta.op]) await this.comandos[respuesta.op]();
      else mostrar('Opción inválida');
      await inquirer.prompt([{ type: 'input', name: 'x', message: 'Enter para continuar...' }]);
    }
  }

  // ==================== CLIENTES ====================
  async gestionClientes() {
    const resp = await inquirer.prompt([{
      type: 'list', name: 'accion', message: 'Clientes:',
      choices: ['Listar', 'Crear', 'Actualizar', 'Eliminar', 'Volver']
    }]);
    if (resp.accion === 'Listar') {
      const lista = await Servicios.listarClientes();
      if (!lista.length) return mostrar('Sin clientes registrados');
      const datos = lista.map(c => [c.id, c.nombre, c.correo, c.telefono]);
      mostrarTabla('LISTA DE CLIENTES', ['ID', 'Nombre', 'Correo', 'Teléfono'], datos);
    } else if (resp.accion === 'Crear') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'correo', message: 'Correo:' },
        { type: 'input', name: 'telefono', message: 'Teléfono:' },
        { type: 'input', name: 'direccion', message: 'Dirección:' },
        { type: 'input', name: 'fecha_nacimiento', message: 'Fecha nacimiento (YYYY-MM-DD):' }
      ]);
      await Servicios.crearCliente(datos);
      exito('Cliente creado');
    } else if (resp.accion === 'Actualizar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del cliente:' }]);
      const datos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'correo', message: 'Correo:' },
        { type: 'input', name: 'telefono', message: 'Teléfono:' },
        { type: 'input', name: 'direccion', message: 'Dirección:' }
      ]);
      await Servicios.actualizarCliente(id, datos);
      exito('Cliente actualizado');
    } else if (resp.accion === 'Eliminar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del cliente:' }]);
      await Servicios.eliminarCliente(id);
      exito('Cliente eliminado');
    }
  }

  // ==================== PLANES ====================
  async gestionPlanes() {
    const resp = await inquirer.prompt([{
      type: 'list', name: 'accion', message: 'Planes:',
      choices: ['Listar', 'Crear', 'Volver']
    }]);
    if (resp.accion === 'Listar') {
      const lista = await Servicios.listarPlanes();
      if (!lista.length) return mostrar('Sin planes registrados');
      const datos = lista.map(p => [p.id, p.nombre, p.nivel, '$' + p.precio, p.duracion_meses + ' meses']);
      mostrarTabla('PLANES DE ENTRENAMIENTO', ['ID', 'Nombre', 'Nivel', 'Precio', 'Duración'], datos);
    } else if (resp.accion === 'Crear') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre del plan:' },
        { type: 'input', name: 'descripcion', message: 'Descripción:' },
        { type: 'input', name: 'duracion_meses', message: 'Duración (meses):' },
        { type: 'input', name: 'meta', message: 'Meta:' },
        { type: 'list', name: 'nivel', message: 'Nivel:', choices: ['principiante', 'intermedio', 'avanzado'] },
        { type: 'input', name: 'precio', message: 'Precio:' }
      ]);
      datos.duracion_meses = parseInt(datos.duracion_meses);
      datos.precio = parseFloat(datos.precio);
      await Servicios.crearPlan(datos);
      exito('Plan creado');
    }
  }

  // ==================== CONTRATOS ====================
  async gestionContratos() {
    const resp = await inquirer.prompt([{
      type: 'list', name: 'accion', message: 'Contratos:',
      choices: ['Asignar plan (crear contrato)', 'Listar', 'Cancelar', 'Finalizar', 'Volver']
    }]);
    if (resp.accion === 'Asignar plan (crear contrato)') {
      const clientes = await Servicios.listarClientes();
      const planes = await Servicios.listarPlanes();
      if (!clientes.length || !planes.length) return error('Primero crea clientes y planes');
      const r1 = await inquirer.prompt([{ type: 'list', name: 'cliente_id', message: 'Cliente:', choices: clientes.map(function(c) { return { name: c.nombre, value: c.id }; }) }]);
      const r2 = await inquirer.prompt([{ type: 'list', name: 'plan_id', message: 'Plan:', choices: planes.map(function(p) { return { name: p.nombre + ' ($' + p.precio + ')', value: p.id }; }) }]);
      const r3 = await inquirer.prompt([{ type: 'input', name: 'condiciones', message: 'Condiciones:' }]);
      await Servicios.asignarPlanAcliente(r1.cliente_id, r2.plan_id, r3.condiciones);
      exito('Contrato generado automáticamente');
    } else if (resp.accion === 'Listar') {
      const lista = await Servicios.listarContratos();
      if (!lista.length) return mostrar('Sin contratos');
      const datos = lista.map(c => [c.id, c.cliente, c.plan, c.estado, c.fecha_inicio, c.fecha_fin]);
      mostrarTabla('CONTRATOS', ['ID', 'Cliente', 'Plan', 'Estado', 'Inicio', 'Fin'], datos);
    } else if (resp.accion === 'Cancelar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID contrato:' }]);
      await Servicios.cancelarContrato(id);
      exito('Contrato cancelado (con rollback de progreso)');
    } else if (resp.accion === 'Finalizar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID contrato:' }]);
      await Servicios.finalizarContrato(id);
      exito('Contrato finalizado');
    }
  }

  // ==================== SEGUIMIENTO ====================
  async seguimientoFisico() {
    const resp = await inquirer.prompt([{
      type: 'list', name: 'accion', message: 'Progreso:',
      choices: ['Registrar', 'Consultar', 'Eliminar', 'Volver']
    }]);
    if (resp.accion === 'Registrar') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'cliente_id', message: 'ID cliente:' },
        { type: 'input', name: 'contrato_id', message: 'ID contrato:' },
        { type: 'input', name: 'fecha_registro', message: 'Fecha (YYYY-MM-DD):' },
        { type: 'input', name: 'peso', message: 'Peso (kg):' },
        { type: 'input', name: 'grasa_corporal', message: '% grasa:' },
        { type: 'input', name: 'pecho', message: 'Pecho (cm):' },
        { type: 'input', name: 'cintura', message: 'Cintura (cm):' },
        { type: 'input', name: 'cadera', message: 'Cadera (cm):' },
        { type: 'input', name: 'brazos', message: 'Brazos (cm):' },
        { type: 'input', name: 'piernas', message: 'Piernas (cm):' },
        { type: 'input', name: 'comentarios', message: 'Comentarios:' }
      ]);
      var campos = ['cliente_id','contrato_id','peso','grasa_corporal','pecho','cintura','cadera','brazos','piernas'];
      campos.forEach(function(k) { datos[k] = parseFloat(datos[k]) || null; });
      await Servicios.registrarProgreso(datos);
      exito('Progreso registrado');
    } else if (resp.accion === 'Consultar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID cliente:' }]);
      const lista = await Servicios.listarProgreso(id);
      if (!lista.length) return mostrar('Sin registros');
      const datos = lista.map(p => [p.fecha_registro, p.peso + ' kg', p.grasa_corporal + '%', p.pecho + ' cm', p.cintura + ' cm', p.cadera + ' cm']);
      mostrarTabla('SEGUIMIENTO FÍSICO', ['Fecha', 'Peso', 'Grasa', 'Pecho', 'Cintura', 'Cadera'], datos);
    } else if (resp.accion === 'Eliminar') {
      const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID registro:' }]);
      await Servicios.eliminarProgreso(id);
      exito('Registro eliminado');
    }
  }

  // ==================== FINANZAS ====================
  async gestionFinanciera() {
    const resp = await inquirer.prompt([{
      type: 'list', name: 'accion', message: 'Finanzas:',
      choices: ['Registrar pago', 'Registrar egreso', 'Listar pagos', 'Listar egresos', 'Balance por fechas','Reporte por mes', 'Volver']
    }]);
    if (resp.accion === 'Registrar pago') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'cliente_id', message: 'ID cliente:' },
        { type: 'input', name: 'contrato_id', message: 'ID contrato (vacío si no aplica):' },
        { type: 'input', name: 'monto', message: 'Monto:' },
        { type: 'list', name: 'tipo', message: 'Tipo:', choices: ['mensualidad', 'sesion_individual', 'otro_ingreso'] },
        { type: 'input', name: 'descripcion', message: 'Descripción:' },
        { type: 'input', name: 'fecha_pago', message: 'Fecha (YYYY-MM-DD):' },
        { type: 'list', name: 'metodo_pago', message: 'Método:', choices: ['efectivo', 'tarjeta', 'transferencia', 'otro'] }
      ]);


      datos.cliente_id = parseInt(datos.cliente_id);
      datos.contrato_id = datos.contrato_id ? parseInt(datos.contrato_id) : null;
      datos.monto = parseFloat(datos.monto);
      await Servicios.registrarPago(datos);
      exito('Pago registrado (transacción confirmada)');

    } else if (resp.accion === 'Registrar egreso') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'monto', message: 'Monto:' },
        { type: 'list', name: 'categoria', message: 'Categoría:', choices: ['suplementos','equipos','servicios','servicios_publicos','otros'] },
        { type: 'input', name: 'descripcion', message: 'Descripción:' },
        { type: 'input', name: 'fecha_egreso', message: 'Fecha (YYYY-MM-DD):' }
      ]);

      datos.monto = parseFloat(datos.monto);
      await Servicios.registrarEgreso(datos);
      exito('Egreso registrado');

    } else if (resp.accion === 'Listar pagos') {
      const lista = await Servicios.listarPagos();
      if (!lista.length) return mostrar('Sin pagos');
      const datos = lista.map(p => [p.id, '$' + p.monto, p.tipo, p.metodo_pago, p.fecha_pago]);
      mostrarTabla('PAGOS REGISTRADOS', ['ID', 'Monto', 'Tipo', 'Método', 'Fecha'], datos);

    } else if (resp.accion === 'Listar egresos') {
      const lista = await Servicios.listarEgresos();
      if (!lista.length) return mostrar('Sin egresos');
      const datos = lista.map(e => [e.id, '$' + e.monto, e.categoria, e.descripcion, e.fecha_egreso]);
      mostrarTabla('EGRESOS REGISTRADOS', ['ID', 'Monto', 'Categoría', 'Descripción', 'Fecha'], datos);
    } 
    else if (resp.accion === 'Balance por fechas') {
      const fechas = await inquirer.prompt([
        { type: 'input', name: 'inicio', message: 'Desde (YYYY-MM-DD):' },
        { type: 'input', name: 'fin', message: 'Hasta (YYYY-MM-DD):' }
      ]);
      const balance = await Servicios.balancePorFecha(fechas.inicio, fechas.fin);
      const datos = [
        ['Ingresos', '$' + balance.ingresos],
        ['Egresos', '$' + balance.egresos],
        ['Balance Final', '$' + balance.balance]
      ];
      mostrarTabla('BALANCE FINANCIERO', ['Concepto', 'Monto'], datos);
    }

    else if (resp.accion === 'Reporte por mes') {
      const fechas = await inquirer.prompt([
        { type: 'input', name: 'mes', message: 'Mes del año(1-12)' }
      ]);
      const balance = await Servicios.balanceMensual(fechas.mes);
      const datos = [
        ['Ingresos', '$' + balance.ingresos],
        ['Egresos', '$' + balance.egresos],
        ['Balance Final', '$' + balance.balance]
      ];
      mostrarTabla('BALANCE FINANCIERO', ['Concepto', 'Monto'], datos);
    }
  }
}



