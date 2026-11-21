window.MX = window.MX || {};
const h = MX.h;
MX.ROLES = { paciente: 'Paciente', medico: 'Médico / Profesional', recepcion: 'Recepción' };
MX.NAV = {
  paciente: [['menu', 'Panel principal'], ['reservar', 'Reservar cita']],
  medico: [['menu', 'Panel principal'], ['agenda', 'Mi agenda']],
  recepcion: [['menu', 'Panel principal'], ['citas', 'Citas'], ['reservar', 'Reservar cita'], ['indicadores', 'Indicadores']]
};
MX.ir = p => { MX.pantallaActual = p; MX.render(); };
MX.D0 = () => ({ paso: 1, serv: MX.servicios[0], prof: MX.profesionales[0].id, fecha: MX.fechas[0], fid: null, nombre: '', mat: '', contacto: '', err: '', ok: '' });
MX.D = MX.D0();
MX.filtro = 'Todas';
MX.fmtF = f => new Date(f + 'T00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
MX.orden = (a, b) => MX.fp(a.fid).f.localeCompare(MX.fp(b.fid).f) || MX.fp(a.fid).h.localeCompare(MX.fp(b.fid).h);
MX.chip = e => h('span', { class: 'estado ' + { Programada: 'prog', Confirmada: 'ok', Atendida: 'done', 'No presentada': 'bad', Cancelada: 'bad' }[e] },
  { Programada: '◷ ', Confirmada: '✓ ', Atendida: '✓ ', 'No presentada': '✕ ', Cancelada: '✕ ' }[e] + e);
MX.campo = (t, props, hint) => h('label', { class: 'field' + (props.mal ? ' mal' : '') }, h('span', {}, t), h('input', props), hint ? h('small', {}, hint) : '');
MX.aviso = (tipo, ...k) => h('div', { class: 'aviso ' + tipo, role: tipo === 'err' ? 'alert' : null }, h('div', {}, ...k));
MX.dato = (t, v) => [h('dt', {}, t), h('dd', {}, v)];

// Marco común: menú lateral + cabecera + encabezado de página
MX.shell = (activo, eyebrow, titulo, sub, accion, ...cont) => h('div', { class: 'app' },
  h('aside', { class: 'side' },
    h('div', {}, h('div', { class: 'logo' }, h('b', {}, '✚ '), 'MEDINEX'), h('span', { class: 'sub' }, 'CLÍNICA UNIVERSITARIA')),
    h('nav', { 'aria-label': 'Principal' }, MX.NAV[MX.S.rol].map(([k, t]) =>
      h('button', { class: 'nav' + (k === activo ? ' act' : ''), 'aria-current': k === activo ? 'page' : null, onclick: () => MX.ir(k) }, t))),
    h('div', { class: 'ctx' }, 'Campus central', h('br'), 'Gestión administrativa de citas',
      h('br'), h('button', { class: 'nav out', onclick: () => { MX.S.rol = null; MX.D = MX.D0(); MX.render(); } }, 'Cerrar sesión'))),
  h('div', {},
    h('div', { class: 'top' }, h('span', {}, MX.ROLES[MX.S.rol] + ' · Campus central'), h('span', {}, 'Cuenta institucional')),
    h('div', { class: 'page' },
      h('div', { class: 'enc' }, h('div', {}, h('p', { class: 'eyebrow' }, eyebrow), h('h1', {}, titulo), h('p', { class: 'f' }, sub)), accion || ''),
      ...cont,
      h('p', { class: 'pie' }, 'MEDINEX · Clínica universitaria · Solo información administrativa'))));

// 01 LOGIN
MX.pantallaLogin = () => {
  const err = h('div', { hidden: true }, MX.aviso('err', h('b', {}, '⚠ No pudimos iniciar sesión. '), 'El correo o la contraseña no son correctos. Revisa ambos campos e inténtalo de nuevo.'));
  const correo = MX.campo('Correo institucional *', { type: 'email', value: 'lucia.torres@universidad.edu', autocomplete: 'username' });
  const clave = MX.campo('Contraseña *', { type: 'password', value: 'demo1234', autocomplete: 'current-password' }, 'Obligatoria. Respeta las mayúsculas y minúsculas.');
  const rol = h('label', { class: 'field' }, h('span', {}, 'Simular rol (para pruebas)'),
    h('select', {}, Object.entries(MX.ROLES).map(([v, t]) => h('option', { value: v }, t))));
  const entrar = () => {
    const c = correo.querySelector('input').value.trim().toLowerCase(), p = clave.querySelector('input').value;
    const ok = /^[^\s@]+@universidad\.edu$/.test(c) && p.length > 0;   // demo: sustituir por autenticación real
    err.hidden = ok;
    [correo, clave].forEach(f => f.classList.toggle('mal', !ok));
    if (ok) { MX.S.rol = rol.querySelector('select').value; MX.pantallaActual = 'menu'; MX.render(); }
  };
  return h('div', { class: 'split' },
    h('section', { class: 'brand' },
      h('div', { class: 'marca' }, h('span', { class: 'cuadro' }, '+'), 'MEDINEX'),
      h('div', {}, h('p', { class: 'eyebrow' }, 'CLÍNICA UNIVERSITARIA'), h('h1', {}, 'Una atención mejor organizada.'),
        h('p', { class: 'lead' }, 'Un espacio común para coordinar las citas, los horarios y la atención administrativa de nuestra comunidad.')),
      h('div', { class: 'princ' },
        h('div', {}, h('b', {}, '🗓 Citas claras'), 'Disponibilidad y seguimiento en un solo lugar.'),
        h('div', {}, h('b', {}, '🛡 Acceso según tu función'), 'Cada perfil tiene un ámbito de trabajo definido.'),
        h('div', {}, h('b', {}, '↺ Cambios trazables'), 'Registro de las acciones administrativas críticas.')),
      h('p', { class: 'foot' }, 'Campus central · Gestión administrativa')),
    h('section', { class: 'acceso' },
      h('p', { class: 'id' }, '01 / ACCESO INSTITUCIONAL'),
      h('div', {}, h('h2', {}, 'Bienvenido a MEDINEX'), h('p', { class: 'd' }, 'Inicia sesión con tu cuenta institucional para acceder a tu espacio de trabajo.')),
      err, correo, clave, rol,
      h('div', {}, h('button', { class: 'btn', onclick: entrar }, '→ Iniciar sesión')),
      h('p', { class: 'nota' }, 'El acceso depende del rol asignado por la institución. Si tu cuenta no tiene un rol, solicita apoyo al área de TI.'),
      h('p', { class: 'nota' }, 'Uso exclusivo de la comunidad universitaria. No ingreses información clínica en los campos administrativos.')));
};

// 02 PANEL PRINCIPAL (datos desde MX.S)
MX.pantallaMenu = () => {
  const cs = MX.S.citas, n = e => cs.filter(c => c.estado === e).length;
  const prox = cs.filter(MX.activa).sort(MX.orden);
  const sel = prox.find(c => c.id === MX.selId) || prox[0];
  const kpi = (t, v, s) => h('div', { class: 'kpi' }, h('small', {}, t), h('b', {}, v), s);
  const fila = c => { const x = MX.fp(c.fid); return h('tr', { class: 'fila' + (sel && c.id === sel.id ? ' sel' : ''), onclick: () => { MX.selId = c.id; MX.render(); } },
    h('td', { class: 'hora' }, x.h), h('td', {}, c.pac, h('small', {}, c.mat + ' · ' + c.id)), h('td', {}, MX.prof(x.p).nombre), h('td', {}, MX.chip(c.estado))); };
  const x = sel && MX.fp(sel.fid);
  return MX.shell('menu', '02 / ' + MX.ROLES[MX.S.rol], 'Panel principal',
    MX.fmtF(MX.ahora.toISOString().slice(0, 10)) + ' · Vista del día', MX.S.rol !== 'medico' ? h('button', { class: 'btn', onclick: () => MX.ir('reservar') }, '+ Nueva cita') : '',
    h('div', { class: 'kpis' }, kpi('Citas registradas', cs.length - n('Cancelada'), 'Sin canceladas'), kpi('Programadas', n('Programada'), 'Pendientes de confirmación'),
      kpi('Confirmadas', n('Confirmada'), 'Con reserva confirmada'), kpi('Atendidas', n('Atendida'), 'Seguimiento completado'), kpi('No presentadas', n('No presentada'), 'Ausencia registrada')),
    h('div', { class: 'cols' },
      h('section', { class: 'panel' }, h('h2', {}, 'Agenda'), h('p', { class: 'sub2' }, 'Próximas citas activas · ordenadas por fecha y hora'),
        h('div', { class: 'tw' }, h('table', {}, h('thead', {}, h('tr', {}, ['Hora', 'Paciente / ID', 'Profesional', 'Estado'].map(t => h('th', {}, t)))), h('tbody', {}, prox.slice(0, 6).map(fila)))),
        h('p', { class: 'nota', style: 'margin-top:14px;font-size:12px;color:#56677c' }, Math.min(6, prox.length) + ' de ' + prox.length + ' citas activas')),
      h('section', { class: 'panel', 'aria-live': 'polite' }, sel ? [
        h('h2', {}, 'Próxima atención'), h('p', { class: 'sub2' }, MX.fmtF(x.f) + ' · ' + x.h + ' h'), MX.chip(sel.estado),
        h('p', { style: 'font-size:22px;font-weight:600;margin:14px 0 2px' }, sel.pac), h('p', { style: 'font-size:12px;color:#56677c;margin-bottom:14px' }, sel.mat),
        h('dl', { class: 'resumen' }, MX.dato('Servicio', MX.prof(x.p).servicio), MX.dato('Profesional', MX.prof(x.p).nombre), MX.dato('Franja', x.h))] : h('p', {}, 'No hay citas activas.'))));
};

// 03 CITAS (recepción): transiciones de estado con RN-07 y reprogramación con RN-05
// Estado del panel de reprogramación (MX.render reconstruye la pantalla, por eso se guarda aquí)
MX.R = { id: null, nf: '', res: null };

MX.pantallaCitas = () => {
  const lista = MX.S.citas.filter(c => MX.filtro === 'Todas' || c.estado === MX.filtro).sort(MX.orden);
  const filtro = h('label', { class: 'field', style: 'max-width:260px;min-height:0' }, h('span', {}, 'Filtrar por estado'),
    MX.sel(['Todas', ...MX.estados], MX.filtro, e => { MX.filtro = e.target.value; MX.render(); }));
  const cambiar = (c, e) => { const r = MX.cambiarEstado(c, e, 'Recepción'); MX.toast(r.msg, r.ok); MX.render(); };

  const abrir = c => { MX.R = { id: c.id, nf: '', res: null }; MX.render(); };
  const cerrar = () => { MX.R = { id: null, nf: '', res: null }; MX.render(); };
  const confirmar = c => {
    const r = MX.reprogramar(c, MX.R.nf, 'Recepción');             // RF-06 / RN-05
    MX.toast(r.msg, r.ok);
    if (r.ok) MX.R = { id: null, nf: '', res: null };              // éxito: cierra el panel
    else MX.R.res = r;                                             // rechazo: el panel sigue abierto
    MX.render();
  };

  const cR = MX.S.citas.find(c => c.id === MX.R.id);
  let panelR = '';
  if (cR) {
    const o = MX.fp(cR.fid);
    const libres = Object.keys(MX.S.franjas)
      .filter(k => MX.S.franjas[k] === 'libre' && MX.fp(k).p === o.p)   // solo franjas libres del mismo profesional
      .sort()
      .map(k => ({ v: k, t: MX.fmtF(MX.fp(k).f) + ' · ' + MX.fp(k).h + ' h' }));
    panelR = h('section', { class: 'panel', style: 'margin-top:18px', 'aria-live': 'polite' },
      h('h2', {}, 'Reprogramar cita ' + cR.id),
      h('p', { class: 'sub2' }, cR.pac + ' · actualmente ' + o.f + ' ' + o.h + ' h con ' + MX.prof(o.p).nombre),
      h('label', { class: 'field', style: 'max-width:420px;margin-top:14px' }, h('span', {}, 'Nueva franja'),
        MX.sel([{ v: '', t: 'Selecciona una franja' }, ...libres], MX.R.nf, e => { MX.R.nf = e.target.value; MX.R.res = null; MX.render(); })),
      MX.R.res && !MX.R.res.ok ? h('div', { style: 'margin-top:16px' }, MX.aviso('err', MX.R.res.msg)) : '',
      h('div', { class: 'acc2', style: 'margin-top:16px' },
        h('button', { class: 'btn', onclick: () => confirmar(cR) }, 'Confirmar cambio'),
        h('button', { class: 'btn sec', onclick: cerrar }, 'Cancelar')));
  }

  return MX.shell('citas', '03 / Recepción', 'Citas', 'Consulta y seguimiento administrativo de reservas', '',
    h('section', { class: 'panel' }, filtro, h('div', { class: 'tw', style: 'margin-top:18px' }, h('table', {},
      h('thead', {}, h('tr', {}, ['ID', 'Paciente', 'Profesional', 'Fecha y hora', 'Estado', 'Acciones'].map(t => h('th', {}, t)))),
      h('tbody', {}, lista.map(c => { const x = MX.fp(c.fid); return h('tr', {},
        h('td', {}, c.id), h('td', {}, c.pac, h('small', {}, c.mat)), h('td', {}, MX.prof(x.p).nombre), h('td', {}, x.f + ' · ' + x.h), h('td', {}, MX.chip(c.estado)),
        h('td', {}, h('div', { class: 'acciones' },
          MX.perm[c.estado].map(e => h('button', { class: 'btn sm ' + (e === 'Cancelada' ? 'peligro' : 'sec'), onclick: () => cambiar(c, e) }, e)),
          MX.activa(c) ? h('button', { class: 'btn sm sec', onclick: () => abrir(c) }, 'Reprogramar') : ''))); }))))),
    panelR);
};

// 04-08 RESERVAR: disponibilidad → datos y revisión → confirmación
MX.pantallaReservar = () => {
  const D = MX.D, rerender = MX.render;
  const profs = MX.profesionales.filter(p => p.servicio === D.serv);
  const pasos = h('div', { class: 'pasos' }, ['1 Disponibilidad', '2 Datos y revisión', '3 Confirmación'].map((t, i) => h('span', { class: D.paso === i + 1 ? 'on' : '' }, t)));
  const x = D.fid && MX.fp(D.fid);
  const resumen = () => h('dl', { class: 'resumen' }, MX.dato('Servicio', D.serv), MX.dato('Profesional', MX.prof(D.prof).nombre), MX.dato('Fecha', MX.fmtF(D.fecha)), MX.dato('Horario', x ? x.h + ' h' : 'Sin seleccionar'));
  let cuerpo;
  if (D.paso === 1) {
    cuerpo = h('div', { class: 'cols' },
      h('section', { class: 'panel' }, h('h2', {}, 'Buscar disponibilidad'), h('p', { class: 'sub2' }, 'Elige servicio, profesional, día y horario'),
        h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px' },
          h('label', { class: 'field' }, h('span', {}, 'Servicio'), MX.sel(MX.servicios, D.serv, e => { D.serv = e.target.value; D.prof = MX.profesionales.find(p => p.servicio === D.serv).id; D.fid = null; rerender(); })),
          h('label', { class: 'field' }, h('span', {}, 'Profesional'), MX.sel(profs.map(p => ({ v: p.id, t: p.nombre })), D.prof, e => { D.prof = e.target.value; D.fid = null; rerender(); }))),
        h('p', { class: 'sub2', style: 'margin:18px 0 0' }, 'Fechas cercanas'),
        h('div', { class: 'dias' }, MX.fechas.map(f => h('button', { class: 'dia' + (f === D.fecha ? ' sel' : ''), onclick: () => { D.fecha = f; D.fid = null; rerender(); } },
          new Date(f + 'T00:00').toLocaleDateString('es-MX', { weekday: 'short' }), h('b', {}, f.slice(8))))),
        h('p', { class: 'sub2', style: 'margin:0' }, 'Horarios disponibles'),
        h('div', { class: 'slots' }, MX.horas.map(hr => { const fid = [D.prof, D.fecha, hr].join('|');
          return h('button', { class: 'slot' + (fid === D.fid ? ' sel' : ''), disabled: MX.S.franjas[fid] !== 'libre', onclick: () => { D.fid = fid; rerender(); } }, hr); }))),
      h('div', { class: 'col' }, h('section', { class: 'panel' }, h('h2', {}, 'Resumen de tu cita'), h('div', { style: 'height:14px' }), resumen(),
        h('button', { class: 'btn', disabled: !D.fid, onclick: () => { D.paso = 2; D.err = ''; rerender(); } }, 'Continuar →')),
        MX.aviso('info', 'Las franjas ocupadas o bloqueadas aparecen deshabilitadas.')));
  } else if (D.paso === 2) {
    const guardar = k => e => { D[k] = e.target.value; };
    cuerpo = h('div', { class: 'cols' },
      h('section', { class: 'panel', style: 'display:flex;flex-direction:column;gap:18px' }, h('h2', {}, 'Datos de la reserva'),
        MX.aviso('info', 'Solicitamos únicamente datos administrativos. No ingreses información clínica.'),
        MX.campo('Nombre completo *', { value: D.nombre, oninput: guardar('nombre'), placeholder: 'Ej. Luis Mora' }),
        MX.campo('Matrícula o número de empleado *', { value: D.mat, oninput: guardar('mat'), placeholder: 'Ej. 202511001' }),
        MX.campo('Contacto (opcional)', { value: D.contacto, oninput: guardar('contacto'), placeholder: 'correo@universidad.edu' }),
        D.err ? MX.aviso('err', D.err) : ''),
      h('div', { class: 'col' }, h('section', { class: 'panel' }, h('h2', {}, 'Revisión'), h('div', { style: 'height:14px' }), resumen(),
        h('div', { class: 'acc2' },
          h('button', { class: 'btn', onclick: () => {
            if (!D.nombre.trim() || !D.mat.trim()) { D.err = 'Nombre y matrícula son obligatorios.'; return rerender(); }
            const r = MX.reservar(D.fid, { nombre: D.nombre.trim(), mat: D.mat.trim(), contacto: D.contacto.trim() }, MX.S.rol === 'recepcion' ? 'Ventanilla' : 'Autoservicio', MX.ROLES[MX.S.rol]);
            if (r.ok) { D.ok = r.msg; D.paso = 3; D.err = ''; } else D.err = r.msg;
            rerender(); } }, '✓ Confirmar reserva'),
          h('button', { class: 'btn sec', onclick: () => { D.paso = 1; D.fid = null; D.err = ''; rerender(); } }, 'Elegir otro horario')))));
  } else {
    cuerpo = h('div', { class: 'cols' },
      h('section', { class: 'panel' }, h('h2', {}, '✓ Cita registrada'), h('p', { class: 'sub2' }, D.ok), resumen(),
        h('div', { class: 'acc2' }, h('button', { class: 'btn', onclick: () => { MX.D = MX.D0(); MX.ir('menu'); } }, 'Ir al panel'),
          h('button', { class: 'btn sec', onclick: () => { MX.D = MX.D0(); rerender(); } }, 'Reservar otra cita'))),
      MX.aviso('ok', 'Se envió una notificación de confirmación (simulada) y el cambio quedó en la bitácora.'));
  }
  return MX.shell('reservar', '04 / Reserva', 'Reservar cita', 'Busca disponibilidad, revisa y confirma', '', pasos, cuerpo);
};

// 10 AGENDA del profesional + bloqueo de periodo (RF-05 / RN-06)
// Estado del formulario de bloqueo (MX.render reconstruye la pantalla, por eso se guarda aquí)
MX.B = { f: MX.fechas[0], a: MX.horas[0], b: MX.horas[1], motivo: '', res: null };
MX.horasFin = [...MX.horas, '12:00'];   // permite bloquear también la franja de 11:30

MX.pantallaAgenda = () => {
  const p = MX.S.prof, B = MX.B;
  const lista = MX.S.citas.filter(c => MX.fp(c.fid).p === p).sort(MX.orden);
  const cambia = k => e => { B[k] = e.target.value; B.res = null; MX.render(); };
  const solicitar = () => {
    const r = MX.bloquear(p, B.f, B.a, B.b, B.motivo, MX.ROLES[MX.S.rol]);   // RF-05 / RN-06
    MX.toast(r.msg, r.ok);
    B.res = r;
    if (r.ok) B.motivo = '';
    MX.render();
  };
  const bloqueos = [...MX.S.bloqueos].reverse();
  return MX.shell('agenda', '10 / Profesional', 'Mi agenda', 'Citas asignadas al profesional seleccionado', '',
    h('section', { class: 'panel' }, h('label', { class: 'field', style: 'max-width:300px;min-height:0;margin-bottom:18px' }, h('span', {}, 'Profesional'),
      MX.sel(MX.profesionales.map(q => ({ v: q.id, t: q.nombre })), p, e => { MX.S.prof = e.target.value; B.res = null; MX.render(); })),
      h('div', { class: 'tw' }, h('table', {}, h('thead', {}, h('tr', {}, ['Fecha', 'Hora', 'Paciente', 'Estado'].map(t => h('th', {}, t)))),
        h('tbody', {}, lista.length ? lista.map(c => { const x = MX.fp(c.fid); return h('tr', {}, h('td', {}, x.f), h('td', { class: 'hora' }, x.h), h('td', {}, c.pac), h('td', {}, MX.chip(c.estado))); })
          : h('tr', {}, h('td', { colspan: 4 }, 'Sin citas para este profesional.')))))),

    h('section', { class: 'panel', style: 'margin-top:18px', 'aria-live': 'polite' },
      h('h2', {}, 'Bloquear periodo'), h('p', { class: 'sub2' }, 'Profesional: ' + MX.prof(p).nombre),
      h('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:14px' },
        h('label', { class: 'field' }, h('span', {}, 'Fecha'), MX.sel(MX.fechas.map(f => ({ v: f, t: MX.fmtF(f) })), B.f, cambia('f'))),
        h('label', { class: 'field' }, h('span', {}, 'Hora inicial'), MX.sel(MX.horas, B.a, cambia('a'))),
        h('label', { class: 'field' }, h('span', {}, 'Hora final'), MX.sel(MX.horasFin, B.b, cambia('b')))),
      h('div', { style: 'margin-top:16px' },
        MX.campo('Motivo *', { value: B.motivo, oninput: e => { B.motivo = e.target.value; }, placeholder: 'Ej. Capacitación' })),
      B.res ? h('div', { style: 'margin-top:16px' }, MX.aviso(B.res.ok ? 'ok' : 'err', B.res.msg)) : '',
      h('div', { style: 'margin-top:16px' }, h('button', { class: 'btn', onclick: solicitar }, 'Solicitar bloqueo'))),

    h('section', { class: 'panel', style: 'margin-top:18px' },
      h('h2', {}, 'Bloqueos solicitados'), h('div', { style: 'height:14px' }),
      h('div', { class: 'tw' }, h('table', {},
        h('thead', {}, h('tr', {}, ['Profesional', 'Fecha', 'Horario', 'Motivo', 'Estado'].map(t => h('th', {}, t)))),
        h('tbody', {}, bloqueos.length ? bloqueos.map(b => h('tr', {},
          h('td', {}, MX.prof(b.p).nombre), h('td', {}, b.f), h('td', {}, b.a + ' – ' + b.b), h('td', {}, b.motivo),
          h('td', {}, h('span', { class: 'estado ' + (b.estado === 'Aplicado' ? 'ok' : 'prog') }, (b.estado === 'Aplicado' ? '✓ ' : '◷ ') + b.estado))))
          : h('tr', {}, h('td', { colspan: 5 }, 'Sin bloqueos solicitados.')))))));
};

// REPORTES / INDICADORES
MX.pantallaIndicadores = () => {
  const cs = MX.S.citas, max = Math.max(1, cs.length);
  return MX.shell('indicadores', '11 / Reportes', 'Reportes operativos', 'Resumen por estado de las citas registradas', '',
    h('div', { class: 'kpis' }, h('div', { class: 'kpi' }, h('small', {}, 'Citas totales'), h('b', {}, cs.length)),
      h('div', { class: 'kpi' }, h('small', {}, 'Atendidas'), h('b', {}, cs.filter(c => c.estado === 'Atendida').length)),
      h('div', { class: 'kpi' }, h('small', {}, 'Canceladas'), h('b', {}, cs.filter(c => c.estado === 'Cancelada').length))),
    h('section', { class: 'panel' }, h('h2', {}, 'Citas por estado'), h('div', { style: 'height:16px' }),
      MX.estados.map(e => { const n = cs.filter(c => c.estado === e).length;
        return h('div', { class: 'barra' }, h('span', {}, e, h('b', {}, n)), h('div', { class: 'pista' }, h('i', { style: 'width:' + (n / max * 100) + '%' }))); })));
};

MX.render = () => {
  const app = document.getElementById('app'); if (!app) return;
  app.innerHTML = '';
  if (!MX.S.rol) return app.append(MX.pantallaLogin());
  const mapa = { menu: MX.pantallaMenu, citas: MX.pantallaCitas, reservar: MX.pantallaReservar, agenda: MX.pantallaAgenda, indicadores: MX.pantallaIndicadores };
  const permitido = MX.NAV[MX.S.rol].some(n => n[0] === MX.pantallaActual);
  app.append(mapa[permitido ? MX.pantallaActual : 'menu']());
};
window.onload = () => { if (MX.seed) MX.seed(); MX.pantallaActual = 'menu'; MX.render(); };

