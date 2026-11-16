# INFORME DEL PROYECTO WEB "TECHSTORE"
## Avance 3 – Proyecto Final

**Curso:** Taller de Programación Web  
**Profesor:** JESUS ANTONIO, PACAHUALA ARROYO  
**Institución:** Universidad Tecnológica del Perú  
**Sede / Año:** Lima, Perú – 2026  

---

### Integrantes:
- **Zavala Huaranga, Jhorkaef** – U24224270
- **Rojas Pérez, Dereck** – U24216436
- **Palomino Cajamarca, Ilie Franco** – U24263884
- **Quicaño Rodríguez, Jhan Paul** – U24200277

---

## 1. INTRODUCCIÓN Y ALCANCE DEL PROYECTO
El presente informe detalla el diseño, la arquitectura y las soluciones técnicas implementadas en el sitio web **TechStore**, una tienda comercial en línea especializada en la comercialización de laptops gamer de alto rendimiento, computadoras de escritorio ensambladas para creadores de contenido y deportes electrónicos (esports), monitores de alta frecuencia de actualización y periféricos de grado competitivo. El documento corresponde formalmente al **Avance 3 (Proyecto Final)** del curso Taller de Programación Web y documenta la incorporación integral de la capa de comportamiento e interactividad mediante JavaScript Vanilla (Unidad 3), consolidando el desarrollo sobre las bases estructurales y de diseño responsivo de HTML5 y CSS3 concluidas en los avances previos.

El mercado gamer y de cómputo en el Perú mantiene una tendencia de profesionalización y demanda creciente de soluciones en línea ágiles y confiables. Conforme a reportes sectoriales del comercio electrónico peruano (Cámara de Comercio de Lima, 2024; Perú Retail, 2023), los consumidores de tecnología valoran especialmente la transparencia de precios, la disponibilidad inmediata de especificaciones comparativas, la capacidad de simular financiamientos en cuotas reales y la fluidez de interfaces que permitan interactuar con el catálogo sin recargas innecesarias. En este marco, TechStore toma como referencia el estándar comercial de portales nacionales líderes del rubro (adaptando buenas prácticas de plataformas como cgs-computer.pe) y materializa una solución web estructurada con código nativo y modular.

El alcance del sistema en este Avance 3 alcanza su madurez funcional en el entorno frontend del navegador del cliente: se incorpora una arquitectura modular en JavaScript puro sin dependencias externas (0% frameworks pesados, 0% Bootstrap o jQuery), respetando de manera estricta las directivas pedagógicas del docente. El sistema implementa manipulación avanzada del DOM, captura de eventos reactivos, almacenamiento de estado persistente mediante Web Storage API (`localStorage` y `sessionStorage`), una ventana modal interactiva de acceso y registro con apertura automatizada en la página de inicio, restricciones estrictas de entrada de datos en tiempo real (bloqueo total de caracteres alfabéticos en el teléfono celular de 9 dígitos y restricción de números en el nombre), vinculación reactiva de la sesión activa en el encabezado institucional, un simulador financiero de cuotas mediante el algoritmo francés en la página de servicios y un carrito interactivo de compras con persistencia entre páginas.

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1. Objetivo general
Implementar la capa de lógica, interactividad y comportamiento dinámico del sitio web comercial "TechStore" a través de JavaScript Vanilla y Web Storage API en sus ocho páginas interconectadas, asegurando una experiencia de usuario fluida, accesible y reactiva, complementada con validaciones estrictas en tiempo real, un simulador financiero interactivo de cuotas y gestión integral del estado de sesión y carrito de compras.

### 2.2. Objetivos específicos
- Desarrollar una arquitectura de scripts en JavaScript nativo estructurada modularmente (`app.js`, `datos.js`, `servicios.js`, `productos.js`, `comparativa.js`, `carrito.js`, `contacto.js` y `login.js`) sin utilizar librerías externas ni código innecesario.
- Diseñar un arreglo estructurado de 32 objetos producto con atributos completos (`id`, `nombre`, `categoria`, `precio`, `especificaciones`, `stock`, `img`) para alimentar reactivamente el catálogo, el buscador y la comparativa técnica.
- Implementar una ventana modal interactiva (`#modal-sesion`) con apertura automática al cargar `index.html` para usuarios nuevos o no autenticados, ofreciendo pestañas conmutables entre "Iniciar Sesión" y "Crear Cuenta".
- Aplicar validaciones y restricciones en tiempo real en los formularios del modal y de contacto, asegurando que el campo celular admita exclusivamente 9 dígitos numéricos bloqueando cualquier letra o símbolo extraño (evento `oninput`), y que el nombre admita únicamente caracteres alfabéticos.
- Administrar el ciclo de vida de la sesión activa del usuario mediante `sessionStorage` y `localStorage`, reconociendo cuentas existentes en el equipo, vinculando la sesión de inmediato tras el registro y reflejando el nombre del usuario activo con botón de cierre de sesión en la barra institucional de todas las páginas.
- Desarrollar un simulador de cuotas de financiamiento en `servicios.html` basado en la fórmula matemática de amortización francesa pura, permitiendo al usuario calcular cuotas fijas mensuales con interés compensatorio según el plazo seleccionado.
- Construir un carrito de compras dinámico con persistencia local que totalice artículos y montos en tiempo real, actualice badges numéricos en el encabezado y admita adición y vaciado de productos.

---

## 3. MARCO TEÓRICO

### 3.1. HTML5 semántico y accesibilidad web
HTML5 provee un vocabulario semántico que define inequívocamente el rol estructural de cada componente de la interfaz de usuario: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>` y `<footer>` (Duckett, 2011). Dicha estructura elimina la ambigüedad de los contenedores genéricos de versiones anteriores, optimiza el árbol de accesibilidad (Accessibility Tree) para lectores de pantalla y favorece la indexación de motores de búsqueda. En concordancia con las pautas WCAG 2.1 (W3C, 2018), TechStore incorpora roles WAI-ARIA (`aria-modal="true"`, `role="dialog"`, `aria-label`), etiquetas `<label>` explícitas para cada control y el atributo `alt` en todas las imágenes del catálogo.

### 3.2. Maquetación responsiva con CSS Grid, Flexbox y media queries
El diseño web responsivo garantiza que la composición visual se reconfigure armónicamente ante cualquier densidad o resolución de pantalla mediante sistemas de grillas fluidas y consultas de medios (Marcotte, 2011). TechStore implementa CSS Grid para la distribución bidimensional de las tarjetas de productos mediante la función `repeat(auto-fill, minmax(270px, 1fr))` y Flexbox para la alineación unidimensional de barras de navegación, botones y tarjetas modales. Asimismo, la hoja de estilos emplea variables CSS (custom properties) para gobernar la paleta cromática en tema oscuro y media queries estratégicas en 992 px, 768 px y 480 px.

### 3.3. Formularios y validación nativa e interactiva con JavaScript
Los formularios representan el punto crítico de intercambio transaccional entre el cliente y el sistema. Si bien HTML5 proporciona atributos nativos como `required`, `pattern`, `minlength` y `maxlength` (Duckett, 2011), la experiencia de usuario moderna exige una capa de validación inmediata que prevenga el error antes del envío. La captura de los eventos `input` y `keydown` en JavaScript permite filtrar los caracteres ingresados en tiempo real mediante expresiones regulares nativas (como regex `/[^0-9]/g` para campos telefónicos), impidiendo que caracteres no válidos se plasmen en el control visual y garantizando la integridad de los datos.

### 3.4. JavaScript Vanilla, manipulación del DOM y Web Storage API
JavaScript es el lenguaje de programación estándar del navegador web que posibilita dotar de comportamiento dinámico e interacción a los documentos estáticos. El Modelo de Objetos del Documento (DOM, Document Object Model) representa la estructura HTML como un árbol jerárquico de nodos que pueden ser consultados, modificados o creados dinámicamente en tiempo de ejecución (Flanagan, 2020). La gestión de eventos mediante `document.addEventListener` permite implementar patrones reactivos como la delegación de eventos y la manipulación de clases CSS sin recargar la página.

Por su parte, la API de Web Storage provee dos mecanismos de persistencia clave del lado del cliente: `localStorage`, cuyos datos persisten de manera indefinida entre sesiones de navegación, y `sessionStorage`, cuyos datos residen en memoria mientras la pestaña o ventana del navegador permanezca abierta (MDN Web Docs, 2024). En TechStore, ambas tecnologías se articulan para almacenar el registro de usuarios, la sesión activa, el carrito de compras y las preferencias de usuario sin depender de un backend complejo.

---

## 4. ESTRUCTURA Y DISTRIBUCIÓN DE LOS ARCHIVOS

### Tabla 1. Estructura de carpetas, archivos y módulos de TechStore
| Ruta / Archivo | Tipo | Función e Implementación Técnica |
| :--- | :--- | :--- |
| `index.html` | HTML5 | Página principal: banner hero, indicadores de confianza, productos destacados, proceso de ensamble, marcas y contenedor de modal interactivo con apertura automática. |
| `productos/index.html` | HTML5 | Catálogo general con 32 productos en cuatro categorías, selector de filtrado reactivo y anclas de navegación directa. |
| `comparativa/index.html` | HTML5 | Módulo de comparación técnica de laptops y PCs en tabla semántica con pie de tabla y celdas combinadas con `colspan`. |
| `ofertas/index.html` | HTML5 | Sección de promociones especiales, combos gamer armados y banners de Cyber Weekend con temporizador visual. |
| `servicios/index.html` | HTML5 | Página de servicios de soporte y laboratorio técnico; incorpora el Simulador Financiero Interactivo de cuotas de financiamiento. |
| `nosotros/index.html` | HTML5 | Presentación corporativa de TechStore: misión, visión, pilares éticos, perfiles de los integrantes del equipo y alianzas oficiales. |
| `contacto/index.html` | HTML5 | Formulario integral de cotización y compra con validación nativa e interactiva, y Libro de Reclamaciones virtual (Ley N.° 29571). |
| `login/index.html` | HTML5 | Portal de clientes con tarjetas individuales para inicio de sesión y registro de nuevas cuentas con validación de requisitos. |
| `css/estilos.css` | CSS3 | Hoja de estilo maestra centralizada con variables CSS, grillas CSS Grid, componentes Flexbox, animaciones `@keyframes` y media queries. |
| `js/app.js` | JS Vanilla | Controlador principal: gestión del modal de sesión emergente, apertura automática al cargar `index.html`, control de pestañas login/registro, validaciones de teléfono `[0-9]{9}` en tiempo real, persistencia de sesión y renderizado del saludo de usuario en el header. |
| `js/datos.js` | JS Vanilla | Base de datos en cliente: arreglo de 32 objetos producto con IDs únicos, especificaciones completas, precios, stock y rutas de imagen. |
| `js/servicios.js` | JS Vanilla | Motor financiero del simulador de financiamiento: cálculo de cuotas fijas mensuales mediante la fórmula de amortización francesa. |
| `js/carrito.js` | JS Vanilla | Gestor del carrito de compras: adición, actualización de badge de conteo en la barra de navegación, totalización y almacenamiento en `localStorage`. |
| `img/` | Multimedia | 32 fotografías de productos optimizadas en formato JPG/PNG e íconos institucionales de navegación y autenticación. |

---

## 5. ANÁLISIS DE REQUERIMIENTOS DEL SISTEMA

### 5.1. Requerimientos funcionales
- **Ventana modal interactiva de sesión:** apertura automática al iniciar `index.html` si no existe un usuario activo en el navegador, permitiendo alternar instantáneamente entre inicio de sesión y registro de cuenta.
- **Detección inteligente de cuentas previas:** si el equipo registra una cuenta creada con anterioridad en `localStorage`, el modal presenta un acceso directo personalizado solicitando únicamente la contraseña para ingresar en un solo clic.
- **Restricción estricta de datos numéricos y alfabéticos:** filtrado reactivo en el evento `oninput` que imposibilita escribir letras o caracteres especiales en el campo celular (restringido a 9 dígitos exactos) y filtra números en el nombre de usuario.
- **Vinculación reactiva de sesión:** al completar el registro o login, el sistema vincula inmediatamente la cuenta en `sessionStorage` y actualiza el encabezado institucional para mostrar "Hola, [Nombre]" junto a un botón interactivo de "Salir" que cierra la sesión.
- **Simulador financiero de crédito:** en `servicios.html`, cálculo instantáneo de cronogramas de pago y cuota fija mensual al variar el monto a financiar y el número de cuotas (6, 12, 18 o 24 meses).
- **Persistencia y carrito de compras:** almacenamiento local de productos añadidos con actualización dinámica del contador en la barra de menú en todas las vistas.

### 5.2. Validaciones de formularios y controles interactivos
### Tabla 2. Matriz de validaciones HTML5 y restricciones de entrada JavaScript
| Formulario / Control | Mecanismo de Control | Regla de Validación / Expresión | Efecto en la Interfaz |
| :--- | :--- | :--- | :--- |
| **Modal – Celular** | JS `oninput` + HTML `pattern` | regex: `/[^0-9]/g` \| `maxlength="9"` | Bloquea letras y símbolos en tiempo real; admite estrictamente 9 dígitos numéricos. |
| **Modal – Nombres** | JS `oninput` + HTML `minlength` | regex: `/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g` | Impide dígitos numéricos en el nombre del cliente; exige al menos 3 caracteres. |
| **Modal – Correo** | HTML5 `type="email"` + `required` | Validación nativa RFC 5322 | Exige sintaxis de correo válida (`usuario@dominio.ext`). |
| **Modal – Contraseña** | HTML5 `minlength="6"` + `required` | Mínimo 6 caracteres | Garantiza una longitud mínima para protección básica de la cuenta. |
| **Contacto – DNI** | HTML5 `pattern="[0-9]{8}"` | `maxlength="8"` + `required` | Exige exactamente 8 dígitos numéricos peruanos para cotizaciones formales. |
| **Contacto – Términos** | HTML5 `required` (checkbox) | Estado `:checked` obligatorio | Impide el envío si el usuario no acepta las políticas de privacidad. |
| **Simulador – Monto** | JS `input` event (min/max) | Valores entre S/ 500 y S/ 25,000 | Calcula la amortización en tiempo real y alerta ante montos fuera del rango comercial. |

---

## 6. CATÁLOGO DE PRODUCTOS INCORPORADOS

### Tabla 3. Distribución del catálogo de productos por categoría y rango de precios
| Categoría | Cantidad | Rango de Precios (S/) | Modelos Destacados Incorporados |
| :--- | :---: | :--- | :--- |
| **Laptops Gamer** | 8 | S/ 3,499.00 – S/ 16,499.00 | ASUS ROG Strix G16, MSI Katana HX 15, Lenovo LOQ 15, HP Omen Transcend 14, Acer Nitro V 15, Alienware m18 R2, Razer Blade 16, ASUS TUF Gaming A15. |
| **PCs de Escritorio** | 8 | S/ 3,699.00 – S/ 18,999.00 | ASUS ROG Strix G13CHR, HP OMEN 45L, Lenovo Legion Tower 5i, MSI MAG Infinite S3, PC BattleStation Custom, Corsair Vengeance i7500, NZXT Player: Two Prime, TechStore Starter Esports PC. |
| **Monitores Gamer** | 8 | S/ 699.00 – S/ 6,999.00 | Samsung Odyssey G7 32", ASUS ROG Swift OLED 27", LG UltraGear 34", BenQ ZOWIE XL2546K, Alienware 34" QD-OLED, Samsung Odyssey Neo G9 49", Gigabyte M27Q X, AOC 24G2SP. |
| **Periféricos Pro** | 8 | S/ 499.00 – S/ 1,299.00 | Corsair K70 RGB PRO OPX, Logitech G PRO X Superlight 2, HyperX Cloud III Wireless, HyperX QuadCast S, Razer Huntsman V3 Pro TKL, Arctis Nova Pro, Logitech G502 X PLUS, Elgato Stream Deck MK.2. |

---

## 7. MEJORAS E INTEGRACIONES DEL AVANCE 3

### Tabla 4. Matriz de evolución técnica del proyecto (Avance 1 vs Avance 2 vs Avance 3)
| Dimensión Técnica | Avance 1 | Avance 2 | Avance 3 (Proyecto Final) |
| :--- | :--- | :--- | :--- |
| **Interactividad y Lógica** | Inexistente (0% scripts) | Inexistente (comportamiento solo con checkbox hack en CSS) | JavaScript Vanilla modular (`app.js`, `datos.js`, `servicios.js`, `carrito.js`). Manipulación del DOM, eventos e interactividad nativa. |
| **Autenticación y Sesión** | No contemplada | Vistas estáticas de login con validación nativa HTML5 | Modal interactivo con apertura automática en `index.html`, pestañas login/registro, persistencia en Web Storage y saludo en header. |
| **Restricciones de Entrada** | Validación básica HTML5 | Atributos `pattern` y `required` en formularios | Validación reactiva en tiempo real (evento `oninput`): bloqueo total de letras en teléfono y de números en nombre. |
| **Gestión de Estado** | Sin persistencia | Sin persistencia | Web Storage API: `sessionStorage` para sesión de usuario activo y `localStorage` para carrito y cuentas registradas. |
| **Módulo Financiero** | No existía | Ficha técnica estática de servicios | Simulador financiero interactivo con fórmula de amortización francesa pura en `servicios.html`. |
| **Carrito de Compras** | Inexistente | Inexistente | Carrito interactivo con badge contador en header, cálculo de montos y persistencia local. |
| **Catálogo de Datos** | 4 productos en HTML | 32 productos maquetados con CSS Grid | Arreglo estructurado de objetos en `js/datos.js` preparado para filtrado dinámico. |

### 7.1. Implementación de la fórmula financiera en servicios.html
El simulador financiero de cuotas de TechStore implementa la fórmula de anualidad o amortización constante (sistema francés). Dado un monto de capital $P$, una tasa efectiva mensual $i$ y un número total de cuotas $n$, el valor de la cuota fija mensual $R$ se determina mediante la relación:

$$R = P \cdot \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

---

## 8. EVIDENCIA DEL PROYECTO
En el documento oficial Word (`INFORME_AVANCE_3_PROYECTO_FINAL.docx`) se incluyen las 17 figuras completas con sus recuadros designados para capturas de pantalla (`[ESPACIO PARA CAPTURA DE PANTALLA: FIGURA X]`) e imágenes embebidas de alta resolución:

1. **Figura 1.** Página de inicio: barra institucional, menú de navegación y banner principal.
2. **Figura 2.** Ventana modal de acceso (`#modal-sesion`) desplegada automáticamente en `index.html`.
3. **Figura 3.** Pestaña de creación de cuenta en el modal con restricciones numéricas en tiempo real (solo 9 dígitos numéricos en celular).
4. **Figura 4.** Sesión vinculada con éxito y actualización reactiva de la barra de navegación con el nombre del usuario.
5. **Figura 5.** Inicio: sección 'Lo Más Vendido', beneficios garantizados y proceso de ensamble.
6. **Figura 6.** Catálogo general de productos en cuadrícula CSS Grid y filtrado reactivo.
7. **Figura 7.** Tabla comparativa técnica de especificaciones y precios.
8. **Figura 8.** Detalle de filas destacadas y pie de tabla comparativa con celdas combinadas.
9. **Figura 9.** Página de ofertas especiales y combos gamer armados.
10. **Figura 10.** Servicios técnicos especializados de soporte, ensamble y mantenimiento.
11. **Figura 11.** Simulador interactivo de financiamiento y cálculo de cuotas en tiempo real (`servicios.html`).
12. **Figura 12.** Presentación institucional: misión, visión y valores de TechStore.
13. **Figura 13.** Equipo de desarrollo y panel de marcas aliadas oficiales.
14. **Figura 14.** Formulario de cotización y compra con validación nativa e interactiva.
15. **Figura 15.** Libro de Reclamaciones virtual (Ley N.° 29571) y pie de página institucional.
16. **Figura 16.** Portal independiente de acceso y registro de clientes (`login/index.html`).
17. **Figura 17.** Vista responsiva en dispositivo móvil (ancho 390 px) con menú adaptable.

---

## 9. COMPARACIÓN CON EL MODELO DE REFERENCIA

### Tabla 5. Elementos comerciales de TechStore inspirados en el modelo de referencia real
| Elemento Comercial | Implementación Lograda en TechStore (Avance 3) |
| :--- | :--- |
| **Información de contacto permanente** | Barra institucional fija en el encabezado con dirección física (CC Cyberplaza, Lima), teléfonos de cotización y horario de atención. |
| **Catálogo segmentado por familias** | Cuatro categorías claramente diferenciadas (Laptops, PCs, Monitores, Periféricos) con submenús de navegación rápida y anclas directas. |
| **Simulador de financiamiento** | Módulo interactivo en `servicios.html` que calcula cuotas fijas mensuales con amortización francesa según plazo y monto seleccionado. |
| **Autenticación y bienvenida en tiempo real** | Modal interactivo con apertura automática, control estricto de números telefónicos y saludo personalizado en el encabezado. |
| **Garantía y soporte técnico** | Página dedicada de servicios con ficha técnica de insumos certificados y sección interactiva de preguntas frecuentes. |
| **Cumplimiento normativo peruano** | Hoja de reclamación virtual conforme a las exigencias del Código de Protección al Consumidor (Ley N.° 29571) en el pie de página y contacto. |
| **Medios de pago nacionales** | Exhibición visual de pasarelas peruanas de pago: Visa, Mastercard, American Express, Yape, Plin, PagoEfectivo y transferencias bancarias. |
| **Ubicación geolocalizada** | Mapa interactivo de Google Maps embebido mediante iframe en el pie de página institucional de las ocho páginas. |

---

## 10. CONCLUSIONES
1. Se consolidó con éxito el desarrollo integral del proyecto TechStore, articulando armónicamente las ocho páginas web del sitio con una arquitectura frontend nativa basada en HTML5 semántico, CSS3 adaptable y JavaScript Vanilla (Unidad 3), cumpliendo rigurosamente los requerimientos planteados para el Avance 3.
2. La integración de JavaScript puro (0% frameworks o librerías externas) permitió dotar al sitio de interactividad reactiva, control del ciclo de vida del DOM y gestión de eventos de usuario, manteniendo un código liviano, eficiente y de alta mantenibilidad técnica.
3. La implementación de la ventana modal emergente con apertura automatizada en `index.html` y pestañas de conmutación resolvió la necesidad de captura y autenticación de usuarios de forma amigable, asegurando el ingreso obligatorio de datos requeridos mediante restricciones reactivas en tiempo real.
4. El control estricto en la entrada de datos (`oninput` con expresiones regulares) garantizó que el campo de número telefónico admita única y exclusivamente 9 caracteres numéricos bloqueando al instante letras o símbolos extraños, mientras que el campo de nombres restringe números, protegiendo la integridad de la información del cliente.
5. La utilización de Web Storage API (`sessionStorage` y `localStorage`) posibilitó una persistencia de sesión cliente transparente y confiable, reconociendo cuentas existentes en el equipo y reflejando el saludo institucional del usuario logueado en la cabecera de todas las vistas.
6. El simulador financiero de cuotas en `servicios.html` demostró la capacidad de resolver algoritmos matemáticos complejos en el navegador mediante la fórmula francesa de amortización, aportando un alto valor comercial y funcional al prototipo académico.

---

## 11. RECOMENDACIONES
1. Para etapas posteriores hacia un entorno de producción comercial, se recomienda integrar un backend formal (Node.js/Express, Python/Django o PHP) acoplado a una base de datos relacional (PostgreSQL o MySQL) para la persistencia permanente y cifrada de transacciones y credenciales de usuario.
2. Incorporar una pasarela de pagos digital en entorno de pruebas (sandbox) mediante APIs peruanas reconocidas (como Niubiz, Culqi o Mercado Pago) para completar el ciclo de compra en línea de forma segura.
3. Adoptar el formato de imagen WebP de última generación con compresión lossy/lossless para reducir en un 30% adicional el tiempo de carga del catálogo de productos en conexiones móviles lentas.
4. Continuar profundizando en las directrices de accesibilidad WCAG 2.1 nivel AA, garantizando que todos los modales y controles dinámicos mantengan el foco por teclado accesible (focus trapping).
5. Realizar pruebas de usabilidad y pruebas cruzadas de rendimiento (Lighthouse de Google) en diversos dispositivos y navegadores antes de la presentación final del proyecto.

---

## 12. BIBLIOGRAFÍA (APA 7ma Edición)
- Cámara de Comercio de Lima. (2024). *Reporte oficial de comercio electrónico en el Perú 2023-2024*. Instituto de Economía y Desarrollo Empresarial.
- Congreso de la República del Perú. (2010). *Ley N.° 29571, Código de Protección y Defensa del Consumidor*. Diario Oficial El Peruano.
- Duckett, J. (2011). *HTML & CSS: Design and build websites*. John Wiley & Sons.
- Duckett, J. (2014). *JavaScript & jQuery: Interactive front-end web development*. John Wiley & Sons.
- Flanagan, D. (2020). *JavaScript: The definitive guide* (7ma ed.). O’Reilly Media.
- Gutiérrez Torres, D. (2019). *Comercio electrónico: creación y protección de un sitio web*. Ediciones Unaua.
- Marcotte, E. (2011). *Responsive web design*. A Book Apart.
- MDN Web Docs. (2024). *Web Storage API: localStorage and sessionStorage*. Mozilla Developer Network. https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- Nielsen, J. (1993). *Usability engineering*. Morgan Kaufmann.
- Perú Retail. (2023). *Ventas del sector gamer en Perú crecen 8% en el primer semestre de 2023*. https://www.peru-retail.com/?p=292445
- World Wide Web Consortium. (2018). *Web content accessibility guidelines (WCAG) 2.1*. W3C Recommendation. https://www.w3.org/TR/WCAG21/

---

## 13. ANEXOS

### Anexo 1: Entrega del código fuente
El código fuente completo y depurado del proyecto se entrega adjunto en el archivo comprimido `TechStore-TallerWeb avance 3.zip`, el cual contiene las ocho páginas HTML5 semánticas, los estilos CSS modulares, las 32 imágenes optimizadas y la arquitectura de scripts JavaScript nativos.

### Anexo 2: Estructura física del directorio del proyecto
- `index.html`: Página principal con contenedor de modal interactivo y apertura automática.
- `productos/`, `comparativa/`, `ofertas/`, `servicios/`, `nosotros/`, `contacto/`, `login/`: Carpetas independientes con sus respectivas vistas `index.html`.
- `css/estilos.css`: Hoja de estilos compartida con tema oscuro, variables CSS y diseño adaptable.
- `js/app.js`: Controlador principal de modales, restricciones en tiempo real, sesión y header.
- `js/datos.js`: Arreglo de 32 objetos con el catálogo completo de productos.
- `js/servicios.js`: Algoritmo de cálculo de cuotas de financiamiento mediante fórmula francesa.
- `js/carrito.js`: Módulo de persistencia del carrito de compras en Web Storage.
- `img/`: Directorio de imágenes optimizadas de productos y logotipos oficiales.

### Anexo 3: Fragmento clave de JavaScript – Restricciones en tiempo real y vinculación de sesión (`js/app.js`)
```javascript
// js/app.js - Restricción numérica estricta y vinculación de sesión
function restringirSoloNumeros(input, maxDigitos) {
    // Elimina cualquier carácter que no sea un dígito numérico del 0 al 9
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > maxDigitos) {
        input.value = input.value.slice(0, maxDigitos);
    }
}

function vincularSesionUsuario(datosUsuario) {
    sessionStorage.setItem('usuarioLogueado', JSON.stringify(datosUsuario));
    localStorage.setItem('techstore_ultimo_usuario', JSON.stringify(datosUsuario));
    actualizarEncabezadoSesion();
    cerrarModalSesion();
    window.location.reload(); // Refresca para reflejar 'Hola, [Nombre]' en la barra
}

// Apertura automática si no hay sesión activa al cargar index.html
document.addEventListener('DOMContentLoaded', () => {
    const sesionActiva = sessionStorage.getItem('usuarioLogueado');
    if (!sesionActiva && window.location.pathname.endsWith('index.html')) {
        setTimeout(() => abrirModalSesion(), 300);
    }
});
```
