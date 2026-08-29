const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");


let reclamosAValidar = [
    {
        id: 1,
        titulo: "Vi este agujero en la calle arreglenlo rapido",
        usuario: "098 999 999",
        fecha: "17/02/26 • Hace 2 dias",
        prioridad: "Normal",
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
        lat: -34.9033,
        lng: -56.1622,
        foto: "https://imgs.search.brave.com/VNSYkjf34pBg7yj_UejIs21L03QLsBXkJGyisgcJHMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9raWV2/LXVjcmFuaWEtZGUt/b2N0dWJyZS1yZWJv/c2FudGVzLWJhc3Vy/ZXJvcy1jb24tZGVz/ZWNob3MtcGwlQzMl/QTFzdGljb3MteS1i/YXN1cmEtYWxyZWRl/ZG9yLWxvcy1jb250/YW1pbmFjaSVDMyVC/M24tdXJiYW5hLWJh/cnJpb3MtNDA5NzA4/Njk3LmpwZw"
    }
];

vistaLista();

function vistaLista(){
    filtro_container.innerHTML = ``;
    section.removeAttribute("style");
    section.style.display = "block";
    section.classList.remove("contenedor-masonry");

    if(reclamosAValidar.length === 0){
        section.innerHTML = `<p style="padding:20px;">No hay reclamos pendientes de validación.</p>`;
        return;
    }
    const columnas = [[], [], [], []];
    reclamosAValidar.forEach((r, index) => {
        columnas[index % 4].push(r);
    });

    section.innerHTML = `
        <div class="contenedor-masonry">
            ${columnas.map(columna => `
                <div class="columna-masonry">
                    ${columna.map(r => `
                        <div class="reclamo-card-basica" data-id="${r.id}">
                            <div class="foto-reclamo-basica">
                                <img src="${r.foto}" alt="">
                            </div>
                            <div class="info-basica">
                                <p class="reclamo-titulo-basico">${r.titulo}</p>
                                <p class="fecha">${r.fecha}</p>
                                ${r.prioridad === "Urgente" ? `<span class="badge-urgente">Urgente</span>` : ""}
                            </div>
                            <button class="btn-ver-detalle">Ver detalle</button>
                        </div>
                    `).join("")}
                </div>
            `).join("")}
        </div>
    `;

    document.querySelectorAll(".reclamo-card-basica").forEach(card => {
        const id = card.dataset.id;
        card.querySelector(".btn-ver-detalle").addEventListener("click", () => {
            vistaDetalle(id);
        });
    });
}


function vistaDetalle(id){
    filtro_container.innerHTML = ``;
    section.classList.remove("contenedor-masonry");
    section.style.gridTemplateColumns = "repeat(1, 1fr)";

    const reclamo = reclamosAValidar.find(r => r.id == id);
    if(!reclamo){
        vistaLista();
        return;
    }

    section.innerHTML = `
        <div class="primerdiv-reclamo" data-id="${reclamo.id}">
            <button class="btn-volver-lista">← Volver a la lista</button>

            <div class="segundodiv-reclamo">
                

                <div class="info-reclamo">
                    <p class="reclamo-titulo" contenteditable="false">${reclamo.titulo}</p>
                    <button class="camb-titulo">Cambiar titulo</button>
                    <p class="user-p">Usuario: ${reclamo.usuario}</p>

                    <div class="estado">
                        Enviado
                        <div class="acciones-reclamo">
                            <button class="denegar">Denegar</button>
                        </div>
                    </div>
                    <p class="fecha">${reclamo.fecha}</p>
                    <div class="prioridad-container">
                        <p class="prioridad ${reclamo.prioridad === "Urgente" ? "prioridad-urgente" : ""}">
                            Prioridad: ${reclamo.prioridad}
                        </p>
                        <button class="Urgente ${reclamo.prioridad === "Urgente" ? "urgencia-activa" : ""}">
                            ${reclamo.prioridad === "Urgente" ? "Quitar urgencia" : "Marcar Urgencia"}
                        </button>
                    </div>

                    <select class="select-area">
                        <option selected disabled>Seleccionar área</option>
                        <option>Tránsito</option>
                        <option>Infraestructura</option>
                        <option>Servicios públicos</option>
                        <option>Alumbrado</option>
                        <option>Espacios verdes</option>
                    </select>
                </div>
                <div class="foto-reclamo">
                    <img src="${reclamo.foto}" alt="">
                </div>
            </div>

            <div class="map" id="map-${reclamo.id}"></div>

            <div class="enviar-area">
                <button class="btn-enviar-area">
                    <span class="material-symbols-outlined">send</span>
                    Validar y enviar al área
                </button>
            </div>
        </div>
    `;

    const card = document.querySelector(".primerdiv-reclamo");
    card.style.flexDirection = "column";

    document.querySelector(".btn-volver-lista").addEventListener("click", () => {
        vistaLista();
    });

    const map = L.map(`map-${reclamo.id}`, {
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
            reclamosAValidar = reclamosAValidar.filter(r => r.id != reclamo.id);
            vistaLista();
        }
    });

    card.querySelector(".Urgente").addEventListener("click", () => {
        const btnUrgencia = card.querySelector(".Urgente");
        const textoPrioridad = card.querySelector(".prioridad");

        if (reclamo.prioridad !== "Urgente") {
            reclamo.prioridad = "Urgente";

            textoPrioridad.textContent = "Prioridad: Urgente";
            textoPrioridad.classList.add("prioridad-urgente");

            btnUrgencia.textContent = "Quitar urgencia";
            btnUrgencia.classList.add("urgencia-activa");

        } else {
            reclamo.prioridad = "Normal";

            textoPrioridad.textContent = "Prioridad: Normal";
            textoPrioridad.classList.remove("prioridad-urgente");

            btnUrgencia.textContent = "Marcar Urgencia";
            btnUrgencia.classList.remove("urgencia-activa");
        }
    });
    card.querySelector(".btn-enviar-area").addEventListener("click", () => {
        const area = card.querySelector(".select-area").value;
        if(!area || area === "Seleccionar área"){
            alert("Selecciona un área antes de enviar el reclamo.");
            return;
        }

        reclamosAValidar = reclamosAValidar.filter(r => r.id != reclamo.id);
        vistaLista();
    });
}