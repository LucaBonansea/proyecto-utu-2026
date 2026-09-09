document.addEventListener("DOMContentLoaded", function () {


    const reclamos = {

        1: {
            titulo: "Pozo en el Mallada",
            fecha: "07/09/2026",
            prioridad: "Urgente",

            imagen:
                "https://i.pinimg.com/1200x/71/eb/91/71eb913d4462981ad0fadc028ed4cd12.jpg",

            descripcion:
                "Se encontró un pozo de gran tamaño sobre la calle Mallada, generando dificultades para la circulación de vehículos y representando un riesgo para las personas que circulan por la zona."
        },


        2: {
            titulo: "Pozo en el Mallada",
            fecha: "07/09/2026",
            prioridad: "Normal",

            imagen:
                "https://i.pinimg.com/1200x/71/eb/91/71eb913d4462981ad0fadc028ed4cd12.jpg",

            descripcion:
                "Se detectó un deterioro en la calle que requiere mantenimiento por parte de la cuadrilla correspondiente."
        },


        3: {
            titulo: "Pozo en el Mallada",
            fecha: "07/09/2026",
            prioridad: "Normal",

            imagen:
                "https://i.pinimg.com/1200x/71/eb/91/71eb913d4462981ad0fadc028ed4cd12.jpg",

            descripcion:
                "El vecino informó sobre un pozo que dificulta la circulación normal por la calle."
        }

    };




    const lista =
        document.getElementById("lista-reclamos");

    const detalle =
        document.getElementById("detalle-reclamo");

    const titulo =
        document.getElementById("detalle-titulo");

    const fecha =
        document.getElementById("detalle-fecha");

    const prioridad =
        document.getElementById("detalle-prioridad");

    const descripcion =
        document.getElementById("detalle-descripcion");

    const imagen =
        document.getElementById("detalle-imagen");

    const inputFoto =
        document.getElementById("foto-evidencia");

    const uploadArea =
        document.getElementById("upload-area");

    const previewContainer =
        document.getElementById("preview-container");

    const previewImagen =
        document.getElementById("preview-imagen");

    const formulario =
        document.getElementById("form-resolver");

    const observaciones =
        document.getElementById("observaciones");



    console.log("reclamos.js conectado correctamente");


    if (!lista) {
        console.error("No se encontró #lista-reclamos");
    }

    if (!detalle) {
        console.error("No se encontró #detalle-reclamo");
    }

    if (!formulario) {
        console.error("No se encontró #form-resolver");
    }



    let reclamoActual = null;



    window.mostrarReclamo = function (id) {

        console.log("Abriendo reclamo:", id);


        const reclamo = reclamos[id];


        if (!reclamo) {

            console.error(
                "No existe el reclamo:",
                id
            );

            return;
        }


        reclamoActual = id;


     

        lista.classList.add("oculto");



        detalle.classList.remove("oculto");


      

        titulo.textContent =
            reclamo.titulo;


        fecha.textContent =
            reclamo.fecha;


        prioridad.textContent =
            reclamo.prioridad;


        descripcion.textContent =
            reclamo.descripcion;


        imagen.src =
            reclamo.imagen;


        

        limpiarFormulario();


        

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };



    window.volverReclamos = function () {

        console.log("Volviendo a reclamos");


        detalle.classList.add("oculto");


        lista.classList.remove("oculto");


        reclamoActual = null;


        limpiarFormulario();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };




    inputFoto.addEventListener(
        "change",
        function () {


            const archivo =
                inputFoto.files[0];


            if (!archivo) {
                return;
            }


            // Comprobar imagen

            if (!archivo.type.startsWith("image/")) {

                alert(
                    "El archivo seleccionado no es una imagen."
                );

                inputFoto.value = "";

                return;
            }


            // Leer imagen

            const lector =
                new FileReader();


            lector.onload =
                function (evento) {


                    previewImagen.src =
                        evento.target.result;


                    uploadArea.classList.add(
                        "oculto"
                    );


                    previewContainer.classList.remove(
                        "oculto"
                    );

                };


            lector.readAsDataURL(archivo);

        }
    );

    window.eliminarFoto = function () {


        inputFoto.value = "";


        previewImagen.src = "";


        previewContainer.classList.add(
            "oculto"
        );


        uploadArea.classList.remove(
            "oculto"
        );

    };


    formulario.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            console.log(
                "Intentando resolver reclamo"
            );


            // Comprobar foto

            if (
                !inputFoto.files ||
                inputFoto.files.length === 0
            ) {

                alert(
                    "Debes agregar una foto de evidencia."
                );

                return;
            }


            const foto =
                inputFoto.files[0];


            const texto =
                observaciones.value;


            console.log(
                "Reclamo:",
                reclamoActual
            );


            console.log(
                "Foto:",
                foto
            );


            console.log(
                "Observaciones:",
                texto
            );


            // Mensaje

            alert(
                "El reclamo fue resuelto correctamente."
            );


            // Volver a la lista

            window.volverReclamos();

        }
    );


    function limpiarFormulario() {


        inputFoto.value = "";


        previewImagen.src = "";


        previewContainer.classList.add(
            "oculto"
        );


        uploadArea.classList.remove(
            "oculto"
        );


        observaciones.value = "";

    }

});