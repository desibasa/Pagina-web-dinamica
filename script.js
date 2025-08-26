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

 const productos = [
            { id: 1, nombre: "Entrada Bronze", precio: 10, imagen: "img/camiseta.jpg" },
            { id: 2, nombre: "Entrada Silver", precio: 20, imagen: "img/gorra.jpg" },
            { id: 3, nombre: "Entrada Gold", precio: 50, imagen: "img/pantalon.jpg" },
        ];

        let carrito = [];

        function mostrarProductos() {
            const catalogo = document.getElementById("catalogo-productos");
            productos.forEach(prod => {
                const card = document.createElement("div");
                card.classList.add("producto");
                card.innerHTML = `
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p>Precio: ${prod.precio} €</p>
                    <button class="agregar-carrito" data-id="${prod.id}">Agregar al carrito</button>
                `;
                catalogo.appendChild(card);
            });
        }

        function agregarAlCarrito(id) {
            const producto = productos.find(p => p.id === id);
            carrito.push(producto);
            renderizarCarrito();
        }

        function eliminarDelCarrito(id) {
            carrito = carrito.filter(p => p.id !== id);
            renderizarCarrito();
        }

        function renderizarCarrito() {
            const lista = document.getElementById("lista-carrito");
            lista.innerHTML = "";
            carrito.forEach(prod => {
                const item = document.createElement("li");
                item.innerHTML = `
                    ${prod.nombre} - ${prod.precio} € 
                    <button class="eliminar-producto" data-id="${prod.id}">Eliminar</button>
                `;
                lista.appendChild(item);
            });
            calcularTotal();
        }

        function calcularTotal() {
            const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
            document.getElementById("total").innerText = total.toFixed(2);
        }

        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("agregar-carrito")) {
                const id = parseInt(e.target.dataset.id);
                agregarAlCarrito(id);
            }
            if (e.target.classList.contains("eliminar-producto")) {
                const id = parseInt(e.target.dataset.id);
                eliminarDelCarrito(id);
            }
        });

        document.getElementById("vaciar-carrito").addEventListener("click", () => {
            carrito = [];
            renderizarCarrito();
        });

        // Llamada inicial para mostrar los productos
        mostrarProductos();