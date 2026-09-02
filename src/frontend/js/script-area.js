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
    {
    id: 1,
    titulo: "Vi este agujero en la calle arreglenlo rapido",
    usuario: "098 999 999",
    fecha: "17/02/26 • Hace 2 dias",
    prioridad: "Normal",
    area: "Infraestructura",
    lat: -34.9011,
    lng: -56.1645,
    foto: "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw"
},
{
    id: 2,
    titulo: "Luminaria quemada en la esquina, hace dos semanas que no anda",
    usuario: "098 888 777",
    fecha: "16/02/26 • Hace 3 dias",
    prioridad: "Normal",
    area: "Alumbrado",
    lat: -34.9058,
    lng: -56.1913,
    foto: "https://imgs.search.brave.com/JPsBtUAoS-VY3_h9cXI5zHIRGvlerpgYQv1iCOWA0X8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMS5w/cGxsc3RhdGljcy5j/b20vZWxjb21lcmNp/by93d3cvbXVsdGlt/ZWRpYS8yMDE5MDMv/MTkvbWVkaWEvY29y/dGFkYXMvNDMxODIy/MjAtLTYyNHg0MTUt/a09zQi1VNzA5NTE4/NTk2NDVqaEgtNjI0/eDM4NUBFbCUyMENv/bWVyY2lvLkpQRw"
},
{
    id: 3,
    titulo: "Alcantarilla desbordada, sale agua sucia hacia la vereda",
    usuario: "099 456 123",
    fecha: "15/02/26 • Hace 4 dias",
    prioridad: "Urgente",
    area: "Saneamiento",
    lat: -34.8941,
    lng: -56.1567,
    foto: "https://imgs.search.brave.com/m_1y_rVJ0FvYfEZ2bNoH2nOCeBp72vIY2mU-0RtAtWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vYWx0aXR1ZGV2/aXN1YWwvYWx0aXR1/ZGV2aXN1YWwyMzA0/L2FsdGl0dWRldmlz/dWFsMjMwNDEwNzQy/LzIwMTY3Njg1MC1h/Z3VhLWRlLWFsY2Fu/dGFyaWxsYWRvLWly/cnVtcGllbmRvLWEt/dHJhdiVDMyVBOXMt/ZGUtdW5hLXRhcGEt/ZGUtYWxjYW50YXJp/bGxhLWUtaW51bmRh/bmRvLWxhLWNhbGxl/LWNyZWFkYS5qcGc_/dmVyPTY"
},
{
    id: 4,
    titulo: "Árbol caído sobre la calzada después de la tormenta",
    usuario: "098 321 654",
    fecha: "14/02/26 • Hace 5 dias",
    prioridad: "Urgente",
    area: "Tránsito",
    lat: -34.9102,
    lng: -56.1789,
    foto: "https://imgs.search.brave.com/-Mod17heJuRETCpGi-JeEfqZIbA6ku84d8uV7NhyPAY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/MjkyMzUxNS9lcy9m/b3RvL25hdHVyYWwt/ZGlzYXN0ZXItZm9y/LWZhbGxlbi10cmVl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dGRXSW85em5F/a0VzSFR3VVRuRmsw/ZkNQZ0hQZFZGYnJI/T0FkVEJfVjhtOD0"
},
{
    id: 5,
    titulo: "Semáforo intermitente en el cruce, riesgo para peatones",
    usuario: "097 654 321",
    fecha: "13/02/26 • Hace 6 dias",
    prioridad: "Normal",
    area: "Tránsito",
    lat: -34.8975,
    lng: -56.1699,
    foto: "https://imgs.search.brave.com/DiblHoOn9q8iC4G26UuXp89aPYJWs4O9OJaKSqivwow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMS5h/YmNzdGF0aWNzLmNv/bS9NZWRpYS8yMDE1/MDQvMDkvc2VtYWZv/cm8tanVlZ28tbG9n/aWNhMS0tNjQ0eDM2/Mi5qcGc"
},
{
    id: 6,
    titulo: "Contenedor de residuos roto, la basura queda desparramada",
    usuario: "098 111 222",
    fecha: "12/02/26 • Hace 7 dias",
    prioridad: "Normal",
    area: "Limpieza",
    lat: -34.9033,
    lng: -56.1622,
    foto: "https://imgs.search.brave.com/VNSYkjf34pBg7yj_UejIs21L03QLsBXkJGyisgcJHMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9raWV2/LXVjcmFuaWEtZGUt/b2N0dWJyZS1yZWJv/c2FudGVzLWJhc3Vy/ZXJvcy1jb24tZGVz/ZWNob3MtcGwlQzMl/QTFzdGljb3MteS1i/YXN1cmEtYWxyZWRl/ZG9yLWxvcy1jb250/YW1pbmFjaSVDMyVCM24tdXJiYW5hLWJhcnJpb3MtNDA5NzA4/Njk3LmpwZw"
}

];

let reclamosResueltos = [
    { id: 3, titulo: "Bache en la calle", usuario: "098 999 999", fecha: "17/02/26 • Hace 2 dias", proveedor: "SERVIAM", area: "Infraestructura", lat: -34.9011, lng: -56.1645,
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

btnReclamosValidados.addEventListener("click", () => vistaValidados());
btnReclamosResueltos.addEventListener("click", () => vistaResueltos());

vistaValidados();

function renderFiltro(areaSeleccionada, onBuscar){
    filtro_container.innerHTML = `
        <div class="filtro-reclamos">
            <div class="filtro-titulo">
                <span class="material-symbols-outlined">filter_alt</span>
                Filtrar reclamos
            </div>
            <select class="filtro-area">
                <option value="" ${!areaSeleccionada ? "selected" : ""} disabled>Seleccionar área</option>
                <option ${areaSeleccionada === "Tránsito" ? "selected" : ""}>Tránsito</option>
                <option ${areaSeleccionada === "Infraestructura" ? "selected" : ""}>Infraestructura</option>
                <option ${areaSeleccionada === "Servicios públicos" ? "selected" : ""}>Servicios públicos</option>
                <option ${areaSeleccionada === "Alumbrado" ? "selected" : ""}>Alumbrado</option>
                <option ${areaSeleccionada === "Espacios verdes" ? "selected" : ""}>Espacios verdes</option>
            </select>
            <button class="btn-filtrar">
                <span class="material-symbols-outlined">search</span>
                Buscar
            </button>
            ${areaSeleccionada ? `<button class="btn-limpiar-filtro"><span class="material-symbols-outlined">delete</span>Limpiar filtro</button>` : ""}
        </div>
    `;

    const selectArea = filtro_container.querySelector(".filtro-area");

    filtro_container.querySelector(".btn-filtrar").addEventListener("click", () => {
        const valor = selectArea.value;
        if(!valor){
            alert("Selecciona un área para filtrar.");
            return;
        }
        onBuscar(valor);
    });

    const btnLimpiar = filtro_container.querySelector(".btn-limpiar-filtro");
    if(btnLimpiar){
        btnLimpiar.addEventListener("click", () => onBuscar(""));
    }
}


function vistaValidados(areaFiltro = ""){
    renderFiltro(areaFiltro, (nuevaArea) => vistaValidados(nuevaArea));

    section.style.gridTemplateColumns = "repeat(3, 1fr)";

    const lista = areaFiltro
        ? reclamosValidados.filter(r => r.area === areaFiltro)
        : reclamosValidados;

    if(lista.length === 0){
        section.innerHTML = areaFiltro
            ? `<p style="padding:20px;">No hay reclamos validados para el área "${areaFiltro}".</p>`
            : `<p style="padding:20px;">No hay reclamos validados pendientes de asignación.</p>`;
        return;
    }

    section.innerHTML = lista.map(r => `
        <div class="primerdiv-reclamo" data-id="${r.id}">
            <div class="segundodiv-reclamo">
                <div class="foto-reclamo"><img src="${r.foto}" alt=""></div>
                <div class="info-reclamo">
                    <p class="reclamo-titulo">${r.titulo}</p>
                    <p class="user-p">Usuario: ${r.usuario}</p>
                    <div class="Area">${r.area}</div>
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
            vistaValidados(areaFiltro);
        });
    });
}

function vistaResueltos(areaFiltro = ""){
    renderFiltro(areaFiltro, (nuevaArea) => vistaResueltos(nuevaArea));

    section.style.gridTemplateColumns = "repeat(2, 1fr)";

    const lista = areaFiltro
        ? reclamosResueltos.filter(r => r.area === areaFiltro)
        : reclamosResueltos;

    if(lista.length === 0){
        section.innerHTML = areaFiltro
            ? `<p style="padding:20px;">No hay reclamos resueltos para el área "${areaFiltro}".</p>`
            : `<p style="padding:20px;">No hay reclamos resueltos pendientes de confirmación.</p>`;
        return;
    }

    section.innerHTML = lista.map(r => `
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
            vistaResueltos(areaFiltro);
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
            vistaResueltos(areaFiltro);
        });
    });
}