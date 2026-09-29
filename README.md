# Gestor de Gimnasio - Sistema de Gestión Integral
### Desarrollador:
**Edgar Manolo Polanco Sánchez**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)

Sistema de gestión integral para gimnasios y entrenadores personales desarrollado en Node.js con arquitectura orientada a objetos, aplicando principios SOLID y patrones de diseño profesionales.


## Descripción del Proyecto

**Gestor de Gimnasio** es una aplicación de línea de comandos (CLI) diseñada para facilitar la gestión completa de gimnasios y entrenadores personales. Permite administrar clientes, planes de entrenamiento, contratos, seguimiento físico, nutrición y finanzas de manera integrada y profesional.

### Propósito Académico

Este proyecto fue desarrollado como parte de un trabajo académico para demostrar la aplicación de:
- Programación Orientada a Objetos (POO)
- Principios SOLID
- Patrones de diseño de software
- Metodologías ágiles (SCRUM)
- Buenas prácticas de desarrollo

---

## Características Principales

### Gestión de Clientes
- Crear, listar, actualizar y eliminar clientes
- Validación de datos en tiempo real
- Búsqueda y filtrado de información

### Gestión de Planes de Entrenamiento
- Creación de planes personalizados (principiante, intermedio, avanzado)
- Definición de duración, metas y precios
- Activación/desactivación de planes

### Gestión de Contratos
- Generación automática de contratos al asignar planes
- Control de estados (activo, cancelado, finalizado, vencido)
- Cálculo automático de fechas de inicio y fin
- Rollback automático de progreso al cancelar contratos

### Seguimiento Físico
- Registro semanal de medidas corporales
- Seguimiento de peso y grasa corporal
- Visualización cronológica del progreso
- Eliminación con validación de consistencia

### Nutrición
- Planes de alimentación personalizados
- Registro diario de comidas con información nutricional
- Control de calorías, proteínas, carbohidratos y grasas
- Reportes nutricionales

### Gestión Financiera
- Registro de ingresos (mensualidades, sesiones individuales)
- Control de egresos (servicios, equipos, suplementos)
- Múltiples métodos de pago
- Balance financiero por rangos de fecha
- Transacciones con rollback automático

---

## Arquitectura y Diseño

### Patrones de Diseño Implementados

#### 1. **Patrón Repository**
```javascript
// Abstrae el acceso a datos
class Repositorio {
  static async crearCliente(datos) { ... }
  static async listarClientes() { ... }
}
// Crea instancias dinámicamente
static factory(tipo, datos) {
  const mapa = { cliente: Cliente, plan: Plan, ... };
  return new mapa[tipo](datos);
}
// Encapsula operaciones como objetos
this.comandos = {
  '1': () => this.gestionClientes(),
  '2': () => this.gestionPlanes(),
  ...
};
```
----
## Diagrama de la Base de datos
**gestor_gimnacio**

![](/img/diagrama.png)

**link documentacion**
https://drive.google.com/drive/folders/1l-tU4SJFyRJyfSwQh5fM3eBadMKre_jY
