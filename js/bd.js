const BDTechStore = (function() {
    'use strict';
    const CLAVES = {
        PRODUCTOS: 'techstore_db_productos',
        USUARIOS: 'techstore_db_usuarios',
        PEDIDOS: 'techstore_db_pedidos',
        COTIZACIONES: 'techstore_db_cotizaciones',
        RECLAMACIONES: 'techstore_db_reclamaciones',
        CARRITO: 'techstore_db_carrito',
        SESION: 'techstore_sesion_activa' 
    };
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
    function inicializarBD() {
        var prodsGuardados = null;
        try {
            prodsGuardados = JSON.parse(localStorage.getItem(CLAVES.PRODUCTOS));
        } catch(e) {}
        if (!prodsGuardados || !Array.isArray(prodsGuardados) || prodsGuardados.length < 40) {
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
window.BDTechStore = BDTechStore;