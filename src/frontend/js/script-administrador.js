const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");
const proveedoresbtn = document.querySelector(".proveedores-btn");
const usuariosbtn = document.querySelector(".usuarios-btn");
const botones = document.querySelectorAll(".sidebar-btn");
const edificiosbtn = document.querySelector(".edificios-btn");




botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(item => item.classList.remove("active"));
        boton.classList.add("active");
    });
});
function quitarTildes(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}



let proveedores = [
    {
        id: 1,
        nombre: "SERVIAM",
        razonSocial: "SERVIAM S.R.L.",
        RUT: "21-100342-001-7",
        direccion: "Av. Artigas 1450, San José",
        telefono: "4342 5678",
        email: "contacto@serviam.com.uy",
        contactoResponsable: "Carlos Rodríguez",
        telefonoContacto: "091 234 567",
        emailContacto: "carlos@serviam.com.uy",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "VIAMÁS",
        razonSocial: "VIAMÁS S.A.",
        RUT: "21-100342-002-5",
        direccion: "Calle Treinta y Tres 820, San José",
        telefono: "4342 7890",
        email: "contacto@viamas.com.uy",
        contactoResponsable: "María Fernández",
        telefonoContacto: "091 987 654",
        emailContacto: "maria@viamas.com.uy",
        estado: "Activo"
    },
    {
        id: 3,
        nombre: "MANTENIMIENTOS DEL SUR",
        razonSocial: "Mantenimientos del Sur S.R.L.",
        RUT: "21-100342-003-3",
        direccion: "Av. Lavalleja 1120, San José",
        telefono: "4342 3456",
        email: "contacto@mantenimientosur.com.uy",
        contactoResponsable: "Diego Martínez",
        telefonoContacto: "094 321 678",
        emailContacto: "diego@mantenimientosur.com.uy",
        estado: "Activo"
    },
    {
        id: 4,
        nombre: "ELECTROSAN",
        razonSocial: "Electrosan S.R.L.",
        RUT: "21-100342-004-1",
        direccion: "Ituzaingó 635, San José",
        telefono: "4342 6789",
        email: "contacto@electrosan.com.uy",
        contactoResponsable: "Fernando Silva",
        telefonoContacto: "098 456 321",
        emailContacto: "fernando@electrosan.com.uy",
        estado: "Activo"
    },
    {
        id: 5,
        nombre: "CONSTRUSJ",
        razonSocial: "Construcciones San José S.A.",
        RUT: "21-100342-005-0",
        direccion: "Ruta 3 km 92, San José",
        telefono: "4342 9012",
        email: "contacto@construsj.com.uy",
        contactoResponsable: "Andrés González",
        telefonoContacto: "092 654 987",
        emailContacto: "andres@construsj.com.uy",
        estado: "Activo"
    },
    {
        id: 6,
        nombre: "LIMPIEZAS SJ",
        razonSocial: "Servicios de Limpieza SJ S.R.L.",
        RUT: "21-100342-006-8",
        direccion: "Sarandí 480, San José",
        telefono: "4342 2345",
        email: "contacto@limpiezassj.com.uy",
        contactoResponsable: "Laura Pérez",
        telefonoContacto: "095 789 123",
        emailContacto: "laura@limpiezassj.com.uy",
        estado: "Activo"
    },
    {
        id: 7,
        nombre: "CLIMASUR",
        razonSocial: "Climasur Servicios S.R.L.",
        RUT: "21-100342-007-6",
        direccion: "Brasil 910, San José",
        telefono: "4342 4567",
        email: "contacto@climasur.com.uy",
        contactoResponsable: "Roberto López",
        telefonoContacto: "099 321 456",
        emailContacto: "roberto@climasur.com.uy",
        estado: "Activo"
    },
    {
        id: 8,
        nombre: "SEGURIDAD TOTAL",
        razonSocial: "Seguridad Total Uruguay S.A.",
        RUT: "21-100342-008-4",
        direccion: "Colón 725, San José",
        telefono: "4342 8123",
        email: "contacto@seguridadtotal.com.uy",
        contactoResponsable: "Pablo Suárez",
        telefonoContacto: "093 567 890",
        emailContacto: "pablo@seguridadtotal.com.uy",
        estado: "Activo"
    }
];

let areas = [
    { nombre: "Infraestructura", descripcion: "Bacheo, veredas, puentes y obra vial en general.", encargado: "María Sosa" },
    { nombre: "Tránsito", descripcion: "Semáforos, señalización y ordenamiento vehicular.", encargado: "Diego Ramos"}
];

let usuarios = [
    {
        telefono: "098 111 111",
        nombre: "Ana Pérez",
        email: "ana@email.com",
        rol: "Usuario de edificio",
        edificioId: 1
    },
    {
        telefono: "098 222 222",
        nombre: "Juan Gómez",
        email: "juan@email.com",
        rol: "Usuario de edificio",
        edificioId: 2
    },
    {
        telefono: "098 333 333",
        nombre: "Lucía Fernández",
        email: "lucia@comuna.com.uy",
        rol: "Administrativo"
    },
    {
        telefono: "098 444 444",
        nombre: "Roberto Díaz",
        email: "roberto@serviam.com.uy",
        rol: "Usuario de proveedor",
        proveedorId: 1
    },
    {
        telefono: "098 555 555",
        nombre: "Carla Núñez",
        email: "carla@serviam.com.uy",
        rol: "Usuario de proveedor",
        proveedorId: 1
    },
    {
        telefono: "098 666 666",
        nombre: "Pablo Silva",
        email: "pablo@viamas.com.uy",
        rol: "Usuario de proveedor",
        proveedorId: 2
    }
];


let edificios = [
    {
        id: 1,
        nombre: "Edificio Central de la Intendencia",
        direccion: "18 de Julio 1825, San José"
    },
    {
        id: 2,
        nombre: "Centro Cívico",
        direccion: "Av. Lavalleja 950, San José"
    },
    {
        id: 3,
        nombre: "Casa de la Cultura",
        direccion: "Ituzaingó 633, San José"
    },
    {
        id: 4,
        nombre: "Biblioteca Municipal",
        direccion: "Treinta y Tres 720, San José"
    },
    {
        id: 5,
        nombre: "Polideportivo Municipal",
        direccion: "Av. Manuel Oribe 1250, San José"
    },
    {
        id: 6,
        nombre: "Terminal de Ómnibus",
        direccion: "Av. Brasil 850, San José"
    }
];

let siguienteIdEdificio = 7;


let siguienteIdProveedor = 9;

vistaProveedores();
proveedoresbtn.addEventListener("click", vistaProveedores);
edificiosbtn.addEventListener("click", vistaEdificios);

usuariosbtn.addEventListener("click", () => vistaUsuarios());



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

                ${proveedores.map(renderCardProveedor).join("")}

            </div>

        </div>
    `;


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



    btnGuardar.addEventListener("click", () => {

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
        ){

            alert("Completa todos los campos");

            return;

        }


        proveedores.push({

            id: siguienteIdProveedor++,

            nombre,

            razonSocial,

            RUT,

            direccion,

            telefono,

            email,

            contactoResponsable,

            telefonoContacto,

            emailContacto,

            estado: "Activo"

        });


        vistaProveedores();

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

}



function renderCardProveedor(p){

    const usuariosDelProveedor =
        usuarios.filter(
            u =>
                u.rol === "Usuario de proveedor" &&
                u.proveedorId === p.id
        );


    return `

        <div class="proveedor-card">

            <div class="proveedor-card-top">

                <div>

                    <h3>${p.nombre}</h3>

                    <span class="proveedor-razon-social">
                        ${p.razonSocial}
                    </span>

                </div>


                <span class="proveedor-estado">
                    ${p.estado}
                </span>

            </div>


            <div class="proveedor-info-resumen">

                <p>
                    <strong>RUT:</strong>
                    ${p.RUT}
                </p>

                <p>
                    <strong>Contacto:</strong>
                    ${p.contactoResponsable}
                </p>

                <p>
                    <strong>Usuarios:</strong>
                    ${usuariosDelProveedor.length}
                </p>

            </div>


            <button class="btn-detalle-proveedor" data-id="${p.id}"> Ver detalles → </button>

        </div>

    `;

}



function vistaDetalleProveedor(id){

    const proveedor =
        proveedores.find(p => p.id === id);

    if(!proveedor) return;


    const usuariosDelProveedor =
        usuarios.filter(
            u =>
                u.rol === "Usuario de proveedor" &&
                u.proveedorId === id
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
                        ${proveedor.razonSocial}
                    </span>

                </div>

            </div>


            

            <div class="proveedor-detalle-info">

                <h3>Datos de la empresa</h3>

                <div class="detalle-proveedor-grid">

                    <p>
                        <strong>RUT</strong>
                        ${proveedor.RUT}
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
                        ${proveedor.contactoResponsable}
                    </p>

                    <p>
                        <strong>Teléfono del contacto</strong>
                        ${proveedor.telefonoContacto}
                    </p>

                    <p>
                        <strong>Correo del contacto</strong>
                        ${proveedor.emailContacto}
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

    btnGuardar.addEventListener("click", () => {

        const nombre =
            nombreInput.value.trim();

        const direccion =
            direccionInput.value.trim();


        if(nombre === "" || direccion === ""){

            alert("Completa todos los campos");

            return;

        }


        edificios.push({

            id: siguienteIdEdificio++,

            nombre,

            direccion

        });


        vistaEdificios();

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

    const edificio = edificios.find(
        e => e.id === id
    );

    if (!edificio) return;


    // Buscar usuarios pertenecientes a este edificio

    const usuariosDelEdificio = usuarios.filter(
        u =>
            u.rol === "Usuario de edificio" &&
            u.edificioId === id
    );


    section.style.display = "grid";
    filtro_container.innerHTML = "";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";


    section.innerHTML = `

        <div class="lista-edificios">

            <!-- VOLVER -->

            <button class="btn-volver-edificios">
                ← Volver a Edificios
            </button>


            <!-- TITULO -->

            <div class="titulo-edificios">

                <div>

                    <h2>${edificio.nombre}</h2>

                    <p class="subtitulo-edificios">
                        Información del edificio
                    </p>

                </div>

            </div>


            <!-- INFORMACIÓN DEL EDIFICIO -->

            <div class="edificio-detalle-info">

                <h3>Datos del edificio</h3>

                <div class="detalle-edificio-grid">

                    <p>
                        <strong>Nombre</strong>
                        ${edificio.nombre}
                    </p>

                    <p>
                        <strong>ID del edificio</strong>
                        ${edificio.id}
                    </p>

                    <p>
                        <strong>Dirección</strong>
                        ${edificio.direccion}
                    </p>

                </div>

            </div>


            <!-- USUARIOS -->

            <h3 class="edificio-detalle-subtitulo">
                Usuarios del edificio
            </h3>


            <div class="contenedor-usuarios-edificio">

                ${
                    usuariosDelEdificio.length > 0

                    ?

                    usuariosDelEdificio.map(u => `

                        <div class="usuario-card">

                            <div class="usuario-info">

                                <h3>
                                    ${u.nombre}
                                </h3>

                                <p>
                                    Tel: ${u.telefono}
                                </p>

                                ${
                                    u.email
                                    ?
                                    `
                                    <p>
                                        Email: ${u.email}
                                    </p>
                                    `
                                    :
                                    ""
                                }

                                <span class="usuario-rol-actual">
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


    // Botón volver

    document
        .querySelector(".btn-volver-edificios")
        .addEventListener(
            "click",
            vistaEdificios
        );

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


            <!-- FORMULARIO -->

            <div class="form-usuario oculto">

                <div class="form-usuario-grid">

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
                        <label>Tipo de usuario</label>

                        <select class="rol-usuario">
                            <option selected disabled>
                                Seleccionar tipo de usuario
                            </option>

                            <option value="Usuario de edificio">
                                Usuario de edificio
                            </option>

                            <option value="Usuario de proveedor">
                                Usuario de proveedor
                            </option>

                            <option value="Administrativo">
                                Administrativo
                            </option>
                        </select>
                    </div>


                    <!-- EDIFICIO -->

                    <div class="campo-usuario campo-asociacion oculto">

                        <label>Edificio</label>

                        <select class="edificio-usuario">

                            <option selected disabled>
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


                    <!-- PROVEEDOR -->

                    <div class="campo-usuario campo-proveedor-usuario oculto">

                        <label>Proveedor</label>

                        <select class="proveedor-usuario">

                            <option selected disabled>
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


            <!-- BUSCADOR -->

            <div class="buscador-usuarios">

                <input
                    class="input-buscar-usuario"
                    type="text"
                    placeholder="Buscar por nombre o teléfono"
                    value="${filtro}"
                >

                <button class="btn-buscar-usuario">

                    <span class="material-symbols-outlined">
                        search
                    </span>

                    Buscar

                </button>

            </div>


            <!-- LISTADO -->

            <div class="contenedor-usuarios"></div>

        </div>
    `;


    // ==============================
    // ELEMENTOS
    // ==============================

    const btnAgregar =
        document.querySelector(".btn-agregar-usuario");

    const formulario =
        document.querySelector(".form-usuario");

    const btnCancelar =
        document.querySelector(".cancelar-usuario");

    const btnGuardar =
        document.querySelector(".guardar-usuario");

    const nombreInput =
        document.querySelector(".nombre-usuario");

    const telefonoInput =
        document.querySelector(".telefono-usuario");

    const emailInput =
        document.querySelector(".email-usuario");

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

    const inputBuscar =
        document.querySelector(".input-buscar-usuario");

    const btnBuscar =
        document.querySelector(".btn-buscar-usuario");

    const contenedor =
        document.querySelector(".contenedor-usuarios");


    // ==============================
    // MOSTRAR FORMULARIO
    // ==============================

    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });


    // ==============================
    // CANCELAR
    // ==============================

    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

        nombreInput.value = "";
        telefonoInput.value = "";
        emailInput.value = "";

        rolSelect.selectedIndex = 0;
        edificioSelect.selectedIndex = 0;
        proveedorSelect.selectedIndex = 0;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

    });


    // ==============================
    // CAMBIAR TIPO DE USUARIO
    // ==============================

    rolSelect.addEventListener("change", () => {

        const rol = rolSelect.value;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

        if (rol === "Usuario de edificio") {

            campoEdificio.classList.remove("oculto");

        }

        if (rol === "Usuario de proveedor") {

            campoProveedor.classList.remove("oculto");

        }

    });


    // ==============================
    // GUARDAR USUARIO
    // ==============================

    btnGuardar.addEventListener("click", () => {

        const nombre =
            nombreInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const email =
            emailInput.value.trim();

        const rol =
            rolSelect.value;


        if (
            nombre === "" ||
            telefono === "" ||
            email === "" ||
            !rol ||
            rol === "Seleccionar tipo de usuario"
        ) {

            alert("Completa todos los campos.");

            return;

        }


        // Usuario de edificio

        if (rol === "Usuario de edificio") {

            if (
                !edificioSelect.value ||
                edificioSelect.value === "Seleccionar edificio"
            ) {

                alert("Selecciona el edificio al que pertenece el usuario.");

                return;

            }

        }


        // Usuario de proveedor

        if (rol === "Usuario de proveedor") {

            if (
                !proveedorSelect.value ||
                proveedorSelect.value === "Seleccionar proveedor"
            ) {

                alert("Selecciona el proveedor al que pertenece el usuario.");

                return;

            }

        }


        const nuevoUsuario = {

            nombre: nombre,

            telefono: telefono,

            email: email,

            rol: rol

        };


        // Asociar edificio

        if (rol === "Usuario de edificio") {

            nuevoUsuario.edificioId =
                Number(edificioSelect.value);

        }


        // Asociar proveedor

        if (rol === "Usuario de proveedor") {

            nuevoUsuario.proveedorId =
                Number(proveedorSelect.value);

        }


        usuarios.push(nuevoUsuario);


        alert("Usuario agregado correctamente.");

        vistaUsuarios();

    });


    // ==============================
    // RENDERIZAR USUARIOS
    // ==============================

    function renderLista(valorFiltro) {

        const filtroNormalizado =
            quitarTildes(valorFiltro.toLowerCase());


        const usuariosFiltrados =
            valorFiltro

            ? usuarios.filter(u =>
                quitarTildes(u.nombre.toLowerCase())
                    .includes(filtroNormalizado)
                ||
                u.telefono.includes(valorFiltro)
            )

            : usuarios;


        contenedor.innerHTML = usuariosFiltrados.map((u) => {

            const index =
                usuarios.indexOf(u);


            // Buscar edificio

            const edificioActual =
                u.rol === "Usuario de edificio" &&
                u.edificioId

                ? edificios.find(
                    e => e.id === u.edificioId
                )

                : null;


            // Buscar proveedor

            const proveedorActual =
                u.rol === "Usuario de proveedor" &&
                u.proveedorId

                ? proveedores.find(
                    p => p.id === u.proveedorId
                )

                : null;


            return `

                <div
                    class="usuario-card"
                    data-index="${index}"
                >

                    <div class="usuario-info">

                        <h3>
                            ${u.nombre}
                        </h3>

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
                            ${u.rol}
                        </span>


                        ${
                            edificioActual
                            ?
                            `
                            <span class="usuario-asociacion">
                                Edificio: ${edificioActual.nombre}
                            </span>
                            `
                            :
                            ""
                        }


                        ${
                            proveedorActual
                            ?
                            `
                            <span class="usuario-asociacion">
                                Proveedor: ${proveedorActual.nombre}
                            </span>
                            `
                            :
                            ""
                        }

                    </div>


                    <div class="usuario-acciones">

                        <select class="select-rol slct-usr">

                            <option selected disabled>
                                Cambiar tipo...
                            </option>

                            <option value="Usuario de edificio">
                                Usuario de edificio
                            </option>

                            <option value="Usuario de proveedor">
                                Usuario de proveedor
                            </option>

                            <option value="Administrativo">
                                Administrativo
                            </option>

                        </select>


                        <select class="select-edificio-cambio oculto slct-usr">

                            <option selected disabled>
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


                        <select class="select-proveedor-cambio oculto slct-usr">

                            <option selected disabled>
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

                </div>

            `;

        }).join("");


        if (!usuariosFiltrados.length) {

            contenedor.innerHTML = `
                <p class="sin-usuarios">
                    No se encontraron usuarios.
                </p>
            `;

            return;

        }


        // ==============================
        // EVENTOS DE CADA USUARIO
        // ==============================

        contenedor
            .querySelectorAll(".usuario-card")
            .forEach(card => {

                const index =
                    Number(card.dataset.index);


                const selectRol =
                    card.querySelector(".select-rol");

                const selectEdificio =
                    card.querySelector(".select-edificio-cambio");

                const selectProveedor =
                    card.querySelector(".select-proveedor-cambio");

                const btnGuardarCambio =
                    card.querySelector(".btn-guardar-cambio");


                // Cambiar rol

                selectRol.addEventListener("change", () => {

                    const nuevoRol =
                        selectRol.value;


                    selectEdificio.classList.add("oculto");
                    selectProveedor.classList.add("oculto");


                    if (
                        nuevoRol === "Usuario de edificio"
                    ) {

                        selectEdificio.classList.remove("oculto");

                    }


                    if (
                        nuevoRol === "Usuario de proveedor"
                    ) {

                        selectProveedor.classList.remove("oculto");

                    }

                });


                // Guardar cambio

                btnGuardarCambio.addEventListener(
                    "click",
                    () => {

                        const nuevoRol =
                            selectRol.value;


                        if (
                            !nuevoRol ||
                            nuevoRol === "Cambiar tipo..."
                        ) {

                            alert(
                                "Selecciona el nuevo tipo de usuario."
                            );

                            return;

                        }


                        // Cambiar a edificio

                        if (
                            nuevoRol === "Usuario de edificio"
                        ) {

                            if (!selectEdificio.value) {

                                alert(
                                    "Selecciona el edificio."
                                );

                                return;

                            }


                            usuarios[index].rol =
                                nuevoRol;

                            usuarios[index].edificioId =
                                Number(
                                    selectEdificio.value
                                );

                            delete usuarios[index].proveedorId;

                        }


                        // Cambiar a proveedor

                        else if (
                            nuevoRol === "Usuario de proveedor"
                        ) {

                            if (!selectProveedor.value) {

                                alert(
                                    "Selecciona el proveedor."
                                );

                                return;

                            }


                            usuarios[index].rol =
                                nuevoRol;

                            usuarios[index].proveedorId =
                                Number(
                                    selectProveedor.value
                                );

                            delete usuarios[index].edificioId;

                        }


                        // Cambiar a administrativo

                        else {

                            usuarios[index].rol =
                                "Administrativo";

                            delete usuarios[index].edificioId;
                            delete usuarios[index].proveedorId;

                        }


                        renderLista(
                            inputBuscar.value.trim()
                        );

                    }

                );

            });

    }


    // ==============================
    // BUSCADOR
    // ==============================

    renderLista(filtro);


    inputBuscar.addEventListener(
        "input",
        () => {

            renderLista(
                inputBuscar.value.trim()
            );

        }
    );


    btnBuscar.addEventListener(
        "click",
        () => {

            renderLista(
                inputBuscar.value.trim()
            );

        }
    );


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


