// import (importaciones de los objetos)
import { Home } from "./home.js";
import { Reclamos } from "./reclamos.js";
import { Nuevo_reclamos } from "./nuevo_reclamos.js";

// DOM
const buttons = document.querySelectorAll(".bottom-nav button");
const newReclamo = document.querySelector(".new-reclamo");
const Main = document.querySelector("#main");

// botones del nav
const $btn_home = document.querySelector(".main-button");
const $btn_misreclamos = document.querySelector(".mireclamo");

// Objetos
const home = new Home($btn_home, Main, iniciarReclamo);
const reclamos = new Reclamos(Main);
const nuevo_reclamos = new Nuevo_reclamos($btn_home, Main);


home.first_view();

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
$btn_home.addEventListener("click", () => {
    home.first_view();
})

$btn_misreclamos.addEventListener("click", () =>{
   reclamos.second_view();
})

newReclamo.addEventListener("click", () => {
    iniciarReclamo();    
});


