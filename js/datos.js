// arreglo con los nombres de los productos del catalogo
let nombres = [
    "Laptop ASUS ROG Strix G16",
    "PC Gamer BattleStation Ultra",
    "Monitor Curvo UltraWide 34",
    "Teclado Mecanico Apex Pro",
    "Laptop Lenovo Legion 5",
    "Monitor Gamer 27 Pulgadas",
    "Teclado Mecanico RGB Redragon",
    "PC Gaming Core i5 RTX 4060"
];

// arreglo con los precios en soles de cada equipo
let precios = [
    5899,
    8450,
    2199,
    649,
    6799,
    1250,
    280,
    4300
];

// arreglo con las categorias para filtrar
let categorias = [
    "Laptops",
    "Computadoras",
    "Monitores",
    "Accesorios",
    "Laptops",
    "Monitores",
    "Accesorios",
    "Computadoras"
];

// arreglo con las rutas de las fotos locales
let imagenes = [
    "img/laptop-rog.jpg",
    "img/pc-gamer.jpg",
    "img/monitor-curvo.jpg",
    "img/teclado-mecanico.jpg",
    "img/laptop-lenovo.jpg",
    "img/monitor-asus-rog.jpg",
    "img/periferico-teclado-razer.jpg",
    "img/pc-starter-esports.jpg"
];

// arreglo con los detalles tecnicos de cada producto
let detalles = [
    "Intel Core i7 13650HX, 16GB RAM DDR5, 1TB SSD, RTX 4060 8GB.",
    "AMD Ryzen 7 7800X3D, 32GB RAM DDR5, 1TB SSD, RTX 4070 Ti Super.",
    "Resolucion WQHD 3440x1440, 165Hz, panel curvo 1500R, 1ms FreeSync.",
    "Switches mecanicos ajustables OmniPoint, iluminacion RGB y reposamuñecas.",
    "AMD Ryzen 7 7745HX, 16GB RAM DDR5, 512GB SSD NVMe, RTX 4060.",
    "Panel IPS Full HD 1920x1080, 165Hz, soporte ergonomico regulable.",
    "Switches mecanicos Outemu Blue con retroiluminacion y cable desmontable.",
    "Intel Core i5 13400F, 16GB RAM, 500GB SSD NVMe, RTX 4060 8GB."
];

// arreglo para guardar los productos del carrito de compras
let carrito = [];

// funcion para agregar el indice al arreglo del carrito
function agregarAlArregloCarrito(indice) {
    carrito.push(indice);
}

// funcion para buscar un producto por su nombre
function buscarIndicePorNombre(nombreBuscado) {
    return nombres.indexOf(nombreBuscado);
}

// funcion para filtrar productos segun la categoria
function filtrarIndicesPorCategoria(categoriaSeleccionada) {
    let indices = [];
    for (let i = 0; i < categorias.length; i++) {
        indices.push(i);
    }

    if (categoriaSeleccionada === "todas" || categoriaSeleccionada === "") {
        return indices;
    }

    return indices.filter(function(i) {
        return categorias[i] === categoriaSeleccionada;
    });
}
