import {
    crearReclamo,
    obtenerClasificaciones,
    obtenerEdificios
} from "../services/reclamos-service.js";
import { notify } from "../utils/toast.js";

export class Nuevo_reclamos {
    constructor($btn_home_top, $btn_home, Main, volverAInicio) {
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.Main = Main;
        this.volverAInicio = volverAInicio;
        this.ultimoMensajeToast = "";
    }

    third_view() {
        this.$btn_home.classList.remove("active");
        this.$btn_home_top.classList.remove("active");
        this.Main.innerHTML =  `
        <div class="div-inicial">
            <h2>Nuevo Reclamo</h2>
        </div>


        <input
            type="file"
            id="archivo"
            class="input-subir"
            accept="image/*"
            hidden
        >

        <section class="top-new-reclamo reclamo-nuevo-evidencia">
            <label for="archivo" class="icono-subir" aria-live="polite">
                <span class="material-symbols-outlined">add_photo_alternate</span>
                <span class="texto-evidencia">Sube aqu� tu evidencia</span>
                <span class="evidencia-cargada" hidden>
                    <span class="texto-evidencia-cargada">Imagen cargada</span>
                    <button class="extension-evidencia" type="button" hidden aria-label="Ver imagen cargada"></button>
                </span>
            </label>
            <img class="vista-evidencia" alt="Vista previa de la evidencia" hidden>
            <label class="descripcion">
                <span class="material-symbols-outlined">description</span>
                <div class="textarea-box">
                    <textarea
                        id="descripcion"
                        maxlength="200"
                        placeholder="Describe el problema..."
                        rows="1"></textarea>
                    <span id="contador">0 / 200</span>
                </div>
            </label>
        </section>
        <section class="tipo-reclamo">
            <label for="tipo-reclamo" class="tipo-reclamo-label">
                Tipo de reclamo
            </label>

            <select id="tipo-reclamo" name="clasificacion_id" required>
                <option value="" selected disabled>
                    Cargando clasificaciones...
                </option>
            </select>
        </section>

        <label for="edificio" class="tipo-reclamo-label">Edificio</label>

        <select id="edificio" required>
            <option value="" selected disabled>
                Cargando edificios...
            </option>
        </select>

        
        <section class="bottom-new-reclamo">
            <button class="enviarReclamo">Enviar Reclamo</button>
        </section>`;

        this.cargar_clasificaciones();
        this.cargar_edificios();
        this.subir_foto();
        this.enviar_reclamo();
    }

    async cargar_clasificaciones() {
        const select = document.getElementById("tipo-reclamo");

        try {
            const response = await obtenerClasificaciones();


            if (!response.ok) {
                throw new Error("Error al obtener las clasificaciones");
            }

            const clasificaciones = await response.json();

            select.innerHTML = `
                <option value="" selected disabled>
                    Selecciona el tipo de reclamo
                </option>
            `;

            clasificaciones.forEach(clasificacion => {
                const option = document.createElement("option");

                option.value = clasificacion.id;
                option.textContent = clasificacion.clasificacion;

                select.appendChild(option);
            });

        } catch (error) {
            console.error("Error al cargar clasificaciones:", error);

            select.innerHTML = `
                <option value="" selected disabled>
                    Error al cargar clasificaciones
                </option>
            `;
        }
    }

    async cargar_edificios() {
        const select = document.getElementById("edificio");

        try {
            const response = await obtenerEdificios();

            if (!response.ok) {
                throw new Error("Error al obtener edificios");
            }

            const edificios = await response.json();

            select.innerHTML = `
                <option value="" selected disabled>
                    Selecciona tu edificio
                </option>
            `;

            edificios.forEach(edificio => {
                const option = document.createElement("option");

                option.value = edificio.id;
                option.textContent = edificio.nombre;

                select.appendChild(option);
            });

        } catch (error) {
            console.error("Error al cargar los edificios:", error);

            select.innerHTML = `
                <option value="" selected disabled>
                    Error al cargar los edificios
                </option>
            `;
        }
    }



    descripcion_eventos() {
        const descripcion = document.getElementById("descripcion");
        const contador = document.getElementById("contador");
        const contenedor = descripcion.closest(".descripcion");

        descripcion.addEventListener("focus", () => {
            contador.style.visibility = "visible";
            contenedor.classList.add("enfocado");
        });

        descripcion.addEventListener("blur", () => {
            contador.style.visibility = "hidden";
            contenedor.classList.remove("enfocado");
        });

        descripcion.addEventListener("input", () => {
            descripcion.style.height = "auto";
            descripcion.style.height = `${descripcion.scrollHeight}px`;
            contador.textContent = `${descripcion.value.length} / 200`;
            contador.style.color = descripcion.value.length >= 180 ? "#e53935" : "#777";
        });
    }

    subir_foto() {
        const inputSubir = document.querySelector(".input-subir");
        const etiqueta = document.querySelector(".icono-subir");
        const textoEvidencia = etiqueta.querySelector(".texto-evidencia");
        const evidenciaCargada = etiqueta.querySelector(".evidencia-cargada");
        const textoCargada = etiqueta.querySelector(".texto-evidencia-cargada");
        const extension = etiqueta.querySelector(".extension-evidencia");
        const vista = document.querySelector(".vista-evidencia");
        let urlImagen = null;

        const cerrarVista = () => {
            vista.hidden = true;
            vista.removeAttribute("src");
            extension.setAttribute("aria-expanded", "false");
        };

        const alternarVista = (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
            if (vista.hidden && urlImagen) {
                vista.src = urlImagen;
                vista.hidden = false;
                extension.setAttribute("aria-expanded", "true");
            } else {
                cerrarVista();
            }
        };

        extension.addEventListener("mouseenter", () => {
            if (!urlImagen) return;
            vista.src = urlImagen;
            vista.hidden = false;
            extension.setAttribute("aria-expanded", "true");
        });
        extension.addEventListener("mouseleave", cerrarVista);
        extension.addEventListener("click", alternarVista);
        extension.addEventListener("touchstart", alternarVista, { passive: false });
        document.addEventListener("click", (evento) => {
            if (!vista.contains(evento.target) && !extension.contains(evento.target)) cerrarVista();
        });

        inputSubir.addEventListener("change", () => {
            const archivo = inputSubir.files[0];
            cerrarVista();
            if (urlImagen) URL.revokeObjectURL(urlImagen);
            urlImagen = null;

            if (!archivo) {
                textoEvidencia.hidden = false;
                evidenciaCargada.hidden = true;
                extension.hidden = true;
                etiqueta.classList.remove("imagen-cargada");
                return;
            }

            if (!this.esArchivoImagen(archivo)) {
                notify.warning("Solo se permiten archivos de imagen.");
                inputSubir.value = "";
                textoEvidencia.hidden = false;
                evidenciaCargada.hidden = true;
                extension.hidden = true;
                etiqueta.classList.remove("imagen-cargada");
                return;
            }

            urlImagen = URL.createObjectURL(archivo);
            const extensionArchivo = archivo.name.includes(".")
                ? archivo.name.split(".").pop().toUpperCase()
                : "IMAGEN";
            textoEvidencia.hidden = true;
            evidenciaCargada.hidden = false;
            textoCargada.textContent = "Imagen cargada";
            extension.textContent = extensionArchivo;
            extension.title = `Toca o pasa el puntero para ver la imagen (${extensionArchivo})`;
            extension.hidden = false;
            etiqueta.classList.add("imagen-cargada");
        });
    }
    esArchivoImagen(archivo) {
        return archivo.type.startsWith("image/")
            || /\.(heic|heif)$/i.test(archivo.name);
    }

enviar_reclamo() {
    const boton = document.querySelector(".enviarReclamo");

    boton.addEventListener("click", async () => {
        const archivo =
            document.getElementById("archivo").files[0];

        const descripcion =
            document.getElementById("descripcion").value.trim();

        const clasificacion_id =
            document.getElementById("tipo-reclamo").value;

        const edificio_id =
            document.getElementById("edificio").value;

        if (!archivo) {
            this.mostrarToast(
                "error",
                "Debes subir una foto como evidencia."
            );
            return;
        }

        if (!this.esArchivoImagen(archivo)) {
            this.mostrarToast(
                "error",
                "El archivo debe ser una imagen."
            );
            return;
        }

        if (archivo.size > 10 * 1024 * 1024) {
            this.mostrarToast(
                "error",
                "La imagen no puede superar los 10 MB."
            );
            return;
        }

        if (!descripcion) {
            this.mostrarToast(
                "error",
                "Debes escribir una descripción."
            );
            return;
        }

        if (!clasificacion_id) {
            this.mostrarToast(
                "error",
                "Debes seleccionar una clasificación."
            );
            return;
        }

        if (!edificio_id) {
            this.mostrarToast(
                "error",
                "Debes seleccionar un edificio."
            );
            return;
        }

        try {
            boton.disabled = true;
            boton.textContent = "Enviando...";

            const formData = new FormData();

            formData.append(
                "description",
                descripcion
            );

            formData.append(
                "clasificacion_id",
                clasificacion_id
            );

            formData.append(
                "edificio_id",
                edificio_id
            );

            formData.append(
                "photo",
                archivo
            );

            const response = await crearReclamo(formData);

            const data = await response.json();

            console.log(
                "STATUS:",
                response.status
            );

            console.log(
                "RESPUESTA:",
                data
            );

            if (!response.ok) {

                if (response.status === 401) {
                    this.mostrarToast(
                        "error",
                        "Tu sesión expiró. Inicia sesión nuevamente."
                    );

                    setTimeout(() => {
                        window.location.replace("./index.html");
                    }, 1500);

                    return;
                }

                if (response.status === 419) {
                    this.mostrarToast(
                        "error",
                        "La sesión de seguridad expiró."
                    );

                    return;
                }

                if (response.status === 422) {
                    this.mostrarToast(
                        "error",
                        data.message ||
                        "Hay datos inválidos en el reclamo."
                    );

                    return;
                }

                this.mostrarToast(
                    "error",
                    data.message ||
                    "No se pudo crear el reclamo."
                );

                return;
            }

            this.mostrarToast(
                "success",
                "Reclamo creado correctamente."
            );

            if (this.volverAInicio) {
                await this.volverAInicio();
            }

        } catch (error) {
            console.error(
                "Error creando reclamo:",
                error
            );

            this.mostrarToast(
                "error",
                "No se pudo conectar con el servidor."
            );

        } finally {
            boton.disabled = false;
            boton.textContent = "Enviar Reclamo";
        }
    });
}


    mostrarToast(tipo, mensaje) {
    if (mensaje === this.ultimoMensajeToast) {
        return;
    }

    this.ultimoMensajeToast = mensaje;

    if (tipo === "success") {
        notify.success(mensaje, { duration: 2000 });
    }

    if (tipo === "error") {
        notify.error(mensaje);
    }

    setTimeout(() => {
        if (this.ultimoMensajeToast === mensaje) {
            this.ultimoMensajeToast = "";
        }
    }, 4000);
}
}
