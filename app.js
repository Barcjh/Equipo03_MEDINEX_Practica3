window.MX = window.MX || {};

// 1. PANTALLA: LOGIN
MX.pantallaLogin = () => {
    return MX.h('div', { class: 'card narrow', style: 'text-align:center; margin-top: 10vh;' },
        MX.h('h2', {}, 'Bienvenido a MEDINEX'),
        MX.h('p', { class: 'nota' }, 'Inicia sesión con tu cuenta institucional.'),
        MX.h('input', { type: 'email', placeholder: 'Correo institucional', value: 'lucia.torres@universidad.edu' }),
        MX.h('input', { type: 'password', placeholder: 'Contraseña', value: '********' }),
        MX.h('button', { onclick: () => { MX.S.rol = 'paciente'; MX.render(); } }, 'Iniciar sesión'),
        MX.h('p', { class: 'nota', style: 'margin-top: 20px;' }, 'Uso exclusivo de la comunidad universitaria.')
    );
};

// 2. PANTALLA: SELECCIÓN DE ROL (Simula el inicio de sesión)
MX.pantallaMenu = () => {
    return MX.h('div', { class: 'card' },
        MX.h('header', {}, 
            MX.h('h1', {}, 'MEDINEX - Sistema de Citas'),
            MX.h('span', {}, 'Rol: ' + MX.S.rol)
        ),
        MX.h('h3', {}, 'Selecciona una acción:'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'reservar', style: 'margin: 10px' }, 'Reservar Cita (Paciente)'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'agenda', style: 'margin: 10px' }, 'Ver Agenda (Médico)'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'recepcion', style: 'margin: 10px' }, 'Recepción'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'indicadores', style: 'margin: 10px' }, 'Indicadores'),
        MX.h('button', { onclick: () => { MX.S.rol = null; MX.pantallaActual = 'login'; MX.render(); }, class: 'rojo' }, 'Cerrar Sesión')
    );
};

// 3. PANTALLA: RESERVAR CITA
MX.pantallaReservar = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Reservar cita (Autoservicio)'),
        MX.h('label', {}, 'Nombre del paciente:', MX.h('input', { id: 'inp-nombre' })),
        MX.h('label', {}, 'Matrícula:', MX.h('input', { id: 'inp-mat' })),
        MX.h('label', {}, 'Profesional:', 
            MX.sel(MX.profesionales.map(p => ({ v: p.id, t: p.nombre })), 'P1', null)
        ),
        MX.h('button', { onclick: () => MX.pantallaActual = 'menu' }, 'Volver al menú'),
        MX.h('p', { class: 'nota' }, 'Nota: Esta pantalla es una demostración visual.')
    );
};

// 4. PANTALLA: AGENDA (MÉDICO)
MX.pantallaAgenda = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Agenda del Profesional'),
        MX.h('p', {}, 'Aquí se muestran los horarios y bloqueos.'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'menu' }, 'Volver al menú')
    );
};

// 5. PANTALLA: RECEPCIÓN
MX.pantallaRecepcion = () => {
    return MX.h('div', { class: 'card' },
        MX.h('h2', {}, 'Recepción - Registro Asistido'),
        MX.h('p', {}, 'Búsqueda y registro de citas presenciales.'),
        MX.h('button', { onclick: () => MX.pantallaActual = 'menu' }, 'Volver al menú')
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
        MX.h('button', { onclick: () => MX.pantallaActual = 'menu' }, 'Volver al menú')
    );
};

// ENRUTADOR Y RENDERIZADO
MX.render = () => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    if (!MX.S.rol) {
        app.append(MX.pantallaLogin());
    } else {
        // Envolver el menú y las pantallas
        let pantalla = MX.pantallaMenu();
        if (MX.pantallaActual === 'reservar') pantalla = MX.pantallaReservar();
        if (MX.pantallaActual === 'agenda') pantalla = MX.pantallaAgenda();
        if (MX.pantallaActual === 'recepcion') pantalla = MX.pantallaRecepcion();
        if (MX.pantallaActual === 'indicadores') pantalla = MX.pantallaIndicadores();
        
        app.append(pantalla);
    }
};

// INICIALIZAR
window.onload = () => {
    MX.seed(); // Carga los datos semilla
    MX.pantallaActual = 'menu';
    MX.render();
};
