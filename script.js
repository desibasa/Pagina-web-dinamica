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




function alertaLogin() {
    alert("!Hola de nuevo!"); // mensaje personalizado
}

// Para el formulario de nuevo usuario
function alertaRegistro() {
    alert("Te damos la bienvenida al universo 616"); // mensaje distinto
}



// añadido chatgpt

function mostrarAlerta(event) {
    event.preventDefault(); // evita que se recargue la página
    alert("Ahora formas parte del universo 616");
    return false; // asegura que no se envíe
}

window.onload = () => {
  document.querySelectorAll("input[type=text], input[type=password]").forEach(input => {
    input.value = "";
  });
};



// Validar contraseña
function validarRegistro() {
  const pass = document.querySelector("input[name='nuevo_pass']").value;
  const repite = document.querySelector("input[name='repite_pass']").value;

  // Expresión regular: mínimo una mayúscula y un número
  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

  if (!regex.test(pass)) {
    alert("La contraseña debe contener al menos una mayúscula y un número.");
    return false;
  }

  if (pass !== repite) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  // Si pasa la validación
  alertaRegistro();
  return true;
}



// color registro fallido

function validarRegistro() {
  const usuario = document.querySelector("input[name='nuevo_usuario']").value.trim();
  const pass = document.querySelector("input[name='nuevo_pass']").value;
  const repite = document.querySelector("input[name='repite_pass']").value;
  const errorDiv = document.getElementById("errorRegistro");

  // Expresión regular: al menos una mayúscula y un número
  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

  let mensajes = [];

  if (usuario === "") {
    mensajes.push("⚠️ El nombre de usuario es obligatorio.");
  }

  if (!regex.test(pass)) {
    mensajes.push("⚠️ La contraseña debe contener al menos una mayúscula y un número.");
  }

  if (pass !== repite) {
    mensajes.push("⚠️ Las contraseñas no coinciden.");
  }

  if (mensajes.length > 0) {
    errorDiv.innerHTML = mensajes.join("<br>");
    errorDiv.classList.remove("d-none"); // mostramos
    return false;
  }

  // Si todo está bien → ocultamos errores y mostramos bienvenida
  errorDiv.classList.add("d-none");
  alertaRegistro();
  return true;
}


// fin color registro fallido









// fin añadido chatgpt

