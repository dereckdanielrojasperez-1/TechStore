# TECHSTORE - Tienda Especializada en Cómputo Gamer y Hardware de Alto Rendimiento
> **Proyecto Final – Avance Final** | Curso: **Taller de Programación Web**  
> **Universidad Tecnológica del Perú (UTP)** – Lima, Perú (2026)  
> **Docente:** Mg. JESUS ANTONIO, PACAHUALA ARROYO  

![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Grid_%26_Flexbox-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_100%25-F7DF1E?logo=javascript&logoColor=black)
![Storage](https://img.shields.io/badge/Web_Storage-localStorage_%26_sessionStorage-00d2ff)
![Status](https://img.shields.io/badge/Proyecto-Avance_3_Completado-success)

---

## 📑 ÍNDICE GENERAL DEL PROYECTO
1. [Descripción General y Alcance](#-descripción-general-y-alcance)
2. [Documentación Técnica Oficial e Informes](#-documentación-técnica-oficial-e-informes)
3. [Estructura del Repositorio e Indexación de Archivos](#-estructura-del-repositorio-e-indexación-de-archivos)
4. [Nuevas Funcionalidades del Avance Final (JavaScript Vanilla y DOM)](#-nuevas-funcionalidades-del-avance-3-javascript-vanilla-y-dom)
   - [4.1. Ventana Modal de Sesión Interactiva](#41-ventana-modal-de-sesión-interactiva-modal-sesion)
   - [4.2. Restricciones Numéricas y Alfabéticas en Tiempo Real](#42-restricciones-numéricas-y-alfabéticas-en-tiempo-real-oninput)
   - [4.3. Persistencia de Sesión con Web Storage API](#43-persistencia-de-sesión-con-web-storage-api)
   - [4.4. Simulador Financiero de Cuotas (Fórmula Francesa)](#44-simulador-financiero-de-cuotas-en-servicioshtml)
   - [4.5. Carrito de Compras Interactivo](#45-carrito-de-compras-interactivo)
   - [4.6. Catálogo Dinámico de 32 Productos](#46-catálogo-dinámico-de-32-productos-en-4-categorías)
5. [Matriz Comparativa de Avances (Avance 1 vs 2 vs 3)](#-matriz-comparativa-de-avances)
6. [Instrucciones de Ejecución Local](#-instrucciones-de-ejecución-local)
7. [Integrantes del Equipo de Desarrollo](#-integrantes-del-equipo-de-desarrollo)

---

## 📌 Descripción General y Alcance

**TechStore** es una plataforma web de comercio electrónico frontend desarrollada como proyecto integrador del curso **Taller de Programación Web** de la UTP. El sitio simula una tienda formal peruana orientada a la venta de laptops gamer de alta gama, computadoras de escritorio ensambladas, monitores esports y periféricos competitivos.

En este **Avance Final (Proyecto Final)**, el sistema integra la capa de interactividad y comportamiento dinámico mediante **JavaScript nativo puro (Vanilla JS)**, prescindiendo en un 100% de librerías o dependencias externas (cero Bootstrap, cero jQuery), cumpliendo rigurosamente los lineamientos pedagógicos del docente.

---

## 📄 Documentación Técnica Oficial e Informes

Para la revisión académica y sustentación, se han compilado los informes oficiales respetando estrictamente el formato del curso, la tipografía formal y el color de texto en negro puro (`#000000`):

| Formato | Recurso / Enlace | Descripción |
| :---: | :--- | :--- |
| **PDF** | [📥 Descargar INFORME_AVANCE_FINAL_PROYECTO_FINAL.pdf](docs/INFORME_AVANCE_FINAL_PROYECTO_FINAL.pdf) | Documento PDF listo para lectura e impresión, renderizado directamente con Microsoft Word (17 figuras y 5 tablas). |
| **Word** | [📥 Descargar INFORME_AVANCE_FINAL_PROYECTO_FINAL.docx](docs/INFORME_AVANCE_FINAL_PROYECTO_FINAL.docx) | Documento original en Word con formato exacto del Avance 2, cajas de captura de pantalla y tablas académicas. |
| **Markdown** | [📖 Ver INFORME_AVANCE_FINAL_PROYECTO_FINAL.md](docs/INFORME_AVANCE_FINAL_PROYECTO_FINAL.md) | Versión completa en Markdown para lectura e indexación directa en GitHub. |
| **ZIP** | [📦 Descargar TechStore-TallerWeb avance final.zip](docs/TechStore-TallerWeb%20avance%203.zip) | Paquete comprimido con el código fuente depurado, 32 imágenes y scripts. |

---

## 🗂 Estructura del Repositorio e Indexación de Archivos

```plaintext
TechStore/
├── index.html                   # Página principal: hero banner, lo más vendido, modal auto-open
├── productos.html               # Catálogo general con 32 productos en 4 familias y filtros
├── ofertas.html                 # Módulo de promociones y combos "Cyber Weekend Gamer"
├── servicios.html               # Soporte técnico y Simulador Financiero de Cuotas
├── comparativa.html             # Tabla comparativa de especificaciones técnicas con colspan
├── nosotros.html                # Presentación corporativa, misión, visión y equipo de fundadores
├── contacto.html                # Formulario de cotización/compra y Libro de Reclamaciones (Ley 29571)
├── login.html                   # Portal de clientes con formularios independientes
├── css/
│   └── estilos.css              # Hoja de estilos compartida con variables CSS y diseño adaptable
├── js/
│   ├── app.js                   # Controlador general: modales, restricciones, sesión y header
│   └── datos.js                 # Arreglo de 32 objetos con especificaciones y catálogo
├── img/                         # 32 fotografías de hardware optimizadas e íconos SVG/PNG
├── docs/                        # Informes académicos oficiales (PDF, Word, Markdown, ZIP)
│   ├── INFORME_AVANCE_FINAL_PROYECTO_FINAL.pdf
│   ├── INFORME_AVANCE_FINAL_PROYECTO_FINAL.docx
│   ├── INFORME_AVANCE_FINAL_PROYECTO_FINAL.md
│   └── TechStore-TallerWeb avance final.zip
└── README.md                    # Índice técnico y documentación del repositorio
```

---

## ⚡ Nuevas Funcionalidades del Avance Final (JavaScript Vanilla y DOM)

### 4.1. Ventana Modal de Sesión Interactiva (`#modal-sesion`)
- **Apertura Automatizada:** Al ingresar a `index.html`, si el navegador no registra una sesión activa en `sessionStorage`, el modal se abre automáticamente tras 300 ms de carga.
- **Pestañas Intercambiables:** Control por pestañas nativas que alternan entre **"Iniciar Sesión"** y **"Crear Cuenta"** sin recargar la página.
- **Detección de Cuenta Previa:** Si existe una cuenta previamente registrada en el equipo (`localStorage`), el modal muestra el perfil detectado y solicita únicamente la contraseña para ingresar en un clic.

### 4.2. Restricciones Numéricas y Alfabéticas en Tiempo Real (`oninput`)
- **Campo Celular:** Restricción estricta mediante expresiones regulares nativas (`/[^0-9]/g`) que bloquea en tiempo real cualquier letra o carácter especial, permitiendo **exactamente 9 dígitos numéricos**.
- **Campo Nombre:** Restricción de caracteres numéricos (`/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g`), exigiendo nombres alfabéticos válidos.

```javascript
// Validación estricta en tiempo de digitación (js/app.js)
function restringirSoloNumeros(input, maxDigitos) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > maxDigitos) {
        input.value = input.value.slice(0, maxDigitos);
    }
}
```

### 4.3. Persistencia de Sesión con Web Storage API
- **`sessionStorage`:** Mantiene la sesión del usuario activa mientras navega por las ocho páginas del sitio.
- **`localStorage`:** Almacena de forma persistente los datos de la última cuenta creada y el estado del carrito.
- **Actualización Reactiva del Encabezado:** Tras el login o registro, la barra institucional se actualiza instantáneamente mostrando `Hola, [Nombre]` y un botón de `Salir` que destruye la sesión y reinicia el estado.

### 4.4. Simulador Financiero de Cuotas en `servicios.html`
Permite al usuario cotizar financiamientos mediante la **fórmula francesa de amortización fija**:

$$R = P \cdot \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

- **$P$**: Monto a financiar (selector de rango de S/ 500 a S/ 25,000).
- **$i$**: Tasa de interés efectiva mensual (2.5% referencial).
- **$n$**: Plazo en meses (6, 12, 18 o 24 cuotas).
- Calcula en vivo la cuota mensual fija, el interés total generado y el importe consolidado a pagar.

### 4.5. Carrito de Compras Interactivo
- Añadido de productos desde las tarjetas del catálogo.
- Indicador numérico (badge) reactivo en la barra superior de todas las páginas.
- Modal emergente con resumen de compra, desglose de artículos y botón de vaciado o confirmación.

### 4.6. Catálogo Dinámico de 32 Productos en 4 Categorías
Base de datos en el cliente estructurada en `js/datos.js` con 8 modelos por categoría:
1. **Laptops Gamer:** ASUS ROG Strix G16, MSI Katana, Lenovo LOQ, HP Omen, etc.
2. **PCs de Escritorio:** ASUS ROG Strix, HP OMEN 45L, MSI MAG Infinite, Lenovo Legion, etc.
3. **Monitores Gamer:** Samsung Odyssey G7/Neo G9, ASUS ROG Swift OLED, BenQ ZOWIE, etc.
4. **Periféricos Pro:** Teclados mecánicos Razer, mouse Logitech G PRO, headsets HyperX Cloud III.

---

## 📊 Matriz Comparativa de Avances

| Aspecto Técnico | Avance 1 | Avance 2 | Avance Final (Proyecto Final) |
| :--- | :--- | :--- | :--- |
| **Páginas** | 4 páginas estáticas | 8 páginas interconectadas | 8 páginas completamente integradas con lógica JS |
| **Maquetación** | Float y cajas simples | CSS Grid, Flexbox y media queries | Grid + Flexbox + componentes modales flotantes |
| **Lógica / Scripts** | Inexistente (0% JS) | Inexistente (solo CSS checkbox hack) | **JavaScript Vanilla modular (app.js, datos.js)** |
| **Autenticación** | Sin acceso | Formularios estáticos en login/ | **Modal interactivo, auto-open, pestañas y sesión en header** |
| **Validaciones** | Atributos HTML básicos | Expresiones regulares HTML5 | **Restricciones en tiempo real (`oninput`) 9 dígitos celular** |
| **Persistencia** | Nula | Nula | **Web Storage API (`localStorage` y `sessionStorage`)** |
| **Financiamiento** | Inexistente | Ficha técnica informativa | **Simulador de amortización francesa pura en tiempo real** |
| **Carrito** | Inexistente | Inexistente | **Carrito interactivo con badge contador y persistencia** |

---

## 🚀 Instrucciones de Ejecución Local

Para visualizar y probar el proyecto completo en tu computadora:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/dereckdanielrojasperez-1/TechStore.git
   cd TechStore
   ```
2. **Abrir directamente en el navegador:**
   - Haz doble clic sobre el archivo `index.html`.
3. **O ejecutar un servidor local ligero:**
   ```bash
   # En Python 3:
   python -m http.server 8080
   # Luego abrir en el navegador: http://localhost:8080
   ```

---

## 👥 Integrantes del Equipo de Desarrollo

| Integrante | Código UTP | Rol / Especialidad |
| :--- | :---: | :--- |
| **Zavala Huaranga, Jhorkaef** | `U24224270` | Coordinación de Arquitectura y Maquetación Semántica |
| **Rojas Pérez, Dereck** | `U24216436` | Desarrollo de Lógica JavaScript, Control de Versiones y Git |
| **Palomino Cajamarca, Ilie Franco** | `U24263884` | Diseño de Interfaz CSS3, Grillas Adaptables y Responsive |
| **Quicaño Rodríguez, Jhan Paul** | `U24200277` | Validación de Formularios, Documentación e Informe Técnico |

- **Docente:** Mg. JESUS ANTONIO, PACAHUALA ARROYO  
- **Institución:** Universidad Tecnológica del Perú – Sede Lima  
- **Ciclo Académico:** 2026  
