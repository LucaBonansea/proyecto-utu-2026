const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");


let reclamosAValidar = [
    {
        id: 1,
        titulo: "Vi este agujero en la calle arreglenlo rapido",
        usuario: "098 999 999",
        fecha: "17/02/26 • Hace 2 dias",
        lat: -34.9011,
        lng: -56.1645,
        foto: "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw"
    }
];

firstview();

function firstview(){
    filtro_container.innerHTML = ``;
    section.style.gridTemplateColumns = "repeat(3, 1fr)";

    if(reclamosAValidar.length === 0){
        section.innerHTML = `<p style="padding:20px;">No hay reclamos pendientes de validación.</p>`;
        return;
    }

    section.innerHTML = reclamosAValidar.map(r => `
        <div class="primerdiv-reclamo" data-id="${r.id}">
            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <img src="${r.foto}" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo" contenteditable="false">${r.titulo}</p>
                    <button class="camb-titulo">Cambiar titulo</button>
                    <p class="user-p">Usuario: ${r.usuario}</p>

                    <div class="estado">
                        Enviado
                        <div class="acciones-reclamo">
                            <button class="denegar">Denegar</button>
                            <button class="eliminar">Eliminar</button>
                        </div>
                    </div>
                    <p class="fecha">${r.fecha}</p>

                    <select class="select-area">
                        <option selected disabled>Seleccionar área</option>
                        <option>Tránsito</option>
                        <option>Infraestructura</option>
                        <option>Servicios públicos</option>
                        <option>Alumbrado</option>
                        <option>Espacios verdes</option>
                    </select>
                </div>
            </div>

            <div class="map" id="map-${r.id}"></div>

            <div class="enviar-area">
                <button class="btn-enviar-area">
                    <span class="material-symbols-outlined">send</span>
                    Validar y enviar al área
                </button>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".primerdiv-reclamo").forEach(card => {
        card.style.flexDirection = "column";

        const id = card.dataset.id;
        const reclamo = reclamosAValidar.find(r => r.id == id);

      
        const map = L.map(`map-${id}`, {
            zoomControl: false,
            attributionControl: false
        }).setView([reclamo.lat, reclamo.lng], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);

        L.marker([reclamo.lat, reclamo.lng]).addTo(map).bindPopup("Reclamo ciudadano");

        
        const btnTitulo = card.querySelector(".camb-titulo");
        const titulo = card.querySelector(".reclamo-titulo");

        btnTitulo.addEventListener("click", () => {
            if (titulo.contentEditable === "true") {
                guardarTitulo();
            } else {
                titulo.contentEditable = true;
                titulo.classList.add("editando");
                titulo.focus();
                btnTitulo.textContent = "Guardar titulo";
            }
        });

        titulo.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                guardarTitulo();
            }
        });

        function guardarTitulo(){
            titulo.contentEditable = false;
            titulo.classList.remove("editando");
            btnTitulo.textContent = "Cambiar titulo";
            reclamo.titulo = titulo.textContent.trim();
            titulo.blur();
        }

        
        card.querySelector(".denegar").addEventListener("click", () => {
            if(confirm("¿Denegar este reclamo?")){
                reclamosAValidar = reclamosAValidar.filter(r => r.id != id);
                firstview();
            }
        });

        
        card.querySelector(".eliminar").addEventListener("click", () => {
            if(confirm("¿Eliminar este reclamo? Esta acción no se puede deshacer.")){
                reclamosAValidar = reclamosAValidar.filter(r => r.id != id);
                firstview();
            }
        });

        
        card.querySelector(".btn-enviar-area").addEventListener("click", () => {
            const area = card.querySelector(".select-area").value;
            if(!area || area === "Seleccionar área"){
                alert("Selecciona un área antes de enviar el reclamo.");
                return;
            }
            
            reclamosAValidar = reclamosAValidar.filter(r => r.id != id);
            firstview();
        });
    });
}
