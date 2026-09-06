// import (importaciones de los objetos)
import { Reclamos } from "./reclamos.js";
import { Nuevo_reclamos } from "./nuevo_reclamos.js";
import { Cuenta } from "./cuenta.js";
import { Notificaciones } from "./notifications.js";

// DOM
const buttons = document.querySelectorAll(".bottom-nav button");
const buttons_tops = document.querySelectorAll(".top-nav button");
const newReclamo = document.querySelector(".new-reclamo");
const Main = document.querySelector("#main");

// botones del nav
// "Inicio" es la ex vista "Mis Reclamos": ahora es la pantalla de entrada.
const $btn_inicio = document.querySelector(".inicio");
const $btn_inicio_top = document.querySelector(".inicio-top");
const $btn_newReclamo_top = document.querySelector(".new-reclamo-top");
const $btn_cuenta = document.querySelector(".cuenta");
const $btn_cuenta_top = document.querySelector(".cuenta-top");
const $notificaciones_btn_top = document.querySelector(".notificaciones-btn-top");
const $menu_top_notificaciones = document.querySelector(".menu-top-notificaciones");
const $notificaciones_lista_top = document.querySelector(".menu-top-notificaciones .notificaciones-lista");
const $notificaciones_lista = document.querySelector(".notificaciones-lista")

// Objetos
const reclamos = new Reclamos(Main);
const nuevo_reclamos = new Nuevo_reclamos($btn_inicio_top, $btn_inicio, Main);
const cuenta = new Cuenta(
    Main,
    button_restart_actives,
    $btn_cuenta_top,
    $btn_cuenta,
    (filtro) => {
        button_restart_actives();
        $btn_inicio_top.classList.add("active");
        $btn_inicio.classList.add("active");
        reclamos.second_view(filtro);
    }
);
const notificaciones = new Notificaciones(Main, button_restart_actives, $notificaciones_lista);

// La vista de entrada de la app ahora es "Mis Reclamos" (etiquetada "Inicio" en el nav)
reclamos.second_view();

// Evento de los botones de arriba
function button_actives_top(){
    buttons_tops.forEach(button => {
    button.addEventListener("click", () => {

        // Siempre quitar activos anteriores
        buttons_tops.forEach(b => b.classList.remove("active"));

        // Activar solo botones normales
        button.classList.add("active");
    });

    });
}

function button_restart_actives(){
    buttons_tops.forEach(button => {
        button.classList.remove("active");
    })
    buttons.forEach(button => {
        button.classList.remove("active");
    })
}

button_actives_top();

// Eventos de los botones del nav

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Siempre quitar activos anteriores
        buttons.forEach(b => b.classList.remove("active"));

        // Si es el botón de nuevo reclamo, no agregar active
        if(button.classList.contains("new-reclamo")){
            // acá va tu acción del +
            console.log("Nuevo reclamo");
            return;
        }

        // Activar solo botones normales
        button.classList.add("active");
    });


});



// Funcion 
function iniciarReclamo(){
    $btn_newReclamo_top.classList.add("active");
    // Renderizado
    nuevo_reclamos.third_view();
    // Evento
    nuevo_reclamos.descripcion_eventos();
}

console.log("COOKIES EN INICIO:", document.cookie);

async function verificar_sesion() {
    try {
        const request = await fetch(
            "http://127.0.0.1:8000/api/auth/me",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        console.log("SESSION STATUS:", request.status);

        if (request.status === 401) {
            window.location.href = "./index.html";
            return;
        }

        if (!request.ok) {
            window.location.href = "./index.html";
            return;
        }

        const response = await request.json();

        console.log("Usuario autenticado:", response.usuario);

    } catch (error) {
        console.log("Error comprobando sesión:", error);

        window.location.href = "./index.html";
    }
}

// Eventos de cada boton
$btn_inicio_top.addEventListener("click", () => {
    reclamos.second_view();
})
$btn_inicio.addEventListener("click", () => {
    reclamos.second_view();
})

newReclamo.addEventListener("click", () => {
    iniciarReclamo();    
});

$btn_newReclamo_top.addEventListener("click", () =>{
    iniciarReclamo();
})

document.addEventListener("DOMContentLoaded", verificar_sesion);


// El botón de "Cerrar sesión" se renderiza y se conecta dentro de
// cuenta.js (fifth_view / eventos), ya no vive en el header.

$notificaciones_btn_top.addEventListener("click", (event) => {
    $menu_top_notificaciones.classList.add("active");
    notificaciones.fourth_view_desktop();
    event.stopPropagation();
});

$menu_top_notificaciones.addEventListener("click", (event) =>{
    event.stopPropagation();
});

document.addEventListener("click", function() {
  $menu_top_notificaciones.classList.remove("active");
});

// Cerrar el menú de notificaciones al hacer scroll, salvo que el scroll
// sea el de la propia lista de notificaciones (para poder desplazarla)
window.addEventListener("scroll", (event) => {
    if ($menu_top_notificaciones.contains(event.target)) {
        return;
    }
    $menu_top_notificaciones.classList.remove("active");
}, { passive: true, capture: true });

// Cuenta ya no es un menú flotante: es una vista completa en #main,
// igual que Inicio y Nuevo Reclamo.
$btn_cuenta.addEventListener("click", () => {
    cuenta.fifth_view();
});

$btn_cuenta_top.addEventListener("click", () => {
    cuenta.fifth_view();
});