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
    { nombre: "SERVIAM", area: "Infraestructura" },
    { nombre: "VIAMÁS", area: "Tránsito" }
];

let areas = [
    { nombre: "Infraestructura", descripcion: "Bacheo, veredas, puentes y obra vial en general.", encargado: "María Sosa" },
    { nombre: "Tránsito", descripcion: "Semáforos, señalización y ordenamiento vehicular.", encargado: "Diego Ramos"}
];

let usuarios = [
    { telefono: "098 111 111", nombre: "Ana Pérez", rol: "Ciudadano" },
    { telefono: "098 222 222", nombre: "Juan Gómez", rol: "Ciudadano" },
    { telefono: "098 333 333", nombre: "Lucía Fernández", rol: "Administrativo" }
];

proveedoresbtn.addEventListener("click", vistaProveedores);
areasbtn.addEventListener("click", vistaAreas);
usuariosbtn.addEventListener("click", () => vistaUsuarios());

vistaProveedores();

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
                <button class="guardar-proveedor">Guardar proveedor</button>
            </div>

            <div class="contenedor-proveedores">
                ${proveedores.map(p => `
                    <div class="proveedor-card">
                        <h3>${p.nombre}</h3>
                        <p>Área: ${p.area}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    const btnAgregar = document.querySelector(".btn-agregar-proveedor");
    const formulario = document.querySelector(".form-proveedor");
    const btnGuardar = document.querySelector(".guardar-proveedor");
    const nombreInput = document.querySelector(".nombre-proveedor");
    const areaSelect = document.querySelector(".area-proveedor");

    btnAgregar.addEventListener("click", () => {
        formulario.classList.toggle("oculto");
    });

    btnGuardar.addEventListener("click", () => {
        const nombre = nombreInput.value.trim();
        const area = areaSelect.value;

        if(nombre === "" || !area || area === "Seleccionar área"){
            alert("Completa todos los campos");
            return;
        }

        
        proveedores.push({ nombre, area });
        vistaProveedores();
    });
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

function vistaUsuarios(filtro = ""){
    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    filtro_container.innerHTML = ``;

    const usuariosFiltrados = filtro
        ? usuarios.filter(u =>
            u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            u.telefono.includes(filtro))
        : usuarios;

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

            <div class="contenedor-usuarios">
                ${usuariosFiltrados.map((u, i) => `
                    <div class="usuario-card" data-index="${usuarios.indexOf(u)}">
                        <div class="usuario-info">
                            <h3>${u.nombre}</h3>
                            <p>Tel: ${u.telefono}</p>
                            <span class="usuario-rol-actual">${u.rol}</span>
                        </div>
                        <div class="usuario-acciones">
                            <select class="select-rol">
                                <option selected disabled>Ascender a...</option>
                                <option>Administrativo</option>
                                <option>Usuario de área</option>
                                <option>Proveedor</option>
                            </select>
                            <button class="btn-ascender">Guardar</button>
                        </div>
                    </div>
                `).join("") || `<p style="padding:10px;">No se encontraron usuarios.</p>`}
            </div>
        </div>
    `;

    const inputBuscar = document.querySelector(".input-buscar-usuario");
    const btnBuscar = document.querySelector(".btn-buscar-usuario");

    btnBuscar.addEventListener("click", () => {
        vistaUsuarios(inputBuscar.value.trim());
    });

    inputBuscar.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            vistaUsuarios(inputBuscar.value.trim());
        }
    });

    document.querySelectorAll(".usuario-card").forEach(card => {
        const index = card.dataset.index;

        card.querySelector(".btn-ascender").addEventListener("click", () => {
            const nuevoRol = card.querySelector(".select-rol").value;
            if(!nuevoRol || nuevoRol === "Ascender a..."){
                alert("Selecciona el nuevo rol para el usuario.");
                return;
            }
            
            usuarios[index].rol = nuevoRol;
            vistaUsuarios(inputBuscar.value.trim());
        });
    });
}