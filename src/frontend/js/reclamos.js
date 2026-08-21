export class Reclamos{
    constructor(Main){
        this.Main = Main;
    }

    second_view(Main){
        this.Main.innerHTML = `
        <div class="div-inicial">
            <h2>Tus Reclamos</h2>
        </div>

        <div class="perfil-stats">
            <div class="stat-item">
                <p class="stat-numero">12</p>
                <p class="stat-label">Reclamos enviados</p>
            </div>
            <div class="stat-item">
                <p class="stat-numero">8</p>
                <p class="stat-label">Resueltos</p>
            </div>
        </div>
    
        <div class="reclamos-seccion">

            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>1/25</span></p>
                    

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>2/25</span></p>
                    

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>3/25</span></p>
                    

                </div>
            </div>
           <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>4/25</span></p>
                    

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>5/25</span></p>
                    

                </div>
            </div>
            <div class="primerdiv-reclamo">
                <div class="foto-reclamo">
                    <img src="https://imgs.search.brave.com/o7Hp6ebhqiOzB5Ng50bKejGy-Dy1clafDW8xSB0BfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJy/ZXRlcmEtZGUtYXNm/YWx0by1hZ3JpZXRh/ZG8tY29uLWJhY2hl/cy1wcm9mdW5kb3Mt/bGxlbm9zLWFndWEt/cXVlLXJlZmxlamFu/LWxhcy1sdWNlcy1s/YS1jaXVkYWQtNDI4/Nzg5ODkzLmpwZw" alt="">
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">Bache en la calle</p>
                    <button class="reclamo-ubicacion"><p>Ver Ubicacion</p></button>
                    
                    
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
                    <p class="fecha-misreclamos">17/02/26 • Hace 2 dias <span>6/25</span></p>
                    

                </div>
            </div>
    `;

    const latitud = -34.603722;
    const longitud = -58.381592;

    const botones = this.Main.querySelectorAll(".reclamo-ubicacion");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
            window.open(url, "_blank");
        });
    });

    }
}