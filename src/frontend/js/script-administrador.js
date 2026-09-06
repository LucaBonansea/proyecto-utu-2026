const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");
const proveedoresbtn = document.querySelector(".proveedores-btn");
const usuariosbtn = document.querySelector(".usuarios-btn");
const botones = document.querySelectorAll(".sidebar-btn");
const edificiosbtn = document.querySelector(".edificios-btn");


botones.forEach(boton => {

    boton.addEventListener("click", () => {

        botones.forEach(item =>
            item.classList.remove("active")
        );

        boton.classList.add("active");

    });

});


function quitarTildes(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}



let edificios = [];
let usuarios = [];
let proveedores = [];
let filtroEstadoProveedor = "todos";


// ==========================================
// CARGAR EDIFICIOS DESDE LA BD
// ==========================================

async function cargarEdificios() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/edificios",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Error al obtener los edificios");
        }

        const data = await response.json();

        console.log("Edificios cargados desde la BD:", data);

        edificios = data;

    } catch (error) {

        console.error(
            "Error al cargar edificios:",
            error
        );

        edificios = [];

        alert("No se pudieron cargar los edificios.");
    }
}
async function cargarUsuarios() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/usuarios",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();

        console.log("Usuarios cargados desde la BD:", data);

        usuarios = data;

    } catch (error) {

        console.error(
            "Error al cargar usuarios:",
            error
        );

        usuarios = [];

        alert("No se pudieron cargar los usuarios.");
    }
}

async function cargarProveedores() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/proveedores",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Error al obtener los proveedores");
        }

        const data = await response.json();

        console.log(
            "Proveedores cargados desde la BD:",
            data
        );

        proveedores = data;

    } catch (error) {

        console.error(
            "Error al cargar proveedores:",
            error
        );

        proveedores = [];

        alert(
            "No se pudieron cargar los proveedores."
        );

    }
}

// ==========================================
// INICIAR APLICACIÓN
// ==========================================



async function iniciarAplicacion() {

    await cargarEdificios();

    await cargarUsuarios();

    await cargarProveedores();

    vistaProveedores();

}


iniciarAplicacion();



// ==========================================
// EVENTOS SIDEBAR
// ==========================================

proveedoresbtn.addEventListener(
    "click",
    vistaProveedores
);

edificiosbtn.addEventListener(
    "click",
    vistaEdificios
);

usuariosbtn.addEventListener(
    "click",
    () => vistaUsuarios()
);



function vistaProveedores(){
    section.style.display = "grid";
    filtro_container.innerHTML = "";
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
            <div class="filtro-estado-proveedores">

                <button class="filtro-estado-btn" data-estado="todos">
                    Todos
                </button>

                <button class="filtro-estado-btn" data-estado="Activo">
                    Activos
                </button>

                <button class="filtro-estado-btn" data-estado="Inactivo">
                    Desactivados
                </button>

            </div>


          

            <div class="form-proveedor oculto">

                <div class="form-proveedor-grid">

                    <div class="campo-proveedor">
                        <label>Nombre comercial</label>
                        <input
                            class="nombre-proveedor"
                            type="text"
                            placeholder="Ej. SERVIAM"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Razón social</label>
                        <input
                            class="razon-social-proveedor"
                            type="text"
                            placeholder="Ej. SERVIAM S.R.L."
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>RUT</label>
                        <input
                            class="rut-proveedor"
                            type="text"
                            placeholder="Ej. 21-100342-001-7"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Teléfono de la empresa</label>
                        <input
                            class="telefono-proveedor"
                            type="text"
                            placeholder="Ej. 4342 5678"
                        >
                    </div>

                    <div class="campo-proveedor campo-completo">
                        <label>Dirección</label>
                        <input
                            class="direccion-proveedor"
                            type="text"
                            placeholder="Dirección de la empresa"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Correo electrónico</label>
                        <input
                            class="email-proveedor"
                            type="email"
                            placeholder="Correo de la empresa"
                        >
                    </div>


                    <div class="campo-proveedor">
                        <label>Contacto responsable</label>
                        <input
                            class="contacto-responsable-proveedor"
                            type="text"
                            placeholder="Nombre del responsable"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Teléfono del contacto</label>
                        <input
                            class="telefono-contacto-proveedor"
                            type="text"
                            placeholder="Teléfono del responsable"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Correo del contacto</label>
                        <input
                            class="email-contacto-proveedor"
                            type="email"
                            placeholder="Correo del responsable"
                        >
                    </div>

                </div>


                <div class="acciones-form-proveedor">

                    <button class="cancelar-proveedor">
                        Cancelar
                    </button>

                    <button class="guardar-proveedor">
                        Guardar proveedor
                    </button>

                </div>

            </div>



            <div class="contenedor-proveedores">

                ${
                    proveedores
                        .filter(p =>
                            filtroEstadoProveedor === "todos" ||
                            p.estado === filtroEstadoProveedor
                        )
                        .map(renderCardProveedor)
                        .join("")
                }

            </div>

        </div>
    `;

    document
        .querySelectorAll(".filtro-estado-btn")
        .forEach(boton => {

            if (boton.dataset.estado === filtroEstadoProveedor) {
                boton.classList.add("activo");
            }

            boton.addEventListener("click", () => {

                filtroEstadoProveedor = boton.dataset.estado;

                vistaProveedores();

        });

    });
    const btnAgregar =
        document.querySelector(".btn-agregar-proveedor");

    const formulario =
        document.querySelector(".form-proveedor");

    const btnGuardar =
        document.querySelector(".guardar-proveedor");

    const btnCancelar =
        document.querySelector(".cancelar-proveedor");


    const nombreInput =
        document.querySelector(".nombre-proveedor");

    const razonSocialInput =
        document.querySelector(".razon-social-proveedor");

    const rutInput =
        document.querySelector(".rut-proveedor");

    const telefonoInput =
        document.querySelector(".telefono-proveedor");

    const direccionInput =
        document.querySelector(".direccion-proveedor");

    const emailInput =
        document.querySelector(".email-proveedor");

    const contactoInput =
        document.querySelector(".contacto-responsable-proveedor");

    const telefonoContactoInput =
        document.querySelector(".telefono-contacto-proveedor");

    const emailContactoInput =
        document.querySelector(".email-contacto-proveedor");



    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });



    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

    });



    btnGuardar.addEventListener("click", async () => {

        const nombre =
            nombreInput.value.trim();

        const razonSocial =
            razonSocialInput.value.trim();

        const RUT =
            rutInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const direccion =
            direccionInput.value.trim();

        const email =
            emailInput.value.trim();

        const contactoResponsable =
            contactoInput.value.trim();

        const telefonoContacto =
            telefonoContactoInput.value.trim();

        const emailContacto =
            emailContactoInput.value.trim();


        if (
            nombre === "" ||
            razonSocial === "" ||
            RUT === "" ||
            telefono === "" ||
            direccion === "" ||
            email === "" ||
            contactoResponsable === "" ||
            telefonoContacto === "" ||
            emailContacto === ""
        ) {

            alert("Completa todos los campos");

            return;

        }


        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";


            const response = await fetch(
                "http://127.0.0.1:8000/api/proveedores",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify({

                        nombre: nombre,
                        razon_social: razonSocial,
                        rut: RUT,
                        telefono: telefono,
                        direccion: direccion,
                        email: email,
                        contacto_responsable: contactoResponsable,
                        telefono_contacto: telefonoContacto,
                        email_contacto: emailContacto

                    })
                }
            );


            const data = await response.json();


            console.log("STATUS:", response.status);
            console.log("RESPUESTA:", data);


            if (!response.ok) {

                alert(
                    data.message ||
                    "Error al crear el proveedor."
                );

                return;
            }


            alert("Proveedor agregado correctamente.");


            formulario.classList.add("oculto");


            // Volver a cargar desde la BD

            await cargarProveedores();

            vistaProveedores();


        } catch (error) {

            console.error(
                "Error al crear proveedor:",
                error
            );

            alert(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar proveedor";

        }

    });
    document
        .querySelectorAll(".btn-detalle-proveedor")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const id =
                    Number(boton.dataset.id);

                vistaDetalleProveedor(id);

            });


        });
    
        document
        .querySelectorAll(".btn-toggle-estado-proveedor")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const id = Number(boton.dataset.id);

                cambiarEstadoProveedor(id);

            });

        });

}


function renderCardProveedor(p){

    const usuariosDelProveedor =
        usuarios.filter(
            u =>
                u.rol === "usuario_proveedor" &&
                u.proveedor &&
                Number(u.proveedor.id) === Number(p.id)
        );

    const esActivo = p.estado === "Activo";

    return `

        <div class="proveedor-card ${esActivo ? "" : "proveedor-inactivo"}">

            <div class="proveedor-card-top">

                <div>

                    <h3>${p.nombre}</h3>

                    <span class="proveedor-razon-social">
                        ${p.razon_social}
                    </span>

                </div>


                <span class="proveedor-estado ${esActivo ? "estado-activo" : "estado-inactivo"}">
                    ${p.estado}
                </span>

            </div>


            <div class="proveedor-info-resumen">

                <p>
                    <strong>RUT:</strong>
                    ${p.rut}
                </p>

                <p>
                    <strong>Contacto:</strong>
                    ${p.contacto_responsable}
                </p>

                <p>
                    <strong>Usuarios:</strong>
                    ${usuariosDelProveedor.length}
                </p>

            </div>


            <div class="proveedor-card-acciones">

                <button class="btn-detalle-proveedor" data-id="${p.id}">
                    Ver detalles →
                </button>

                <button
                    class="btn-toggle-estado-proveedor"
                    data-id="${p.id}"
                >
                    ${esActivo ? "Desactivar" : "Activar"}
                </button>

            </div>

        </div>

    `;

}
async function cambiarEstadoProveedor(id) {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/proveedores/${id}/estado`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPUESTA:", data);

        if (!response.ok) {
            alert(
                data.message ||
                "No se pudo actualizar el estado."
            );
            return;
        }

        await cargarProveedores();

        vistaProveedores();

    } catch (error) {

        console.error(
            "Error al cambiar estado del proveedor:",
            error
        );

        alert("No se pudo conectar con el servidor.");

    }

}


function vistaDetalleProveedor(id){

    const proveedor =
        proveedores.find(p => p.id === id);

    if(!proveedor) return;


    // ✅ corregido
    const usuariosDelProveedor =
    usuarios.filter(
        u =>
            u.rol === "usuario_proveedor" &&
            u.proveedor &&
            Number(u.proveedor.id) === Number(id)
    );


    section.innerHTML = `

        <div class="lista-proveedores">

            <button class="btn-volver-proveedores">
                ← Volver a Proveedores
            </button>


            <div class="titulo-proveedores">

                <div>
                    <h2>${proveedor.nombre}</h2>
                    <span class="proveedor-razon-social">
                        ${proveedor.razon_social}
                    </span>
                </div>

                

            </div>


            

            <div class="proveedor-detalle-info">

                <h3>Datos de la empresa</h3>

                <div class="detalle-proveedor-grid">

                    <p>
                        <strong>RUT</strong>
                        ${proveedor.rut}
                    </p>

                    <p>
                        <strong>Teléfono</strong>
                        ${proveedor.telefono}
                    </p>

                    <p>
                        <strong>Correo</strong>
                        ${proveedor.email}
                    </p>

                    <p>
                        <strong>Dirección</strong>
                        ${proveedor.direccion}
                    </p>

                    <p>
                        <strong>Contacto responsable</strong>
                        ${proveedor.contacto_responsable}
                    </p>

                    <p>
                        <strong>Teléfono del contacto</strong>
                        ${proveedor.telefono_contacto}
                    </p>

                    <p>
                        <strong>Correo del contacto</strong>
                        ${proveedor.email_contacto}
                    </p>

                    <p>
                        <strong>Estado</strong>
                        ${proveedor.estado}
                    </p>

                </div>

            </div>

            <h3 class="proveedor-detalle-subtitulo">
                Usuarios de proveedor
            </h3>


            <div class="contenedor-usuarios">

                ${
                    usuariosDelProveedor.length > 0

                    ?

                    usuariosDelProveedor.map(u => `

                        <div class="usuario-card">

                            <div class="usuario-info">

                                <h3>${u.nombre}</h3>

                                <p>
                                    Tel: ${u.telefono}
                                </p>

                                ${
                                    u.email
                                    ?
                                    `<p>Email: ${u.email}</p>`
                                    :
                                    ""
                                }

                                <span class="usuario-rol-actual">
                                    Usuario de proveedor
                                </span>

                            </div>

                        </div>

                    `).join("")

                    :

                    `
                        <p style="padding:10px;">
                            Este proveedor todavía no tiene
                            usuarios asignados.
                        </p>
                    `
                }

            </div>

        </div>

    `;


    document
        .querySelector(".btn-volver-proveedores")
        .addEventListener(
            "click",
            vistaProveedores
        );

}

function vistaEdificios(){

    section.style.display = "grid";
    filtro_container.innerHTML = "";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";

    section.innerHTML = `

        <div class="lista-edificios">

            <div class="titulo-edificios">

                <h2>Edificios</h2>

                <button class="btn-agregar-edificio">
                    <span class="material-symbols-outlined">add</span>
                    Agregar edificio
                </button>

            </div>



            <div class="form-edificio oculto">

                <div class="form-edificio-grid">

                    <div class="campo-edificio campo-edificio-completo">

                        <label>Nombre del edificio</label>

                        <input
                            class="nombre-edificio"
                            type="text"
                            placeholder="Ej. Edificio Central de la Intendencia"
                        >

                    </div>


                    <div class="campo-edificio campo-edificio-completo">

                        <label>Dirección</label>

                        <input
                            class="direccion-edificio"
                            type="text"
                            placeholder="Ej. 18 de Julio 1825, San José"
                        >

                    </div>

                </div>


                <div class="acciones-form-edificio">

                    <button class="cancelar-edificio">
                        Cancelar
                    </button>

                    <button class="guardar-edificio">
                        Guardar edificio
                    </button>

                </div>

            </div>


            <div class="contenedor-edificios">

                ${edificios.map(renderCardEdificio).join("")}

            </div>

        </div>

    `;


    const btnAgregar =
        document.querySelector(".btn-agregar-edificio");

    const formulario =
        document.querySelector(".form-edificio");

    const btnGuardar =
        document.querySelector(".guardar-edificio");

    const btnCancelar =
        document.querySelector(".cancelar-edificio");

    const nombreInput =
        document.querySelector(".nombre-edificio");

    const direccionInput =
        document.querySelector(".direccion-edificio");

    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });

    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

    });

    btnGuardar.addEventListener("click", async () => {

        const nombre =
            nombreInput.value.trim();

        const direccion =
            direccionInput.value.trim();


        if (nombre === "" || direccion === "") {

            alert("Completa todos los campos.");

            return;
        }


        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";


            const response = await fetch(
                "http://127.0.0.1:8000/api/edificios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify({
                        nombre: nombre,
                        direccion: direccion
                    })
                }
            );


            const data = await response.json();


            console.log("STATUS:", response.status);
            console.log("RESPUESTA:", data);


            if (!response.ok) {

                alert(
                    data.message ||
                    "Error al crear el edificio."
                );

                return;
            }


            alert("Edificio agregado correctamente.");


            formulario.classList.add("oculto");


            nombreInput.value = "";
            direccionInput.value = "";


            // Volver a cargar desde la BD

            await cargarEdificios();

            vistaEdificios();


        } catch (error) {

            console.error(
                "Error al crear edificio:",
                error
            );

            alert(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar edificio";

        }

    });

    document
    .querySelectorAll(".btn-detalle-edificio")
    .forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            vistaDetalleEdificio(id);

        });

    });


}
function renderCardEdificio(edificio){

    return `
        <div class="edificio-card">

            <div class="edificio-card-header">

                <div class="edificio-icono-div">
                    <span class="material-symbols-outlined">
                        home_work
                    </span>
                </div>

                <div>
                    <h3>${edificio.nombre}</h3>
                </div>

            </div>

            <div class="edificio-info">

                <p>
                    <strong>Dirección:</strong>
                    ${edificio.direccion}
                </p>

                <p>
                    <strong>ID del edificio:</strong>
                    ${edificio.id}
                </p>

            </div>

            <button
                class="btn-detalle-edificio"
                data-id="${edificio.id}">
                Ver detalles →
            </button>

        </div>
    `;
}

function vistaDetalleEdificio(id) {

    // ==========================================
    // BUSCAR EDIFICIO
    // ==========================================

    const edificio = edificios.find(
        e => Number(e.id) === Number(id)
    );

    if (!edificio) {
        console.error(
            "No se encontró el edificio:",
            id
        );

        return;
    }


    // ==========================================
    // BUSCAR USUARIOS DEL EDIFICIO
    // ==========================================

    /*
     * IMPORTANTE:
     *
     * Ya NO usamos:
     *
     * u.edificioId === id
     *
     * porque los usuarios vienen desde Laravel
     * con una propiedad:
     *
     * u.edificios
     *
     * Ejemplo:
     *
     * {
     *     cedula: "12345678",
     *     nombre: "Juan Pérez",
     *     rol: "Usuario de edificio",
     *     edificios: [
     *         {
     *             id: 1,
     *             nombre: "Edificio Administrativo"
     *         }
     *     ]
     * }
     */


    const usuariosDelEdificio =
        usuarios.filter(usuario => {

            // Primero verificamos que sea
            // usuario de edificio

            if (
                usuario.rol !==
                "usuario_edificio"
            ) {
                return false;
            }


            // Verificamos que tenga edificios

            if (
                !Array.isArray(usuario.edificios)
            ) {
                return false;
            }


            // Buscamos el edificio dentro
            // de los edificios del usuario

            return usuario.edificios.some(
                edificioUsuario =>
                    Number(edificioUsuario.id) ===
                    Number(id)
            );

        });


    console.log(
        "Edificio seleccionado:",
        edificio
    );

    console.log(
        "Usuarios de este edificio:",
        usuariosDelEdificio
    );


    // ==========================================
    // CONFIGURAR SECCIÓN
    // ==========================================

    section.style.display = "grid";

    filtro_container.innerHTML = "";

    section.style.gridTemplateColumns =
        "repeat(1, 1fr)";


    // ==========================================
    // HTML
    // ==========================================

    section.innerHTML = `

        <div class="lista-edificios">


            <!-- =================================
                 VOLVER
            ================================== -->

            <button class="btn-volver-edificios">

                ← Volver a Edificios

            </button>


            <!-- =================================
                 TITULO
            ================================== -->

            <div class="titulo-edificios">

                <div>

                    <h2>
                        ${edificio.nombre}
                    </h2>

                    <p class="subtitulo-edificios">
                        Información del edificio
                    </p>

                </div>

            </div>


            <!-- =================================
                 INFORMACIÓN DEL EDIFICIO
            ================================== -->

            <div class="edificio-detalle-info">

                <h3>
                    Datos del edificio
                </h3>


                <div class="detalle-edificio-grid">


                    <p>

                        <strong>
                            Nombre
                        </strong>

                        ${edificio.nombre}

                    </p>


                    <p>

                        <strong>
                            ID del edificio
                        </strong>

                        ${edificio.id}

                    </p>


                    <p>

                        <strong>
                            Dirección
                        </strong>

                        ${edificio.direccion}

                    </p>


                </div>

            </div>


            <!-- =================================
                 USUARIOS
            ================================== -->

            <h3 class="edificio-detalle-subtitulo">

                Usuarios del edificio

            </h3>


            <div class="contenedor-usuarios-edificio">


                ${
                    usuariosDelEdificio.length > 0

                    ?

                    usuariosDelEdificio.map(usuario => `

                        <div
                            class="usuario-card"
                        >


                            <div class="usuario-info">


                                <h3>
                                    ${usuario.nombre}
                                </h3>


                                <p>

                                    Cédula:
                                    ${usuario.cedula}

                                </p>


                                <p>

                                    Tel:
                                    ${
                                        usuario.telefono
                                        ||
                                        "Sin teléfono"
                                    }

                                </p>


                                ${
                                    usuario.email

                                    ?

                                    `
                                    <p>

                                        Email:
                                        ${usuario.email}

                                    </p>
                                    `

                                    :

                                    ""
                                }


                                <span
                                    class="usuario-rol-actual"
                                >

                                    Usuario de edificio

                                </span>


                            </div>


                        </div>

                    `).join("")


                    :

                    `

                    <p class="sin-usuarios">

                        Este edificio todavía no tiene
                        usuarios asignados.

                    </p>

                    `

                }


            </div>


        </div>

    `;


    // ==========================================
    // BOTÓN VOLVER
    // ==========================================

    const btnVolver =
        document.querySelector(
            ".btn-volver-edificios"
        );


    if (btnVolver) {

        btnVolver.addEventListener(
            "click",
            () => {

                vistaEdificios();

            }
        );

    }

}


function vistaUsuarios(filtro = "") {

    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    filtro_container.innerHTML = "";

    section.innerHTML = `
        <div class="lista-usuarios">

            <div class="titulo-usuarios">

                <div>
                    <h2>Usuarios</h2>

                    <p class="subtitulo-usuarios">
                        Gestiona los usuarios y sus asociaciones.
                    </p>
                </div>

                <button class="btn-agregar-usuario">
                    <span class="material-symbols-outlined">add</span>
                    Agregar usuario
                </button>

            </div>


            <!-- ==============================
                 FORMULARIO AGREGAR USUARIO
            =============================== -->

            <div class="form-usuario oculto">

                <div class="form-usuario-grid">

                    <div class="campo-usuario">

                        <label>Cédula</label>

                        <input
                            class="cedula-usuario"
                            type="text"
                            placeholder="Ej. 12345678"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Nombre completo</label>

                        <input
                            class="nombre-usuario"
                            type="text"
                            placeholder="Ej. Juan Pérez"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Teléfono</label>

                        <input
                            class="telefono-usuario"
                            type="text"
                            placeholder="Ej. 098 123 456"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Correo electrónico</label>

                        <input
                            class="email-usuario"
                            type="email"
                            placeholder="Ej. usuario@gmail.com"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Contraseña</label>

                        <input
                            class="password-usuario"
                            type="password"
                            placeholder="Contraseña"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Tipo de usuario</label>

                        <select class="rol-usuario">

                            <option value="" selected disabled>
                                Seleccionar tipo de usuario
                            </option>

                            <option value="usuario_edificio">
                                Usuario de edificio
                            </option>

                            <option value="usuario_proveedor">
                                Usuario de proveedor
                            </option>

                            <option value="administrativo">
                                Administrativo
                            </option>

                            <option value="administrador">
                                Administrador
                            </option>


                        </select>

                    </div>


                    <!-- ==============================
                         EDIFICIO
                    =============================== -->

                    <div class="campo-usuario campo-asociacion oculto">

                        <label>Edificio</label>

                        <select class="edificio-usuario">

                            <option value="" selected disabled>
                                Seleccionar edificio
                            </option>

                            ${
                                edificios.map(e => `
                                    <option value="${e.id}">
                                        ${e.nombre}
                                    </option>
                                `).join("")
                            }

                        </select>

                    </div>


                    <!-- ==============================
                         PROVEEDOR
                    =============================== -->

                    <div class="campo-usuario campo-proveedor-usuario oculto">

                        <label>Proveedor</label>

                        <select class="proveedor-usuario">

                            <option value="" selected disabled>
                                Seleccionar proveedor
                            </option>

                            ${
                                proveedores.map(p => `
                                    <option value="${p.id}">
                                        ${p.nombre}
                                    </option>
                                `).join("")
                            }

                        </select>

                    </div>

                </div>


                <div class="acciones-form-usuario">

                    <button class="cancelar-usuario">
                        Cancelar
                    </button>

                    <button class="guardar-usuario">
                        Guardar usuario
                    </button>

                </div>

            </div>


            <!-- ==============================
                 BUSCADOR
            =============================== -->

            <div class="buscador-usuarios">

                <input
                    class="input-buscar-usuario"
                    type="text"
                    placeholder="Buscar por nombre, teléfono o cédula"
                    value="${filtro}"
                >

                <button class="btn-buscar-usuario">

                    <span class="material-symbols-outlined">
                        search
                    </span>

                    Buscar

                </button>

            </div>


            <!-- ==============================
                 LISTADO
            =============================== -->

            <div class="contenedor-usuarios"></div>

        </div>
    `;


    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================

    const cedulaInput =
        document.querySelector(".cedula-usuario");

    const nombreInput =
        document.querySelector(".nombre-usuario");

    const telefonoInput =
        document.querySelector(".telefono-usuario");

    const emailInput =
        document.querySelector(".email-usuario");

    const passwordInput =
        document.querySelector(".password-usuario");

    const rolSelect =
        document.querySelector(".rol-usuario");

    const edificioSelect =
        document.querySelector(".edificio-usuario");

    const proveedorSelect =
        document.querySelector(".proveedor-usuario");

    const campoEdificio =
        document.querySelector(".campo-asociacion");

    const campoProveedor =
        document.querySelector(".campo-proveedor-usuario");

    const btnAgregar =
        document.querySelector(".btn-agregar-usuario");

    const formulario =
        document.querySelector(".form-usuario");

    const btnCancelar =
        document.querySelector(".cancelar-usuario");

    const btnGuardar =
        document.querySelector(".guardar-usuario");

    const inputBuscar =
        document.querySelector(".input-buscar-usuario");

    const btnBuscar =
        document.querySelector(".btn-buscar-usuario");

    const contenedor =
        document.querySelector(".contenedor-usuarios");


    // ==========================================
    // MOSTRAR FORMULARIO
    // ==========================================

    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });


    // ==========================================
    // CANCELAR
    // ==========================================

    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

        cedulaInput.value = "";
        nombreInput.value = "";
        telefonoInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        rolSelect.selectedIndex = 0;
        edificioSelect.selectedIndex = 0;
        proveedorSelect.selectedIndex = 0;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

    });


    // ==========================================
    // CAMBIAR TIPO DE USUARIO
    // ==========================================

    rolSelect.addEventListener("change", () => {

        const rol = rolSelect.value;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

        edificioSelect.value = "";
        proveedorSelect.value = "";


        if (rol === "usuario_edificio") {

            campoEdificio.classList.remove("oculto");

        }

        if (rol === "usuario_proveedor") {

            campoProveedor.classList.remove("oculto");

        }



    });


    // ==========================================
    // GUARDAR NUEVO USUARIO
    // ==========================================

    btnGuardar.addEventListener("click", async () => {

        const cedula =
            cedulaInput.value.trim();

        const nombre =
            nombreInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        const rol =
            rolSelect.value;


        // ======================================
        // VALIDACIONES
        // ======================================

        if (
            cedula === "" ||
            nombre === "" ||
            password === "" ||
            !rol
        ) {

            alert("Completa los campos obligatorios.");

            return;

        }


        // ======================================
        // VALIDAR EDIFICIO
        // ======================================

        if (rol === "usuario_edificio"){

            if (!edificioSelect.value) {

                alert(
                    "Selecciona el edificio al que pertenece el usuario."
                );

                return;

            }

        }


        // ======================================
        // VALIDAR PROVEEDOR
        // ======================================

        if (rol === "usuario_proveedor"){

            if (!proveedorSelect.value) {

                alert(
                    "Selecciona el proveedor al que pertenece el usuario."
                );

                return;

            }

        }


        // ======================================
        // DATOS PARA LARAVEL
        // ======================================

        const datos = {
            cedula: cedula,
            nombre: nombre,
            telefono: telefono,
            email: email,
            password: password,
            rol: rol
        };



        /*
         * IMPORTANTE:
         *
         * El backend actualmente recibe:
         *
         * edificio
         *
         * Por eso enviamos solamente eso.
         */

        if (rol === "usuario_edificio") {

            datos.edificio =
                Number(edificioSelect.value);

        }

        if (rol === "usuario_proveedor") {
            datos.proveedor = Number(proveedorSelect.value);
        }

        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";


            const response = await fetch(
                "http://127.0.0.1:8000/api/usuarios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(datos)

                }
            );


            const data =
                await response.json();


            console.log(
                "STATUS:",
                response.status
            );

            console.log(
                "RESPUESTA:",
                data
            );


            // ==================================
            // ERROR
            // ==================================

            if (!response.ok) {

                console.error(
                    "Error del servidor:",
                    data
                );

                alert(
                    data.message ||
                    "Error al crear el usuario."
                );

                return;

            }


            // ==================================
            // ÉXITO
            // ==================================

            alert(
                "Usuario agregado correctamente."
            );


            // ==================================
            // ACTUALIZAR ARRAY LOCAL
            // ==================================

            usuarios.push(data.usuario);


            // ==================================
            // LIMPIAR FORMULARIO
            // ==================================

            formulario.classList.add("oculto");

            cedulaInput.value = "";
            nombreInput.value = "";
            telefonoInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";

            rolSelect.selectedIndex = 0;
            edificioSelect.selectedIndex = 0;
            proveedorSelect.selectedIndex = 0;

            campoEdificio.classList.add("oculto");
            campoProveedor.classList.add("oculto");


            // ==================================
            // VOLVER A MOSTRAR LISTA
            // ==================================

            renderLista(
                inputBuscar.value.trim()
            );


        } catch (error) {

            console.error(
                "Error al crear usuario:",
                error
            );

            alert(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar usuario";

        }

    });


    // ==========================================
    // RENDERIZAR LISTA
    // ==========================================

    function renderLista(valorFiltro = "") {

        const filtroNormalizado =
            quitarTildes(
                valorFiltro.toLowerCase()
            );


        const usuariosFiltrados =
            valorFiltro

            ?

            usuarios.filter(u => {

                const nombre =
                    quitarTildes(
                        (u.nombre || "").toLowerCase()
                    );

                const telefono =
                    (u.telefono || "");

                const cedula =
                    (u.cedula || "");


                return (
                    nombre.includes(filtroNormalizado) ||
                    telefono.includes(valorFiltro) ||
                    cedula.includes(valorFiltro)
                );

            })

            :

            usuarios;


        // ======================================
        // NO HAY USUARIOS
        // ======================================

        if (!usuariosFiltrados.length) {

            contenedor.innerHTML = `
                <p class="sin-usuarios">
                    No se encontraron usuarios.
                </p>
            `;

            return;

        }


        // ======================================
        // CREAR CARDS
        // ======================================

        contenedor.innerHTML =
            usuariosFiltrados.map(usuario => {

                /*
                 * IMPORTANTE:
                 *
                 * Laravel devuelve:
                 *
                 * usuario.edificios
                 *
                 * y NO:
                 *
                 * usuario.edificioId
                 */

                const edificiosDelUsuario =
                    usuario.rol === "usuario_edificio"
                        ? (usuario.edificios || [])
                        : [];


                return `

                    <div
                        class="usuario-card"
                        data-cedula="${usuario.cedula}"
                    >

                        <div class="usuario-info">

                            <h3>
                                ${usuario.nombre}
                            </h3>


                            <p>
                                Cédula:
                                ${usuario.cedula}
                            </p>


                            <p>
                                Tel:
                                ${usuario.telefono || "Sin teléfono"}
                            </p>


                            ${
                                usuario.email
                                ?
                                `
                                <p>
                                    Email:
                                    ${usuario.email}
                                </p>
                                `
                                :
                                ""
                            }


                            <span class="usuario-rol-actual">
                                ${usuario.rol}
                            </span>


                            ${
                                edificiosDelUsuario.length > 0
                                ?

                                edificiosDelUsuario.map(edificio => `

                                    <span class="usuario-asociacion">

                                        Edificio:
                                        ${edificio.nombre}

                                    </span>

                                `).join("")

                                :

                                ""
                            }

                        </div>


                        <!-- ==========================
                             ACCIONES
                        =========================== -->

                        <div class="usuario-acciones">


                            <select class="select-rol slct-usr">

                                <option value="" selected disabled>
                                    Cambiar tipo...
                                </option>

                                <option value="usuario_edificio">
                                    Usuario de edificio
                                </option>

                                <option value="usuario_proveedor">
                                    Usuario de proveedor
                                </option>

                                <option value="administrativo">
                                    Administrativo
                                </option>

                            </select>


                            <!-- EDIFICIO -->

                            <select
                                class="select-edificio-cambio oculto slct-usr"
                            >

                                <option value="" selected disabled>
                                    Seleccionar edificio
                                </option>

                                ${
                                    edificios.map(e => `

                                        <option value="${e.id}">
                                            ${e.nombre}
                                        </option>

                                    `).join("")
                                }

                            </select>


                            <!-- PROVEEDOR -->

                            <select
                                class="select-proveedor-cambio oculto slct-usr"
                            >

                                <option value="" selected disabled>
                                    Seleccionar proveedor
                                </option>

                                ${
                                    proveedores.map(p => `

                                        <option value="${p.id}">
                                            ${p.nombre}
                                        </option>

                                    `).join("")
                                }

                            </select>


                            <button class="btn-guardar-cambio">

                                Guardar

                            </button>


                        </div>
                        <div class="cambiar-password-container">

                            <button class="btn-cambiar-password">
                                Cambiar contraseña
                            </button>

                            <div class="form-cambiar-password oculto">

                                <input
                                    class="nueva-password"
                                    type="password"
                                    placeholder="Nueva contraseña"
                                >

                                <input
                                    class="confirmar-password"
                                    type="password"
                                    placeholder="Repetir contraseña"
                                >

                                <div class="acciones-cambiar-password">

                                    <button class="cancelar-password">
                                        Cancelar
                                    </button>

                                    <button class="guardar-password">
                                        Guardar
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                `;

            }).join("");


        // ==========================================
        // EVENTOS DE CADA CARD
        // ==========================================

        contenedor
            .querySelectorAll(".usuario-card")
            .forEach(card => {
                                // ==================================
                // CAMBIAR CONTRASEÑA
                // ==================================

                const btnCambiarPassword =
                    card.querySelector(".btn-cambiar-password");

                const formPassword =
                    card.querySelector(".form-cambiar-password");

                const nuevaPasswordInput =
                    card.querySelector(".nueva-password");

                const confirmarPasswordInput =
                    card.querySelector(".confirmar-password");

                const btnCancelarPassword =
                    card.querySelector(".cancelar-password");

                const btnGuardarPassword =
                    card.querySelector(".guardar-password");


                btnCambiarPassword.addEventListener(
                    "click",
                    () => {
                        formPassword.classList.toggle("oculto");
                    }
                );


                btnCancelarPassword.addEventListener(
                    "click",
                    () => {
                        formPassword.classList.add("oculto");
                        nuevaPasswordInput.value = "";
                        confirmarPasswordInput.value = "";
                    }
                );


                btnGuardarPassword.addEventListener(
                    "click",
                    async () => {

                        const nuevaPassword =
                            nuevaPasswordInput.value.trim();

                        const confirmarPassword =
                            confirmarPasswordInput.value.trim();


                        if (
                            nuevaPassword === "" ||
                            confirmarPassword === ""
                        ) {
                            alert("Completa ambos campos.");
                            return;
                        }

                        if (nuevaPassword.length < 6) {
                            alert("La contraseña debe tener al menos 6 caracteres.");
                            return;
                        }

                        if (nuevaPassword !== confirmarPassword) {
                            alert("Las contraseñas no coinciden.");
                            return;
                        }


                        try {

                            btnGuardarPassword.disabled = true;
                            btnGuardarPassword.textContent = "Guardando...";

                            const response = await fetch(
                                `http://127.0.0.1:8000/api/usuarios/${usuario.cedula}/password`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },

                                    body: JSON.stringify({
                                        password: nuevaPassword
                                    })
                                }
                            );

                            const data = await response.json();

                            console.log("STATUS:", response.status);
                            console.log("RESPUESTA:", data);

                            if (!response.ok) {
                                alert(
                                    data.message ||
                                    "No se pudo actualizar la contraseña."
                                );
                                return;
                            }

                            alert("Contraseña actualizada correctamente.");

                            formPassword.classList.add("oculto");
                            nuevaPasswordInput.value = "";
                            confirmarPasswordInput.value = "";

                        } catch (error) {

                            console.error(
                                "Error al actualizar contraseña:",
                                error
                            );

                            alert("No se pudo conectar con el servidor.");

                        } finally {

                            btnGuardarPassword.disabled = false;
                            btnGuardarPassword.textContent = "Guardar";

                        }

                    }
                );
                const cedula =
                    card.dataset.cedula;


                const usuario =
                    usuarios.find(
                        u => String(u.cedula) === String(cedula)
                    );


                if (!usuario) return;


                const selectRol =
                    card.querySelector(".select-rol");

                const selectEdificio =
                    card.querySelector(
                        ".select-edificio-cambio"
                    );

                const selectProveedor =
                    card.querySelector(
                        ".select-proveedor-cambio"
                    );

                const btnGuardarCambio =
                    card.querySelector(
                        ".btn-guardar-cambio"
                    );

                // ==================================
                // CAMBIAR ROL
                // ==================================

                selectRol.addEventListener(
                    "change",
                    () => {

                        const nuevoRol =
                            selectRol.value;


                        selectEdificio.classList.add(
                            "oculto"
                        );

                        selectProveedor.classList.add(
                            "oculto"
                        );


                        // USUARIO DE EDIFICIO

                        if (
                            nuevoRol ===
                            "usuario_edificio"
                        ) {

                            selectEdificio.classList.remove(
                                "oculto"
                            );

                        }


                        // USUARIO DE PROVEEDOR

                        if (
                            nuevoRol ===
                            "usuario_proveedor"
                        ) {

                            selectProveedor.classList.remove(
                                "oculto"
                            );

                        }

                    }
                );


                // ==================================
                // GUARDAR CAMBIO DE ROL
                // ==================================

                btnGuardarCambio.addEventListener(
                    "click",
                    async () => {

                        const nuevoRol =
                            selectRol.value;


                        if (!nuevoRol) {

                            alert(
                                "Selecciona el nuevo tipo de usuario."
                            );

                            return;

                        }


                        // ==============================
                        // EDIFICIO
                        // ==============================

                        let edificio = null;

                        if (
                            nuevoRol === "usuario_edificio"
                        ) {

                            if (!selectEdificio.value) {

                                alert(
                                    "Selecciona el edificio."
                                );

                                return;

                            }

                            edificio = Number(
                                selectEdificio.value
                            );
                        }


                        // ==============================
                        // PROVEEDOR
                        // ==============================

                        let proveedor = null;

                        if (
                            nuevoRol === "usuario_proveedor"
                        ) {

                            if (!selectProveedor.value) {

                                alert(
                                    "Selecciona el proveedor."
                                );

                                return;

                            }

                            proveedor = Number(
                                selectProveedor.value
                            );

                        }



                        // ==============================
                        // ENVIAR A LARAVEL
                        // ==============================

                        try {

                            btnGuardarCambio.disabled =
                                true;

                            btnGuardarCambio.textContent =
                                "Guardando...";


                            const response =
                                await fetch(
                                    `http://127.0.0.1:8000/api/usuarios/${usuario.cedula}/rol`,
                                    {
                                        method: "PUT",

                                        headers: {
                                            "Content-Type":
                                                "application/json",

                                            "Accept":
                                                "application/json"
                                        },

                                        body: JSON.stringify({

                                            rol: nuevoRol,

                                            edificio: edificio,

                                            proveedor: proveedor

                                        })

                                    }
                                );


                            const data =
                                await response.json();


                            console.log(
                                "STATUS:",
                                response.status
                            );

                            console.log(
                                "RESPUESTA:",
                                data
                            );


                            if (!response.ok) {

                                alert(
                                    data.message ||
                                    "No se pudo actualizar el usuario."
                                );

                                return;

                            }


                            // ==========================
                            // ACTUALIZAR USUARIO LOCAL
                            // ==========================

                            const indice =
                                usuarios.findIndex(
                                    u =>
                                        String(u.cedula) ===
                                        String(usuario.cedula)
                                );


                            if (indice !== -1) {

                                usuarios[indice] =
                                    data.usuario;

                            }


                            alert(
                                "Usuario actualizado correctamente."
                            );


                            // ==========================
                            // RENDERIZAR NUEVAMENTE
                            // ==========================

                            renderLista(
                                inputBuscar.value.trim()
                            );


                        } catch (error) {

                            console.error(
                                "Error al actualizar usuario:",
                                error
                            );

                            alert(
                                "No se pudo conectar con el servidor."
                            );

                        } finally {

                            btnGuardarCambio.disabled =
                                false;

                            btnGuardarCambio.textContent =
                                "Guardar";

                        }

                    }
                );

            });

    }


    // ==========================================
    // PRIMER RENDER
    // ==========================================

    renderLista(filtro);


    // ==========================================
    // BUSCAR MIENTRAS ESCRIBE
    // ==========================================

    inputBuscar.addEventListener(
        "input",
        () => {

            renderLista(
                inputBuscar.value.trim()
            );

        }
    );


    // ==========================================
    // BOTÓN BUSCAR
    // ==========================================

    btnBuscar.addEventListener(
        "click",
        () => {

            renderLista(
                inputBuscar.value.trim()
            );

        }
    );


    // ==========================================
    // ENTER PARA BUSCAR
    // ==========================================

    inputBuscar.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Enter") {

                renderLista(
                    inputBuscar.value.trim()
                );

            }

        }
    );

}



