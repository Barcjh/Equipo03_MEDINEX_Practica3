window.MX = window.MX || {};

// Función auxiliar para crear la barra lateral (Sidebar)
MX.crearSidebar = (activo) => {
    return MX.h('div', { class: 'sidebar' },
        MX.h('h2', {}, '+ MEDINEX'),
        MX.h('div', { class: 'sidebar-nav' },
            MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); }, style: activo === 'menu' ? 'background: rgba(255,255,255,0.1); font-weight: bold;' : '' }, 'Panel principal'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'reservar'; MX.render(); }, style: activo === 'reservar' ? 'background: rgba(255,255,255,0.1); font-weight: bold;' : '' }, 'Reservar cita'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'agenda'; MX.render(); }, style: activo === 'agenda' ? 'background: rgba(255,255,255,0.1); font-weight: bold;' : '' }, 'Mi agenda'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'indicadores'; MX.render(); }, style: activo === 'indicadores' ? 'background: rgba(255,255,255,0.1); font-weight: bold;' : '' }, 'Indicadores'),
            MX.h('button', { class: 'logout', onclick: () => { MX.S.rol = null; MX.pantallaActual = 'menu'; MX.render(); } }, 'Cerrar sesión')
        )
    );
};

// 1. PANTALLA: LOGIN (Diseño de dos columnas como en Figma)
MX.pantallaLogin = () => {
    return MX.h('div', { class: 'layout', style: 'height: 100vh;' },
        // Columna izquierda (Azul)
        MX.h('div', { class: 'sidebar', style: 'width: 45%; justify-content: center; padding: 3rem;' },
            MX.h('h1', { style: 'font-size: 2rem; margin-bottom: 1rem;' }, 'Una atención mejor organizada.'),
            MX.h('p', { style: 'opacity: 0.8; margin-bottom: 2rem;' }, 'Un espacio común para coordinar las citas, los horarios y la atención administrativa de nuestra comunidad.'),
            MX.h('p', { style: 'font-size: 0.8rem; opacity: 0.6; margin-top: auto;' }, 'Campus central · Gestión administrativa')
        ),
        // Columna derecha (Formulario)
        MX.h('div', { class: 'main-content', style: 'display: flex; align-items: center; justify-content: center;' },
            MX.h('div', { style: 'width: 100%; max-width: 400px;' },
                MX.h('h2', { style: 'color: #1f3864; font-size: 2rem; margin-bottom: 0.5rem;' }, 'Bienvenido a MEDINEX'),
                MX.h('p', { class: 'nota', style: 'margin-bottom: 2rem;' }, 'Inicia sesión con tu cuenta institucional para acceder a tu espacio de trabajo.'),
                
                MX.h('label', {}, 'CORREO INSTITUCIONAL *'),
                MX.h('input', { type: 'email', value: 'lucia.torres@universidad.edu', style: 'margin-bottom: 1rem;' }),
                
                MX.h('label', {}, 'CONTRASEÑA *'),
                MX.h('input', { type: 'password', value: '********', style: 'margin-bottom: 1.5rem;' }),
                
                MX.h('button', { 
                    onclick: () => { MX.S.rol = 'paciente'; MX.pantallaActual = 'menu'; MX.render(); },
                    style: 'width: 100%; padding: 0.8rem; font-size: 1rem;'
                }, 'Iniciar sesión')
            )
        )
    );
};

// 2. PANTALLA: PANEL PRINCIPAL
MX.pantallaMenu = () => {
    return MX.h('div', { class: 'layout' },
        MX.crearSidebar('menu'),
        MX.h('div', { class: 'main-content' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Panel principal'),
            MX.h('p', {}, 'Bienvenido al sistema de gestión de citas administrativas.'),
            MX.h('div', { class: 'kpis', style: 'margin-top: 2rem;' },
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '14'), 'Citas de hoy'),
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '6'), 'Disponibles'),
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '2'), 'Canceladas')
            )
        )
    );
};

// 3. PANTALLA: RESERVAR CITA
MX.pantallaReservar = () => {
    return MX.h('div', { class: 'layout' },
        MX.crearSidebar('reservar'),
        MX.h('div', { class: 'main-content' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Reservar cita'),
            MX.h('div', { class: 'card' },
                MX.h('label', {}, 'Nombre completo del paciente:'),
                MX.h('input', { type: 'text', placeholder: 'Ej. Luis Mora', style: 'margin-bottom: 1rem;' }),
                MX.h('label', {}, 'Matrícula o número de empleado:'),
                MX.h('input', { type: 'text', placeholder: 'Ej. 202511001', style: 'margin-bottom: 1rem;' }),
                MX.h('label', {}, 'Servicio requerido:'),
                MX.h('select', { style: 'margin-bottom: 1rem;' }, 
                    MX.h('option', {}, 'Consulta general'), MX.h('option', {}, 'Nutrición'), MX.h('option', {}, 'Psicología')
                ),
                MX.h('button', { onclick: () => { MX.toast('Cita registrada con éxito'); MX.pantallaActual = 'menu'; MX.render(); } }, 'Confirmar reserva')
            )
        )
    );
};

// 4. PANTALLA: AGENDA
MX.pantallaAgenda = () => {
    return MX.h('div', { class: 'layout' },
        MX.crearSidebar('agenda'),
        MX.h('div', { class: 'main-content' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Mi agenda'),
            MX.h('div', { class: 'tw' },
                MX.h('table', {},
                    MX.h('thead', {}, MX.h('tr', {}, MX.h('th', {}, 'Hora'), MX.h('th', {}, 'Paciente'), MX.h('th', {}, 'Estado'))),
                    MX.h('tbody', {},
                        MX.h('tr', {}, MX.h('td', {}, '09:00'), MX.h('td', {}, 'Luis Mora'), MX.h('td', { style: 'color: green;' }, 'Atendida')),
                        MX.h('tr', {}, MX.h('td', {}, '09:30'), MX.h('td', {}, 'Eva Rojas'), MX.h('td', { style: 'color: red;' }, 'No presentada')),
                        MX.h('tr', {}, MX.h('td', {}, '10:00'), MX.h('td', {}, 'Iván Cruz'), MX.h('td', {}, 'Confirmada'))
                    )
                )
            )
        )
    );
};

// 5. PANTALLA: INDICADORES
MX.pantallaIndicadores = () => {
    return MX.h('div', { class: 'layout' },
        MX.crearSidebar('indicadores'),
        MX.h('div', { class: 'main-content' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Reportes operativos'),
            MX.h('div', { class: 'kpis', style: 'margin-top: 2rem;' },
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '420'), 'Citas totales'),
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '400'), 'Atendidas'),
                MX.h('div', { class: 'kpi' }, MX.h('b', {}, '20'), 'Canceladas')
            )
        )
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
        if (MX.pantallaActual === 'indicadores') pantalla = MX.pantallaIndicadores();
        
        app.append(pantalla);
    }
};

// INICIALIZAR
window.onload = () => {
    if (MX.seed) MX.seed();
    MX.pantallaActual = 'menu';
    MX.render();
};
