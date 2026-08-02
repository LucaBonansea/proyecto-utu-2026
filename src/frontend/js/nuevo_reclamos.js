export class Nuevo_reclamos{
    constructor($btn_home_top, $btn_home, Main){
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.Main = Main;
    }

    third_view(){
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
                rows="2"></textarea>
                <span id="contador">0 / 200</span>
            </div>
        </label>

        </section>

        <div class="mapa-container">

    <div class="busqueda">
        <span class="material-symbols-outlined">search</span>
        <input
            type="text"
            id="buscarDireccion"
            placeholder="Buscar ubicación..."
            autocomplete="off">
            <button id="ubicacion">
                <span class="material-symbols-outlined">my_location</span>
            </button>
    </div>

    <ul id="sugerencias" class="sugerencias-lista"></ul>

    <div id="map"></div>

</div>



        <button class="enviarReclamo">Enviar Reclamo</button>
    `;
    }

    descripcion_eventos(){
        const descripcion = document.getElementById("descripcion");
        const contador = document.getElementById("contador");


        descripcion.addEventListener("focus", () => {
            contador.style.display = "block";
         });


        descripcion.addEventListener("blur", () => {
            contador.style.display = "none";
        });


    descripcion.addEventListener("input", () => {

        // aumentar textarea automáticamente
        descripcion.style.height = "auto";
        descripcion.style.height = descripcion.scrollHeight + "px";


        // contador
        contador.textContent = `${descripcion.value.length} / 200`;


        // cambiar color al acercarse al límite
        if(descripcion.value.length >= 180){
            contador.style.color = "#e53935";
        }else{
            contador.style.color = "#777";
        }

        });

    }

    mapa_renderizadar(){
        // Establezo las coordanadas donde quiero que el mapa aparezca
        const map = L.map("map").setView(
            [-34.3375, -56.7136],
            13
        );

        // Luego cargo los alrededores del mapa y se lo añado al mapa
        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            {
                attribution:"© OpenStreetMap © CARTO"
            }

        ).addTo(map);


        // Luego establecemos las coordenadas del punto rojo y le ponemos la caracteristica de que se puda mover = "draggable:true"
        let marker = L.marker(
            [-34.3375, -56.7136],
            {
                draggable:true
            }
        ).addTo(map);

        // Espera que cargue el html paea redibujarlo bien 
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        // =========================
        // MARCAR TOCANDO EL MAPA
        // =========================

        map.on("click",(e)=>{
            marker.setLatLng(
                e.latlng
            );
        });

        // Devuelve los objetos para reutilizarlos
        return {map, marker};
    }

    boton_ubicacion_evento(map, marker){
        const botonUbicacion = document.getElementById("ubicacion");

        botonUbicacion.addEventListener("click", ()=>{

        if (!navigator.geolocation) {
            alert("Tu navegador no soporta ubicación");
            return;
        }


        navigator.geolocation.getCurrentPosition(

            (pos)=>{

                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                map.setView([lat,lng],17);

                marker.setLatLng([lat,lng]);

            },

            (error)=>{

                console.log(error);

                alert(
                    "No se pudo obtener ubicación. Revisa permisos."
                );

            },

            {
                enableHighAccuracy:true
            }

        );

    });
    }

    ubicacion_automatica(map, marker){
         if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            (pos)=>{

                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;


                map.setView(
                    [lat,lng],
                    17
                );


                marker.setLatLng(
                    [lat,lng]
                );


            },


            ()=>{

                console.log(
                    "No se permitió la ubicación"
                );

            },


            {
                enableHighAccuracy:true
            }

        );

    }
    }

    direccion_asistida(map, marker){
    // =========================
    // BUSCAR DIRECCION (con sugerencias)
    // =========================

    const input = document.getElementById("buscarDireccion");
    const listaSugerencias = document.getElementById("sugerencias");

    let temporizador = null;
    let controlador = null;
    let resultadosActuales = [];
    let indiceActivo = -1;

    function ocultarSugerencias(){
        listaSugerencias.innerHTML = "";
        listaSugerencias.style.display = "none";
        resultadosActuales = [];
        indiceActivo = -1;
    }

    function seleccionarLugar(lugar){
        const lat = lugar.lat;
        const lon = lugar.lon;

        map.setView([lat, lon], 17);
        marker.setLatLng([lat, lon]);

        input.value = lugar.display_name;
        ocultarSugerencias();
    }

    function pintarSugerencias(){
        listaSugerencias.innerHTML = "";

        resultadosActuales.forEach((lugar, i) => {
            const item = document.createElement("li");
            item.classList.add("sugerencia-item");
            item.textContent = lugar.display_name;

            if(i === indiceActivo){
                item.classList.add("activa");
            }

            item.addEventListener("click", () => seleccionarLugar(lugar));
            listaSugerencias.appendChild(item);
        });

        listaSugerencias.style.display = resultadosActuales.length ? "block" : "none";
    }

    async function buscarSugerencias(texto){
        if(texto.trim().length < 3){
            ocultarSugerencias();
            return;
        }

        if(controlador){
            controlador.abort();
        }
        controlador = new AbortController();

        try{
            const respuesta = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=uy&q=${encodeURIComponent(texto)}`,
                { signal: controlador.signal }
            );

            resultadosActuales = await respuesta.json();
            indiceActivo = -1;
            pintarSugerencias();

        }catch(error){
            if(error.name !== "AbortError"){
                console.log("Error al buscar dirección:", error);
            }
        }
    }

    input.addEventListener("input", () => {
        clearTimeout(temporizador);
        const texto = input.value;

        temporizador = setTimeout(() => {
            buscarSugerencias(texto);
        }, 400);
    });

    input.addEventListener("keydown", (e) => {

        if(e.key === "ArrowDown" && resultadosActuales.length){
            e.preventDefault();
            indiceActivo = (indiceActivo + 1) % resultadosActuales.length;
            pintarSugerencias();
            return;
        }

        if(e.key === "ArrowUp" && resultadosActuales.length){
            e.preventDefault();
            indiceActivo = (indiceActivo - 1 + resultadosActuales.length) % resultadosActuales.length;
            pintarSugerencias();
            return;
        }

        if(e.key === "Enter"){
            e.preventDefault();
            clearTimeout(temporizador);

            if(indiceActivo >= 0 && resultadosActuales[indiceActivo]){
                seleccionarLugar(resultadosActuales[indiceActivo]);
                return;
            }

            if(resultadosActuales.length){
                seleccionarLugar(resultadosActuales[0]);
                return;
            }

            // Si escribió rápido y todavía no llegó ninguna respuesta, buscamos directo
            const texto = input.value.trim();
            if(texto.length >= 3){
                buscarSugerencias(texto).then(() => {
                    if(resultadosActuales.length){
                        seleccionarLugar(resultadosActuales[0]);
                    }
                });
            }
            return;
        }

        if(e.key === "Escape"){
            ocultarSugerencias();
        }
    });

    // Cerrar la lista al hacer click afuera
    document.addEventListener("click", (e) => {
        if(!e.target.closest(".busqueda") && !e.target.closest("#sugerencias")){
            ocultarSugerencias();
        }
    });
    }




}