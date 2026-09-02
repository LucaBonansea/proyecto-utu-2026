// DOMS
const $input_tel = document.querySelector(".tel-input");
const $input_pin = document.querySelector(".pass-input");
const $btn_login = document.querySelector(".btn-login");


$btn_login.addEventListener('click', (e) =>{
    e.preventDefault();

    const data = {
        telefono : $input_tel.value,
        pin : $input_pin.value
    };

    $btn_login.textContent = "Iniciando sesión...";
    $btn_login.style.background = "linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)";
    iniciar_usuario(data);

});

async function iniciar_usuario(datos){
    try{
    const request = await fetch ("http://127.0.0.1:8000/api/auth/login", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );

    const response = await request.json();

    

    if (!request.ok) {

    $btn_login.textContent = "[ERROR] Intentar de nuevo";
    $btn_login.style.background = "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";
    $btn_login.disabled = false;

    if (request.status === 422) {

        if (response.errors?.telefono) {
            $input_tel.classList.add("error");

            showToast.error(response.errors.telefono[0], {
                duration: 4000,
                progress: true,
                position: "top-center",
                transition: "swingInverted",
                icon: '',
                sound: true,
            });
        }

        if (response.errors?.pin) {
            $input_pin.classList.add("error");

            showToast.error(response.errors.pin[0], {
                duration: 4000,
                progress: true,
                position: "top-center",
                transition: "swingInverted",
                icon: '',
                sound: true,
            });
        }
    }

    if (request.status === 401) {
        $input_tel.classList.add("error");
        $input_pin.classList.add("error");

        showToast.error(response.mensaje, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "swingInverted",
            icon: '',
            sound: true,
        });
    }

    return;
}


    console.log(response);

    $input_tel.classList.remove("error");
    $input_pin.classList.remove("error");

    showToast.success("Usuario iniciado sesión correctamente", {
        duration: 4000,
        position: "top-center",
        transition: "bounceIn",
        progress: true
    });

   
    setTimeout(() => {
        window.location.href = "./inicio.html";
    }, 2000);
    }catch(error){
        console.log("Error al intentar comunicarse con la api.")
        console.log(error);
        $input_tel.classList.remove("error");
        $input_pin.classList.remove("error");

        $btn_login.disabled = false;
        $btn_login.textContent = "[ERROR] Intentar de nuevo";
        $btn_login.style.background = "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";
        showToast.error("No se pudo conectar con el servidor", {
            duration: 4000,
            progress: true,
            position: "top-center"
        });
        
        
    }
}