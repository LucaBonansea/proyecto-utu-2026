// import (importaciones de los objetos)
import { Home } from "./home.js";
import { Reclamos } from "./reclamos.js";
import { Nuevo_reclamos } from "./nuevo_reclamos.js";

// DOM
const buttons = document.querySelectorAll(".bottom-nav button");
const buttons_tops = document.querySelectorAll(".top-nav button");
const newReclamo = document.querySelector(".new-reclamo");
const Main = document.querySelector("#main");

// botones del nav
const $btn_home = document.querySelector(".main-button");
const $btn_misreclamos = document.querySelector(".mireclamo");
const $btn_home_top = document.querySelector(".main-button-top");
const $btn_misreclamos_top = document.querySelector(".mireclamo-top");
const $btn_newReclamo_top = document.querySelector(".new-reclamo-top");
const $btn_logout = document.querySelector(".noti");

// Objetos
const home = new Home($btn_home_top, $btn_home, Main, iniciarReclamo);
const reclamos = new Reclamos(Main);
const nuevo_reclamos = new Nuevo_reclamos($btn_home_top, $btn_home, Main);

home.first_view();

// Evento de los botones de arriba
buttons_tops.forEach(button => {
    button.addEventListener("click", () => {

        // Siempre quitar activos anteriores
        buttons_tops.forEach(b => b.classList.remove("active"));
        console.log("Probando..");

        // Activar solo botones normales
        button.classList.add("active");
    });

});

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


home.nuevo_reclamo_inicio(iniciarReclamo);

// Eventos de cada boton
$btn_home_top.addEventListener("click", () => {
    home.first_view();
})
$btn_home.addEventListener("click", () => {
    home.first_view();
})

$btn_misreclamos.addEventListener("click", () =>{
   reclamos.second_view();
})

$btn_misreclamos_top.addEventListener("click", ()=>{
    reclamos.second_view();
})

newReclamo.addEventListener("click", () => {
    iniciarReclamo();    
});

$btn_newReclamo_top.addEventListener("click", () =>{
    iniciarReclamo();
})

$btn_logout.addEventListener("click", () => {
  window.location.href = "/proyecto-utu-2026/src/frontend/html/";
});

