export class Reclamos{
    constructor(Main){
        this.Main = Main;

        this.reclamosData = [
            { titulo: "Ascensor fuera de servicio",  estado: "terminado", fecha: "17/02/26 • Hace 2 dias" },
            { titulo: "Luz de pasillo quemada",       estado: "terminado", fecha: "16/02/26 • Hace 3 dias" },
            { titulo: "Filtración en el techo",       estado: "terminado", fecha: "15/02/26 • Hace 4 dias" },
            { titulo: "Aire acondicionado roto",      estado: "terminado", fecha: "14/02/26 • Hace 5 dias" },
            { titulo: "Puerta de emergencia trabada", estado: "terminado", fecha: "13/02/26 • Hace 6 dias" },
            { titulo: "Baño sin agua",                estado: "terminado", fecha: "12/02/26 • Hace 7 dias" },
            { titulo: "Cañería con pérdida",          estado: "terminado", fecha: "11/02/26 • Hace 8 dias" },
            { titulo: "Extintor vencido",             estado: "terminado", fecha: "10/02/26 • Hace 9 dias" },
            { titulo: "Enchufe dañado en oficina",    estado: "proceso",   fecha: "09/02/26 • Hace 10 dias" },
            { titulo: "Ventana rota en sala 3",       estado: "proceso",   fecha: "08/02/26 • Hace 11 dias" },
            { titulo: "Cielorraso con humedad",       estado: "aceptado",  fecha: "07/02/26 • Hace 12 dias" },
            { titulo: "Sensor de humo desconectado",  estado: "enviado",   fecha: "06/02/26 • Hace 13 dias" },
        ];

        this.imgPlaceholder = "https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw";

        this.filtros = [
            { id: "todos",     label: "Todos" },
            { id: "resueltos", label: "Resueltos" },
            { id: "proceso",   label: "En proceso" },
        ];

        this.estadoInfo = {
            enviado:   { label: "Enviado",    clase: "estado-enviado" },
            aceptado:  { label: "Aceptado",   clase: "estado-aceptado" },
            proceso:   { label: "En proceso", clase: "estado-proceso" },
            terminado: { label: "Resuelto",   clase: "estado-resuelto" },
        };
    }

    second_view(filtro = "todos"){

        const pasos = ["enviado", "aceptado", "proceso", "terminado"];

        let lista = this.reclamosData;
        let titulo = "Tus Reclamos";

        if(filtro === "resueltos"){
            lista = this.reclamosData.filter(r => r.estado === "terminado");
            titulo = "Reclamos Resueltos";
        } else if(filtro === "proceso"){
            lista = this.reclamosData.filter(r => r.estado !== "terminado");
            titulo = "Reclamos en Proceso";
        }

        const chipsHTML = this.filtros.map(f => `
            <button class="edificio-chip ${f.id === filtro ? "active" : ""}" data-filtro="${f.id}">
                ${f.label}
            </button>
        `).join("");

        const tarjetas = lista.length
            ? lista.map((r, i) => this.renderTarjeta(r, i, pasos)).join("")
            : `<p class="sin-reclamos">No hay reclamos en esta categoría.</p>`;

        this.Main.innerHTML = `
        <div class="div-inicial">
            <h2>${titulo}</h2>
        </div>

        <div class="edificios-chips">
            ${chipsHTML}
        </div>

        <div class="reclamos-seccion">
            ${tarjetas}
        </div>
        `;

        const latitud = -34.603722;
        const longitud = -58.381592;

        this.Main.querySelectorAll(".reclamo-ubicacion").forEach(boton => {
            boton.addEventListener("click", () => {
                const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
                window.open(url, "_blank");
            });
        });

        this.Main.querySelectorAll(".edificio-chip").forEach(chip => {
            chip.addEventListener("click", () => {
                this.second_view(chip.dataset.filtro);
            });
        });
    }

    renderTarjeta(reclamo, index, pasos){
        const estadoIndex = pasos.indexOf(reclamo.estado);
        const nombresPasos = ["Enviado", "Aceptado", "En proceso", "Terminado"];
        const info = this.estadoInfo[reclamo.estado];

        const stepsHTML = nombresPasos.map((nombre, i) => {
            const stepActive = i <= estadoIndex ? "active" : "";
            const lineActive = i < estadoIndex ? "active" : "";
            const line = i < nombresPasos.length - 1
                ? `<div class="line ${lineActive}"></div>`
                : "";
            return `
                <div class="step ${stepActive}">
                    <div class="circle"></div>
                    <span>${nombre}</span>
                </div>
                ${line}
            `;
        }).join("");

        return `
            <div class="primerdiv-reclamo ${info.clase}">
                <div class="foto-reclamo">
                    <img src="${this.imgPlaceholder}" alt="">
                </div>
                <div class="info-reclamo">
                    <p class="reclamo-titulo">${reclamo.titulo}</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    <div class="stepper">
                        ${stepsHTML}
                    </div>
                    <p class="fecha-misreclamos">${reclamo.fecha} <span>${index + 1}/${this.reclamosData.length}</span></p>
                </div>
            </div>
        `;
    }
}