// =========================================================================
// BLOQUE: BASE DE DATOS DE PRODUCTOS (TECHSTORE)
// Este bloque contiene el catálogo maestro con:
// - nombre: Nombre comercial del equipo
// - categoria: Categoría a la que pertenece (Laptops, Computadoras, Monitores, Accesorios)
// - precio: Precio de venta al público en Soles (S/)
// - precioAnterior: Precio tachado referencial para ofertas
// - stock: Cantidad de unidades disponibles en almacén
// - imagen: Fotografía de estudio de alta definición (1024x1024)
// - detalles: Especificaciones técnicas y descripción del producto
// =========================================================================
const PRODUCTOS_SEED = [

    // --- [SUB-BLOQUE: LAPTOPS GAMER - NOMBRES, DESCRIPCIONES Y PRECIOS] ---
    {
        id: "lap-01",
        nombre: "Laptop ASUS ROG Strix G16",
        categoria: "Laptops",
        precio: 5899.00,
        precioAnterior: 6499.00,
        stock: 8,
        imagen: "img/laptop-rog.jpg",
        detalles: "Intel Core i7 13650HX, 16GB RAM DDR5, 1TB SSD, RTX 4060 8GB, Pantalla 16'' FHD+ 165Hz."
    },
    // --- [SUB-BLOQUE: COMPUTADORAS Y TORRES GAMER - NOMBRES, DESCRIPCIONES Y PRECIOS] ---
    {
        id: "pc-01",
        nombre: "PC BattleStation Custom Ultra",
        categoria: "Computadoras",
        precio: 8450.00,
        precioAnterior: 9199.00,
        stock: 4,
        imagen: "img/pc-gamer.jpg",
        detalles: "AMD Ryzen 7 7800X3D, 32GB DDR5 6000MHz, 1TB SSD Gen4, RTX 4070 Ti Super, Watercooling 360mm."
    },
    // --- [SUB-BLOQUE: MONITORES DE ALTO RENDIMIENTO - NOMBRES, DESCRIPCIONES Y PRECIOS] ---
    {
        id: "mon-01",
        nombre: "Samsung Odyssey G7 32 Pulgadas",
        categoria: "Monitores",
        precio: 2199.00,
        precioAnterior: 2499.00,
        stock: 10,
        imagen: "img/monitor-samsung-odyssey.jpg",
        detalles: "Curvatura 1000R, WQHD 2560x1440, 240Hz, 1ms GtG, QLED, compatible G-Sync y FreeSync Premium Pro."
    },
    // --- [SUB-BLOQUE: ACCESORIOS Y PERIFÉRICOS GAMER - NOMBRES, DESCRIPCIONES Y PRECIOS] ---
    {
        id: "per-01",
        nombre: "Corsair K70 RGB PRO OPX",
        categoria: "Accesorios",
        precio: 649.00,
        precioAnterior: 729.00,
        stock: 12,
        imagen: "img/teclado-mecanico.jpg",
        detalles: "Switches óptico-mecánicos Corsair OPX ultrarrápidos, polling rate de 8000Hz con tecnología AXON."
    },
    {
        id: "lap-02",
        nombre: "Laptop MSI Katana HX 15",
        categoria: "Laptops",
        precio: 4999.00,
        precioAnterior: 5499.00,
        stock: 6,
        imagen: "img/laptop-msi.jpg",
        detalles: "Intel Core i7 14650HX, 16GB DDR5, 1TB SSD NVMe, RTX 4060 8GB, 144Hz IPS."
    },
    {
        id: "pc-02",
        nombre: "PC HP OMEN 45L Gaming",
        categoria: "Computadoras",
        precio: 12999.00,
        precioAnterior: 13999.00,
        stock: 3,
        imagen: "img/pc-hp-omen.jpg",
        detalles: "Intel Core i9 14900K, 64GB DDR5, 2TB SSD, RTX 4080 Super 16GB, Cryo Chamber Refrigeración Líquida."
    },
    {
        id: "mon-02",
        nombre: "LG UltraGear 34 Pulgadas Curvo",
        categoria: "Monitores",
        precio: 2499.00,
        precioAnterior: 2799.00,
        stock: 7,
        imagen: "img/monitor-curvo.jpg",
        detalles: "UltraWide WQHD 3440x1440, 160Hz, 1ms MBR, HDR10, sRGB 99%, altavoces MaxxAudio integrados."
    },
    {
        id: "per-02",
        nombre: "Logitech G PRO X Superlight 2",
        categoria: "Accesorios",
        precio: 599.00,
        precioAnterior: 669.00,
        stock: 16,
        imagen: "img/periferico-mouse-logitech.jpg",
        detalles: "Mouse inalámbrico de 60g, sensor HERO 2 de 32000 DPI, switches LIGHTFORCE híbridos, hasta 95h."
    },
    {
        id: "lap-03",
        nombre: "Laptop Lenovo LOQ 15",
        categoria: "Laptops",
        precio: 3899.00,
        precioAnterior: 4299.00,
        stock: 12,
        imagen: "img/laptop-lenovo.jpg",
        detalles: "AMD Ryzen 7 7435HS, 16GB RAM DDR5, 512GB SSD, RTX 4050 6GB, 144Hz FHD."
    },
    {
        id: "pc-03",
        nombre: "PC ASUS ROG Strix G13CHR",
        categoria: "Computadoras",
        precio: 7299.00,
        precioAnterior: 7899.00,
        stock: 5,
        imagen: "img/pc-asus-rog.jpg",
        detalles: "Intel Core i7 14700F, 32GB RAM DDR5, 1TB SSD NVMe, RTX 4070 Super 12GB, Fuente 750W Gold."
    },
    {
        id: "mon-03",
        nombre: "ASUS ROG Swift OLED 27 Pulgadas",
        categoria: "Monitores",
        precio: 3899.00,
        precioAnterior: 4299.00,
        stock: 4,
        imagen: "img/monitor-asus-rog.jpg",
        detalles: "Panel OLED 2560x1440, 240Hz ultra rápido, 0.03ms, disipador térmico personalizado y HDR10."
    },
    {
        id: "per-03",
        nombre: "HyperX Cloud III Wireless",
        categoria: "Accesorios",
        precio: 549.00,
        precioAnterior: 619.00,
        stock: 14,
        imagen: "img/periferico-headset-hyperx.jpg",
        detalles: "Audífonos inalámbricos 2.4GHz con hasta 120 horas de batería, transductores de 53mm en ángulo."
    },
    {
        id: "lap-04",
        nombre: "Laptop HP Omen Transcend 14",
        categoria: "Laptops",
        precio: 6799.00,
        precioAnterior: 7299.00,
        stock: 4,
        imagen: "img/laptop-hp.jpg",
        detalles: "Intel Core Ultra 7 155H, 16GB LPDDR5X, 1TB SSD, RTX 4060, Pantalla OLED 2.8K 120Hz."
    },
    {
        id: "pc-04",
        nombre: "PC Lenovo Legion Tower 5i",
        categoria: "Computadoras",
        precio: 5899.00,
        precioAnterior: 6399.00,
        stock: 7,
        imagen: "img/pc-lenovo-legion.jpg",
        detalles: "Intel Core i7 14700, 16GB DDR5, 1TB SSD NVMe, RTX 4060 Ti 8GB, Chasis con flujo de aire optimizado."
    },
    {
        id: "mon-04",
        nombre: "BenQ ZOWIE XL2546K 24.5 Pulgadas",
        categoria: "Monitores",
        precio: 1999.00,
        precioAnterior: 2199.00,
        stock: 8,
        imagen: "img/monitor-benq-zowie.jpg",
        detalles: "FHD 1920x1080, 240Hz para esports competitivos, tecnología DyAc+, base ajustable compacta."
    },
    {
        id: "per-04",
        nombre: "HyperX QuadCast S RGB",
        categoria: "Accesorios",
        precio: 599.00,
        precioAnterior: 679.00,
        stock: 9,
        imagen: "img/periferico-microfono-quadcast.jpg",
        detalles: "Micrófono condensador USB con iluminación RGB dinámica, montura antivibración y sensor tap-to-mute."
    },
    {
        id: "lap-05",
        nombre: "Laptop Acer Nitro V 15",
        categoria: "Laptops",
        precio: 3499.00,
        precioAnterior: 3899.00,
        stock: 15,
        imagen: "img/laptop-acer.jpg",
        detalles: "Intel Core i5 13420H, 16GB RAM, 512GB SSD, RTX 4050 6GB, 144Hz IPS."
    },
    {
        id: "pc-05",
        nombre: "PC MSI MAG Infinite S3",
        categoria: "Computadoras",
        precio: 4699.00,
        precioAnterior: 5099.00,
        stock: 8,
        imagen: "img/pc-msi-infinite.jpg",
        detalles: "Intel Core i5 14400F, 16GB RAM, 1TB SSD, RTX 4060 8GB, Iluminación Mystic Light RGB."
    },
    {
        id: "mon-05",
        nombre: "Alienware 34 Pulgadas QD-OLED Curvo",
        categoria: "Monitores",
        precio: 4599.00,
        precioAnterior: 4999.00,
        stock: 3,
        imagen: "img/monitor-alienware-qdoled.jpg",
        detalles: "Curvo 1800R WQHD, Quantum Dot OLED, 175Hz, 0.1ms, cobertura 99.3% DCI-P3, HDR True Black 400."
    },
    {
        id: "per-05",
        nombre: "Razer Huntsman V3 Pro TKL",
        categoria: "Accesorios",
        precio: 899.00,
        precioAnterior: 999.00,
        stock: 6,
        imagen: "img/periferico-teclado-razer.jpg",
        detalles: "Switches analógicos ópticos Gen-2 de Razer con accionamiento regulable desde 0.1 hasta 4.0mm."
    },
    {
        id: "lap-06",
        nombre: "Laptop Alienware m18 R2",
        categoria: "Laptops",
        precio: 16499.00,
        precioAnterior: 17999.00,
        stock: 3,
        imagen: "img/laptop-alienware.jpg",
        detalles: "Intel Core i9 14900HX, 32GB RAM DDR5, 2TB SSD, RTX 4090 16GB, Pantalla 18'' QHD+ 165Hz."
    },
    {
        id: "pc-06",
        nombre: "PC Corsair Vengeance i7500",
        categoria: "Computadoras",
        precio: 14899.00,
        precioAnterior: 15999.00,
        stock: 2,
        imagen: "img/pc-corsair-vengeance.jpg",
        detalles: "Intel Core i9 14900KF, 64GB DDR5 Corsair RGB, 2TB SSD, RTX 4090 24GB, Fuente Corsair 1000W."
    },
    {
        id: "mon-06",
        nombre: "Samsung Odyssey Neo G9 49 Pulgadas",
        categoria: "Monitores",
        precio: 6999.00,
        precioAnterior: 7799.00,
        stock: 2,
        imagen: "img/monitor-samsung-neo-g9.jpg",
        detalles: "Super UltraWide 32:9 (5120x1440), Curvatura 1000R, Quantum Mini-LED 240Hz, Quantum HDR 2000."
    },
    {
        id: "per-06",
        nombre: "SteelSeries Arctis Nova Pro",
        categoria: "Accesorios",
        precio: 1299.00,
        precioAnterior: 1399.00,
        stock: 5,
        imagen: "img/periferico-headset-steelseries.jpg",
        detalles: "Audio espacial de alta fidelidad con estación GameDAC Gen 2, cancelación activa de ruido (ANC)."
    },
    {
        id: "lap-07",
        nombre: "Laptop Razer Blade 16",
        categoria: "Laptops",
        precio: 14299.00,
        precioAnterior: 15499.00,
        stock: 2,
        imagen: "img/laptop-razer.jpg",
        detalles: "Intel Core i9 14900HX, 32GB DDR5, 2TB SSD, RTX 4080 12GB, Pantalla Dual-mode Mini-LED."
    },
    {
        id: "pc-07",
        nombre: "PC NZXT Player: Two Prime",
        categoria: "Computadoras",
        precio: 7999.00,
        precioAnterior: 8599.00,
        stock: 5,
        imagen: "img/pc-nzxt-player.jpg",
        detalles: "AMD Ryzen 7 7700X, 32GB RAM DDR5, 1TB SSD, RTX 4070 Ti 12GB, Gabinete H5 Elite con Kraken AIO."
    },
    {
        id: "mon-07",
        nombre: "Gigabyte M27Q X 27 Pulgadas",
        categoria: "Monitores",
        precio: 1599.00,
        precioAnterior: 1799.00,
        stock: 11,
        imagen: "img/monitor-gigabyte-m27q.jpg",
        detalles: "SuperSpeed IPS QHD 2560x1440, 240Hz, 1ms, KVM switch integrado para alternar dos computadoras."
    },
    {
        id: "per-07",
        nombre: "Logitech G502 X PLUS RGB",
        categoria: "Accesorios",
        precio: 579.00,
        precioAnterior: 649.00,
        stock: 11,
        imagen: "img/periferico-mouse-g502x.jpg",
        detalles: "Switches óptico-mecánicos LIGHTFORCE, iluminación LIGHTSYNC RGB de 8 zonas, sensor HERO 25K."
    },
    {
        id: "lap-08",
        nombre: "Laptop ASUS TUF Gaming A15",
        categoria: "Laptops",
        precio: 4199.00,
        precioAnterior: 4599.00,
        stock: 9,
        imagen: "img/laptop-tuf.jpg",
        detalles: "AMD Ryzen 7 7735HS, 16GB RAM, 512GB SSD, RTX 4060 8GB, 144Hz FHD."
    },
    {
        id: "pc-08",
        nombre: "PC TechStore Starter Esports",
        categoria: "Computadoras",
        precio: 3699.00,
        precioAnterior: 3999.00,
        stock: 14,
        imagen: "img/pc-starter-esports.jpg",
        detalles: "Intel Core i5 13400F, 16GB RAM DDR4, 500GB SSD NVMe, RTX 4060 8GB, Fuente 650W 80+ Bronze."
    },
    {
        id: "mon-08",
        nombre: "AOC 24G2SP 24 Pulgadas Gaming",
        categoria: "Monitores",
        precio: 699.00,
        precioAnterior: 799.00,
        stock: 20,
        imagen: "img/monitor-aoc-24g2sp.jpg",
        detalles: "Panel IPS Full HD 1920x1080, 165Hz, 1ms MPRT, FreeSync Premium, soporte ergonómico regulable."
    },
    {
        id: "per-08",
        nombre: "Elgato Stream Deck MK.2",
        categoria: "Accesorios",
        precio: 629.00,
        precioAnterior: 699.00,
        stock: 8,
        imagen: "img/periferico-elgato-streamdeck.jpg",
        detalles: "15 teclas LCD personalizables para controlar transmisiones, apps y herramientas de producción."
    },
    // --- [SUB-BLOQUE: PRODUCTOS AMPLIADOS DEL CATÁLOGO] ---
    {
        id: "lap-09",
        nombre: "Laptop Lenovo Legion Pro 5",
        categoria: "Laptops",
        precio: 7499.00,
        precioAnterior: 8199.00,
        stock: 7,
        imagen: "img/laptop-lenovo.jpg",
        detalles: "AMD Ryzen 7 7745HX, 32GB RAM DDR5, 1TB SSD NVMe, RTX 4070 8GB, Pantalla WQXGA 240Hz 500 nits."
    },
    {
        id: "pc-09",
        nombre: "PC Thermaltake Core Gaming P3",
        categoria: "Computadoras",
        precio: 11499.00,
        precioAnterior: 12299.00,
        stock: 3,
        imagen: "img/pc-gamer.jpg",
        detalles: "AMD Ryzen 9 7900X, 32GB DDR5 6000MHz, 2TB SSD NVMe, RTX 4080 16GB, Chasis abierto modular."
    },
    {
        id: "mon-09",
        nombre: "ViewSonic OMNI 27 Pulgadas QHD Fast IPS",
        categoria: "Monitores",
        precio: 1299.00,
        precioAnterior: 1449.00,
        stock: 12,
        imagen: "img/monitor-gigabyte-m27q.jpg",
        detalles: "Resolución 2560x1440, 180Hz, 0.5ms MPRT, HDR10, soporte regulable en altura y giro."
    },
    {
        id: "per-09",
        nombre: "Razer BlackShark V2 Pro",
        categoria: "Accesorios",
        precio: 699.00,
        precioAnterior: 779.00,
        stock: 10,
        imagen: "img/periferico-headset-hyperx.jpg",
        detalles: "Audio espacial THX Spatial Audio, micrófono desmontable HyperClear de banda ancha, hasta 70h."
    },
    {
        id: "lap-10",
        nombre: "Laptop Dell G15 Gaming 5530",
        categoria: "Laptops",
        precio: 5299.00,
        precioAnterior: 5799.00,
        stock: 9,
        imagen: "img/laptop-acer.jpg",
        detalles: "Intel Core i7 13650HX, 16GB DDR5, 1TB SSD NVMe, RTX 4060 8GB, Pantalla 165Hz sRGB 100%."
    },
    {
        id: "pc-10",
        nombre: "PC Cougar Conquer Titan Esports",
        categoria: "Computadoras",
        precio: 8199.00,
        precioAnterior: 8899.00,
        stock: 4,
        imagen: "img/pc-starter-esports.jpg",
        detalles: "Intel Core i7 14700KF, 32GB DDR5 RGB, 1TB SSD Gen4, RTX 4070 Super 12GB, Enfriamiento líquido 240mm."
    },
    {
        id: "mon-10",
        nombre: "MSI Optix 32 Pulgadas Curvo 165Hz",
        categoria: "Monitores",
        precio: 1899.00,
        precioAnterior: 2099.00,
        stock: 6,
        imagen: "img/monitor-curvo.jpg",
        detalles: "Curvatura 1500R, WQHD 2560x1440, 165Hz, 1ms, panel VA antirreflejo con iluminación Mystic Light."
    },
    {
        id: "per-10",
        nombre: "Redragon Kumara K552 RGB",
        categoria: "Accesorios",
        precio: 249.00,
        precioAnterior: 299.00,
        stock: 25,
        imagen: "img/teclado-mecanico.jpg",
        detalles: "Switches mecánicos táctiles Outemu Blue, chasis reforzado de aluminio, retroiluminación RGB de 18 modos."
    }
];

// =========================================================================
// BLOQUE: ARRAYS DE ACCESO RÁPIDO PARA EL MOTOR DEL CATÁLOGO Y CARRITO
// Estos arreglos extraen los datos de PRODUCTOS_SEED para usarlos en app.js:
// - nombres: Lista de títulos de productos
// - precios: Lista de precios unitarios
// - categorias: Lista de categorías asociadas
// - imagenes: Rutas de las imágenes de estudio
// - detalles: Descripciones y especificaciones técnicas
// =========================================================================
let nombres = PRODUCTOS_SEED.map(function(p) { return p.nombre; });
let precios = PRODUCTOS_SEED.map(function(p) { return p.precio; });
let categorias = PRODUCTOS_SEED.map(function(p) { return p.categoria; });
let imagenes = PRODUCTOS_SEED.map(function(p) { return p.imagen; });
let detalles = PRODUCTOS_SEED.map(function(p) { return p.detalles; });

let carrito = [];

function agregarAlArregloCarrito(indice) {
    carrito.push(indice);
}

function buscarIndicePorNombre(nombreBuscado) {
    return nombres.indexOf(nombreBuscado);
}

function filtrarIndicesPorCategoria(categoriaSeleccionada) {
    let indices = [];
    for (let i = 0; i < categorias.length; i++) {
        indices.push(i);
    }

    if (!categoriaSeleccionada || categoriaSeleccionada === "todas" || categoriaSeleccionada === "") {
        return indices;
    }

    return indices.filter(function(i) {
        return categorias[i].toLowerCase() === categoriaSeleccionada.toLowerCase();
    });
}