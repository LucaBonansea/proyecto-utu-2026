export class Home{
    constructor($btn_home_top, $btn_home, maim, iniciarReclamo){
        this.$btn_home_top = $btn_home_top;
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
        this.$btn_home_top.classList.add("active");
        this.$btn_home.classList.add("active");
        this.main.innerHTML = `        

        <button class="new-reclamo-inicial">
            Nuevo Reclamo
        </button>


        <div>
            <div class="div-inicial">
                <h3>Reclamos ciudadanos</h3>
            </div>
            
            <section class="reclamos-seccion">
            
            </section>
        </div>`;
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
    titulo: "Cables caídos sobre la vereda",
    direccion: "Av. Del Libertador 2200",
    fecha: "2026-03-01",
    hora: "08:20",
    estado: "Terminado",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLMJI2-PKY2q5A_y5W14PC6H0vD7HSNOvVInlLkY3OqsR21npjVaKqjY&s=10"
  },
  {
    titulo: "Rodillos de asfalto levantados en la calle",
    direccion: "Av. Corrientes 1450",
    fecha: "2026-03-10",
    hora: "14:30",
    estado: "Terminado",
    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    titulo: "Alumbrado público fuera de servicio",
    direccion: "Calle San Martín 820",
    fecha: "2026-03-12",
    hora: "09:15",
    estado: "En proceso",
    img: "https://www.laprensafederal.com.ar/wp-content/uploads/2026/06/columnas-iluminacion-San-Vicente-1.jpeg"
  },
  {
    titulo: "Pérdida de agua importante en vía pública",
    direccion: "Av. Belgrano 3120",
    fecha: "2026-03-14",
    hora: "11:00",
    estado: "Terminado",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-e-5tvU0jW7XpHmS-MzE7I7JNd0--nyJjv2AtQc9Q3B0zI-2fdc5v6o&s=10"
  },
  {
    titulo: "Arbolado en peligro de caída por tormenta",
    direccion: "Calle Rivadavia 540",
    fecha: "2026-03-15",
    hora: "16:45",
    estado: "Terminado",
    img: "https://www.lanacion.com.ar/resizer/v2/en-palermo-la-caida-de-este-arbol-levanto-el-3IV7FTNFLRH3NMDBXQDAL5GGKM.JPG?auth=8b7bbabf89a81c7349483262cec49574dd3799e42ffcf559022eb4ff7d8b3293&width=420&height=280&quality=70&smart=true"
  },{
  titulo: "Semáforo averiado en cruce principal",
  direccion: "Av. Italia 1850",
  fecha: "2026-03-18",
  hora: "07:50",
  estado: "Terminado",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HcL4LZfibO1m02w7wkZ789KuufbO_rsemm0-fiqU-g&s=100"
},
{
  titulo: "Contenedor de basura desbordado",
  direccion: "Calle Rivera 930",
  fecha: "2026-03-19",
  hora: "13:10",
  estado: "Terminado",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_Cov5itkVvs0SuEv9ejrkZsyk6au2heuoSWaSFNrFA&s=10"
},
{
  titulo: "Bache de gran tamaño en la calzada",
  direccion: "Bulevar Artigas 4100",
  fecha: "2026-03-20",
  hora: "10:40",
  estado: "En proceso",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVicgnDJh0BrgLREswPkrOowgMdf7l2uwdnsoWzbdSQ&s=10"
},
{
  titulo: "Grafitis en edificio público",
  direccion: "Plaza Independencia 120",
  fecha: "2026-03-21",
  hora: "18:25",
  estado: "Terminado",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJ34hpbA7LS_cq-7yqk8Q7vq4dKO99FivfZOQsMKqcw&s=10"
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

                            <div class="line active"></div>

                            <div class="step active">
                                <div class="circle" style="background: #0a45ac"></div>
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
                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>Enviado</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>Aceptado</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
                                <span>En proceso</span>
                            </div>

                            <div class="line" style="background: #22c55e;"></div>

                            <div class="step">
                                <div class="circle" style="background: #22c55e;"></div>
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