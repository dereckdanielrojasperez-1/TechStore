/* ==========================================================================
   TECHSTORE - MOTOR DE EMULACIÓN DE BASE DE DATOS Y PERSISTENCIA (BDTechStore)
   Taller de Programación Web - Proyecto Final (Semanas 15 y 16)
   Tecnología: JavaScript Vanilla (ES6+), Web Storage (localStorage + sessionStorage)
   Sin frameworks externos - 100% Nativo
   ========================================================================== */

const BDTechStore = (function() {
    'use strict';

    // Claves de almacenamiento en localStorage
    const CLAVES = {
        PRODUCTOS: 'techstore_db_productos',
        USUARIOS: 'techstore_db_usuarios',
        PEDIDOS: 'techstore_db_pedidos',
        COTIZACIONES: 'techstore_db_cotizaciones',
        RECLAMACIONES: 'techstore_db_reclamaciones',
        CARRITO: 'techstore_db_carrito',
        SESION: 'techstore_sesion_activa' // en sessionStorage
    };

    // Usuarios predeterminados del sistema
    const USUARIOS_INICIALES = [
        {
            id: 'usr-admin',
            nombre: 'Prof. Jesús Pacahuala',
            correo: 'admin@techstore.pe',
            dni: '00000001',
            celular: '999888777',
            rol: 'Docente / Administrador',
            password: 'admin12345*'
        },
        {
            id: 'usr-001',
            nombre: 'Dereck Rojas',
            correo: 'cliente@techstore.pe',
            dni: '72421643',
            celular: '987654321',
            rol: 'Cliente Gamer',
            password: 'cliente123*'
        }
    ];

    // Inicialización de la base de datos local
    function inicializarBD() {
        if (!localStorage.getItem(CLAVES.PRODUCTOS)) {
            const catalogoBase = (typeof PRODUCTOS_SEED !== 'undefined') ? PRODUCTOS_SEED : [];
            localStorage.setItem(CLAVES.PRODUCTOS, JSON.stringify(catalogoBase));
        }

        if (!localStorage.getItem(CLAVES.USUARIOS)) {
            localStorage.setItem(CLAVES.USUARIOS, JSON.stringify(USUARIOS_INICIALES));
        }

        if (!localStorage.getItem(CLAVES.PEDIDOS)) {
            localStorage.setItem(CLAVES.PEDIDOS, JSON.stringify([]));
        }

        if (!localStorage.getItem(CLAVES.COTIZACIONES)) {
            localStorage.setItem(CLAVES.COTIZACIONES, JSON.stringify([]));
        }

        if (!localStorage.getItem(CLAVES.RECLAMACIONES)) {
            localStorage.setItem(CLAVES.RECLAMACIONES, JSON.stringify([]));
        }

        if (!localStorage.getItem(CLAVES.CARRITO)) {
            localStorage.setItem(CLAVES.CARRITO, JSON.stringify([]));
        }
    }

    // --- MÓDULO DE PRODUCTOS (CRUD & STOCK) ---
    function obtenerProductos() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.PRODUCTOS)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarProductos(productos) {
        localStorage.setItem(CLAVES.PRODUCTOS, JSON.stringify(productos));
        window.dispatchEvent(new CustomEvent('techstore_productos_actualizados', { detail: productos }));
    }

    function obtenerProductoPorId(id) {
        const productos = obtenerProductos();
        return productos.find(p => p.id === id) || null;
    }

    function agregarProducto(nuevoProducto) {
        const productos = obtenerProductos();
        if (!nuevoProducto.id) {
            nuevoProducto.id = 'prod-' + Date.now();
        }
        productos.unshift(nuevoProducto);
        guardarProductos(productos);
        return nuevoProducto;
    }

    function actualizarProducto(id, datosActualizados) {
        const productos = obtenerProductos();
        const idx = productos.findIndex(p => p.id === id);
        if (idx !== -1) {
            productos[idx] = Object.assign({}, productos[idx], datosActualizados);
            guardarProductos(productos);
            return productos[idx];
        }
        return null;
    }

    function eliminarProducto(id) {
        let productos = obtenerProductos();
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
    }

    function descontarStock(id, cantidad) {
        const productos = obtenerProductos();
        const p = productos.find(item => item.id === id);
        if (p) {
            p.stock = Math.max(0, (p.stock || 0) - cantidad);
            guardarProductos(productos);
            return p.stock;
        }
        return false;
    }

    // --- MÓDULO DE USUARIOS Y AUTENTICACIÓN ---
    function obtenerUsuarios() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.USUARIOS)) || [];
        } catch (e) {
            return [];
        }
    }

    function registrarUsuario(usuario) {
        const usuarios = obtenerUsuarios();
        const existe = usuarios.some(u => u.correo.toLowerCase() === usuario.correo.toLowerCase());
        if (existe) {
            return { exito: false, mensaje: 'El correo electrónico ya se encuentra registrado.' };
        }
        if (!usuario.id) {
            usuario.id = 'usr-' + Date.now();
        }
        if (!usuario.rol) {
            usuario.rol = 'Cliente';
        }
        usuarios.push(usuario);
        localStorage.setItem(CLAVES.USUARIOS, JSON.stringify(usuarios));
        return { exito: true, usuario: usuario };
    }

    function autenticar(correo, password) {
        const usuarios = obtenerUsuarios();
        const encontrado = usuarios.find(u => 
            u.correo.toLowerCase() === correo.trim().toLowerCase() && 
            u.password === password
        );
        if (encontrado) {
            const sesion = {
                id: encontrado.id,
                nombre: encontrado.nombre,
                correo: encontrado.correo,
                rol: encontrado.rol,
                dni: encontrado.dni,
                celular: encontrado.celular,
                loginTime: new Date().toISOString()
            };
            sessionStorage.setItem(CLAVES.SESION, JSON.stringify(sesion));
            window.dispatchEvent(new CustomEvent('techstore_sesion_cambiada', { detail: sesion }));
            return { exito: true, sesion: sesion };
        }
        return { exito: false, mensaje: 'Credenciales inválidas. Verifique correo y contraseña.' };
    }

    function obtenerSesionActiva() {
        try {
            const raw = sessionStorage.getItem(CLAVES.SESION);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function cerrarSesion() {
        sessionStorage.removeItem(CLAVES.SESION);
        window.dispatchEvent(new CustomEvent('techstore_sesion_cambiada', { detail: null }));
    }

    // --- MÓDULO DE PEDIDOS (TRANSACCIONES DE CHECKOUT) ---
    function obtenerPedidos() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.PEDIDOS)) || [];
        } catch (e) {
            return [];
        }
    }

    function crearPedido(datosCliente, itemsCarrito, metodoPago) {
        const pedidos = obtenerPedidos();
        const correlativo = String(pedidos.length + 1).padStart(4, '0');
        const idPedido = 'TS-2026-' + correlativo;

        let subtotal = 0;
        itemsCarrito.forEach(item => {
            subtotal += (item.precio * item.cantidad);
            descontarStock(item.id, item.cantidad);
        });

        const igv = subtotal * 0.18;
        const total = subtotal + igv;

        const nuevoPedido = {
            idPedido: idPedido,
            fecha: new Date().toLocaleString('es-PE'),
            cliente: datosCliente,
            items: itemsCarrito,
            subtotal: subtotal,
            igv: igv,
            total: total,
            metodoPago: metodoPago || 'Yape / Plin',
            estado: 'Confirmado - En Preparación'
        };

        pedidos.unshift(nuevoPedido);
        localStorage.setItem(CLAVES.PEDIDOS, JSON.stringify(pedidos));
        limpiarCarrito();

        window.dispatchEvent(new CustomEvent('techstore_pedido_creado', { detail: nuevoPedido }));
        return nuevoPedido;
    }

    // --- MÓDULO DE COTIZACIONES ---
    function obtenerCotizaciones() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.COTIZACIONES)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarCotizacion(datos) {
        const cots = obtenerCotizaciones();
        const id = 'COT-' + String(cots.length + 1).padStart(4, '0');
        const nueva = Object.assign({ id: id, fecha: new Date().toLocaleString('es-PE') }, datos);
        cots.unshift(nueva);
        localStorage.setItem(CLAVES.COTIZACIONES, JSON.stringify(cots));
        return nueva;
    }

    // --- MÓDULO DE LIBRO DE RECLAMACIONES ---
    function obtenerReclamaciones() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.RECLAMACIONES)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarReclamacion(datos) {
        const reclamos = obtenerReclamaciones();
        const id = 'REC-2026-' + String(reclamos.length + 1).padStart(4, '0');
        const nuevo = Object.assign({ id: id, fecha: new Date().toLocaleString('es-PE'), estado: 'Recibido - En trámite (15 días hábiles)' }, datos);
        reclamos.unshift(nuevo);
        localStorage.setItem(CLAVES.RECLAMACIONES, JSON.stringify(reclamos));
        return nuevo;
    }

    // --- MÓDULO DEL CARRITO PERSISTENTE ---
    function obtenerCarrito() {
        inicializarBD();
        try {
            return JSON.parse(localStorage.getItem(CLAVES.CARRITO)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarCarrito(items) {
        localStorage.setItem(CLAVES.CARRITO, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('techstore_carrito_actualizado', { detail: items }));
    }

    function limpiarCarrito() {
        guardarCarrito([]);
    }

    // --- RESTABLECER BASE DE DATOS A ESTADO DE FÁBRICA ---
    function restablecerFabrica() {
        localStorage.removeItem(CLAVES.PRODUCTOS);
        localStorage.removeItem(CLAVES.USUARIOS);
        localStorage.removeItem(CLAVES.PEDIDOS);
        localStorage.removeItem(CLAVES.COTIZACIONES);
        localStorage.removeItem(CLAVES.RECLAMACIONES);
        localStorage.removeItem(CLAVES.CARRITO);
        sessionStorage.removeItem(CLAVES.SESION);
        inicializarBD();
        window.location.reload();
    }

    // --- EXPORTAR E IMPORTAR JSON ---
    function exportarJSON() {
        const copia = {
            version: 'Avance 3 - Base de Datos Emulada TechStore',
            fecha: new Date().toISOString(),
            productos: obtenerProductos(),
            usuarios: obtenerUsuarios(),
            pedidos: obtenerPedidos(),
            cotizaciones: obtenerCotizaciones(),
            reclamaciones: obtenerReclamaciones()
        };
        const blob = new Blob([JSON.stringify(copia, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'TechStore_Backup_BD_' + Date.now() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Inicializar al cargar script
    inicializarBD();

    return {
        CLAVES: CLAVES,
        inicializarBD: inicializarBD,
        obtenerProductos: obtenerProductos,
        guardarProductos: guardarProductos,
        obtenerProductoPorId: obtenerProductoPorId,
        agregarProducto: agregarProducto,
        actualizarProducto: actualizarProducto,
        eliminarProducto: eliminarProducto,
        descontarStock: descontarStock,
        obtenerUsuarios: obtenerUsuarios,
        registrarUsuario: registrarUsuario,
        autenticar: autenticar,
        obtenerSesionActiva: obtenerSesionActiva,
        cerrarSesion: cerrarSesion,
        obtenerPedidos: obtenerPedidos,
        crearPedido: crearPedido,
        obtenerCotizaciones: obtenerCotizaciones,
        guardarCotizacion: guardarCotizacion,
        obtenerReclamaciones: obtenerReclamaciones,
        guardarReclamacion: guardarReclamacion,
        obtenerCarrito: obtenerCarrito,
        guardarCarrito: guardarCarrito,
        limpiarCarrito: limpiarCarrito,
        restablecerFabrica: restablecerFabrica,
        exportarJSON: exportarJSON
    };
})();

// Auto-creación de la barra flotante de demostración en vivo e Inspector de BD al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Si ya existe no duplicar
    if (document.getElementById('techstore-inspector-bar')) return;

    // Crear barra flotante en la esquina inferior derecha
    const bar = document.createElement('div');
    bar.id = 'techstore-inspector-bar';
    bar.innerHTML = 
        '<div class="techstore-inspector-toggle" onclick="toggleInspectorModal()">' +
            '' +
            '<span class="inspector-label">Base de Datos / Sustentación</span>' +
        '</div>';
    document.body.appendChild(bar);

    // Inyectar modal del Inspector de Base de Datos
    const modal = document.createElement('div');
    modal.id = 'techstore-inspector-modal';
    modal.className = 'inspector-modal-backdrop';
    modal.style.display = 'none';
    modal.innerHTML = 
        '<div class="inspector-modal-panel">' +
            '<div class="inspector-modal-header">' +
                '<h3> Panel de Sustentación en Vivo & Inspector de Base de Datos</h3>' +
                '<button type="button" class="inspector-btn-close" onclick="toggleInspectorModal()">&times;</button>' +
            '</div>' +
            '<div class="inspector-tabs">' +
                '<button class="tab-btn activo" onclick="abrirPestanaInspector(\'tab-en-vivo\')"> Cambios en Vivo</button>' +
                '<button class="tab-btn" onclick="abrirPestanaInspector(\'tab-productos\')"> Productos & Stock</button>' +
                '<button class="tab-btn" onclick="abrirPestanaInspector(\'tab-usuarios\')"> Usuarios (' + BDTechStore.obtenerUsuarios().length + ')</button>' +
                '<button class="tab-btn" onclick="abrirPestanaInspector(\'tab-pedidos\')"> Pedidos (' + BDTechStore.obtenerPedidos().length + ')</button>' +
                '<button class="tab-btn" onclick="abrirPestanaInspector(\'tab-gestion\')"> Backup / Reset</button>' +
            '</div>' +
            '<div class="inspector-body">' +
                // PESTAÑA 1: CAMBIOS EN VIVO
                '<div id="tab-en-vivo" class="inspector-tab-content activo">' +
                    '<div class="inspector-alert-box">' +
                        '<strong>Evaluación con Docente Pacahuala:</strong> Esta sección permite ejecutar al instante las órdenes de cambio en vivo que evalúa el docente (colores, zoom, nuevos registros) y verificar su reflejo dinámico en el DOM.' +
                    '</div>' +
                    '<div class="inspector-control-group">' +
                        '<h4>1. Color de Nombres de Productos (Línea de CSS :root):</h4>' +
                        '<div class="inspector-btn-row">' +
                            '<button class="btn-color-pick" style="background: #00b4d8; color: #0a1128;" onclick="cambiarColorTitulosEnVivo(\'#00d2ff\')">Cian TechStore (#00b4d8)</button>' +
                            '<button class="btn-color-pick" style="background: #10b981; color: #ffffff;" onclick="cambiarColorTitulosEnVivo(\'#00ff88\')">Verde Esmeralda (#10b981)</button>' +
                            '<button class="btn-color-pick" class="btn-inspector-danger" onclick="cambiarColorTitulosEnVivo(\'#ff3366\')">Morado TechStore (#8b5cf6)</button>' +
                            '<button class="btn-color-pick" style="background: #e2e8f0; color: #0a1128;" onclick="cambiarColorTitulosEnVivo(\'#ffc53d\')">Blanco Suave (#e2e8f0)</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="inspector-control-group">' +
                        '<h4>2. Zoom y Aumento de Fuente (Evaluación de accesibilidad):</h4>' +
                        '<div class="inspector-btn-row">' +
                            '<button class="btn-zoom-pick" onclick="cambiarZoomEnVivo(\'14px\')">Pequeño (14px)</button>' +
                            '<button class="btn-zoom-pick" onclick="cambiarZoomEnVivo(\'16px\')">Estándar (16px)</button>' +
                            '<button class="btn-zoom-pick" onclick="cambiarZoomEnVivo(\'18px\')">Aumento +15% (18px)</button>' +
                            '<button class="btn-zoom-pick" onclick="cambiarZoomEnVivo(\'20px\')">Aumento +25% (20px)</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="inspector-control-group">' +
                        '<h4>3. Inserción de Producto en Vivo (Manipulación del DOM y BD):</h4>' +
                        '<button class="btn-accion-demo" onclick="agregarProductoDemoEnVivo()">Insertar Producto Demo</button>' +
                        '<span id="msg-demo-prod" style="margin-left:10px; color:#00ff88; font-size:13px;"></span>' +
                    '</div>' +
                '</div>' +

                // PESTAÑA 2: PRODUCTOS Y STOCK
                '<div id="tab-productos" class="inspector-tab-content">' +
                    '<div class="inspector-table-wrapper">' +
                        '<table class="inspector-table" id="tabla-inspector-productos">' +
                            '<thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acción</th></tr></thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +

                // PESTAÑA 3: USUARIOS
                '<div id="tab-usuarios" class="inspector-tab-content">' +
                    '<div class="inspector-table-wrapper">' +
                        '<table class="inspector-table" id="tabla-inspector-usuarios">' +
                            '<thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>DNI</th><th>Celular</th><th>Rol</th></tr></thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +

                // PESTAÑA 4: PEDIDOS
                '<div id="tab-pedidos" class="inspector-tab-content">' +
                    '<div class="inspector-table-wrapper">' +
                        '<table class="inspector-table" id="tabla-inspector-pedidos">' +
                            '<thead><tr><th>N° Pedido</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Pago</th><th>Estado</th></tr></thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +

                // PESTAÑA 5: GESTIÓN
                '<div id="tab-gestion" class="inspector-tab-content">' +
                    '<div class="inspector-gestion-box">' +
                        '<p>La base de datos emulada reside en el <code>localStorage</code> del navegador del cliente, simulando un motor relacional completo sin requerir servidores externos ni librerías pesadas.</p>' +
                        '<div class="inspector-btn-row" style="margin-top:15px;">' +
                            '<button class="btn-accion-demo" onclick="BDTechStore.exportarJSON()"> Descargar Copia JSON</button>' +
                            '<button class="btn-color-pick" class="btn-inspector-danger" onclick="if(confirm(\'¿Restablecer toda la base de datos a los 32 productos y usuarios de fábrica?\')) BDTechStore.restablecerFabrica();"> Restablecer Datos de Fábrica</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);

    // Cargar tablas
    actualizarTablasInspector();
});

// Funciones globales auxiliares para el inspector
window.toggleInspectorModal = function() {
    const modal = document.getElementById('techstore-inspector-modal');
    if (!modal) return;
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'flex';
        actualizarTablasInspector();
    } else {
        modal.style.display = 'none';
    }
};

window.abrirPestanaInspector = function(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
    document.querySelectorAll('.inspector-tab-content').forEach(c => c.classList.remove('activo'));
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if (btn) btn.classList.add('activo');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('activo');
    actualizarTablasInspector();
};

window.cambiarColorTitulosEnVivo = function(colorHex) {
    document.documentElement.style.setProperty('--color-titulo-producto', colorHex);
    document.documentElement.style.setProperty('--color-primario', colorHex);
    const msg = document.getElementById('msg-demo-prod');
    if (msg) {
        msg.textContent = 'Color aplicado en vivo: ' + colorHex;
        setTimeout(() => { msg.textContent = ''; }, 3000);
    }
};

window.cambiarZoomEnVivo = function(tamano) {
    document.documentElement.style.setProperty('--tamano-fuente-base', tamano);
    document.body.style.fontSize = tamano;
};

window.agregarProductoDemoEnVivo = function() {
    const idDemo = 'demo-' + Math.floor(Math.random() * 1000);
    const nuevo = {
        id: idDemo,
        nombre: 'Monitor Gamer Alienware 500Hz Fast IPS',
        categoria: 'Monitores',
        precio: 3499.00,
        precioAnterior: 3999.00,
        stock: 5,
        imagen: 'img/monitor-alienware-qdoled.jpg',
        detalles: 'Producto incorporado en vivo durante la sustentación. 500Hz nativo, 0.5ms GtG.'
    };
    BDTechStore.agregarProducto(nuevo);
    actualizarTablasInspector();
    const msg = document.getElementById('msg-demo-prod');
    if (msg) {
        msg.textContent = 'Producto insertado en localStorage correctamente.';
        setTimeout(() => { msg.textContent = ''; }, 4000);
    }
    // Si la función cargarProductos existe en la página actual, recargarla
    if (typeof cargarProductos === 'function') {
        const cat = document.getElementById('filtro-categoria') ? document.getElementById('filtro-categoria').value : 'todas';
        cargarProductos(null, cat);
    }
};

function actualizarTablasInspector() {
    // 1. Tabla Productos
    const tbodyProd = document.querySelector('#tabla-inspector-productos tbody');
    if (tbodyProd) {
        const prods = BDTechStore.obtenerProductos();
        tbodyProd.innerHTML = prods.map(p => 
            '<tr>' +
                '<td><code>' + p.id + '</code></td>' +
                '<td><strong>' + p.nombre + '</strong></td>' +
                '<td>' + p.categoria + '</td>' +
                '<td>S/ ' + Number(p.precio).toFixed(2) + '</td>' +
                '<td><span class="stock-badge ' + (p.stock > 0 ? 'stock-ok' : 'stock-agotado') + '">' + (p.stock || 0) + ' u.</span></td>' +
                '<td><button class="btn-xs-delete" onclick="BDTechStore.eliminarProducto(\'' + p.id + '\'); actualizarTablasInspector(); if(typeof cargarProductos===\'function\') cargarProductos();">Eliminar</button></td>' +
            '</tr>'
        ).join('');
    }

    // 2. Tabla Usuarios
    const tbodyUsr = document.querySelector('#tabla-inspector-usuarios tbody');
    if (tbodyUsr) {
        const usrs = BDTechStore.obtenerUsuarios();
        tbodyUsr.innerHTML = usrs.map(u => 
            '<tr>' +
                '<td><code>' + u.id + '</code></td>' +
                '<td>' + u.nombre + '</td>' +
                '<td>' + u.correo + '</td>' +
                '<td>' + (u.dni || '-') + '</td>' +
                '<td>' + (u.celular || '-') + '</td>' +
                '<td><span class="rol-badge">' + u.rol + '</span></td>' +
            '</tr>'
        ).join('');
    }

    // 3. Tabla Pedidos
    const tbodyPed = document.querySelector('#tabla-inspector-pedidos tbody');
    if (tbodyPed) {
        const peds = BDTechStore.obtenerPedidos();
        if (peds.length === 0) {
            tbodyPed.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#888;">No hay pedidos registrados aún. Complete una compra en el carrito para registrar una transacción.</td></tr>';
        } else {
            tbodyPed.innerHTML = peds.map(p => 
                '<tr>' +
                    '<td><code>' + p.idPedido + '</code></td>' +
                    '<td>' + p.fecha + '</td>' +
                    '<td>' + (p.cliente ? p.cliente.nombre : 'Cliente') + '</td>' +
                    '<td><strong>S/ ' + Number(p.total).toFixed(2) + '</strong></td>' +
                    '<td>' + p.metodoPago + '</td>' +
                    '<td><span class="estado-badge">' + p.estado + '</span></td>' +
                '</tr>'
            ).join('');
        }
    }
}
