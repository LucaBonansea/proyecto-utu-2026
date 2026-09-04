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
const $notificaciones_btn = document.querySelector(".notificaciones-btn");
const $notificaciones_btn_top = document.querySelector(".notificaciones-btn-top");
const $menu_top_notificaciones = document.querySelector(".menu-top-notificaciones");
const $notificaciones_lista_top = document.querySelector(".menu-top-notificaciones .notificaciones-lista");
const $notificaciones_lista = document.querySelector(".notificaciones-lista")

// Objetos
const reclamos = new Reclamos(Main);
const nuevo_reclamos = new Nuevo_reclamos($btn_inicio_top, $btn_inicio, Main);
const cuenta = new Cuenta(Main, button_restart_actives, $btn_cuenta_top, $btn_cuenta);
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
    // Renderizado ("Dibujo")
    const {map, marker} = nuevo_reclamos.mapa_renderizadar();
    // Eventos
    nuevo_reclamos.boton_ubicacion_evento(map, marker);
    nuevo_reclamos.ubicacion_automatica(map, marker);
    nuevo_reclamos.direccion_asistida(map, marker);
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

// El botón de "Cerrar sesión" se renderiza y se conecta dentro de
// cuenta.js (fifth_view / eventos), ya no vive en el header.

$notificaciones_btn.addEventListener("click", () => {
    notificaciones.fourth_view();
});

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

// Cuenta ya no es un menú flotante: es una vista completa en #main,
// igual que Inicio y Nuevo Reclamo.
$btn_cuenta.addEventListener("click", () => {
    cuenta.fifth_view();
});

$btn_cuenta_top.addEventListener("click", () => {
    cuenta.fifth_view();
});