const $btn_registro = document.querySelector(".btn-registro");
const $input_name = document.querySelector(".name-input");
const $input_tel = document.querySelector(".tel-input");
const $input_pin = document.querySelector(".pass-input");
const $input_pin_2 = document.querySelector(".pass-input-2")

$btn_registro.textContent = "Registrar";

$input_name.addEventListener("input", () => {
    $input_name.classList.remove("error");
});

$input_tel.addEventListener("input" , () =>{
    $input_tel.classList.remove("error");
})

$input_pin.addEventListener("input", () =>{
    $input_pin.classList.remove("error");
})

$input_pin_2.addEventListener("input", () => {
    $input_pin_2.classList.remove("error");
})


$btn_registro.addEventListener("click", (e) =>{
    e.preventDefault();
    
    
    const datos = {
        nombre: $input_name.value,
        telefono: $input_tel.value,
        pin: $input_pin.value,
        pin_confirmation: $input_pin_2.value
    };
    $btn_registro.disabled = true;
    $btn_registro.textContent = "Registrando...";
    $btn_registro.style.background = "linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)";
    registrar_usuario(datos);
});


async function registrar_usuario(datos){
    try{
       const request = await fetch("http://127.0.0.1:8000/api/auth/register",
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

        if(!request.ok){
            $btn_registro.textContent = "[ERROR] Intentar de nuevo";
            $btn_registro.style.background = "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";
             
            $btn_registro.disabled = false;
            console.log(response);

            if(response.errors?.nombre){
                $input_name.classList.add("error");

                showToast.error(response.errors.nombre[0], {
                duration: 4000,
                progress: true,
                position: "top-center",
                transition: "swingInverted",
                icon: '',
                sound: true,
            });
            }

            if(response.errors?.telefono){
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

            if(response.errors?.pin){
                $input_pin.classList.add("error");
                $input_pin_2.classList.add("error");

                showToast.error(response.errors.pin[0], {
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

        showToast.success("Usuario registrado correctamente", {
            duration: 4000,
            position: "top-center",
            transition: "bounceIn",
            progress: true
        });

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);

    }catch(error){
        console.log("Error al intentar comunicarse con la api.")
        console.log(error);
        $input_name.classList.remove("error");
        $input_tel.classList.remove("error");
        $input_pin.classList.remove("error");
        $input_pin_2.classList.remove("error");

        $btn_registro.disabled = false;
        $btn_registro.textContent = "[ERROR] Intentar de nuevo";
        $btn_registro.style.background = "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";
        showToast.error("No se pudo conectar con el servidor", {
            duration: 4000,
            progress: true,
            position: "top-center"
        });
        
        
    }
}
