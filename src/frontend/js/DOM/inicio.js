// import (importaciones de los objetos)
import { Reclamos } from "./reclamos.js";
import { Nuevo_reclamos } from "./nuevo_reclamos.js?v=20261009-2";
import { Cuenta } from "./cuenta.js";
import { inicializarNotificaciones } from "./notifications.js?v=20261007-3";
import { inicializarTema } from "../theme.js";
import { obtenerSesion } from "../services/auth-service.js";

async function verificar_sesion() {
    try {
        const request = await obtenerSesion();

        if (!request.ok) {
            window.location.replace("./index.html");
            return null;
        }

        const response = await request.json();
        const usuario = response.usuario;

        switch (usuario.rol) {
            case "administrador":
                window.location.replace("./administrador.html");
                return null;

            case "usuario_proveedor":
                window.location.replace("./Provedores.html");
                return null;

            case "administrativo":
            case "usuario_edificio":
                return usuario;

            default:
                window.location.replace("./index.html");
                return null;
        }
    } catch (error) {
        console.error("Error verificando sesión:", error);
        window.location.replace("./index.html");
        return null;
    }
}

function iniciarAplicacion() {
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
    const $btn_logout = document.querySelector("#btn-cerrar-sesion");
    
    function button_restart_actives() {
        buttons_tops.forEach(button => {
            button.classList.remove("active");
        });

        buttons.forEach(button => {
            button.classList.remove("active");
        });
    }

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
        },
        () => reclamos.actualizarEstadisticas()
    );
    inicializarTema();
    inicializarNotificaciones(async (reclamoId) => {
        button_restart_actives();
        $btn_inicio_top.classList.add("active");
        $btn_inicio.classList.add("active");
        await reclamos.mostrarReclamo(reclamoId);
    });

    // Evento de los botones de arriba
    buttons_tops.forEach(button => {
        button.addEventListener("click", () => {
            // Siempre quitar activos anteriores
            buttons_tops.forEach(b => b.classList.remove("active"));

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
            if (button.classList.contains("new-reclamo")) {
                // acá va tu acción del +
                console.log("Nuevo reclamo");
                return;
            }

            // Activar solo botones normales
            button.classList.add("active");
        });
    });

    function iniciarReclamo() {
        $btn_newReclamo_top.classList.add("active");
        nuevo_reclamos.third_view();
        nuevo_reclamos.descripcion_eventos();
    }

    // Eventos de cada botón
    $btn_inicio_top.addEventListener("click", () => {
        reclamos.second_view();
    });

    $btn_inicio.addEventListener("click", () => {
        reclamos.second_view();
    });

    newReclamo.addEventListener("click", () => {
        iniciarReclamo();
    });

    $btn_newReclamo_top.addEventListener("click", () => {
        iniciarReclamo();
    });

    // El botón de "Cerrar sesión" se renderiza y se conecta dentro de
    // cuenta.js (fifth_view / eventos), ya no vive en el header.
    // Cuenta ya no es un menú flotante: es una vista completa en #main,
    // igual que Inicio y Nuevo Reclamo.
    $btn_cuenta.addEventListener("click", () => {
        cuenta.fifth_view();
    });

    $btn_cuenta_top.addEventListener("click", () => {
        cuenta.fifth_view();
    });

    // La vista de entrada de la app es "Mis Reclamos" (etiquetada "Inicio").
    $btn_inicio_top.classList.add("active");
    reclamos.second_view();
}

async function iniciar() {
    const usuario = await verificar_sesion();

    if (!usuario) {
        return;
    }

    iniciarAplicacion();
}

document.addEventListener("DOMContentLoaded", iniciar);
