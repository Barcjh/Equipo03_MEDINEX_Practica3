window.MX = window.MX || {};

// 1. PANTALLA: LOGIN
MX.pantallaLogin = () => {
    return MX.h('div', { class: 'card narrow', style: 'text-align:center; margin-top: 10vh;' },
        MX.h('h2', {}, 'Bienvenido a MEDINEX'),
        MX.h('p', { class: 'nota' }, 'Inicia sesión con tu cuenta institucional.'),
        MX.h('input', { type: 'email', placeholder: 'Correo institucional', value: 'lucia.torres@universidad.edu' }),
        MX.h('input', { type: 'password', placeholder: 'Contraseña', value: '********' }),
        MX.h('button', { onclick: () => { MX.S.rol = 'paciente'; MX.pantallaActual = 'menu'; MX.render(); } }, 'Iniciar sesión'),
        MX.h('p', { class: 'nota', style: 'margin-top: 20px;' }, 'Uso exclusivo de la comunidad universitaria.')
    );
};

// 2. PANTALLA: MENÚ PRINCIPAL
MX.pantallaMenu = () => {
    return MX.h('div', { class: 'card' },
        MX.h('header', {}, 
            MX.h('h1', {}, 'MEDINEX - Sistema de Citas'),
            MX.h('span', {}, 'Rol: ' + MX.S.rol)
        ),
        MX.h('h3', {}, 'Selecciona una acción:'),
        MX.h('div', { class: 'grid' },
            MX.h('button', { onclick: () => { MX.pantallaActual = 'reservar'; MX.render(); } }, 'Reservar Cita (Paciente)'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'agenda'; MX.render(); } }, 'Ver Agenda (Médico)'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'recepcion'; MX.render(); } }, 'Recepción'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'indicadores'; MX.render(); } }, 'Indicadores')
        ),
        MX.h('button', { onclick: () => { MX.S.rol = null; MX.pantallaActual = 'menu'; MX.render(); }, class: 'rojo', style: 'margin-top: 20px;' }, 'Cerrar Sesión')
    );
};

// 3. PANTALLA: RESERVAR CITA (Usa las reglas de store.js)
MX.pantallaReservar = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Reservar cita (Autoservicio)'),
        MX.h('label', {}, 'Nombre del paciente:', MX.h('input', { id: 'inp-nombre' })),
        MX.h('label', {}, 'Matrícula:', MX.h('input', { id: 'inp-mat' })),
        MX.h('label', {}, 'Profesional:', 
            MX.sel(MX.profesionales.map(p => ({ v: p.id, t: p.nombre })), 'P1', null)
        ),
        // Aquí se podría agregar la lógica de reserva conectada a store.js
        MX.h('button', { onclick: () => { MX.toast('Función conectada a store.js (simulada)'); MX.pantallaActual = 'menu'; MX.render(); } }, 'Agendar Cita'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); }, style: 'background:#555' }, 'Volver al menú'),
        MX.h('p', { class: 'nota' }, 'Nota: Esta pantalla es una demostración visual de la Práctica 2.')
    );
};

// 4. PANTALLA: AGENDA
MX.pantallaAgenda = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Agenda del Profesional'),
        MX.h('p', {}, 'Aquí se muestran los horarios y bloqueos.'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); } }, 'Volver al menú')
    );
};

// 5. PANTALLA: RECEPCIÓN
MX.pantallaRecepcion = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Recepción - Registro Asistido'),
        MX.h('p', {}, 'Búsqueda y registro de citas presenciales.'),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); } }, 'Volver al menú')
    );
};

// 6. PANTALLA: INDICADORES
MX.pantallaIndicadores = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Panel de Indicadores'),
        MX.h('div', { class: 'kpis' },
            MX.h('div', { class: 'kpi' }, MX.h('b', {}, '15'), 'Citas Totales'),
            MX.h('div', { class: 'kpi' }, MX.h('b', {}, '3'), 'Canceladas')
        ),
        MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); } }, 'Volver al menú')
    );
};

// ENRUTADOR Y RENDERIZADO
MX.render = () => {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = '';
    
    if (!MX.S.rol) {
        app.append(MX.pantallaLogin());
    } else {
        let pantalla = MX.pantallaMenu();
        if (MX.pantallaActual === 'reservar') pantalla = MX.pantallaReservar();
        if (MX.pantallaActual === 'agenda') pantalla = MX.pantallaAgenda();
        if (MX.pantallaActual === 'recepcion') pantalla = MX.pantallaRecepcion();
        if (MX.pantallaActual === 'indicadores') pantalla = MX.pantallaIndicadores();
        
        app.append(pantalla);
    }
};

// INICIALIZAR (Carga los datos semilla del store.js y muestra la pantalla)
window.onload = () => {
    if (MX.seed) MX.seed(); // Inicializa las franjas y citas de store.js
    MX.pantallaActual = 'menu';
    MX.render();
};
