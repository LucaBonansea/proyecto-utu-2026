const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");
const btnReclamosValidados = document.querySelector(".reclamos-validados");
const btnReclamosResueltos = document.querySelector(".reclamos-resueltos");
const botones = document.querySelectorAll(".sidebar-btn");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(item => item.classList.remove("active"));
        boton.classList.add("active");
    });
});

let reclamosValidados = [
    { id: 1, titulo: "Bache en la calle", usuario: "098 999 999", fecha: "17/02/26 • Hace 2 dias", lat: -34.9011, lng: -56.1645,
      foto: "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" },
    { id: 2, titulo: "Bache en la calle", usuario: "098 999 999", fecha: "17/02/26 • Hace 2 dias", lat: -34.9011, lng: -56.1645,
      foto: "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" }
];

let reclamosResueltos = [
    { id: 3, titulo: "Bache en la calle", usuario: "098 999 999", fecha: "17/02/26 • Hace 2 dias", proveedor: "SERVIAM", lat: -34.9011, lng: -56.1645,
      foto: "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw",
      evidencia: "https://imgs.search.brave.com/UE_gsRzX1luujU8ZbhSJaYTVrZSKRsHAWAahM7A58Uc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/My8yMS8wMy8wMS9z/YW5pdGF0aW9uLXdv/cmtlci03MDgyMTc3/XzY0MC5qcGc" }
];

let mapCounter = 0;
function initMap(elId, lat, lng){
    const map = L.map(elId, { zoomControl: false, attributionControl: false }).setView([lat, lng], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    L.marker([lat, lng]).addTo(map);
    return map;
}

btnReclamosValidados.addEventListener("click", vistaValidados);
btnReclamosResueltos.addEventListener("click", vistaResueltos);

vistaValidados();

function vistaValidados(){
    filtro_container.innerHTML = `
        <div class="filtro-reclamos">
            <div class="filtro-titulo">
                <span class="material-symbols-outlined">filter_alt</span>
                Filtrar reclamos
            </div>
            <select class="filtro-area">
                <option selected disabled>Seleccionar área</option>
                <option>Tránsito</option>
                <option>Infraestructura</option>
                <option>Servicios públicos</option>
                <option>Alumbrado</option>
                <option>Espacios verdes</option>
            </select>
            <button class="btn-filtrar">
                <span class="material-symbols-outlined">search</span>
                Buscar
            </button>
        </div>
    `;
    section.style.gridTemplateColumns = "repeat(3, 1fr)";

    if(reclamosValidados.length === 0){
        section.innerHTML = `<p style="padding:20px;">No hay reclamos validados pendientes de asignación.</p>`;
        return;
    }

    section.innerHTML = reclamosValidados.map(r => `
        <div class="primerdiv-reclamo" data-id="${r.id}">
            <div class="segundodiv-reclamo">
                <div class="foto-reclamo"><img src="${r.foto}" alt=""></div>
                <div class="info-reclamo">
                    <p class="reclamo-titulo">${r.titulo}</p>
                    <p class="user-p">Usuario: ${r.usuario}</p>
                    <div class="estado">Validado</div>
                    <select class="select-area">
                        <option selected disabled>Seleccionar Proveedor</option>
                        <option>SERVIAM</option>
                        <option>VIAMÁS</option>
                        <option>METONO</option>
                        <option>Construcciones viales</option>
                    </select>
                    <p class="fecha">${r.fecha}</p>
                </div>
            </div>
            <div class="map" id="map-val-${r.id}"></div>
            <div class="enviar-proveedor">
                <button class="btn-enviar-proveedor">
                    <span class="material-symbols-outlined">send</span>
                    Enviar al Proveedor
                </button>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".primerdiv-reclamo").forEach(card => {
        card.style.flexDirection = "column";
        const id = card.dataset.id;
        const r = reclamosValidados.find(x => x.id == id);
        initMap(`map-val-${id}`, r.lat, r.lng);

        card.querySelector(".btn-enviar-proveedor").addEventListener("click", () => {
            const proveedor = card.querySelector(".select-area").value;
            if(!proveedor || proveedor === "Seleccionar Proveedor"){
                alert("Selecciona un proveedor antes de enviar el reclamo.");
                return;
            }
            
            reclamosValidados = reclamosValidados.filter(x => x.id != id);
            vistaValidados();
        });
    });
}

function vistaResueltos(){
    filtro_container.innerHTML = `
        <div class="filtro-reclamos">
            <div class="filtro-titulo">
                <span class="material-symbols-outlined">filter_alt</span>
                Filtrar reclamos
            </div>
            <select class="filtro-area">
                <option selected disabled>Seleccionar área</option>
                <option>Tránsito</option>
                <option>Infraestructura</option>
                <option>Servicios públicos</option>
                <option>Alumbrado</option>
                <option>Espacios verdes</option>
            </select>
            <button class="btn-filtrar">
                <span class="material-symbols-outlined">search</span>
                Buscar
            </button>
        </div>
    `;
    section.style.gridTemplateColumns = "repeat(2, 1fr)";

    if(reclamosResueltos.length === 0){
        section.innerHTML = `<p style="padding:20px;">No hay reclamos resueltos pendientes de confirmación.</p>`;
        return;
    }

    section.innerHTML = reclamosResueltos.map(r => `
        <div class="primerdiv-reclamo" data-id="${r.id}">
            <div class="mediodiv-reclamo">
                <div class="segundodiv-reclamo">
                    <div class="foto-reclamo"><img src="${r.foto}" alt=""></div>
                    <div class="info-reclamo">
                        <p class="reclamo-titulo">${r.titulo}</p>
                        <p class="user-p">Usuario: ${r.usuario}</p>
                        <div class="estado">Resuelto por ${r.proveedor}</div>
                        <p class="fecha">${r.fecha}</p>
                    </div>
                </div>

                <div class="map" id="map-res-${r.id}"></div>

                <div class="comentario-rechazo oculto">
                    <textarea rows="2" placeholder="Comentario para el proveedor (motivo del reenvío)"></textarea>
                </div>

                <div class="enviar-proveedor">
                    <button class="btn-enviar-proveedor btn-confirmar">
                        <span class="material-symbols-outlined">check</span>
                        Confirmar reclamo resuelto
                    </button>
                    <button class="btn-reclamo-no-aprobado">
                        <span class="material-symbols-outlined">close</span>
                        Reenviar al proveedor
                    </button>
                </div>
            </div>

            <div class="fotoprueba" title="Evidencia cargada por el proveedor">
                <img src="${r.evidencia}" alt="Evidencia">
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".primerdiv-reclamo").forEach(card => {
        card.style.flexDirection = "row";
        const id = card.dataset.id;
        const r = reclamosResueltos.find(x => x.id == id);
        initMap(`map-res-${id}`, r.lat, r.lng);

        const cajaComentario = card.querySelector(".comentario-rechazo");
        const textarea = cajaComentario.querySelector("textarea");

    
        card.querySelector(".btn-confirmar").addEventListener("click", () => {
           
            reclamosResueltos = reclamosResueltos.filter(x => x.id != id);
            vistaResueltos();
        });

        
        card.querySelector(".btn-reclamo-no-aprobado").addEventListener("click", () => {
            if(cajaComentario.classList.contains("oculto")){
                cajaComentario.classList.remove("oculto");
                textarea.focus();
                return;
            }
            const comentario = textarea.value.trim();
            if(comentario === ""){
                alert("Escribe un comentario explicando por qué se reenvía al proveedor.");
                return;
            }
            
            reclamosResueltos = reclamosResueltos.filter(x => x.id != id);
            vistaResueltos();
        });
    });
}
