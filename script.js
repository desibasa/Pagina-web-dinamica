 function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
             document.getElementById(id).innerHTML = data;
         })
        .catch(error => console.error(`Error al cargar ${file}:`,
           error));
}
// Cargamos navbar y footer al cargar la página 
 loadComponent("navbar", "navbar.html");
 loadComponent("footer", "footer.html");

 //CARRITO COMPRAS

function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error al cargar ${file}:`, error));
}

// Cargamos navbar y footer al cargar la página 
loadComponent("navbar", "navbar.html");
loadComponent("footer", "footer.html");

// CARRITO COMPRAS
let carrito = [];

// Ya no necesitamos la función mostrarProductos() porque los botones están directamente en el HTML

function agregarAlCarrito(id, nombre, precio) {
    const producto = { id, nombre, precio: parseFloat(precio) };
    carrito.push(producto);
    renderizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    
    carrito.forEach((prod, index) => {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "m-3");
        item.innerHTML = `
            ${prod.nombre} - ${prod.precio} € 
            <button class="btn btn-sm btn-danger eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        lista.appendChild(item);
    });
    
    calcularTotal();
}

function calcularTotal() {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    document.getElementById("total").innerText = total.toFixed(2);
}

document.addEventListener("click", function(e) {
    
    if (e.target.classList.contains("agregar-carrito")) {
        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;
        const precio = e.target.dataset.precio;
        agregarAlCarrito(id, nombre, precio);
    }
    

    if (e.target.classList.contains("eliminar-producto")) {
        const index = parseInt(e.target.dataset.index);
        eliminarDelCarrito(index);
    }
});


document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    renderizarCarrito();
});