-- ========================================
-- GESTOR DE GIMNASIO - BASE DE DATOS
-- Compatible con el proyecto Node.js
-- ========================================

CREATE DATABASE IF NOT EXISTS gestor_gimnasio
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gestor_gimnasio;

-- ========================================
-- TABLA: clientes
-- ========================================
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    direccion TEXT,
    fecha_nacimiento DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_clientes_correo (correo),
    INDEX idx_clientes_nombre (nombre)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: planes_entrenamiento
-- ========================================
CREATE TABLE IF NOT EXISTS planes_entrenamiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion_meses INT NOT NULL,
    meta TEXT,
    nivel ENUM('principiante', 'intermedio', 'avanzado') NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_planes_nivel (nivel),
    INDEX idx_planes_activo (esta_activo)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: contratos
-- ========================================
CREATE TABLE IF NOT EXISTS contratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    plan_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('activo', 'cancelado', 'finalizado', 'vencido') DEFAULT 'activo',
    condiciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES planes_entrenamiento(id) ON DELETE RESTRICT,
    
    INDEX idx_contratos_cliente (cliente_id),
    INDEX idx_contratos_estado (estado),
    INDEX idx_contratos_fechas (fecha_inicio, fecha_fin)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: pagos
-- ========================================
CREATE TABLE IF NOT EXISTS pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    contrato_id INT,
    monto DECIMAL(10, 2) NOT NULL,
    tipo ENUM('mensualidad', 'sesion_individual', 'otro_ingreso') NOT NULL,
    descripcion TEXT,
    fecha_pago DATE NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'otro') DEFAULT 'efectivo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE SET NULL,
    
    INDEX idx_pagos_cliente (cliente_id),
    INDEX idx_pagos_fecha (fecha_pago),
    INDEX idx_pagos_tipo (tipo)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: egresos
-- ========================================
CREATE TABLE IF NOT EXISTS egresos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    contrato_id INT,
    monto DECIMAL(10, 2) NOT NULL,
    categoria ENUM('suplementos', 'equipos', 'servicios', 'servicios_publicos', 'otros') NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_egreso DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE SET NULL,
    
    INDEX idx_egresos_fecha (fecha_egreso),
    INDEX idx_egresos_categoria (categoria)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: registros_progreso
-- ========================================
CREATE TABLE IF NOT EXISTS registros_progreso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    contrato_id INT,
    fecha_registro DATE NOT NULL,
    peso DECIMAL(5, 2),
    grasa_corporal DECIMAL(5, 2),
    pecho DECIMAL(5, 2),
    cintura DECIMAL(5, 2),
    cadera DECIMAL(5, 2),
    brazos DECIMAL(5, 2),
    piernas DECIMAL(5, 2),
    medidas JSON,
    comentarios TEXT,
    url_foto VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE CASCADE,
    
    INDEX idx_progreso_cliente (cliente_id),
    INDEX idx_progreso_fecha (fecha_registro),
    INDEX idx_progreso_contrato (contrato_id)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: planes_nutricion
-- ========================================
CREATE TABLE IF NOT EXISTS planes_nutricion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    plan_id INT,
    contrato_id INT,
    descripcion TEXT,
    calorias_diarias INT,
    restricciones_alimenticias TEXT,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES planes_entrenamiento(id) ON DELETE SET NULL,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE SET NULL,
    
    INDEX idx_nutricion_cliente (cliente_id),
    INDEX idx_nutricion_activo (esta_activo)
) ENGINE=InnoDB;

-- ========================================
-- TABLA: comidas
-- ========================================
CREATE TABLE IF NOT EXISTS comidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_nutricion_id INT NOT NULL,
    fecha_comida DATE NOT NULL,
    hora_comida TIME,
    descripcion_alimento TEXT NOT NULL,
    calorias INT,
    proteinas DECIMAL(5, 2),
    carbohidratos DECIMAL(5, 2),
    grasas DECIMAL(5, 2),
    tamanio_porcion VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (plan_nutricion_id) REFERENCES planes_nutricion(id) ON DELETE CASCADE,
    
    INDEX idx_comidas_plan (plan_nutricion_id),
    INDEX idx_comidas_fecha (fecha_comida)
) ENGINE=InnoDB;