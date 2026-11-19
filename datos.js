window.MX = window.MX || {};
// Datos 100 % ficticios. Sin ningún campo clínico (RF-16, RN-03).
MX.servicios = ['Consulta general', 'Nutrición', 'Psicología preventiva', 'Orientación'];
MX.profesionales = [
  { id: 'P1', nombre: 'Dr. Pérez', servicio: 'Consulta general' },
  { id: 'P2', nombre: 'Lic. Gómez', servicio: 'Nutrición' },
  { id: 'P3', nombre: 'Psic. Ruiz', servicio: 'Psicología preventiva' },
  { id: 'P4', nombre: 'Mtra. Salas', servicio: 'Orientación' }
];
MX.fechas = ['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27'];
MX.horas = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
MX.estados = ['Programada', 'Confirmada', 'Atendida', 'No presentada', 'Cancelada'];
MX.ahora = new Date('2026-11-23T08:00:00'); // reloj simulado de la demostración
MX.semilla = [
  ['P1', '2026-11-23', '09:00', 'Luis Mora', '202511001', 'Atendida', 'Teléfono'],
  ['P1', '2026-11-23', '09:30', 'Eva Rojas', '202511002', 'No presentada', 'Ventanilla'],
  ['P1', '2026-11-23', '10:30', 'Rita Nava', '202511008', 'No presentada', 'Ventanilla'],
  ['P2', '2026-11-23', '10:00', 'Iván Cruz', '202511003', 'Confirmada', 'Autoservicio'],
  ['P2', '2026-11-24', '09:00', 'Sara Vega', '202511006', 'Programada', 'Teléfono'],
  ['P3', '2026-11-24', '10:00', 'Marta Díaz', '202511004', 'Programada', 'Autoservicio'],
  ['P3', '2026-11-25', '09:30', 'Omar Lara', '202511005', 'Programada', 'Correo'],
  ['P4', '2026-11-25', '11:00', 'Hugo Paz', '202511007', 'Confirmada', 'Mensajería']
];
