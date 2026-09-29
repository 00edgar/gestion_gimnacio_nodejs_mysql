# 🏋️ Gestor de Gimnasio - Sistema de Gestión Integral

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistema de gestión integral para gimnasios y entrenadores personales desarrollado en Node.js con arquitectura orientada a objetos, aplicando principios SOLID y patrones de diseño profesionales.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Arquitectura y Diseño](#arquitectura-y-diseño)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso del Sistema](#uso-del-sistema)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Principios SOLID](#principios-solid)
- [Metodología de Desarrollo](#metodología-de-desarrollo)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## 🎯 Descripción del Proyecto

**Gestor de Gimnasio** es una aplicación de línea de comandos (CLI) diseñada para facilitar la gestión completa de gimnasios y entrenadores personales. Permite administrar clientes, planes de entrenamiento, contratos, seguimiento físico, nutrición y finanzas de manera integrada y profesional.

### 🎓 Propósito Académico

Este proyecto fue desarrollado como parte de un trabajo académico para demostrar la aplicación de:
- Programación Orientada a Objetos (POO)
- Principios SOLID
- Patrones de diseño de software
- Metodologías ágiles (SCRUM)
- Buenas prácticas de desarrollo

---

## ✨ Características Principales

### 👥 Gestión de Clientes
- ✅ Crear, listar, actualizar y eliminar clientes
- ✅ Validación de datos en tiempo real
- ✅ Búsqueda y filtrado de información

### 🏃 Gestión de Planes de Entrenamiento
- ✅ Creación de planes personalizados (principiante, intermedio, avanzado)
- ✅ Definición de duración, metas y precios
- ✅ Activación/desactivación de planes

### 📝 Gestión de Contratos
- ✅ Generación automática de contratos al asignar planes
- ✅ Control de estados (activo, cancelado, finalizado, vencido)
- ✅ Cálculo automático de fechas de inicio y fin
- ✅ Rollback automático de progreso al cancelar contratos

### 📊 Seguimiento Físico
- ✅ Registro semanal de medidas corporales
- ✅ Seguimiento de peso y grasa corporal
- ✅ Visualización cronológica del progreso
- ✅ Eliminación con validación de consistencia

### 🥗 Nutrición
- ✅ Planes de alimentación personalizados
- ✅ Registro diario de comidas con información nutricional
- ✅ Control de calorías, proteínas, carbohidratos y grasas
- ✅ Reportes nutricionales

### 💰 Gestión Financiera
- ✅ Registro de ingresos (mensualidades, sesiones individuales)
- ✅ Control de egresos (servicios, equipos, suplementos)
- ✅ Múltiples métodos de pago
- ✅ Balance financiero por rangos de fecha
- ✅ Transacciones con rollback automático

---

## 🏗️ Arquitectura y Diseño

### Patrones de Diseño Implementados

#### 1. **Patrón Repository**
```javascript
// Abstrae el acceso a datos
class Repositorio {
  static async crearCliente(datos) { ... }
  static async listarClientes() { ... }
}