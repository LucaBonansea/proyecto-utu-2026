export class Nuevo_reclamos {
    constructor($btn_home_top, $btn_home, Main) {
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.Main = Main;
        this.ultimoMensajeToast = "";
    }

    third_view() {
        this.$btn_home.classList.remove("active");
        this.$btn_home_top.classList.remove("active");
        this.Main.innerHTML =  `
        <div class="div-inicial">
            <h2>Nuevo Reclamo</h2>
        </div>


        <input type="file" id="archivo" class="input-subir" hidden>

        <section class="top-new-reclamo">
            <label for="archivo" class="icono-subir">
                <span class="material-symbols-outlined">add_photo_alternate</span>
                Sube aquí tu evidencia
            </label>
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

        <div class="preview-foto-container">
                    <img class="preview-foto" src="https://previews.123rf.com/images/synell/synell2205/synell220500005/189187581-smashed-window-broken-glass-break-destroyed-building-broken-frame-window-plastic-aftermath-bombed.jpg" alt="Vista previa" accept="image/*">
            </div>
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
        this.enviar_reclamo();
        this.subir_foto();
        this.enviar_reclamo();
    }

    async cargar_clasificaciones() {
        const select = document.getElementById("tipo-reclamo");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/clasificaciones");


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
            const response = await fetch(
                "http://127.0.0.1:8000/api/edificios"
            );

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



    enviar_reclamo() {
    const boton = document.querySelector(".enviarReclamo");

    boton.addEventListener("click", async () => {

        const archivo = document.getElementById("archivo").files[0];
        const descripcion = document.getElementById("descripcion").value;
        const clasificacion_id = document.getElementById("tipo-reclamo").value;
        const edificio_id = document.getElementById("edificio").value;

        if (!archivo) {
            alert("Debes subir una foto como evidencia.");
            return;
        }

        if (!clasificacion_id) {
            alert("Debes seleccionar una clasificación.");
            return;
        }

        if (!edificio_id) {
            alert("Debes seleccionar un edificio.");
            return;
        }

        const formData = new FormData();

        formData.append("description", descripcion);
        formData.append("clasificacion_id", clasificacion_id);
        formData.append("edificio_id", edificio_id);
        formData.append("photo", archivo);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/reclamos", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            console.log("STATUS:", response.status);
            console.log("RESPUESTA:", data);

            if (!response.ok) {
                alert(data.message || "Error al crear el reclamo");
                return;
            }

            alert("Reclamo creado correctamente.");

        } catch (error) {
            console.error("Error de conexión:", error);
        }
    });
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
    const input_subir =
        document.querySelector(".input-subir");

    const preview =
        document.querySelector(".preview-foto");

    input_subir.addEventListener("change", () => {
        const archivo = input_subir.files[0];

        if (!archivo) {
            preview.src = "";
            preview.style.display = "none";
            return;
        }

        if (!archivo.type.startsWith("image/")) {
            alert("Solo se permiten archivos de imagen.");

            input_subir.value = "";
            preview.src = "";
            preview.style.display = "none";

            return;
        }

        const urlTemporal =
            URL.createObjectURL(archivo);

        preview.src = urlTemporal;
        preview.style.display = "block";
    });
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

        if (!archivo.type.startsWith("image/")) {
            this.mostrarToast(
                "error",
                "El archivo debe ser una imagen."
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

            await this.obtener_csrf();

            const csrfToken =
                this.obtener_cookie("XSRF-TOKEN");

            if (!csrfToken) {
                throw new Error(
                    "No se encontró el token CSRF"
                );
            }

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

            const response = await fetch(
                "http://127.0.0.1:8000/api/reclamos",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": csrfToken
                    },
                    body: formData
                }
            );

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


obtener_cookie(nombre) {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find(
        item => item.startsWith(nombre + "=")
    );

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(
        cookie.substring(nombre.length + 1)
    );
}

async obtener_csrf() {
    const response = await fetch(
        "http://127.0.0.1:8000/sanctum/csrf-cookie",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener el token CSRF"
        );
    }
}

    mostrarToast(tipo, mensaje) {
    if (mensaje === this.ultimoMensajeToast) {
        return;
    }

    this.ultimoMensajeToast = mensaje;

    const opciones = {
        duration: 4000,
        progress: true,
        position: "top-center"
    };

    if (tipo === "success") {
        showToast.success(mensaje, opciones);
    }

    if (tipo === "error") {
        showToast.error(mensaje, opciones);
    }

    setTimeout(() => {
        if (this.ultimoMensajeToast === mensaje) {
            this.ultimoMensajeToast = "";
        }
    }, 4000);
}
}
