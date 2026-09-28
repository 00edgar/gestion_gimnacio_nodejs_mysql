USE gestor_gimnasio;

-- ========================================
-- DATOS DE PRUEBA - CLIENTES
-- ========================================
INSERT INTO clientes (nombre, correo, telefono, direccion, fecha_nacimiento) VALUES
('Carlos Rodríguez', 'carlos.rodriguez@email.com', '3001234567', 'Calle 45 #12-30, Bogotá', '1990-05-15'),
('María García', 'maria.garcia@email.com', '3109876543', 'Carrera 15 #89-23, Medellín', '1985-08-22'),
('Juan Pérez', 'juan.perez@email.com', '3205554433', 'Avenida 68 #45-12, Cali', '1995-03-10'),
('Ana Martínez', 'ana.martinez@email.com', '3157778899', 'Calle 100 #20-15, Bogotá', '1988-11-30'),
('Luis Hernández', 'luis.hernandez@email.com', '3004445566', 'Carrera 7 #50-80, Barranquilla', '1992-07-18'),
('Sofía López', 'sofia.lopez@email.com', '3182223344', 'Calle 72 #10-25, Medellín', '1998-02-14');

-- ========================================
-- DATOS DE PRUEBA - PLANES DE ENTRENAMIENTO
-- ========================================
INSERT INTO planes_entrenamiento (nombre, descripcion, duracion_meses, meta, nivel, precio, esta_activo) VALUES
('Principiante Total', 'Plan básico para iniciar tu vida fitness', 3, 'Perder 5kg y mejorar resistencia', 'principiante', 150000.00, TRUE),
('Intermedio Fuerza', 'Desarrollo muscular y fuerza', 6, 'Ganar 8kg de masa muscular', 'intermedio', 250000.00, TRUE),
('Avanzado Élite', 'Entrenamiento de alto rendimiento', 12, 'Competir en categoría physique', 'avanzado', 400000.00, TRUE),
('Pérdida de Peso Express', 'Plan intensivo para bajar de peso rápidamente', 2, 'Perder 10kg en 2 meses', 'principiante', 180000.00, TRUE),
('Tonificación Femenina', 'Enfoque en glúteos, piernas y abdomen', 4, 'Definir y tonificar', 'intermedio', 220000.00, TRUE);

-- ========================================
-- DATOS DE PRUEBA - CONTRATOS
-- ========================================
INSERT INTO contratos (cliente_id, plan_id, fecha_inicio, fecha_fin, precio, estado, condiciones) VALUES
(1, 2, '2026-01-15', '2026-07-15', 250000.00, 'activo', 'Incluye acceso a sauna y vestuario'),
(2, 3, '2025-09-01', '2026-09-01', 400000.00, 'activo', 'Entrenador personal 3 veces por semana'),
(3, 1, '2026-08-01', '2026-11-01', 150000.00, 'activo', 'Sin condiciones especiales'),
(4, 5, '2026-06-10', '2026-10-10', 220000.00, 'activo', 'Incluye plan nutricional'),
(5, 4, '2026-07-01', '2026-09-01', 180000.00, 'finalizado', 'Plan completado exitosamente'),
(6, 1, '2026-05-01', '2026-08-01', 150000.00, 'cancelado', 'Cancelado por motivos personales'),
(1, 1, '2025-10-01', '2026-01-01', 150000.00, 'finalizado', 'Primer contrato del cliente');

-- ========================================
-- DATOS DE PRUEBA - PAGOS
-- ========================================
INSERT INTO pagos (cliente_id, contrato_id, monto, tipo, descripcion, fecha_pago, metodo_pago) VALUES
(1, 1, 250000.00, 'mensualidad', 'Mensualidad enero 2026', '2026-01-15', 'transferencia'),
(1, 1, 250000.00, 'mensualidad', 'Mensualidad febrero 2026', '2026-02-15', 'transferencia'),
(1, 1, 250000.00, 'mensualidad', 'Mensualidad marzo 2026', '2026-03-15', 'efectivo'),
(2, 2, 400000.00, 'mensualidad', 'Mensualidad septiembre 2025', '2025-09-01', 'tarjeta'),
(2, 2, 400000.00, 'mensualidad', 'Mensualidad octubre 2025', '2025-10-01', 'tarjeta'),
(3, 3, 150000.00, 'mensualidad', 'Mensualidad agosto 2026', '2026-08-01', 'efectivo'),
(4, 4, 220000.00, 'mensualidad', 'Mensualidad junio 2026', '2026-06-10', 'transferencia'),
(4, 4, 220000.00, 'mensualidad', 'Mensualidad julio 2026', '2026-07-10', 'transferencia'),
(5, 5, 180000.00, 'mensualidad', 'Mensualidad julio 2026', '2026-07-01', 'efectivo'),
(5, 5, 180000.00, 'mensualidad', 'Mensualidad agosto 2026', '2026-08-01', 'efectivo'),
(6, 6, 150000.00, 'mensualidad', 'Mensualidad mayo 2026', '2026-05-01', 'tarjeta'),
(6, 6, 150000.00, 'mensualidad', 'Mensualidad junio 2026', '2026-06-01', 'tarjeta'),
(1, NULL, 50000.00, 'sesion_individual', 'Sesión extra de cardio', '2026-04-10', 'efectivo'),
(3, NULL, 50000.00, 'sesion_individual', 'Sesión de entrenamiento funcional', '2026-09-15', 'efectivo'),
(2, NULL, 30000.00, 'otro_ingreso', 'Venta de suplementos', '2026-09-20', 'efectivo');

-- ========================================
-- DATOS DE PRUEBA - EGRESOS
-- ========================================
INSERT INTO egresos (cliente_id, contrato_id, monto, categoria, descripcion, fecha_egreso) VALUES
(NULL, NULL, 450000.00, 'servicios_publicos', 'Factura electricidad septiembre 2026', '2026-09-05'),
(NULL, NULL, 280000.00, 'servicios_publicos', 'Factura agua septiembre 2026', '2026-09-05'),
(NULL, NULL, 1200000.00, 'equipos', 'Compra de 5 mancuernas de 20kg', '2026-08-20'),
(NULL, NULL, 850000.00, 'equipos', 'Mantenimiento máquinas de cardio', '2026-09-10'),
(1, 1, 80000.00, 'suplementos', 'Proteína whey para Carlos', '2026-03-15'),
(2, 2, 120000.00, 'suplementos', 'Creatina y BCAA para María', '2026-10-05'),
(NULL, NULL, 350000.00, 'servicios', 'Limpieza profunda instalaciones', '2026-09-25'),
(NULL, NULL, 150000.00, 'otros', 'Material de oficina y papelería', '2026-09-15'),
(NULL, NULL, 500000.00, 'servicios', 'Publicidad en redes sociales', '2026-09-01');

-- ========================================
-- DATOS DE PRUEBA - REGISTROS DE PROGRESO
-- ========================================
INSERT INTO registros_progreso (cliente_id, contrato_id, fecha_registro, peso, grasa_corporal, pecho, cintura, cadera, brazos, piernas, comentarios) VALUES
(1, 1, '2026-01-20', 85.5, 22.0, 98.0, 88.0, 95.0, 35.0, 55.0, 'Inicio del plan, buena condición física'),
(1, 1, '2026-01-27', 85.0, 21.8, 98.5, 87.5, 95.0, 35.2, 55.5, 'Primera semana completada'),
(1, 1, '2026-02-03', 84.5, 21.5, 99.0, 87.0, 95.5, 35.5, 56.0, 'Progresando bien, más energía'),
(1, 1, '2026-02-10', 84.0, 21.2, 99.5, 86.5, 96.0, 35.8, 56.5, 'Excelente evolución'),
(1, 1, '2026-02-17', 83.5, 21.0, 100.0, 86.0, 96.5, 36.0, 57.0, 'Metas mensuales alcanzadas'),
(2, 2, '2025-09-05', 70.0, 18.0, 92.0, 75.0, 98.0, 33.0, 58.0, 'Inicio plan avanzado'),
(2, 2, '2025-09-12', 70.5, 17.8, 93.0, 74.5, 98.5, 33.5, 58.5, 'Ganando masa muscular'),
(2, 2, '2025-09-19', 71.0, 17.5, 94.0, 74.0, 99.0, 34.0, 59.0, 'Fuerza aumentando notablemente'),
(2, 2, '2025-09-26', 71.5, 17.2, 95.0, 73.5, 99.5, 34.5, 59.5, 'Excelente progreso mensual'),
(3, 3, '2026-08-05', 75.0, 20.0, 95.0, 82.0, 92.0, 32.0, 52.0, 'Principiante motivado'),
(3, 3, '2026-08-12', 74.5, 19.8, 95.5, 81.5, 92.5, 32.2, 52.5, 'Adaptándose al entrenamiento'),
(3, 3, '2026-08-19', 74.0, 19.5, 96.0, 81.0, 93.0, 32.5, 53.0, 'Mejorando resistencia'),
(4, 4, '2026-06-15', 65.0, 25.0, 88.0, 78.0, 100.0, 30.0, 56.0, 'Inicio plan tonificación'),
(4, 4, '2026-06-22', 64.5, 24.5, 88.5, 77.5, 100.0, 30.2, 56.5, 'Buen inicio, bajando grasa'),
(4, 4, '2026-06-29', 64.0, 24.0, 89.0, 77.0, 100.5, 30.5, 57.0, 'Definición mejorando'),
(5, 5, '2026-07-05', 90.0, 28.0, 105.0, 95.0, 100.0, 38.0, 60.0, 'Plan pérdida de peso iniciado'),
(5, 5, '2026-07-12', 89.0, 27.5, 104.5, 94.0, 99.5, 37.8, 59.5, 'Bajando de peso rápidamente'),
(5, 5, '2026-07-19', 88.0, 27.0, 104.0, 93.0, 99.0, 37.5, 59.0, 'Excelente progreso'),
(5, 5, '2026-07-26', 87.0, 26.5, 103.5, 92.0, 98.5, 37.2, 58.5, 'Metas intermedias alcanzadas'),
(5, 5, '2026-08-02', 86.0, 26.0, 103.0, 91.0, 98.0, 37.0, 58.0, 'Plan completado exitosamente');

-- ========================================
-- DATOS DE PRUEBA - PLANES DE NUTRICIÓN
-- ========================================
INSERT INTO planes_nutricion (cliente_id, plan_id, contrato_id, descripcion, calorias_diarias, restricciones_alimenticias, esta_activo) VALUES
(1, 2, 1, 'Plan alto en proteínas para ganancia muscular', 2800, 'Ninguna', TRUE),
(2, 3, 2, 'Dieta para competidor physique', 3200, 'Sin azúcares refinados', TRUE),
(3, 1, 3, 'Plan balanceado para principiante', 2200, 'Intolerancia a la lactosa', TRUE),
(4, 5, 4, 'Déficit calórico moderado', 1800, 'Vegetariana', TRUE),
(5, 4, 5, 'Dieta baja en carbohidratos', 1600, 'Ninguna', FALSE);

-- ========================================
-- DATOS DE PRUEBA - COMIDAS
-- ========================================
INSERT INTO comidas (plan_nutricion_id, fecha_comida, hora_comida, descripcion_alimento, calorias, proteinas, carbohidratos, grasas, tamanio_porcion) VALUES
(1, '2026-09-28', '07:00:00', 'Avena con proteína whey y plátano', 450, 35.0, 55.0, 8.0, '300g'),
(1, '2026-09-28', '10:00:00', 'Yogur griego con almendras', 280, 20.0, 15.0, 16.0, '200g'),
(1, '2026-09-28', '13:00:00', 'Pechuga de pollo con arroz integral y vegetales', 650, 45.0, 70.0, 12.0, '400g'),
(1, '2026-09-28', '16:00:00', 'Batido de proteína con mantequilla de maní', 380, 30.0, 25.0, 18.0, '350ml'),
(1, '2026-09-28', '19:00:00', 'Salmón con quinoa y espárragos', 720, 48.0, 50.0, 28.0, '350g'),
(2, '2026-09-28', '07:30:00', 'Claras de huevo con avena', 380, 32.0, 45.0, 6.0, '250g'),
(2, '2026-09-28', '10:30:00', 'Pechuga de pavo con arroz', 420, 38.0, 50.0, 8.0, '300g'),
(2, '2026-09-28', '13:30:00', 'Atún con ensalada y aguacate', 550, 42.0, 20.0, 32.0, '350g'),
(2, '2026-09-28', '16:30:00', 'Batido post-entreno', 320, 35.0, 30.0, 5.0, '400ml'),
(2, '2026-09-28', '19:30:00', 'Carne magra con batata', 680, 50.0, 65.0, 18.0, '400g'),
(3, '2026-09-28', '08:00:00', 'Tostadas integrales con aguacate', 320, 12.0, 40.0, 14.0, '200g'),
(3, '2026-09-28', '11:00:00', 'Fruta fresca con nueces', 250, 8.0, 30.0, 12.0, '150g'),
(3, '2026-09-28', '14:00:00', 'Ensalada de quinoa con vegetales', 480, 18.0, 60.0, 16.0, '350g'),
(3, '2026-09-28', '17:00:00', 'Yogur de coco con semillas', 220, 10.0, 20.0, 12.0, '180g'),
(3, '2026-09-28', '20:00:00', 'Tofu salteado con vegetales', 420, 25.0, 35.0, 20.0, '300g'),
(4, '2026-09-28', '07:00:00', 'Smoothie verde con proteína vegetal', 280, 20.0, 35.0, 8.0, '350ml'),
(4, '2026-09-28', '10:00:00', 'Ensalada de espinacas con nueces', 220, 12.0, 15.0, 14.0, '200g'),
(4, '2026-09-28', '13:00:00', 'Bowl de vegetales asados con hummus', 380, 18.0, 45.0, 16.0, '350g'),
(4, '2026-09-28', '16:00:00', 'Frutos rojos con semillas de chía', 180, 8.0, 25.0, 6.0, '150g'),
(4, '2026-09-28', '19:00:00', 'Sopa de lentejas con vegetales', 420, 22.0, 55.0, 10.0, '400ml');

-- ========================================
-- VERIFICACIÓN
-- ========================================
SELECT 'Datos de prueba insertados exitosamente' AS mensaje;
SELECT COUNT(*) AS total_clientes FROM clientes;
SELECT COUNT(*) AS total_planes FROM planes_entrenamiento;
SELECT COUNT(*) AS total_contratos FROM contratos;
SELECT COUNT(*) AS total_pagos FROM pagos;
SELECT COUNT(*) AS total_egresos FROM egresos;
SELECT COUNT(*) AS total_progresos FROM registros_progreso;
SELECT COUNT(*) AS total_planes_nutricion FROM planes_nutricion;
SELECT COUNT(*) AS total_comidas FROM comidas;