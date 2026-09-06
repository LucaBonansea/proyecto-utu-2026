export class Nuevo_reclamos {
    constructor($btn_home_top, $btn_home, Main) {
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.Main = Main;
    }

    third_view() {
        this.$btn_home.classList.remove("active");
        this.$btn_home_top.classList.remove("active");
        this.Main.innerHTML =  `
        <div class="div-inicial">
            <h2>Nuevo Reclamo</h2>
        </div>

       

        <input type="file" id="archivo" hidden>

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
}
