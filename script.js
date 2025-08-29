function loadComponent(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(`Error al cargar ${file}:`,
      error));
}
loadComponent("navbar", "navbar.html");
loadComponent("footer", "footer.html");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id, nombre, precio) {
  const producto = { id, nombre, precio: parseFloat(precio) };
  carrito.push(producto);
  guardarCarrito();
  renderizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
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

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const { id, nombre, precio } = e.target.dataset;
    agregarAlCarrito(id, nombre, precio);
  }

  if (e.target.classList.contains("eliminar-producto")) {
    const index = parseInt(e.target.dataset.index);
    eliminarDelCarrito(index);
  }
});

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

// 🔥 Al cargar la página, renderiza el carrito que estaba guardado
document.addEventListener("DOMContentLoaded", renderizarCarrito);

function alertaLogin() {
  alert("!Hola de nuevo!");
}

function alertaRegistro() {
  alert("Te damos la bienvenida al universo 616");
}

function mostrarAlerta(event) {
  event.preventDefault();
  alert("Ahora formas parte del universo 616");
  return false;
}

window.onload = () => {
  document.querySelectorAll("input[type=text], input[type=password]").forEach(input => {
    input.value = "";
  });
};

function validarRegistro() {
  const pass = document.querySelector("input[name='nuevo_pass']").value;
  const repite = document.querySelector("input[name='repite_pass']").value;

  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

  if (!regex.test(pass)) {
    alert("La contraseña debe contener al menos una mayúscula y un número.");
    return false;
  }

  if (pass !== repite) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  alertaRegistro();
  return true;
}

function validarRegistro() {
  const usuario = document.querySelector("input[name='nuevo_usuario']").value.trim();
  const pass = document.querySelector("input[name='nuevo_pass']").value;
  const repite = document.querySelector("input[name='repite_pass']").value;
  const errorDiv = document.getElementById("errorRegistro");

  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

  let mensajes = [];

  if (usuario === "") {
    mensajes.push("El nombre de usuario es obligatorio.");
  }

  if (!regex.test(pass)) {
    mensajes.push("La contraseña debe contener al menos una mayúscula y un número.");
  }

  if (pass !== repite) {
    mensajes.push("Las contraseñas no coinciden.");
  }

  if (mensajes.length > 0) {
    errorDiv.innerHTML = mensajes.join("<br>");
    errorDiv.classList.remove("d-none");
    return false;
  }

  errorDiv.classList.add("d-none");
  alertaRegistro();
  return true;
}
