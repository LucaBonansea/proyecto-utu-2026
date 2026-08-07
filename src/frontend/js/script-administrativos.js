const botones = document.querySelectorAll(".sidebar-btn");
const section = document.querySelector("section")
const allreclamos = document.querySelector(".all-reclamos");
const btnreclamosvalidados = document.querySelector(".reclamos-validados")
const btnreclamosresueltos = document.querySelector(".reclamos-resueltos");
const main = document.querySelector("main");
const filtro_container = document.querySelector("#filtro-container");
const areasbtn = document.querySelector(".areas-btn");




firstview();
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(item => {
            item.classList.remove("active");
        });

        boton.classList.add("active");

    });
});





allreclamos.addEventListener("click", () => {
    firstview();
});



function firstview(){
    
    allreclamos.classList.add("active");
    section.style.gridTemplateColumns = "repeat(3, 1fr)";
    filtro_container.innerHTML =``;
    section.innerHTML =`
        <div class="primerdiv-reclamo">
            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">

                    <p class="reclamo-titulo" contenteditable="false">Vi este agujero en la calle arreglenlo rapido</p> 
                    <button class="camb-titulo">Cambiar titulo</button>
                    <p class="user-p" >Usuario: 098 999 999</p>
                    
                    <div class="estado">
                        Enviado
                        <button class="denegar">Denegar</button>
                    </div>
                    <p class="fecha">17/02/26 • Hace 2 dias</p>

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


            <div class="map"id="map">
            </div>


            <div class="enviar-area">

                <button class="btn-enviar-area">
                    <span class="material-symbols-outlined">
                        send
                    </span>
                    Enviar al área
                </button>

            </div>

                
        </div>
    
        
    
    `;

    const reclamos = document.querySelectorAll(".primerdiv-reclamo");
    reclamos.forEach(reclamo => {
        reclamo.style.flexDirection = "column";
    });

    document.querySelectorAll(".camb-titulo").forEach(btn => {

    const titulo = btn.previousElementSibling;

    btn.addEventListener("click", () => {

        if (titulo.contentEditable === "true") {
            // Guardar al tocar el botón otra vez
            guardarTitulo();

        } else {
            // Activar edición
            titulo.contentEditable = true;
            titulo.classList.add("editando");
            titulo.focus();

            titulo.style.background = "#f2f5fa";
            titulo.style.borderRadius = "8px";
            titulo.style.padding = "5px";

            btn.textContent = "Guardar titulo";
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

        titulo.style.background = "transparent";
        titulo.style.padding = "0";

        btn.textContent = "Cambiar titulo";

        titulo.blur();
    }

});


    const map = L.map('map', {
        zoomControl: false,
        attributionControl:false
    }).setView([-34.9011, -56.1645], 14);


    // Mapa moderno estilo claro
    L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom:19
        }
    ).addTo(map);


    // marcador del reclamo
    L.marker([-34.9011, -56.1645])
        .addTo(map)
        .bindPopup("Reclamo ciudadano");
    


}



btnreclamosvalidados.addEventListener("click", () => {
    secondview();
});

function secondview(){
    section.style.gridTemplateColumns = "repeat(3, 1fr)";
    filtro_container.innerHTML =`
        <div class="filtro-reclamos">

            <div class="filtro-titulo">
                <span class="material-symbols-outlined">
                    filter_alt
                </span>
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
                <span class="material-symbols-outlined">
                    search
                </span>
                Buscar
            </button>

        </div>
    `;
    section.innerHTML =`
    <div class="primerdiv-reclamo">
        <div class="segundodiv-reclamo">
            <div class="foto-reclamo">
                <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
            </div>

            <div class="info-reclamo">

                <p class="reclamo-titulo" contenteditable="false">Bache en la calle</p> 
                
                <p class="user-p" >Usuario: 098 999 999</p>
                
                <div class="estado">
                    Validado
                </div>
                <select class="select-area">
                    <option selected disabled>Seleccionar Proveedor</option>
                    <option>SERVIAM</option>
                    <option>VIAMÁS</option>
                    <option>METONO</option>
                    <option>Construcciones viales</option>
                
                </select>
                <p class="fecha">17/02/26 • Hace 2 dias</p>


            </div>
        </div>


        <div class="map"id="map1">
        </div>


        <div class="enviar-proveedor">

            <button class="btn-enviar-proveedor">
                <span class="material-symbols-outlined">
                    send
                </span>
                Enviar al Proveedor
            </button>

        

        </div>

        
    </div>

    <div class="primerdiv-reclamo">
        <div class="segundodiv-reclamo">
            <div class="foto-reclamo">
                <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
            </div>

            <div class="info-reclamo">

                <p class="reclamo-titulo" contenteditable="false">Bache en la calle</p> 
                
                <p class="user-p" >Usuario: 098 999 999</p>
                
                <div class="estado">
                    Validado
                </div>
                <select class="select-area">
                    <option selected disabled>Seleccionar Proveedor</option>
                    <option>SERVIAM</option>
                    <option>VIAMÁS</option>
                    <option>METONO</option>
                    <option>Construcciones viales</option>
                
                </select>
                <p class="fecha">17/02/26 • Hace 2 dias</p>


            </div>
        </div>


        <div class="map"id="map2">
        </div>


        <div class="enviar-proveedor">

            <button class="btn-enviar-proveedor">
                <span class="material-symbols-outlined">
                    send
                </span>
                Enviar al Proveedor
            </button>

        

        </div>

        
    </div>
    `;
    
    const reclamos = document.querySelectorAll(".primerdiv-reclamo");

    reclamos.forEach(reclamo => {
        reclamo.style.flexDirection = "column";
    });

    const map1 = L.map("map1", {
        zoomControl: false,
        attributionControl: false
    }).setView([-34.9011, -56.1645], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map1);

    L.marker([-34.9011, -56.1645]).addTo(map1);

    const map2 = L.map("map2", {
        zoomControl: false,
        attributionControl: false
    }).setView([-34.9011, -56.1645], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map2);

    L.marker([-34.9011, -56.1645]).addTo(map2);

    
};



btnreclamosresueltos.addEventListener("click", () => {
    console.log("Reclamos resueltos");
    thirdview();
});



function thirdview(){
    
    section.style.gridTemplateColumns = "repeat(2, 1fr)";
    
    filtro_container.innerHTML =`
     <div class="filtro-reclamos">

        <div class="filtro-titulo">
            <span class="material-symbols-outlined">
                filter_alt
            </span>
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
            <span class="material-symbols-outlined">
                search
            </span>
            Buscar
        </button>

    </div>
    `;

    
    section.innerHTML= `

    
    <div class="primerdiv-reclamo">
        <div class="mediodiv-reclamo">

            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">

                    <p class="reclamo-titulo" contenteditable="false">Bache en la calle</p> 
                    
                    <p class="user-p" >Usuario: 098 999 999</p>
                    
                    <div class="estado">
                        Validado
                    </div>
                    <select class="select-area">
                        <option selected disabled>Seleccionar Proveedor</option>
                        <option>SERVIAM</option>
                        <option>VIAMÁS</option>
                        <option>METONO</option>
                        <option>Construcciones viales</option>
                    
                    </select>
                    <p class="fecha">17/02/26 • Hace 2 dias</p>


                </div>
            </div>


            <div class="map"id="map1">
            </div>


            <div class="enviar-proveedor">

                <button class="btn-enviar-proveedor">
                    <span class="material-symbols-outlined">
                        send
                    </span>
                    Reclamo resuelto
                </button>

                <button class="btn-reclamo-no-aprobado">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                    No aprobado
                </button>
            </div>

        </div>

        <div class="fotoprueba">
            <img src="https://imgs.search.brave.com/UE_gsRzX1luujU8ZbhSJaYTVrZSKRsHAWAahM7A58Uc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/My8yMS8wMy8wMS9z/YW5pdGF0aW9uLXdv/cmtlci03MDgyMTc3/XzY0MC5qcGc" alt="">
        </div>
        
        
    </div>

    <div class="primerdiv-reclamo">
        <div class="mediodiv-reclamo">

            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">

                    <p class="reclamo-titulo" contenteditable="false">Bache en la calle</p> 
                    
                    <p class="user-p" >Usuario: 098 999 999</p>
                    
                    <div class="estado">
                        Validado
                    </div>
                    <select class="select-area">
                        <option selected disabled>Seleccionar Proveedor</option>
                        <option>SERVIAM</option>
                        <option>VIAMÁS</option>
                        <option>METONO</option>
                        <option>Construcciones viales</option>
                    
                    </select>
                    <p class="fecha">17/02/26 • Hace 2 dias</p>


                </div>
            </div>


            <div class="map"id="map2">
            </div>


            <div class="enviar-proveedor">

                <button class="btn-enviar-proveedor">
                    <span class="material-symbols-outlined">
                        send
                    </span>
                    Reclamo resuelto
                </button>

                <button class="btn-reclamo-no-aprobado">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                    No aprobado
                </button>
            </div>

        </div>

        <div class="fotoprueba">
            <img src="https://imgs.search.brave.com/UE_gsRzX1luujU8ZbhSJaYTVrZSKRsHAWAahM7A58Uc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/My8yMS8wMy8wMS9z/YW5pdGF0aW9uLXdv/cmtlci03MDgyMTc3/XzY0MC5qcGc" alt="">
        </div>
        
        
    </div>

     <div class="primerdiv-reclamo">
        <div class="mediodiv-reclamo">

            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">

                    <p class="reclamo-titulo" contenteditable="false">Bache en la calle</p> 
                    
                    <p class="user-p" >Usuario: 098 999 999</p>
                    
                    <div class="estado">
                        Validado
                    </div>
                    <select class="select-area">
                        <option selected disabled>Seleccionar Proveedor</option>
                        <option>SERVIAM</option>
                        <option>VIAMÁS</option>
                        <option>METONO</option>
                        <option>Construcciones viales</option>
                    
                    </select>
                    <p class="fecha">17/02/26 • Hace 2 dias</p>


                </div>
            </div>


            <div class="map"id="map3">
            </div>


            <div class="enviar-proveedor">

                <button class="btn-enviar-proveedor">
                    <span class="material-symbols-outlined">
                        send
                    </span>
                    Reclamo resuelto
                </button>

                <button class="btn-reclamo-no-aprobado">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                    No aprobado
                </button>
            </div>

        </div>

        <div class="fotoprueba">
            <img src="https://imgs.search.brave.com/UE_gsRzX1luujU8ZbhSJaYTVrZSKRsHAWAahM7A58Uc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/My8yMS8wMy8wMS9z/YW5pdGF0aW9uLXdv/cmtlci03MDgyMTc3/XzY0MC5qcGc" alt="">
        </div>
        
        
    </div>

    `;
    
    const reclamos = document.querySelectorAll(".primerdiv-reclamo");
        reclamos.forEach(reclamo => {
        reclamo.style.flexDirection = "row";
    });

    const map1 = L.map("map1", {
        zoomControl: false,
        attributionControl: false
    }).setView([-34.9011, -56.1645], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map1);

    L.marker([-34.9011, -56.1645]).addTo(map1);

    const map2 = L.map("map2", {
        zoomControl: false,
        attributionControl: false
    }).setView([-34.9011, -56.1645], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map2);

    L.marker([-34.9011, -56.1645]).addTo(map2);
     const map3 = L.map("map3", {
        zoomControl: false,
        attributionControl: false
    }).setView([-34.9011, -56.1645], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map3);

    L.marker([-34.9011, -56.1645]).addTo(map1);
    const mapDiv = document.querySelectorAll(".map");
    mapDiv.style.marginLeft = "5px";
}




const proveedoresbtn = document.querySelector(".proveedores-btn");

proveedoresbtn.addEventListener("click", () => {


    fourthview();
});
function fourthview(){
    filtro_container.innerHTML =``;
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    section.innerHTML = `

        <div class="lista-proveedores">

            <div class="titulo-proveedores">
                <h2>Proveedores</h2>

                <button class="btn-agregar-proveedor">
                    <span class="material-symbols-outlined">
                        add
                    </span>
                    Agregar proveedor
                </button>
            </div>


            <div class="form-proveedor oculto">

                <input 
                    class="nombre-proveedor"
                    type="text"
                    placeholder="Nombre del proveedor"
                >

                <select class="area-proveedor">
                    <option selected disabled>
                        Seleccionar área
                    </option>
                    <option>Tránsito</option>
                    <option>Infraestructura</option>
                    <option>Servicios públicos</option>
                    <option>Alumbrado</option>
                    <option>Espacios verdes</option>
                </select>


                <button class="guardar-proveedor">
                    Guardar proveedor
                </button>

            </div>


            <div class="contenedor-proveedores">

                <div class="proveedor-card">
                    <h3>SERVIAM</h3>
                    <p>Área: Infraestructura</p>
                </div>

                <div class="proveedor-card">
                    <h3>VIAMÁS</h3>
                    <p>Área: Tránsito</p>
                </div>

            </div>


        </div>

    `;


    const btnAgregar = document.querySelector(".btn-agregar-proveedor");
    const formulario = document.querySelector(".form-proveedor");
    const btnGuardar = document.querySelector(".guardar-proveedor");

    const nombreInput = document.querySelector(".nombre-proveedor");
    const areaSelect = document.querySelector(".area-proveedor");

    const lista = document.querySelector(".contenedor-proveedores");


    // Mostrar formulario
    btnAgregar.addEventListener("click", ()=>{

        formulario.classList.toggle("oculto");

    });



    // Crear proveedor
    btnGuardar.addEventListener("click", ()=>{

        const nombre = nombreInput.value.trim();
        const area = areaSelect.value;


        if(nombre === "" || !area){
            alert("Completa todos los campos");
            return;
        }



        lista.innerHTML += `

            <div class="proveedor-card">

                <h3>${nombre}</h3>

                <p>
                    Área: ${area}
                </p>

            </div>

        `;


        nombreInput.value="";
        areaSelect.selectedIndex=0;

        formulario.classList.add("oculto");

    });

}


areasbtn.addEventListener("click", () => {
    fifthview();
});

function fifthview(){
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.alignItems = "stretch";
    section.style.gridTemplateColumns = "none";
    filtro_container.innerHTML =``;
    section.innerHTML = `

        <div class="lista-areas">


            <div class="titulo-areas">

                <h2>Áreas</h2>

                <button class="btn-agregar-area">

                    <span class="material-symbols-outlined">
                        add
                    </span>

                    Agregar área

                </button>

            </div>



            <div class="form-area oculto">

                <input 
                    class="nombre-area"
                    type="text"
                    placeholder="Nombre del área"
                >


                <button class="guardar-area">

                    Guardar área

                </button>


            </div>



            <div class="contenedor-areas">


                <div class="area-card">

                    <h3>Infraestructura</h3>

                </div>


                <div class="area-card">

                    <h3>Tránsito</h3>

                </div>


            </div>


        </div>

    `;



    const btnAgregar = document.querySelector(".btn-agregar-area");

    const formulario = document.querySelector(".form-area");

    const btnGuardar = document.querySelector(".guardar-area");

    const inputNombre = document.querySelector(".nombre-area");

    const lista = document.querySelector(".contenedor-areas");



    // abrir/cerrar formulario
    btnAgregar.addEventListener("click", ()=>{

        formulario.classList.toggle("oculto");

    });



    // crear área
    btnGuardar.addEventListener("click", ()=>{


        const nombre = inputNombre.value.trim();



        if(nombre === ""){

            alert("Ingrese un nombre de área");

            return;

        }





        inputNombre.value="";

        formulario.classList.add("oculto");


    });




}