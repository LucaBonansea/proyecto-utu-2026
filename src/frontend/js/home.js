export class Home{
    constructor($btn_home, maim, iniciarReclamo){
        this.$btn_home = $btn_home;
        this.main = main;
        this.iniciarReclamo = iniciarReclamo;
    }

    nuevo_reclamo_inicio(){
        const $nuevoreclamoinicio = document.querySelector(".new-reclamo-inicial");

        $nuevoreclamoinicio.addEventListener("click", () => {
            this.iniciarReclamo();
        });
    }
    

    first_view($btn_home, main){
        this.$btn_home.classList.add("active");
       this.main.innerHTML = `
    <div class="div-inicial">
        <h2>Hola,<span>Thiago</span></h2>
    </div>

    <button class="new-reclamo-inicial">
        Nuevo Reclamo
    </button>

    <div>
        <div class="reclamos-text">
            <p>Reclamos ciudadanos</p>
        </div>

        <section class="reclamos-seccion">
        </section>

    </div>
`;
        this.nuevo_reclamo_inicio();
        this.cargar_reclamos();
    }

    /*async */ obtener_reclamos(){
        try{
            // const request = await fetch("");
            // const data = request.json();

            /*  if(!request.ok){
                throw new Error("Error al intentar comunicarse con la api!");
            } */

            // Datos establecidos manualmente ya que no existe la api
           const data = [
  {
    titulo: "Rodillos de asfalto levantados en la calle",
    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    fecha: "2026-03-10",
    hora: "14:30",
    estado: "Aceptado",
    direccion: "Av. Corrientes 1450"
  },
  {
    titulo: "Alumbrado público fuera de servicio",
    img: "https://www.laprensafederal.com.ar/wp-content/uploads/2026/06/columnas-iluminacion-San-Vicente-1.jpeg",
    fecha: "2026-03-12",
    hora: "09:15",
    estado: "En proceso",
    direccion: "Calle San Martín 820"
  },
  {
    titulo: "Pérdida de agua importante en vía pública",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-e-5tvU0jW7XpHmS-MzE7I7JNd0--nyJjv2AtQc9Q3B0zI-2fdc5v6o&s=10",
    fecha: "2026-03-14",
    hora: "11:00",
    estado: "En proceso",
    direccion: "Av. Belgrano 3120"
  },
  {
    titulo: "Arbolado en peligro de caída por tormenta",
    img: "https://www.lanacion.com.ar/resizer/v2/en-palermo-la-caida-de-este-arbol-levanto-el-3IV7FTNFLRH3NMDBXQDAL5GGKM.JPG?auth=8b7bbabf89a81c7349483262cec49574dd3799e42ffcf559022eb4ff7d8b3293&width=420&height=280&quality=70&smart=true",
    fecha: "2026-03-15",
    hora: "16:45",
    estado: "Terminado",
    direccion: "Calle Rivadavia 540"
  },
  {
    titulo: "Cables caídos sobre la vereda",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLMJI2-PKY2q5A_y5W14PC6H0vD7HSNOvVInlLkY3OqsR21npjVaKqjY&s=10",
    fecha: "2026-03-01",
    hora: "08:20",
    estado: "Terminado",
    direccion: "Av. Del Libertador 2200"
  },
  {
    titulo: "Cables caídos sobre la vereda",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLMJI2-PKY2q5A_y5W14PC6H0vD7HSNOvVInlLkY3OqsR21npjVaKqjY&s=10",
    fecha: "2026-03-01",
    hora: "08:20",
    estado: "Terminado",
    direccion: "Av. Del Libertador 2200"
  }
];

            return data;
        }catch(error){
            console.log(error);
        }
    }

    crear_reclamos(){
      const data = this.obtener_reclamos();
      
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

            // Direccion
            const ubicacion = document.createElement("p");
            ubicacion.classList.add("reclamo-ubicacion");
            ubicacion.textContent = `${reclamo.direccion}`;

            // Estado
            const estado =document.createElement("div");

            // Estados
            switch(reclamo.estado){
                case "En proceso":
                    estado.innerHTML=`
                        <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Enviado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line active" ></div>

                            <div class="step active" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Terminado</span>
                            </div>
                    </div>
                    `;
                    break;

                    case "Aceptado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Enviado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line" ></div>

                            <div class="step" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Terminado</span>
                            </div>
                    </div>
                        `;
                    break;

                    case "Enviado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Enviado</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line" ></div>

                            <div class="step" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Terminado</span>
                            </div>
                        `;

                    break;

                    case "Terminado":
                        estado.innerHTML = `
                            <div class="stepper">
                            <div class="step active">
                                <div class="circle"></div>
                                <span>Enviado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active" >
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle"></div>
                                <span>Terminado</span>
                            </div>
                        `;
                    break;

                    default:
                        estado.innerHTML = `
                            <div class="stepper">
                                <div class="step">
                                    <div class="circle"></div>
                                    <span>Enviado</span>
                                </div>

                                <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line"></div>

                            <div class="step">
                                <div class="circle"></div>
                                <span>Terminado</span>
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
            info_container.appendChild(ubicacion);
            info_container.appendChild(estado);
            info_container.appendChild(fecha);

            // Juntar todo
            reclamo_container.appendChild(img_container);
            reclamo_container.appendChild(info_container);
            
            reclamos_creados.push(reclamo_container);
      })

      return reclamos_creados;
    }


    cargar_reclamos(){
        const reclamo_seccion = document.querySelector(".reclamos-seccion");

        const reclamos_creados = this.crear_reclamos();

        reclamos_creados.forEach(reclamo => {
            reclamo_seccion.appendChild(reclamo);
        })
    }


}