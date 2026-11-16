// funcion para abrir y cerrar el menu en celulares
function toggleMenu() {
    let menu = document.getElementById("menu-navegacion");
    let lista = document.querySelector(".nav-lista");
    if (menu) {
        menu.classList.toggle("activo");
    }
    if (lista) {
        lista.classList.toggle("activo");
    }
}

// funcion para resaltar la tarjeta al pasar el mouse
function resaltarTarjeta(elemento) {
    elemento.classList.add("tarjeta-resaltada");
}

// funcion para quitar el resaltado de la tarjeta
function quitarResaltado(elemento) {
    elemento.classList.remove("tarjeta-resaltada");
}

// funcion para cargar los productos dinamicamente en el dom
function cargarProductos(limite, categoriaFiltro) {
    let contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    let indices = filtrarIndicesPorCategoria(categoriaFiltro || "todas");
    let total = indices.length;
    if (limite && limite < total) {
        total = limite;
    }

    for (let i = 0; i < total; i++) {
        let idx = indices[i];
        let tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        tarjeta.setAttribute("onmouseover", "resaltarTarjeta(this)");
        tarjeta.setAttribute("onmouseout", "quitarResaltado(this)");

        tarjeta.innerHTML = 
            '<div class="tarjeta-figura">' +
                '<span class="tarjeta-categoria">' + categorias[idx] + '</span>' +
                '<img src="' + imagenes[idx] + '" alt="' + nombres[idx] + '" class="tarjeta-imagen">' +
            '</div>' +
            '<div class="tarjeta-cuerpo">' +
                '<h3 class="tarjeta-titulo">' + nombres[idx] + '</h3>' +
                '<p class="tarjeta-detalle">' + detalles[idx] + '</p>' +
                '<p class="tarjeta-precio">S/ ' + precios[idx].toFixed(2) + '</p>' +
                '<div class="tarjeta-acciones">' +
                    '<button class="boton boton-secundario" onclick="abrirModalDetalle(' + idx + ')">Detalle</button>' +
                    '<button class="boton boton-primario" onclick="agregarCarrito(' + idx + ')">Agregar</button>' +
                '</div>' +
            '</div>';

        contenedor.appendChild(tarjeta);
    }
}

// funcion para filtrar productos por categoria
function filtrarCategoria() {
    let select = document.getElementById("filtro-categoria");
    if (select) {
        let valor = select.value;
        cargarProductos(null, valor);
    }
}

// funcion para abrir la ventana modal de detalle
function abrirModalDetalle(indice) {
    let modal = document.getElementById("modal-detalle");
    let cuerpo = document.getElementById("modal-detalle-contenido");
    if (!modal || !cuerpo) {
        return;
    }

    cuerpo.innerHTML = 
        '<div style="text-align: center; margin-bottom: 15px;">' +
            '<img src="' + imagenes[indice] + '" alt="' + nombres[indice] + '" style="max-height: 180px; max-width: 100%; object-fit: contain;">' +
        '</div>' +
        '<h3 style="color: #ffffff; margin-bottom: 10px;">' + nombres[indice] + '</h3>' +
        '<p style="color: #00b4d8; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Categoría: ' + categorias[indice] + '</p>' +
        '<p style="color: #a0b2c6; font-size: 14px; margin-bottom: 15px;">' + detalles[indice] + '</p>' +
        '<p style="color: #00b4d8; font-size: 22px; font-weight: bold; margin-bottom: 20px;">S/ ' + precios[indice].toFixed(2) + '</p>' +
        '<div style="text-align: right;">' +
            '<button class="boton boton-primario" onclick="agregarCarrito(' + indice + '); cerrarModalDetalle();">Agregar al Carrito</button>' +
        '</div>';

    modal.style.display = "flex";
}

// funcion para cerrar la ventana modal de detalle
function cerrarModalDetalle() {
    let modal = document.getElementById("modal-detalle");
    if (modal) {
        modal.style.display = "none";
    }
}

// funcion para abrir la ventana modal del carrito
function abrirModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    let lista = document.getElementById("lista-carrito");
    let totalElem = document.getElementById("total-carrito");
    if (!modal || !lista) {
        return;
    }

    lista.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p style="color: #a0b2c6; text-align: center; padding: 20px 0;">El carrito esta vacio.</p>';
        if (totalElem) {
            totalElem.innerText = "Total: S/ 0.00";
        }
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let idx = carrito[i];
            sumaTotal += precios[idx];

            let fila = document.createElement("div");
            fila.className = "item-carrito";
            fila.innerHTML = 
                '<div>' +
                    '<strong>' + nombres[idx] + '</strong><br>' +
                    '<span style="color: #00b4d8;">S/ ' + precios[idx].toFixed(2) + '</span>' +
                '</div>' +
                '<button class="boton boton-peligro" style="padding: 4px 8px; font-size: 12px;" onclick="eliminarDelCarrito(' + i + ')">Quitar</button>';

            lista.appendChild(fila);
        }

        if (totalElem) {
            totalElem.innerText = "Total: S/ " + sumaTotal.toFixed(2);
        }
    }

    modal.style.display = "flex";
}

// funcion para cerrar la ventana modal del carrito
function cerrarModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    if (modal) {
        modal.style.display = "none";
    }
}

// funcion para agregar productos al carrito
function agregarCarrito(indice) {
    agregarAlArregloCarrito(indice);
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    alert("Se agrego '" + nombres[indice] + "' al carrito de compras.");
}

// funcion para eliminar un producto del carrito
function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1);
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    abrirModalCarrito();
}

// funcion para guardar el carrito en localstorage
function guardarCarritoEnStorage() {
    try {
        localStorage.setItem("carritoTechStore", JSON.stringify(carrito));
    } catch (e) {
        // control de excepcion silencioso
    }
}

// funcion para cargar el carrito desde localstorage
function cargarCarritoDeStorage() {
    try {
        let datosGuardados = localStorage.getItem("carritoTechStore");
        if (datosGuardados) {
            carrito = JSON.parse(datosGuardados);
        }
    } catch (e) {
        carrito = [];
    }
}

// funcion para actualizar el contador de productos del carrito
function actualizarContadorCarrito() {
    let contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.innerText = carrito.length;
    }
}

// funcion para procesar y finalizar la compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert("El carrito esta vacio. Agrega productos antes de procesar tu compra.");
        return;
    }

    let sesion = sessionStorage.getItem("usuarioLogueado");
    if (!sesion) {
        cerrarModalCarrito();
        abrirModalSesion("Para completar tu compra, por favor inicia sesion o selecciona la cuenta que hayas usado.");
        return;
    }

    let nombreUsuario = "Cliente";
    try {
        let datos = JSON.parse(sesion);
        nombreUsuario = datos.nombre || datos.usuario || "Cliente";
    } catch (e) {
        nombreUsuario = sesion;
    }

    alert("¡Gracias por tu compra, " + nombreUsuario + "! Tu pedido ha sido procesado exitosamente.");
    carrito = [];
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    cerrarModalCarrito();
}

// funcion para obtener o inicializar la lista de usuarios registrados
function obtenerUsuariosRegistrados() {
    let guardados = localStorage.getItem("techstore_usuarios");
    if (guardados) {
        try {
            return JSON.parse(guardados);
        } catch (e) {
            return [];
        }
    }

    let usuariosIniciales = [
        {
            nombre: "Administrador TechStore",
            correo: "admin@techstore.pe",
            telefono: "987654321",
            usuario: "admin",
            clave: "admin123",
            fechaRegistro: "10/11/2026"
        }
    ];
    localStorage.setItem("techstore_usuarios", JSON.stringify(usuariosIniciales));
    return usuariosIniciales;
}

// funcion para registrar un nuevo usuario en techstore
function registrarUsuario(event) {
    if (event) {
        event.preventDefault();
    }

    let nombreInput = document.getElementById("txt-reg-nombre");
    let correoInput = document.getElementById("txt-reg-correo");
    let telefonoInput = document.getElementById("txt-reg-telefono");
    let usuarioInput = document.getElementById("txt-reg-usuario");
    let claveInput = document.getElementById("txt-reg-clave");
    let confirmarInput = document.getElementById("txt-reg-confirmar");
    let alerta = document.getElementById("alerta-registro");

    if (!nombreInput || !correoInput || !usuarioInput || !claveInput || !confirmarInput) {
        return false;
    }

    let nombre = nombreInput.value.trim();
    let correo = correoInput.value.trim();
    let telefono = telefonoInput ? telefonoInput.value.trim() : "";
    let usuario = usuarioInput.value.trim();
    let clave = claveInput.value.trim();
    let confirmar = confirmarInput.value.trim();

    if (nombre.length < 3) {
        mostrarAlerta(alerta, "Por favor ingresa un nombre y apellido valido (minimo 3 caracteres).", "error");
        return false;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        mostrarAlerta(alerta, "Por favor ingresa un correo electronico valido.", "error");
        return false;
    }

    let formatoTelefono = /^[0-9]{9}$/;
    if (!formatoTelefono.test(telefono)) {
        mostrarAlerta(alerta, "El celular debe contener exactamente 9 digitos numericos.", "error");
        return false;
    }

    if (usuario.length < 3) {
        mostrarAlerta(alerta, "El nombre de usuario debe tener al menos 3 caracteres.", "error");
        return false;
    }

    if (clave.length < 4) {
        mostrarAlerta(alerta, "La contraseña debe tener un minimo de 4 caracteres.", "error");
        return false;
    }

    if (clave !== confirmar) {
        mostrarAlerta(alerta, "Las contraseñas no coinciden. Por favor verificalas.", "error");
        return false;
    }

    let lista = obtenerUsuariosRegistrados();
    let existe = false;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].usuario.toLowerCase() === usuario.toLowerCase()) {
            existe = true;
            break;
        }
        if (lista[i].correo.toLowerCase() === correo.toLowerCase()) {
            existe = true;
            break;
        }
    }

    if (existe) {
        mostrarAlerta(alerta, "El usuario o correo ya se encuentra registrado. Intenta con otro.", "error");
        return false;
    }

    let nuevo = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        usuario: usuario,
        clave: clave,
        fechaRegistro: new Date().toLocaleDateString('es-PE')
    };

    lista.push(nuevo);
    localStorage.setItem("techstore_usuarios", JSON.stringify(lista));
    localStorage.setItem("techstore_ultimo_usuario", JSON.stringify(nuevo));

    mostrarAlerta(alerta, "¡Cuenta creada exitosamente para " + nombre + "! Ya puedes iniciar sesion.", "exito");

    let loginUsuario = document.getElementById("txt-usuario");
    if (loginUsuario) {
        loginUsuario.value = usuario;
    }

    let formReg = document.getElementById("formulario-registro");
    if (formReg) {
        formReg.reset();
    }

    return false;
}

// funcion para validar el inicio de sesion
function validarLogin(event) {
    if (event) {
        event.preventDefault();
    }

    let usuarioInput = document.getElementById("txt-usuario");
    let claveInput = document.getElementById("txt-clave");
    let alerta = document.getElementById("alerta-login");

    if (!usuarioInput || !claveInput) {
        return false;
    }

    let usuario = usuarioInput.value.trim();
    let clave = claveInput.value.trim();

    if (usuario === "" || clave === "") {
        mostrarAlerta(alerta, "Por favor completa tu usuario y contraseña.", "error");
        return false;
    }

    let lista = obtenerUsuariosRegistrados();
    let encontrado = null;

    for (let i = 0; i < lista.length; i++) {
        let u = lista[i];
        if ((u.usuario.toLowerCase() === usuario.toLowerCase() || u.correo.toLowerCase() === usuario.toLowerCase()) && u.clave === clave) {
            encontrado = u;
            break;
        }
    }

    if (encontrado) {
        let datosSesion = {
            usuario: encontrado.usuario,
            nombre: encontrado.nombre,
            correo: encontrado.correo,
            fechaIngreso: new Date().toLocaleTimeString('es-PE')
        };

        sessionStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));
        sessionStorage.setItem("usuarioNombre", encontrado.nombre);
        localStorage.setItem("techstore_ultimo_usuario", JSON.stringify(encontrado));

        mostrarAlerta(alerta, "¡Bienvenido, " + encontrado.nombre + "! Has iniciado sesion correctamente.", "exito");

        verificarEstadoSesion();

        let formLogin = document.getElementById("formulario-login");
        if (formLogin) {
            formLogin.reset();
        }

        mostrarPerfilActivo(datosSesion);
    } else {
        mostrarAlerta(alerta, "Usuario o contraseña incorrectos. Verifica tus datos o registrate en la derecha.", "error");
    }

    return false;
}

// funcion para mostrar el perfil cuando el usuario tiene sesion activa
function mostrarPerfilActivo(datos) {
    let cajaPerfil = document.getElementById("contenedor-perfil-activo");
    let cajaFormularios = document.getElementById("contenedor-formularios-auth");

    if (cajaPerfil && cajaFormularios) {
        cajaFormularios.style.display = "none";
        cajaPerfil.style.display = "block";

        let campoNombre = document.getElementById("perfil-nombre");
        let campoCorreo = document.getElementById("perfil-correo");
        let campoFecha = document.getElementById("perfil-fecha");

        if (campoNombre) {
            campoNombre.textContent = datos.nombre || datos.usuario;
        }
        if (campoCorreo) {
            campoCorreo.textContent = datos.correo || "Usuario registrado";
        }
        if (campoFecha) {
            campoFecha.textContent = "Sesion activa desde las " + (datos.fechaIngreso || "hoy");
        }
    }
}

// funcion auxiliar para mostrar alertas en el dom
function mostrarAlerta(elemento, mensaje, tipo) {
    if (!elemento) {
        alert(mensaje);
        return;
    }

    elemento.style.display = "block";
    elemento.className = "alerta-mensaje alerta-" + tipo;
    elemento.innerHTML = mensaje;
}

// funcion para cerrar sesion
function cerrarSesion() {
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("usuarioNombre");
    window.location.reload();
}

// funcion para verificar el estado de la sesion en la barra de navegacion
function verificarEstadoSesion() {
    let sesionContenedor = document.getElementById("estado-sesion");
    let sesion = sessionStorage.getItem("usuarioLogueado");

    if (sesionContenedor) {
        if (sesion) {
            let nombreMostrar = "Usuario";
            try {
                let datos = JSON.parse(sesion);
                nombreMostrar = datos.nombre ? datos.nombre.split(" ")[0] : (datos.usuario || "Usuario");
            } catch (e) {
                nombreMostrar = sesion;
            }

            sesionContenedor.innerHTML = 
                '<span style="color: var(--color-primario); font-size: 13px; font-weight: bold; margin-right: 6px;">' + nombreMostrar + '</span> ' +
                '<a href="javascript:void(0)" onclick="cerrarSesion()" class="nav-enlace" style="font-size: 12px; padding: 4px 8px; background-color: var(--color-peligro); color: #fff;">Salir</a>';
        } else {
            sesionContenedor.innerHTML = '<a href="javascript:void(0)" onclick="abrirModalSesion()" class="nav-enlace">Ingresar</a>';
        }
    }

    if (sesion) {
        try {
            let datos = JSON.parse(sesion);
            mostrarPerfilActivo(datos);
        } catch (e) {}
    }
}

// funcion para abrir la ventana modal de inicio de sesion o cuenta
function abrirModalSesion(mensaje) {
    let modal = document.getElementById("modal-sesion");
    if (!modal) {
        return;
    }

    let alerta = document.getElementById("modal-alerta-sesion");
    if (alerta) {
        if (mensaje) {
            alerta.style.display = "block";
            alerta.textContent = mensaje;
        } else {
            alerta.style.display = "none";
        }
    }

    // por defecto abre en la pestaña de iniciar sesion
    mostrarModalLogin();
    modal.style.display = "flex";
}

// funcion para cerrar la ventana modal de sesion
function cerrarModalSesion() {
    let modal = document.getElementById("modal-sesion");
    if (modal) {
        modal.style.display = "none";
    }
}

// funcion para mostrar la pestaña de inicio de sesion
function mostrarModalLogin() {
    let tabLogin = document.getElementById("tab-login");
    let tabRegistro = document.getElementById("tab-registro");
    let vistaLogin = document.getElementById("vista-modal-login");
    let formRegistro = document.getElementById("form-modal-registro");

    if (tabLogin) {
        tabLogin.className = "boton boton-primario";
    }
    if (tabRegistro) {
        tabRegistro.className = "boton boton-secundario";
    }
    if (vistaLogin) {
        vistaLogin.style.display = "block";
    }
    if (formRegistro) {
        formRegistro.style.display = "none";
    }

    // comprobar si existe cuenta previa registrada
    let ultimoGuardado = localStorage.getItem("techstore_ultimo_usuario");
    let usuarioDetectado = null;

    if (ultimoGuardado) {
        try {
            usuarioDetectado = JSON.parse(ultimoGuardado);
        } catch (e) {
            usuarioDetectado = null;
        }
    }

    if (!usuarioDetectado) {
        let lista = obtenerUsuariosRegistrados();
        if (lista && lista.length > 0) {
            usuarioDetectado = lista[0];
        }
    }

    let cajaPrevia = document.getElementById("caja-cuenta-previa");
    let formManual = document.getElementById("form-modal-login");
    let alertaPrevia = document.getElementById("modal-alerta-login-previa");
    let alertaManual = document.getElementById("modal-alerta-login");

    if (alertaPrevia) alertaPrevia.style.display = "none";
    if (alertaManual) alertaManual.style.display = "none";

    if (usuarioDetectado && cajaPrevia && formManual) {
        let elemNombre = document.getElementById("nombre-cuenta-previa");
        let elemCorreo = document.getElementById("correo-cuenta-previa");
        let inputClave = document.getElementById("modal-clave-previa");

        if (elemNombre) {
            elemNombre.textContent = usuarioDetectado.nombre || usuarioDetectado.usuario;
        }
        if (elemCorreo) {
            elemCorreo.textContent = usuarioDetectado.correo || "usuario@techstore.pe";
        }
        if (inputClave) {
            inputClave.value = "";
        }

        cajaPrevia.style.display = "block";
        formManual.style.display = "none";
    } else {
        if (cajaPrevia) cajaPrevia.style.display = "none";
        if (formManual) formManual.style.display = "block";
    }
}

// funcion para ingresar credenciales manualmente
function mostrarLoginManual() {
    let cajaPrevia = document.getElementById("caja-cuenta-previa");
    let formManual = document.getElementById("form-modal-login");
    let enlaceVolver = document.getElementById("enlace-volver-previa");

    if (cajaPrevia) cajaPrevia.style.display = "none";
    if (formManual) {
        formManual.style.display = "block";
        let campo = document.getElementById("modal-txt-usuario");
        if (campo) campo.focus();
    }
    if (enlaceVolver) enlaceVolver.style.display = "block";
}

// funcion para regresar a la vista de cuenta previa detectada
function mostrarModalCuentaPrevia() {
    mostrarModalLogin();
}

// funcion para mostrar la pestaña de crear cuenta
function mostrarModalRegistro() {
    let tabLogin = document.getElementById("tab-login");
    let tabRegistro = document.getElementById("tab-registro");
    let vistaLogin = document.getElementById("vista-modal-login");
    let formRegistro = document.getElementById("form-modal-registro");
    let alertaReg = document.getElementById("modal-alerta-registro");

    if (tabLogin) {
        tabLogin.className = "boton boton-secundario";
    }
    if (tabRegistro) {
        tabRegistro.className = "boton boton-primario";
    }
    if (vistaLogin) {
        vistaLogin.style.display = "none";
    }
    if (alertaReg) {
        alertaReg.style.display = "none";
    }
    if (formRegistro) {
        formRegistro.style.display = "block";
        let primerCampo = document.getElementById("modal-reg-nombre");
        if (primerCampo) {
            primerCampo.focus();
        }
    }
}

// funcion para iniciar sesion con la cuenta previa ingresando la clave
function iniciarConCuentaPrevia() {
    let ultimoGuardado = localStorage.getItem("techstore_ultimo_usuario");
    let datosCuenta = null;

    if (ultimoGuardado) {
        try {
            datosCuenta = JSON.parse(ultimoGuardado);
        } catch (e) {
            datosCuenta = null;
        }
    }

    if (!datosCuenta) {
        let lista = obtenerUsuariosRegistrados();
        if (lista && lista.length > 0) {
            datosCuenta = lista[0];
        }
    }

    if (!datosCuenta) {
        mostrarLoginManual();
        return;
    }

    let inputClave = document.getElementById("modal-clave-previa");
    let alerta = document.getElementById("modal-alerta-login-previa");
    let clave = inputClave ? inputClave.value.trim() : "";

    if (clave === "") {
        mostrarAlerta(alerta, "Por favor ingresa tu contraseña.", "error");
        if (inputClave) inputClave.focus();
        return;
    }

    if (clave !== datosCuenta.clave) {
        mostrarAlerta(alerta, "Contraseña incorrecta. Verifica tus datos o ingresa con otra cuenta.", "error");
        if (inputClave) inputClave.focus();
        return;
    }

    let datosSesion = {
        usuario: datosCuenta.usuario,
        nombre: datosCuenta.nombre,
        correo: datosCuenta.correo,
        fechaIngreso: new Date().toLocaleTimeString('es-PE')
    };

    sessionStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));
    sessionStorage.setItem("usuarioNombre", datosCuenta.nombre);
    localStorage.setItem("techstore_ultimo_usuario", JSON.stringify(datosCuenta));

    verificarEstadoSesion();
    cerrarModalSesion();

    window.location.reload();
}

// funcion para registrar cuenta con nombre, telefono (9 digitos), correo y clave
function registrarUsuarioModal(event) {
    if (event) {
        event.preventDefault();
    }

    let inputNombre = document.getElementById("modal-reg-nombre");
    let inputTelefono = document.getElementById("modal-reg-telefono");
    let inputCorreo = document.getElementById("modal-reg-correo");
    let inputClave = document.getElementById("modal-reg-clave");
    let alerta = document.getElementById("modal-alerta-registro");

    if (!inputNombre || !inputTelefono || !inputCorreo || !inputClave) {
        return false;
    }

    let nombre = inputNombre.value.trim();
    let telefono = inputTelefono.value.trim();
    let correo = inputCorreo.value.trim();
    let clave = inputClave.value.trim();

    if (nombre === "" || telefono === "" || correo === "" || clave === "") {
        mostrarAlerta(alerta, "Por favor completa todos los campos requeridos.", "error");
        return false;
    }

    // restriccion: nombre solo letras y espacios, minimo 3 caracteres
    let patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    if (!patronNombre.test(nombre)) {
        mostrarAlerta(alerta, "El nombre solo debe contener letras (mínimo 3 caracteres).", "error");
        inputNombre.focus();
        return false;
    }

    // restriccion: telefono debe ser solo numeros y de 9 digitos exactos
    let patronTelefono = /^[0-9]{9}$/;
    if (!patronTelefono.test(telefono)) {
        mostrarAlerta(alerta, "El número de teléfono debe ser de 9 dígitos numéricos, sin símbolos ni letras.", "error");
        inputTelefono.focus();
        return false;
    }

    // restriccion: correo electronico valido
    let patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(correo)) {
        mostrarAlerta(alerta, "Por favor ingresa un correo electrónico válido.", "error");
        inputCorreo.focus();
        return false;
    }

    // restriccion: clave minimo 6 caracteres
    if (clave.length < 6) {
        mostrarAlerta(alerta, "La contraseña debe tener un mínimo de 6 caracteres.", "error");
        inputClave.focus();
        return false;
    }

    // verificar si ya existe correo
    let lista = obtenerUsuariosRegistrados();
    let existe = false;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].correo.toLowerCase() === correo.toLowerCase()) {
            existe = true;
            break;
        }
    }

    if (existe) {
        mostrarAlerta(alerta, "El correo electrónico ya se encuentra registrado. Inicia sesión.", "error");
        return false;
    }

    let nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        usuario: correo.split("@")[0],
        clave: clave,
        fechaRegistro: new Date().toLocaleDateString('es-PE')
    };

    lista.push(nuevoUsuario);
    localStorage.setItem("techstore_usuarios", JSON.stringify(lista));
    localStorage.setItem("techstore_ultimo_usuario", JSON.stringify(nuevoUsuario));

    let datosSesion = {
        usuario: nuevoUsuario.usuario,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        fechaIngreso: new Date().toLocaleTimeString('es-PE')
    };

    sessionStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));
    sessionStorage.setItem("usuarioNombre", nuevoUsuario.nombre);

    mostrarAlerta(alerta, "¡Cuenta creada exitosamente para " + nombre + "! Vinculando tu sesión...", "exito");

    setTimeout(function() {
        window.location.reload();
    }, 700);

    return false;
}

// funcion para validar inicio de sesion manual
function validarLoginModal(event) {
    if (event) {
        event.preventDefault();
    }

    let txtUsuario = document.getElementById("modal-txt-usuario");
    let txtClave = document.getElementById("modal-txt-clave");
    let alerta = document.getElementById("modal-alerta-login");

    if (!txtUsuario || !txtClave) {
        return false;
    }

    let usuario = txtUsuario.value.trim();
    let clave = txtClave.value.trim();

    if (usuario === "" || clave === "") {
        mostrarAlerta(alerta, "Por favor completa todos los campos requeridos.", "error");
        return false;
    }

    let lista = obtenerUsuariosRegistrados();
    let encontrado = null;

    for (let i = 0; i < lista.length; i++) {
        let u = lista[i];
        if ((u.usuario.toLowerCase() === usuario.toLowerCase() || u.correo.toLowerCase() === usuario.toLowerCase()) && u.clave === clave) {
            encontrado = u;
            break;
        }
    }

    if (encontrado) {
        let datosSesion = {
            usuario: encontrado.usuario,
            nombre: encontrado.nombre,
            correo: encontrado.correo,
            fechaIngreso: new Date().toLocaleTimeString('es-PE')
        };

        sessionStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));
        sessionStorage.setItem("usuarioNombre", encontrado.nombre);
        localStorage.setItem("techstore_ultimo_usuario", JSON.stringify(encontrado));

        verificarEstadoSesion();
        cerrarModalSesion();

        txtUsuario.value = "";
        txtClave.value = "";

        window.location.reload();
    } else {
        mostrarAlerta(alerta, "Usuario o contraseña incorrectos. Verifica tus credenciales.", "error");
    }

    return false;
}

// funcion para validar el formulario de contacto con javascript
function validarContacto(event) {
    if (event) {
        event.preventDefault();
    }

    let nombreInput = document.getElementById("txt-nombre");
    let correoInput = document.getElementById("txt-correo");
    let telefonoInput = document.getElementById("txt-telefono");
    let motivoInput = document.getElementById("sel-motivo");
    let mensajeInput = document.getElementById("txt-mensaje");
    let alerta = document.getElementById("alerta-contacto");

    if (!nombreInput || !correoInput || !telefonoInput || !motivoInput || !mensajeInput) {
        return false;
    }

    let nombre = nombreInput.value.trim();
    let correo = correoInput.value.trim();
    let telefono = telefonoInput.value.trim();
    let motivo = motivoInput.value;
    let mensaje = mensajeInput.value.trim();

    if (nombre.length < 3) {
        mostrarAlerta(alerta, "Por favor ingresa un nombre valido de al menos 3 caracteres.", "error");
        return false;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        mostrarAlerta(alerta, "Por favor ingresa un correo electronico valido.", "error");
        return false;
    }

    let formatoTelefono = /^[0-9]{9}$/;
    if (!formatoTelefono.test(telefono)) {
        mostrarAlerta(alerta, "El celular debe tener exactamente 9 digitos numericos.", "error");
        return false;
    }

    if (motivo === "") {
        mostrarAlerta(alerta, "Por favor selecciona un motivo de contacto.", "error");
        return false;
    }

    if (mensaje.length < 5) {
        mostrarAlerta(alerta, "Por favor escribe un mensaje de al menos 5 caracteres.", "error");
        return false;
    }

    let motivoTexto = motivoInput.options[motivoInput.selectedIndex].text;
    let fechaHora = new Date().toLocaleDateString('es-PE') + " " + new Date().toLocaleTimeString('es-PE');

    let nuevoMensaje = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        motivo: motivoTexto,
        mensaje: mensaje,
        fecha: fechaHora
    };

    let mensajesGuardados = [];
    try {
        let raw = localStorage.getItem("techstore_mensajes_contacto");
        if (raw) {
            mensajesGuardados = JSON.parse(raw);
        }
    } catch (e) {
        mensajesGuardados = [];
    }
    mensajesGuardados.unshift(nuevoMensaje);
    localStorage.setItem("techstore_mensajes_contacto", JSON.stringify(mensajesGuardados));

    mostrarAlerta(alerta, "¡Gracias " + nombre + "! Tu consulta ha sido enviada con exito.", "exito");

    let contenedorConfirmacion = document.getElementById("contenedor-confirmacion-contacto");
    if (contenedorConfirmacion) {
        contenedorConfirmacion.style.display = "block";
        contenedorConfirmacion.innerHTML = 
            '<div class="tarjeta-mensaje-enviado">' +
                '<h4 style="color: var(--color-primario); margin-bottom: 8px;">Detalle de la Solicitud Registrada</h4>' +
                '<p style="margin-bottom: 4px;"><strong>Cliente:</strong> ' + nombre + '</p>' +
                '<p style="margin-bottom: 4px;"><strong>Contacto:</strong> ' + correo + ' | Cel: ' + telefono + '</p>' +
                '<p style="margin-bottom: 4px;"><strong>Motivo:</strong> ' + motivoTexto + '</p>' +
                '<p style="margin-bottom: 4px;"><strong>Mensaje:</strong> ' + mensaje + '</p>' +
                '<p style="color: #a0b2c6; font-size: 12px; margin-top: 8px;">Registrado el: ' + fechaHora + ' | Estado: Recibido por atencion al cliente</p>' +
            '</div>';
    }

    let formulario = document.getElementById("form-contacto");
    if (formulario) {
        formulario.reset();
    }

    return false;
}

// funcion para cargar el historial de mensajes de contacto si existe
function cargarHistorialContacto() {
    let contenedorConfirmacion = document.getElementById("contenedor-confirmacion-contacto");
    if (!contenedorConfirmacion) {
        return;
    }

    try {
        let raw = localStorage.getItem("techstore_mensajes_contacto");
        if (raw) {
            let lista = JSON.parse(raw);
            if (lista && lista.length > 0) {
                let ultimo = lista[0];
                contenedorConfirmacion.style.display = "block";
                contenedorConfirmacion.innerHTML = 
                    '<div class="tarjeta-mensaje-enviado">' +
                        '<h4 style="color: var(--color-primario); margin-bottom: 8px;">Ultima Solicitud Registrada en el Sistema</h4>' +
                        '<p style="margin-bottom: 4px;"><strong>Cliente:</strong> ' + ultimo.nombre + '</p>' +
                        '<p style="margin-bottom: 4px;"><strong>Contacto:</strong> ' + ultimo.correo + ' | Cel: ' + ultimo.telefono + '</p>' +
                        '<p style="margin-bottom: 4px;"><strong>Motivo:</strong> ' + ultimo.motivo + '</p>' +
                        '<p style="margin-bottom: 4px;"><strong>Mensaje:</strong> ' + ultimo.mensaje + '</p>' +
                        '<p style="color: #a0b2c6; font-size: 12px; margin-top: 8px;">Registrado el: ' + ultimo.fecha + ' | Estado: Recibido por atencion al cliente</p>' +
                    '</div>';
            }
        }
    } catch (e) {}
}

// funcion para mostrar campo de presupuesto al elegir cotizacion
function cambiarMotivoContacto() {
    let motivo = document.getElementById("sel-motivo");
    let cajaPresupuesto = document.getElementById("campo-presupuesto");
    if (motivo && cajaPresupuesto) {
        if (motivo.value === "cotizacion") {
            cajaPresupuesto.style.display = "block";
        } else {
            cajaPresupuesto.style.display = "none";
        }
    }
}

// funcion para calcular el financiamiento en cuotas
function calcularFinanciamiento(event) {
    if (event) {
        event.preventDefault();
    }

    let nombreInput = document.getElementById("txt-fin-nombre");
    let dniInput = document.getElementById("txt-fin-dni");
    let montoInput = document.getElementById("txt-fin-monto");
    let tasaInput = document.getElementById("sel-fin-tasa");
    let plazoInput = document.getElementById("sel-fin-plazo");
    let resultado = document.getElementById("resultado-financiamiento");

    if (!montoInput || !tasaInput || !plazoInput || !resultado) {
        return false;
    }

    let nombre = nombreInput ? nombreInput.value.trim() : "Cliente";
    let dni = dniInput ? dniInput.value.trim() : "";
    let monto = parseFloat(montoInput.value);
    let tasa = parseFloat(tasaInput.value) / 100;
    let plazo = parseInt(plazoInput.value);

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor ingresa un monto valido mayor a 0.");
        return false;
    }

    // formula de cuota fija mensual del sistema frances
    let factor = Math.pow(1 + tasa, plazo);
    let cuota = monto * (tasa * factor) / (factor - 1);
    let saldo = monto;

    let html = 
        '<div class="tarjeta-mensaje-enviado">' +
            '<h4 style="color: var(--color-primario); margin-bottom: 8px;">Reporte de Simulación para ' + nombre + (dni ? ' (DNI: ' + dni + ')' : '') + '</h4>' +
            '<p style="margin-bottom: 12px;">Monto financiado: <strong>S/ ' + monto.toFixed(2) + '</strong> | Cuota mensual fija: <strong style="color: #2ecc71;">S/ ' + cuota.toFixed(2) + '</strong></p>' +
            '<div class="tabla-contenedor">' +
                '<table class="tabla-datos" style="font-size: 13px;">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>N° Cuota</th>' +
                            '<th>Monto de Cuota (S/)</th>' +
                            '<th>Saldo Restante (S/)</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';

    for (let i = 1; i <= plazo; i++) {
        let interesMes = saldo * tasa;
        let amortizacion = cuota - interesMes;
        saldo = saldo - amortizacion;
        if (saldo < 0 || i === plazo) {
            saldo = 0;
        }

        html += 
            '<tr>' +
                '<td>' + i + '</td>' +
                '<td>S/ ' + cuota.toFixed(2) + '</td>' +
                '<td>S/ ' + saldo.toFixed(2) + '</td>' +
            '</tr>';
    }

    html += 
                    '</tbody>' +
                '</table>' +
            '</div>' +
        '</div>';

    resultado.style.display = "block";
    resultado.innerHTML = html;
    return false;
}

// eventos ejecutados al cargar la pagina en el navegador
window.addEventListener("DOMContentLoaded", function() {
    cargarCarritoDeStorage();
    actualizarContadorCarrito();
    verificarEstadoSesion();
    cargarHistorialContacto();

    // carga automatica de productos si la pagina tiene contenedor
    let contenedor = document.getElementById("contenedor-productos");
    if (contenedor) {
        let ruta = window.location.pathname.toLowerCase();
        let esInicio = ruta.indexOf("index.html") !== -1 || ruta.endsWith("/") || ruta.endsWith("\\");
        if (esInicio) {
            cargarProductos(4, "todas");
        } else {
            cargarProductos(null, "todas");
        }
    }

    // apertura automatica de la ventana modal en el index si no hay sesion iniciada
    let rutaActual = window.location.pathname.toLowerCase();
    let esPaginaInicio = rutaActual.indexOf("index.html") !== -1 || rutaActual.endsWith("/") || rutaActual.endsWith("\\") || rutaActual === "";
    let sesionIniciada = sessionStorage.getItem("usuarioLogueado");
    if (esPaginaInicio && !sesionIniciada) {
        setTimeout(function() {
            abrirModalSesion();
        }, 300);
    }
});

// cerrar modales al hacer clic fuera de su contenido principal
window.addEventListener("click", function(event) {
    let modalSesion = document.getElementById("modal-sesion");
    if (modalSesion && event.target === modalSesion) {
        cerrarModalSesion();
    }
    let modalCarrito = document.getElementById("modal-carrito");
    if (modalCarrito && event.target === modalCarrito) {
        cerrarModalCarrito();
    }
    let modalDetalle = document.getElementById("modal-detalle");
    if (modalDetalle && event.target === modalDetalle) {
        cerrarModalDetalle();
    }
});
