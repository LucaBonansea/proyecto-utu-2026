const $btn_registro = document.querySelector(".btn-registro");
const $input_name = document.querySelector(".name-input");
const $input_tel = document.querySelector(".tel-input");
const $input_edificio = document.querySelector(".edificio-select");
const $input_password = document.querySelector(".pass-input");
const $input_password_2 = document.querySelector(".pass-input-2");

$btn_registro.textContent = "Registrar";

// Quitar error al modificar los campos
$input_name.addEventListener("input", () => {
    $input_name.classList.remove("error");
});

$input_tel.addEventListener("input", () => {
    $input_tel.classList.remove("error");
});

$input_edificio.addEventListener("change", () => {
    $input_edificio.classList.remove("error");
});

$input_password.addEventListener("input", () => {
    $input_password.classList.remove("error");
});

$input_password_2.addEventListener("input", () => {
    $input_password_2.classList.remove("error");
});

// Registrar usuario
$btn_registro.addEventListener("click", (e) => {
    e.preventDefault();

    const datos = {
        nombre: $input_name.value,
        telefono: $input_tel.value,
        edificio: $input_edificio.value,
        password: $input_password.value,
        password_confirmation: $input_password_2.value
    };

    $btn_registro.disabled = true;
    $btn_registro.textContent = "Registrando...";
    $btn_registro.style.background =
        "linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)";

    registrar_usuario(datos);
});

async function registrar_usuario(datos) {
    try {
        const request = await fetch(
            "http://127.0.0.1:8000/api/auth/register",
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

        // Si la API devuelve un error
        if (!request.ok) {
            $btn_registro.textContent = "[ERROR] Intentar de nuevo";
            $btn_registro.disabled = false;

            if (response.errors?.nombre) {
                $input_name.classList.add("error");
            }

            if (response.errors?.telefono) {
                $input_tel.classList.add("error");
            }

            if (response.errors?.edificio) {
                $input_edificio.classList.add("error");
            }

            if (response.errors?.password) {
                $input_password.classList.add("error");
                $input_password_2.classList.add("error");
            }

            return;
        }

        // Registro exitoso
        showToast.success("Usuario registrado correctamente", {
            duration: 4000,
            position: "top-center",
            transition: "bounceIn",
            progress: true
        });

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);

    } catch (error) {
        console.log("Error al intentar comunicarse con la API.");
        console.log(error);

        $btn_registro.disabled = false;
        $btn_registro.textContent = "[ERROR] Intentar de nuevo";

        $btn_registro.style.background =
            "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";

        showToast.error("No se pudo conectar al servidor", {
            duration: 4000,
            progress: true,
            position: "top-center"
        });
    }
}