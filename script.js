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