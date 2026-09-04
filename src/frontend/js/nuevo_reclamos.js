export class Nuevo_reclamos {
    constructor($btn_home_top, $btn_home, Main) {
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.Main = Main;
    }

    third_view() {
        this.$btn_home.classList.remove("active");
        this.$btn_home_top.classList.remove("active");
        this.Main.innerHTML = `
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
            <label for="tipo-reclamo" class="tipo-reclamo-label">Tipo de reclamo</label>
            <select id="tipo-reclamo" name="tipo-reclamo" required>
                <option value="" selected disabled>Selecciona el tipo de reclamo</option>
                <option value="plomeria">Plomería</option>
                <option value="electricidad">Electricidad</option>
                <option value="vidrieria">Vidriería</option>
                <option value="cerrajeria">Cerrajería</option>
            </select>
        </section>

        <section class="bottom-new-reclamo">
            <button class="enviarReclamo">Enviar Reclamo</button>
        </section>`;
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
