window.MX = window.MX || {};

// 1. PANTALLA: LOGIN (Estilo Figma)
MX.pantallaLogin = () => {
    return MX.h('div', { class: 'row', style: 'height: 100vh; align-items: center; justify-content: center;' },
        MX.h('div', { class: 'card', style: 'width: 100%; max-width: 400px; padding: 2rem;' },
            MX.h('h1', { style: 'color: #1f3864; margin-bottom: 0.5rem;' }, 'Bienvenido a MEDINEX'),
            MX.h('p', { class: 'nota', style: 'margin-bottom: 2rem;' }, 'Inicia sesión con tu cuenta institucional para acceder a tu espacio de trabajo.'),
            
            MX.h('label', {}, 'CORREO INSTITUCIONAL *'),
            MX.h('input', { type: 'email', value: 'lucia.torres@universidad.edu', style: 'margin-bottom: 1rem;' }),
            
            MX.h('label', {}, 'CONTRASEÑA *'),
            MX.h('input', { type: 'password', value: '********', style: 'margin-bottom: 1.5rem;' }),
            
            MX.h('button', { 
                onclick: () => { MX.S.rol = 'paciente'; MX.pantallaActual = 'menu'; MX.render(); },
                style: 'width: 100%; padding: 0.8rem; font-size: 1rem;'
            }, 'Iniciar sesión'),
            
            MX.h('p', { class: 'nota', style: 'margin-top: 1.5rem; font-size: 0.75rem;' }, 'El acceso depende del rol asignado. Si tu cuenta no tiene un rol, solicita apoyo al área de TI.')
        )
    );
};

// 2. PANTALLA: MENÚ PRINCIPAL (Barra lateral y Panel)
MX.pantallaMenu = () => {
    return MX.h('div', { class: 'row', style: 'min-height: 100vh;' },
        // Barra lateral (Sidebar)
        MX.h('div', { style: 'background: #1f3864; color: white; width: 250px; padding: 2rem 1rem;' },
            MX.h('h2', { style: 'margin-bottom: 2rem;' }, '+ MEDINEX'),
            MX.h('p', { style: 'font-size: 0.8rem; opacity: 0.7;' }, 'Gestión administrativa'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'reservar'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; border-bottom: 1px solid #ffffff33; width: 100%; cursor: pointer;' }, 'Reservar cita'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'agenda'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; border-bottom: 1px solid #ffffff33; width: 100%; cursor: pointer;' }, 'Mi agenda'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'indicadores'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; border-bottom: 1px solid #ffffff33; width: 100%; cursor: pointer;' }, 'Indicadores'),
            MX.h('button', { onclick: () => { MX.S.rol = null; MX.pantallaActual = 'menu'; MX.render(); }, style: 'background: transparent; border: none; color: #f8cbad; text-align: left; padding: 1rem 0; margin-top: 2rem; width: 100%; cursor: pointer;' }, 'Cerrar sesión')
        ),
        // Contenido principal
        MX.h('div', { style: 'flex: 1; padding: 2rem; background: #f4f6fa;' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Panel principal'),
            MX.h('p', {}, 'Bienvenido al sistema de gestión de citas administrativas.'),
            MX.h('div', { class: 'grid' },
                MX.h('div', { class: 'card' }, MX.h('h3', {}, 'Citas de hoy'), MX.h('p', { style: 'font-size: 2rem; margin: 0;' }, '14')),
                MX.h('div', { class: 'card' }, MX.h('h3', {}, 'Disponibles'), MX.h('p', { style: 'font-size: 2rem; margin: 0;' }, '6'))
            )
        )
    );
};

// 3. PANTALLA: RESERVAR (Formulario)
MX.pantallaReservar = () => {
    return MX.h('div', { class: 'row', style: 'min-height: 100vh;' },
        MX.h('div', { style: 'background: #1f3864; color: white; width: 250px; padding: 2rem 1rem;' },
            MX.h('h2', {}, '+ MEDINEX'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; width: 100%; cursor: pointer;' }, '< Volver al panel')
        ),
        MX.h('div', { style: 'flex: 1; padding: 2rem; background: #f4f6fa;' },
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

// 4. PANTALLA: AGENDA (Tabla)
MX.pantallaAgenda = () => {
    return MX.h('div', { class: 'row', style: 'min-height: 100vh;' },
        MX.h('div', { style: 'background: #1f3864; color: white; width: 250px; padding: 2rem 1rem;' },
            MX.h('h2', {}, '+ MEDINEX'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; width: 100%; cursor: pointer;' }, '< Volver al panel')
        ),
        MX.h('div', { style: 'flex: 1; padding: 2rem; background: #f4f6fa;' },
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

// 5. PANTALLA: INDICADORES (Tarjetas KPI)
MX.pantallaIndicadores = () => {
    return MX.h('div', { class: 'row', style: 'min-height: 100vh;' },
        MX.h('div', { style: 'background: #1f3864; color: white; width: 250px; padding: 2rem 1rem;' },
            MX.h('h2', {}, '+ MEDINEX'),
            MX.h('button', { onclick: () => { MX.pantallaActual = 'menu'; MX.render(); }, style: 'background: transparent; border: none; color: white; text-align: left; padding: 1rem 0; width: 100%; cursor: pointer;' }, '< Volver al panel')
        ),
        MX.h('div', { style: 'flex: 1; padding: 2rem; background: #f4f6fa;' },
            MX.h('h1', { style: 'color: #1f3864;' }, 'Reportes operativos'),
            MX.h('div', { class: 'kpis' },
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
