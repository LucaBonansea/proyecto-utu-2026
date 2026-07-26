const buttons = document.querySelectorAll(".bottom-nav button");
const newReclamo = document.querySelector(".new-reclamo");
const Main = document.querySelector("#main");


// botones del nav
const $btn_home = document.querySelector(".main-button");
const $btn_misreclamos = document.querySelector(".mireclamo");


first_view();



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

$btn_home.addEventListener("click", () => {
    first_view();
})


// Eventos
$btn_misreclamos.addEventListener("click", () =>{
    Main.innerHTML = `
        <div class="div-inicial">
            <h2>Tus Reclamos</h2>
        </div>
    


        <div>

            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>1/25</span></p>
                    <button class="eliminar-rec">Eliminar</button>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>1/25</span></p>
                    <button class="eliminar-rec">Eliminar</button>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>1/25</span></p>
                    <button class="eliminar-rec">Eliminar</button>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>1/25</span></p>
                    <button class="eliminar-rec">Eliminar</button>

                </div>
            </div>
            
    `;
})


function iniciarReclamo(){
    $btn_home.classList.remove("active");
    Main.innerHTML = `
        <div class="div-inicial">
            <h2>Nuevo Reclamo</h2>
        </div>

        <input type="file" id="archivo" hidden>

        <label for="archivo" class="icono-subir">
            <span class="material-symbols-outlined">add_photo_alternate</span>
        </label>


        <label class="categoria">
            <span class="material-symbols-outlined">category</span>

            <select id="categoria">
                <option value="" selected disabled>Selecciona una categoría</option>
                <option value="vereda">Vereda rota</option>
                <option value="caneria">Cañería rota</option>
                <option value="cables">Cables rotos</option>
                <option value="bache">Bache en la calle</option>
                <option value="otros">Otros</option>
            </select>
        </label>


        <input 
            type="text" 
            id="otraCategoria"
            placeholder="Escribe la categoría"
            style="display:none;">


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
    const categoria = document.getElementById("categoria");
    const otraCategoria = document.getElementById("otraCategoria");


    categoria.addEventListener("change",()=>{

        if(categoria.value === "otros"){
            otraCategoria.style.display="block";
        }else{
            otraCategoria.style.display="none";
            otraCategoria.value="";
        }

    });
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
    const map = L.map("map").setView(
        [-34.3375, -56.7136],
        13
    );


    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
            attribution:"© OpenStreetMap © CARTO"
        }

    ).addTo(map);



    let marker = L.marker(
        [-34.3375, -56.7136],
        {
            draggable:true
        }
    ).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
    }, 100);

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




    // =========================
    // MARCAR TOCANDO EL MAPA
    // =========================


    map.on("click",(e)=>{


        marker.setLatLng(
            e.latlng
        );


    });





    // =========================
    // BUSCAR DIRECCION
    // =========================


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

newReclamo.addEventListener("click", () => {

    iniciarReclamo();    
});


function first_view(){
$btn_home .classList.add("active");
Main.innerHTML = `        <div class="div-inicial">
            <h2>Hola,<span>Thiago</span></h2>
        </div>

        <button class="new-reclamo-inicial">
            Nuevo Reclamo
        </button>


        <div>
            <div class="reclamos-text">
                <p>Reclamos ciudadanos</p>
            </div>

            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>

            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/7A2zJaieRlAn5rZB-e9bYU177AYMcrceGJD645FcW3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZGEtY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/dHVyYmlhLTQyODc4/OTg5NC5qcGc" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/T_kHafZsKxb5hjivaUBrQHRcGPvI96nUD94tEPiMvYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYW1p/bm8tZGUtYXNmYWx0/by1kZXRlcmlvcmFk/by15LWFncmlldGFk/by1jb24tYmFjaGVz/LXF1ZS1hdHJhdmll/c2EtZWwtYm9zcXVl/LTQyMTI1MDQ4MS5q/cGc" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/d_R-EcP2P-HBk-DSmAtSUIsvXELtW24lx00wULy9nTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zdXBl/cmZpY2llLWRlLWFz/ZmFsdG8tYWdyaWV0/YWRhLXktZGElQzMl/QjFhZGEtY29uLWJh/Y2hlcy1wcm9mdW5k/b3MtbGxlbm9zLWFn/dWEtcXVlLXJlZmxl/amFuLWxhcy1mYXJv/bGFzLTQyODk0MDI1/Mi5qcGc" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/H2XqJPBYdlvDncgswfedLBiJu4dUu1FnmLY1TjY-qEU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE0/ODYyODA2NC9lcy9m/b3RvL3BvdGhvbGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXNMUmZPUVlzOVV3/MkJLVzdSZ1RlN1Yw/V1RUc0o0MzNaTnpG/eHhoRVQxR0U9" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>

            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/9FYF-uevew0Um-pSXDBRPd3_96k16bWGkpnEFn12Pck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9wb3Rob2xl/LW9uLWFzcGhhbHQt/cm9hZC1wb3Rob2xl/cy0yNjBudy0yNzU1/Njk1NDgzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/H2XqJPBYdlvDncgswfedLBiJu4dUu1FnmLY1TjY-qEU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE0/ODYyODA2NC9lcy9m/b3RvL3BvdGhvbGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXNMUmZPUVlzOVV3/MkJLVzdSZ1RlN1Yw/V1RUc0o0MzNaTnpG/eHhoRVQxR0U9" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <p class="reclamo-ubicacion">Calle 18 de julio entre Artigas y Ituzaingo</p>
                    
                    
                    <div class="stepper">
                        <div class="step active">
                            <div class="circle"></div>
                            <span>Enviado</span>
                        </div>

                        <div class="line active"></div>

                        <div class="step active">
                            <div class="circle"></div>
                            <span>Aceptado</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>En proceso</span>
                        </div>

                        <div class="line"></div>

                        <div class="step">
                            <div class="circle"></div>
                            <span>Terminado</span>
                        </div>
                    </div>
                    
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

                </div>
            </div>




        </div>`;

        const nuevoreclamoinicio = document.querySelector(".new-reclamo-inicial");

        nuevoreclamoinicio.addEventListener("click", () => {

            iniciarReclamo();



        });
};
