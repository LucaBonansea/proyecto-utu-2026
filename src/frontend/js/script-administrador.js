const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");
const proveedoresbtn = document.querySelector(".proveedores-btn");
const areasbtn = document.querySelector(".areas-btn");
const usuariosbtn = document.querySelector(".usuarios-btn");
const botones = document.querySelectorAll(".sidebar-btn");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(item => item.classList.remove("active"));
        boton.classList.add("active");
    });
});


let proveedores = [
    { id: 1, nombre: "SERVIAM", area: "Infraestructura", contacto: "011 2345 6789", email: "contacto@serviam.com.uy" },
    { id: 2, nombre: "VIAMÁS", area: "Tránsito", contacto: "011 9876 5432", email: "contacto@viamas.com.uy" }
];

let areas = [
    { nombre: "Infraestructura", descripcion: "Bacheo, veredas, puentes y obra vial en general.", encargado: "María Sosa" },
    { nombre: "Tránsito", descripcion: "Semáforos, señalización y ordenamiento vehicular.", encargado: "Diego Ramos"}
];

let usuarios = [
    { telefono: "098 111 111", nombre: "Ana Pérez", rol: "Ciudadano" },
    { telefono: "098 222 222", nombre: "Juan Gómez", rol: "Ciudadano" },
    { telefono: "098 333 333", nombre: "Lucía Fernández", rol: "Administrativo" },
    { telefono: "098 444 444", nombre: "Roberto Díaz", rol: "Proveedor", proveedorId: 1 },
    { telefono: "098 555 555", nombre: "Carla Núñez", rol: "Proveedor", proveedorId: 1 },
    { telefono: "098 666 666", nombre: "Pablo Silva", rol: "Proveedor", proveedorId: 2 }
];

let siguienteIdProveedor = 3;

proveedoresbtn.addEventListener("click", vistaProveedores);
areasbtn.addEventListener("click", vistaAreas);
usuariosbtn.addEventListener("click", () => vistaUsuarios());


function vistaProveedores(){
    section.style.display = "grid";
    filtro_container.innerHTML = ``;
    section.style.gridTemplateColumns = "repeat(1, 1fr)";

    section.innerHTML = `
        <div class="lista-proveedores">
            <div class="titulo-proveedores">
                <h2>Proveedores</h2>
                <button class="btn-agregar-proveedor">
                    <span class="material-symbols-outlined">add</span>
                    Agregar proveedor
                </button>
            </div>

            <div class="form-proveedor oculto">
                <input class="nombre-proveedor" type="text" placeholder="Nombre del proveedor">
                <select class="area-proveedor">
                    <option selected disabled>Seleccionar área</option>
                    ${areas.map(a => `<option>${a.nombre}</option>`).join("")}
                </select>
                <input class="contacto-proveedor" type="text" placeholder="Teléfono de contacto">
                <input class="email-proveedor" type="email" placeholder="Correo de contacto">
                <button class="guardar-proveedor">Guardar proveedor</button>
            </div>

            <div class="contenedor-proveedores">
                ${proveedores.map(renderCardProveedor).join("")}
            </div>
        </div>
    `;

    const btnAgregar = document.querySelector(".btn-agregar-proveedor");
    const formulario = document.querySelector(".form-proveedor");
    const btnGuardar = document.querySelector(".guardar-proveedor");
    const nombreInput = document.querySelector(".nombre-proveedor");
    const areaSelect = document.querySelector(".area-proveedor");
    const contactoInput = document.querySelector(".contacto-proveedor");
    const emailInput = document.querySelector(".email-proveedor");

    btnAgregar.addEventListener("click", () => {
        formulario.classList.toggle("oculto");
    });

    btnGuardar.addEventListener("click", () => {
        const nombre = nombreInput.value.trim();
        const area = areaSelect.value;
        const contacto = contactoInput.value.trim();
        const email = emailInput.value.trim();

        if(nombre === "" || !area || area === "Seleccionar área"){
            alert("Completa todos los campos");
            return;
        }

        proveedores.push({ id: siguienteIdProveedor++, nombre, area, contacto, email });
        vistaProveedores();
    });

    document.querySelectorAll(".btn-detalle-proveedor").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);
            vistaDetalleProveedor(id);
        });
    });
}

function renderCardProveedor(p){
    const usuariosDelProveedor = usuarios.filter(u => u.rol === "Proveedor" && u.proveedorId === p.id);

    return `
        <div class="proveedor-card">
            <div class="proveedor-card-top">
                <h3>${p.nombre}</h3>
                <span class="proveedor-cant-usuarios">${usuariosDelProveedor.length} usuario${usuariosDelProveedor.length === 1 ? "" : "s"}</span>
            </div>
            <p>Área: ${p.area}</p>
            ${p.contacto ? `<p class="proveedor-contacto">Tel: ${p.contacto}</p>` : ""}
            ${p.email ? `<p class="proveedor-contacto">${p.email}</p>` : ""}
            <button class="btn-detalle-proveedor" data-id="${p.id}">Ver usuarios →</button>
        </div>
    `;
}

function vistaDetalleProveedor(id){
    const proveedor = proveedores.find(p => p.id === id);
    if(!proveedor) return;

    const usuariosDelProveedor = usuarios.filter(u => u.rol === "Proveedor" && u.proveedorId === id);

    section.innerHTML = `
        <div class="lista-proveedores">
            <button class="btn-volver-proveedores">← Volver a Proveedores</button>

            <div class="titulo-proveedores">
                <h2>${proveedor.nombre}</h2>
            </div>

            <div class="proveedor-detalle-info">
                <p><strong>Área:</strong> ${proveedor.area}</p>
                ${proveedor.contacto ? `<p><strong>Contacto:</strong> ${proveedor.contacto}</p>` : ""}
                ${proveedor.email ? `<p><strong>Email:</strong> ${proveedor.email}</p>` : ""}
            </div>

            <h3 class="proveedor-detalle-subtitulo">Usuarios de este proveedor</h3>

            <div class="contenedor-usuarios">
                ${usuariosDelProveedor.length > 0
                    ? usuariosDelProveedor.map(u => `
                        <div class="usuario-card">
                            <div class="usuario-info">
                                <h3>${u.nombre}</h3>
                                <p>Tel: ${u.telefono}</p>
                                <span class="usuario-rol-actual">${u.rol}</span>
                            </div>
                        </div>
                    `).join("")
                    : `<p style="padding:10px;">Este proveedor todavía no tiene usuarios asignados.</p>`
                }
            </div>
        </div>
    `;

    document.querySelector(".btn-volver-proveedores").addEventListener("click", vistaProveedores);
}

function vistaAreas(){
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.alignItems = "stretch";
    section.style.gridTemplateColumns = "none";
    filtro_container.innerHTML = ``;

    section.innerHTML = `
        <div class="lista-areas">
            <div class="titulo-areas">
                <h2>Áreas</h2>
                <button class="btn-agregar-area">
                    <span class="material-symbols-outlined">add</span>
                    Agregar área
                </button>
            </div>

            <div class="form-area oculto">
                <div class="form-area-fila">
                    <input class="nombre-area" type="text" placeholder="Nombre del área">
                    <input class="encargado-area" type="text" placeholder="Encargado/a del área">
                </div>
                <textarea class="descripcion-area" rows="2" placeholder="Descripción breve del área (qué tipo de reclamos atiende)"></textarea>
                <button class="guardar-area">
                    <span class="material-symbols-outlined">save</span>
                    Guardar área
                </button>
            </div>

            <div class="contenedor-areas">
                ${areas.map(a => {
                    const cantProveedores = proveedores.filter(p => p.area === a.nombre).length;
                    return `
                    <div class="area-card">
                        <div class="area-card-top">
                            <div class="area-icon">
                                <span class="material-symbols-outlined">tenancy</span>
                            </div>
                            <div class="area-card-titulos">
                                <h3>${a.nombre}</h3>
                                <p class="area-encargado">Encargado/a: ${a.encargado || "Sin asignar"}</p>
                            </div>
                        </div>

                        <p class="area-descripcion">${a.descripcion || "Sin descripción."}</p>
                    </div>
                `}).join("")}
            </div>
        </div>
    `;

    const btnAgregar = document.querySelector(".btn-agregar-area");
    const formulario = document.querySelector(".form-area");
    const btnGuardar = document.querySelector(".guardar-area");
    const inputNombre = document.querySelector(".nombre-area");
    const inputEncargado = document.querySelector(".encargado-area");
    const inputDescripcion = document.querySelector(".descripcion-area");

    btnAgregar.addEventListener("click", () => {
        formulario.classList.toggle("oculto");
    });

    btnGuardar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const encargado = inputEncargado.value.trim();
        const descripcion = inputDescripcion.value.trim();

        if(nombre === ""){
            alert("Ingrese un nombre de área");
            return;
        }

        areas.push({ nombre, encargado, descripcion, reclamosActivos: 0 });
        vistaAreas();
    });
}

function quitarTildes(texto){
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function vistaUsuarios(filtro = ""){
    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    filtro_container.innerHTML = ``;

    section.innerHTML = `
        <div class="lista-usuarios">
            <div class="titulo-usuarios">
                <h2>Usuarios</h2>
            </div>

            <div class="buscador-usuarios">
                <input class="input-buscar-usuario" type="text" placeholder="Buscar por nombre o teléfono" value="${filtro}">
                <button class="btn-buscar-usuario">
                    <span class="material-symbols-outlined">search</span>
                    Buscar
                </button>
            </div>

            <div class="contenedor-usuarios"></div>
        </div>
    `;

    const inputBuscar = document.querySelector(".input-buscar-usuario");
    const btnBuscar = document.querySelector(".btn-buscar-usuario");
    const contenedor = document.querySelector(".contenedor-usuarios");

    function renderLista(valorFiltro){
        const filtroNormalizado = quitarTildes(valorFiltro.toLowerCase());

        const usuariosFiltrados = valorFiltro
            ? usuarios.filter(u =>
                quitarTildes(u.nombre.toLowerCase()).includes(filtroNormalizado) ||
                u.telefono.includes(valorFiltro))
            : usuarios;

        contenedor.innerHTML = usuariosFiltrados.map((u) => {
            const index = usuarios.indexOf(u);
            const proveedorActual = u.rol === "Proveedor" && u.proveedorId
                ? proveedores.find(p => p.id === u.proveedorId)
                : null;

            return `
            <div class="usuario-card" data-index="${index}">
                <div class="usuario-info">
                    <h3>${u.nombre}</h3>
                    <p>Tel: ${u.telefono}</p>
                    <span class="usuario-rol-actual">${u.rol}</span>
                    ${proveedorActual ? `<span class="usuario-proveedor-actual">Proveedor: ${proveedorActual.nombre}</span>` : ""}
                </div>
                <div class="usuario-acciones">
                    <select class="select-rol">
                        <option selected disabled>Ascender a...</option>
                        <option>Administrativo</option>
                        <option>Usuario de área</option>
                        <option>Proveedor</option>
                    </select>

                    <select class="select-proveedor-destino oculto">
                        <option selected disabled>Seleccionar proveedor</option>
                        ${proveedores.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("")}
                    </select>

                    <button class="btn-ascender">Guardar</button>
                </div>
            </div>
        `}).join("") || `<p style="padding:10px;">No se encontraron usuarios.</p>`;

        contenedor.querySelectorAll(".usuario-card").forEach(card => {
            const index = card.dataset.index;
            const selectRol = card.querySelector(".select-rol");
            const selectProveedor = card.querySelector(".select-proveedor-destino");
            selectRol.addEventListener("change", () => {
                if(selectRol.value === "Proveedor"){
                    selectProveedor.classList.remove("oculto");
                } else {
                    selectProveedor.classList.add("oculto");
                }
            });

            card.querySelector(".btn-ascender").addEventListener("click", () => {
                const nuevoRol = selectRol.value;

                if(!nuevoRol || nuevoRol === "Ascender a..."){
                    alert("Selecciona el nuevo rol para el usuario.");
                    return;
                }

                if(nuevoRol === "Proveedor"){
                    const proveedorId = selectProveedor.value;

                    if(!proveedorId || proveedorId === "Seleccionar proveedor"){
                        alert("Selecciona a qué proveedor pertenece este usuario.");
                        return;
                    }

                    usuarios[index].rol = nuevoRol;
                    usuarios[index].proveedorId = Number(proveedorId);
                } else {
                    usuarios[index].rol = nuevoRol;
                    delete usuarios[index].proveedorId;
                }

                renderLista(inputBuscar.value.trim());
            });
        });
    }

    renderLista(filtro);

    inputBuscar.addEventListener("input", () => {
        renderLista(inputBuscar.value.trim());
    });

    btnBuscar.addEventListener("click", () => {
        renderLista(inputBuscar.value.trim());
    });

    inputBuscar.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            renderLista(inputBuscar.value.trim());
        }
    });
}

vistaProveedores();