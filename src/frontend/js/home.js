export class Home{
    constructor($btn_home_top, $btn_home, main, iniciarReclamo){
        this.$btn_home_top = $btn_home_top;
        this.$btn_home = $btn_home;
        this.main = main;
        this.iniciarReclamo = iniciarReclamo;

        // Edificio actualmente seleccionado en el filtro de "Tus edificios".
        // null = mostrar información/reclamos de todos los edificios asignados
        // al usuario.
        this.edificio_filtro = null;
    }

    nuevo_reclamo_inicio(){
        const $nuevoreclamoinicio = document.querySelector(".new-reclamo-inicial");

        $nuevoreclamoinicio.addEventListener("click", () => {
            this.iniciarReclamo();
        });
    }

    // Saludo según la hora del día
    obtener_saludo(){
        const hora = new Date().getHours();
        if(hora < 12) return "Buenos días";
        if(hora < 19) return "Buenas tardes";
        return "Buenas noches";
    }

    /*async */ obtener_usuario(){
        try{
            // const request = await fetch("");
            // const data = request.json();

            // Datos establecidos manualmente ya que no existe la api.
            // Representa al Usuario de edificio (encargado) que inició sesión.
            // "edificios" son EXCLUSIVAMENTE los que el Administrador le asignó
            // a este usuario (Cambio 2) — nunca se listan todos los edificios
            // del sistema, solo los propios.
            const data = {
                nombre: "Lucía Fernández",
                edificios: [
                    { id: 1, nombre: "Edificio Municipal Central", direccion: "Av. 18 de Julio 1234" },
                    { id: 2, nombre: "Anexo Intendencia - Sede Este", direccion: "Calle Sarandí 850" }
                ]
            };

            return data;
        }catch(error){
            console.log(error);
        }
    }

    first_view($btn_home, main){
        this.$btn_home_top.classList.add("active");
        this.$btn_home.classList.add("active");

        const usuario = this.obtener_usuario();
        const primer_nombre = usuario.nombre.split(" ")[0];

        this.main.innerHTML = `

        <div class="div-inicial">
            <h2>${this.obtener_saludo()}, ${primer_nombre}</h2>
            <p>${usuario.edificios.length > 1
                ? `Tenés ${usuario.edificios.length} edificios asignados`
                : `Encargado/a de ${usuario.edificios[0].nombre}`}</p>
        </div>

        <section class="edificios-chips">
            <button class="edificio-chip active" data-edificio="todos">Todos</button>
            ${usuario.edificios.map(ed => `<button class="edificio-chip" data-edificio="${ed.id}">${ed.nombre}</button>`).join("")}
        </section>

        <section class="edificio-info" id="edificio-info">
        </section>

        <section class="new-reclamo-inicial-container">
        <button class="new-reclamo-inicial">
           Nuevo Reclamo
        </button>
        </section>

        <div>
            <div class="div-inicial">
                <h2>Reclamos recientes</h2>
                <p id="subtitulo-lista-reclamos">Últimos reclamos de tus edificios</p>
            </div>

            <section class="reclamos-seccion" id="reclamos-seccion">

            </section>
        </div>`;

        this.nuevo_reclamo_inicio();
        this.usuario = usuario;
        this.edificio_filtro = null;
        this.filtro_eventos();
        this.actualizar_vista();
    }

    // Reclamos correspondientes únicamente a los edificios asignados al
    // usuario logueado. Un encargado de edificio nunca ve reclamos de
    // edificios que no le pertenecen (Cambio 2).
    /*async */ obtener_reclamos(){
        try{
            // const request = await fetch("");
            // const data = request.json();

            /*  if(!request.ok){
                throw new Error("Error al intentar comunicarse con la api!");
            } */

            // Datos establecidos manualmente ya que no existe la api.
            // Cada reclamo pertenece a un edificio público (edificio_id) y está
            // clasificado según el tipo de problema, según el Cambio 2.
            const data = [
                {
                    titulo: "Cables caídos en el hall de entrada",
                    edificio_id: 1,
                    edificio: "Edificio Municipal Central",
                    tipo: "Infraestructura",
                    fecha: "2026-03-01",
                    hora: "08:20",
                    estado: "Completado",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLMJI2-PKY2q5A_y5W14PC6H0vD7HSNOvVInlLkY3OqsR21npjVaKqjY&s=10"
                },
                {
                    titulo: "Piso levantado en el estacionamiento",
                    edificio_id: 2,
                    edificio: "Anexo Intendencia - Sede Este",
                    tipo: "Mantenimiento",
                    fecha: "2026-03-10",
                    hora: "14:30",
                    estado: "Completado",
                    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
                },
                {
                    titulo: "Iluminación fuera de servicio en pasillo 2",
                    edificio_id: 1,
                    edificio: "Edificio Municipal Central",
                    tipo: "Iluminación",
                    fecha: "2026-03-12",
                    hora: "09:15",
                    estado: "Completado",
                    img: "https://www.laprensafederal.com.ar/wp-content/uploads/2026/06/columnas-iluminacion-San-Vicente-1.jpeg"
                },
                {
                    titulo: "Riesgo de caída de rama sobre el acceso",
                    edificio_id: 2,
                    edificio: "Anexo Intendencia - Sede Este",
                    tipo: "Infraestructura",
                    fecha: "2026-03-15",
                    hora: "16:45",
                    estado: "Completado",
                    img: "https://www.lanacion.com.ar/resizer/v2/en-palermo-la-caida-de-este-arbol-levanto-el-3IV7FTNFLRH3NMDBXQDAL5GGKM.JPG?auth=8b7bbabf89a81c7349483262cec49574dd3799e42ffcf559022eb4ff7d8b3293&width=420&height=280&quality=70&smart=true"
                },
                {
                    titulo: "Semáforo del acceso vehicular averiado",
                    edificio_id: 1,
                    edificio: "Edificio Municipal Central",
                    tipo: "Infraestructura",
                    fecha: "2026-03-18",
                    hora: "07:50",
                    estado: "Completado",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HcL4LZfibO1m02w7wkZ789KuufbO_rsemm0-fiqU-g&s=100"
                },
                {
                    titulo: "Hundimiento en la rampa de acceso",
                    edificio_id: 2,
                    edificio: "Anexo Intendencia - Sede Este",
                    tipo: "Infraestructura",
                    fecha: "2026-03-20",
                    hora: "10:40",
                    estado: "En proceso",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVicgnDJh0BrgLREswPkrOowgMdf7l2uwdnsoWzbdSQ&s=10"
                },
                {
                    titulo: "Grafitis en la fachada del edificio",
                    edificio_id: 1,
                    edificio: "Edificio Municipal Central",
                    tipo: "Mantenimiento",
                    fecha: "2026-03-21",
                    hora: "18:25",
                    estado: "Ingresado",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJ34hpbA7LS_cq-7yqk8Q7vq4dKO99FivfZOQsMKqcw&s=10"
                }
            ];

            return data;
        }catch(error){
            console.log(error);
        }
    }

    // Click en los chips de "Todos" / edificio puntual: filtra la vista
    // sin recargar el saludo.
    filtro_eventos(){
        const chips = document.querySelectorAll(".edificio-chip");

        chips.forEach(chip => {
            chip.addEventListener("click", () => {
                chips.forEach(c => c.classList.remove("active"));
                chip.classList.add("active");

                const valor = chip.dataset.edificio;
                this.edificio_filtro = valor === "todos" ? null : Number(valor);

                this.actualizar_vista();
            });
        });
    }

    // Vuelve a pintar la info del edificio y la lista de reclamos según el
    // edificio actualmente filtrado.
    actualizar_vista(){
        const todos_los_reclamos = this.obtener_reclamos();

        const reclamos_filtrados = this.edificio_filtro
            ? todos_los_reclamos.filter(r => r.edificio_id === this.edificio_filtro)
            : todos_los_reclamos;

        this.render_edificio_info();
        this.render_subtitulo();
        this.cargar_reclamos(reclamos_filtrados);
    }

    render_subtitulo(){
        const $subtitulo = document.querySelector("#subtitulo-lista-reclamos");
        if(!this.edificio_filtro){
            $subtitulo.textContent = "Últimos reclamos de tus edificios";
            return;
        }
        const edificio = this.usuario.edificios.find(ed => ed.id === this.edificio_filtro);
        $subtitulo.textContent = `Últimos reclamos de ${edificio.nombre}`;
    }

    // Información general (no cantidad de reclamos, eso vive en "Mis
    // Reclamos"): nombre y dirección del/los edificio(s) asignados al
    // usuario.
    render_edificio_info(){
        const $info = document.querySelector("#edificio-info");

        const edificios_a_mostrar = this.edificio_filtro
            ? this.usuario.edificios.filter(ed => ed.id === this.edificio_filtro)
            : this.usuario.edificios;

        $info.innerHTML = edificios_a_mostrar.map(ed => `
            <div class="edificio-info-card">
                <span class="material-symbols-outlined">location_city</span>
                <div class="edificio-info-texto">
                    <strong>${ed.nombre}</strong>
                    <p>${ed.direccion}</p>
                </div>
            </div>
        `).join("");
    }

    crear_reclamos(data){
      let reclamos_creados = [];

      data.forEach(reclamo => {
            const reclamo_container = document.createElement("div");
            reclamo_container.classList.add("primerdiv-reclamo");

            // Imagen
            const img_container = document.createElement("div");
            img_container.classList.add("foto-reclamo");

            const img = document.createElement("img");
            img.src = `${reclamo.img}`;
            img.loading= "lazy";
            
            img_container.appendChild(img);

            // Info
            const info_container = document.createElement("div");
            info_container.classList.add("info-reclamo");

            // Titulo
            const titulo = document.createElement("p");
            titulo.classList.add("reclamo-titulo");
            titulo.textContent = `${reclamo.titulo}`;

            // Tipo de problema (clasificación del reclamo)
            const tipo = document.createElement("span");
            tipo.classList.add("reclamo-tipo");
            tipo.textContent = reclamo.tipo;

            // Edificio al que pertenece el reclamo. Solo se muestra cuando se
            // están viendo varios edificios a la vez ("Todos"); si ya se filtró
            // por un edificio puntual, el dato es redundante.
            const edificio = document.createElement("p");
            edificio.classList.add("reclamo-edificio");
            edificio.innerHTML = `<span class="material-symbols-outlined">location_city</span>${reclamo.edificio}`;
            if(this.edificio_filtro){
                edificio.style.display = "none";
            }

            // Estado
            const estado =document.createElement("div");

            // Estados
            switch(reclamo.estado){
                case "En proceso":
                    estado.innerHTML=`
                        <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Ingresado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Validado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle" style="background: #0a45ac"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Completado</span>
                            </div>
                    </div>
                    `;
                    break;

                    case "Validado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Ingresado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Validado</span>
                            </div>

                            <div class="line" ></div>

                            <div class="step" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Completado</span>
                            </div>
                    </div>
                        `;
                    break;

                    case "Ingresado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Ingresado</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Validado</span>
                            </div>

                            <div class="line" ></div>

                            <div class="step" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Completado</span>
                            </div>
                        `;

                    break;

                    case "Completado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>Ingresado</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>Validado</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>Completado</span>
                            </div>
                        `;
                    break;

                    default:
                        estado.innerHTML = `
                            <div class="stepper">
                                <div class="step">
                                    <div class="circle"></div>
                                    <span>Ingresado</span>
                                </div>

                                <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Validado</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Completado</span>
                            </div>
                            </div>
                        `;
                    break;
            }

        

            // fecha
            const fecha = document.createElement("p");
            fecha.classList.add("fecha");
            fecha.textContent = `${reclamo.fecha} • ${reclamo.hora}`;

            // Juntar las partes de info
            info_container.appendChild(titulo);
            info_container.appendChild(tipo);
            info_container.appendChild(edificio);
            info_container.appendChild(estado);
            info_container.appendChild(fecha);

            // Juntar todo
            reclamo_container.appendChild(img_container);
            reclamo_container.appendChild(info_container);
            
            reclamos_creados.push(reclamo_container);
      })

      return reclamos_creados;
    }


    cargar_reclamos(data){
        const reclamo_seccion = document.querySelector("#reclamos-seccion");
        reclamo_seccion.innerHTML = "";

        if(data.length === 0){
            reclamo_seccion.innerHTML = `<p class="sin-reclamos">No hay reclamos para este edificio todavía.</p>`;
            return;
        }

        const reclamos_creados = this.crear_reclamos(data);

        reclamos_creados.forEach(reclamo => {
            reclamo_seccion.appendChild(reclamo);
        })
    }


}