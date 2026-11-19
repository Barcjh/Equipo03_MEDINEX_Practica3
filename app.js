window.MX = window.MX || {};

// Si no tienes datos.js, usa estos datos simulados:
MX.profesionales = [
    { id: 'P1', nombre: 'Dr. Pérez' }, { id: 'P2', nombre: 'Lic. Gómez' }
];

MX.S = { rol: null };
MX.pantallaActual = 'menu';

// 1. PANTALLA: LOGIN
MX.pantallaLogin = () => {
    return MX.h('div', { class: 'card narrow', style: 'text-align:center; margin-top: 10vh;' },
        MX.h('h2', {}, 'Bienvenido a MEDINEX'),
        MX.h('p', { class: 'nota' }, 'Inicia sesión con tu cuenta institucional.'),
        MX.h('input', { type: 'email', value: 'lucia.torres@universidad.edu' }),
        MX.h('input', { type: 'password', value: '********' }),
        MX.h('button', { onclick: () => { MX.S.rol = 'paciente'; MX.render(); } }, 'Iniciar sesión'),
        MX.h('p', { class: 'nota', style: 'margin-top: 20px;' }, 'Uso exclusivo de la comunidad universitaria.')
    );
};

// 2. PANTALLA: MENU
MX.pantallaMenu = () => {
    return MX.h('div', { class: 'card' },
        MX.h('header', {}, MX.h('h1', {}, 'MEDINEX - Sistema de Citas'), MX.h('span', {}, 'Rol: ' + MX.S.rol)),
        MX.h('h3', {}, 'Selecciona una acción:'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'reservar'; MX.render(); }, style: 'margin: 10px' }, 'Reservar Cita'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'indicadores'; MX.render(); }, style: 'margin: 10px' }, 'Indicadores'),
        MX.h('button', { onclick: () => { MX.S.rol = null; MX.render(); }, class: 'rojo' }, 'Cerrar Sesión')
    );
};

// 3. PANTALLA: RESERVAR
MX.pantallaReservar = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Reservar cita'),
        MX.h('label', {}, 'Profesional:', MX.sel(MX.profesionales.map(p => ({ v: p.id, t: p.nombre })), 'P1', null)),
        MX.h('button', { onclick: () => { MX.toast('Cita agendada'); MX.pantallaActual = 'menu'; MX.render(); } }, 'Agendar Cita'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); } }, 'Volver')
    );
};

// 4. PANTALLA: INDICADORES
MX.pantallaIndicadores = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Panel de Indicadores'),
        MX.h('div', { class: 'kpis' }, MX.h('div', { class: 'kpi' }, MX.h('b', {}, '15'), 'Citas')),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); } }, 'Volver al menú')
    );
};

// ENRUTADOR Y RENDERIZADO
MX.render = () => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    if (!MX.S.rol) {
        app.append(MX.pantallaLogin());
    } else {
        let pantalla = MX.pantallaMenu();
        if (MX.pantallaActual === 'reservar') pantalla = MX.pantallaReservar();
        if (MX.pantallaActual === 'indicadores') pantalla = MX.pantallaIndicadores();
        app.append(pantalla);
    }
};

// INICIALIZAR
window.onload = () => {
    MX.render();
};
