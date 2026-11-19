window.MX = window.MX || {};
// Estado en memoria + reglas de negocio del SRS (RN-01, RN-02, RN-05, RN-06, RN-07, RN-11).
MX.fp = fid => { const [p, f, h] = fid.split('|'); return { p, f, h }; };
MX.activa = c => c.estado === 'Programada' || c.estado === 'Confirmada';
MX.prof = id => MX.profesionales.find(p => p.id === id);
MX.log = (accion, ent, autor) =>
  MX.S.bitacora.unshift({ t: new Date().toLocaleString('es-MX'), autor, accion, ent }); // RN-02 / RF-11

MX.seed = () => {
  const S = MX.S = { rol: null, prof: 'P3', franjas: {}, citas: [], bloqueos: [], bitacora: [], seq: 1040 };
  MX.profesionales.forEach(p => MX.fechas.forEach(f => MX.horas.forEach(h => S.franjas[[p.id, f, h].join('|')] = 'libre')));
  MX.semilla.forEach(s => MX.addCita(s[0] + '|' + s[1] + '|' + s[2], { nombre: s[3], mat: s[4], contacto: 'demo@correo.mx' }, s[6], s[5], 'Sistema (demo)'));
  S.bitacora = [];
};
MX.addCita = (fid, d, canal, estado, autor) => {
  const S = MX.S, c = { id: '#' + (++S.seq), fid, pac: d.nombre, mat: d.mat, contacto: d.contacto || '', canal, estado };
  S.citas.push(c); S.franjas[fid] = 'ocupada';
  MX.log('Crear cita (' + estado + ')', c.id, autor);
  return c;
};
// RF-03/RF-09: reserva "atómica" simulada; RN-11 conflicto; E4 traslape del paciente
MX.reservar = (fid, d, canal, autor) => {
  const S = MX.S, x = MX.fp(fid);
  if (S.franjas[fid] !== 'libre') return { ok: false, msg: 'Conflicto de disponibilidad: la franja ya fue tomada por otra solicitud (RN-11).' };
  if (S.citas.some(c => MX.activa(c) && c.mat === d.mat && MX.fp(c.fid).f === x.f && MX.fp(c.fid).h === x.h))
    return { ok: false, msg: 'El paciente ya tiene una cita activa que se traslapa con esta franja (E4).' };
  const c = MX.addCita(fid, d, canal, 'Programada', autor);
  MX.log('Notificación de confirmación (simulada)', c.id, 'Sistema'); // RF-10
  return { ok: true, msg: 'Cita ' + c.id + ' registrada en estado Programada.' };
};
MX.perm = { 'Programada': ['Confirmada', 'Cancelada'], 'Confirmada': ['Atendida', 'No presentada', 'Cancelada'], 'Atendida': [], 'No presentada': [], 'Cancelada': [] };
MX.cambiarEstado = (c, n, autor) => {            // RF-08 / RN-07
  const ok = MX.perm[c.estado];
  if (!ok.includes(n)) return { ok: false, msg: 'Transición no válida de «' + c.estado + '» a «' + n + '». Permitidas: ' + (ok.join(', ') || 'ninguna (estado final)') + ' (RN-07).' };
  if (n === 'Cancelada') MX.S.franjas[c.fid] = 'libre';
  MX.log('Estado ' + c.estado + ' → ' + n, c.id, autor);
  c.estado = n;
  return { ok: true, msg: 'Estado actualizado a ' + n + '.' };
};
MX.reprogramar = (c, nf, autor) => {             // RF-06 / RN-05 (ventana 24 h = SUP-01)
  const S = MX.S, o = MX.fp(c.fid);
  if (!MX.activa(c)) return { ok: false, msg: 'Solo se reprograman citas Programadas o Confirmadas.' };
  if (new Date(o.f + 'T' + o.h) - MX.ahora < 864e5) return { ok: false, msg: 'Fuera de la ventana de reprogramación: se requieren 24 h de anticipación (RN-05).' };
  if (!nf || S.franjas[nf] !== 'libre') return { ok: false, msg: 'Seleccione una franja disponible.' };
  S.franjas[c.fid] = 'libre'; S.franjas[nf] = 'ocupada';
  MX.log('Reprogramar ' + c.fid + ' → ' + nf, c.id, autor);
  c.fid = nf;
  return { ok: true, msg: 'Cita reprogramada.' };
};
MX.afectadas = b => MX.S.citas.filter(c => { const x = MX.fp(c.fid); return MX.activa(c) && x.p === b.p && x.f === b.f && x.h >= b.a && x.h < b.b; });
MX.aplicarBloqueo = (bl, autor) => {
  Object.keys(MX.S.franjas).forEach(k => {
    const x = MX.fp(k);
    if (x.p === bl.p && x.f === bl.f && x.h >= bl.a && x.h < bl.b && MX.S.franjas[k] === 'libre') MX.S.franjas[k] = 'bloqueada';
  });
  bl.estado = 'Aplicado';
  MX.log('Aplicar bloqueo (' + bl.motivo + ')', 'B' + bl.id, autor);
};
MX.bloquear = (p, f, a, b, motivo, autor) => {   // RF-05 / RN-06
  const S = MX.S;
  if (a >= b) return { ok: false, msg: 'La hora final debe ser posterior a la inicial.' };
  if (!motivo.trim()) return { ok: false, msg: 'El motivo del bloqueo es obligatorio.' };
  const bl = { id: S.bloqueos.length + 1, p, f, a, b, motivo: motivo.trim(), estado: 'En revisión' };
  S.bloqueos.push(bl);
  MX.log('Solicitar bloqueo', 'B' + bl.id, autor);
  const n = MX.afectadas(bl).length;
  if (n) {
    MX.log('Notificar a Recepción: ' + n + ' cita(s) afectada(s)', 'B' + bl.id, 'Sistema');
    return { ok: false, msg: 'Este horario tiene ' + n + ' cita(s) programada(s). El bloqueo no se aplica automáticamente; se envió a Recepción/Coordinación para resolverlo (RN-06).' };
  }
  MX.aplicarBloqueo(bl, autor);
  return { ok: true, msg: 'Bloqueo aplicado y reflejado en la disponibilidad.' };
};
