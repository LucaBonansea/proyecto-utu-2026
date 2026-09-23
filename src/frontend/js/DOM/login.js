import { iniciarSesion } from "../services/auth-service.js";
import { notify } from "../utils/toast.js";

const $input_ci = document.querySelector(".ci-input");
const $input_password = document.querySelector(".pass-input");
const $btn_login = document.querySelector(".btn-login");

// Quitar error al modificar los campos
$input_ci.addEventListener("input", () => {
    $input_ci.classList.remove("error");
});

$input_password.addEventListener("input", () => {
    $input_password.classList.remove("error");
});

$btn_login.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {
        cedula: $input_ci.value,
        password: $input_password.value
    };

    $btn_login.disabled = true;
    $btn_login.textContent = "Iniciando sesión...";
    $btn_login.style.background =
        "linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)";

    iniciar_usuario(data);
});

async function iniciar_usuario(datos) {
    try {
        const request = await iniciarSesion(datos);

        const response = await request.json();

        console.log("LOGIN STATUS:", request.status);
        console.log("LOGIN RESPONSE:", response);

        if (!request.ok) {
            $btn_login.textContent = "Intentar nuevamente";
            $btn_login.style.background =
                "linear-gradient(135deg, #023CA1 0%, #00286F 100%)";
            $btn_login.disabled = false;

            if (request.status === 401) {
                $input_ci.classList.add("error");
                $input_password.classList.add("error");

                notify.error(response.mensaje, {
                    duration: 4000,
                    progress: true,
                    position: "top-center",
                    transition: "swingInverted",
                    icon: "",
                    sound: true
                });
            }

            if (request.status === 422) {
                if (response.errors?.cedula) {
                    $input_ci.classList.add("error");

                    notify.error(
                        response.errors.cedula[0],
                        {
                            duration: 4000,
                            progress: true,
                            position: "top-center",
                            transition: "swingInverted",
                            icon: "",
                            sound: true
                        }
                    );
                }

                if (response.errors?.password) {
                    $input_password.classList.add("error");

                    notify.error(
                        response.errors.password[0],
                        {
                            duration: 4000,
                            progress: true,
                            position: "top-center",
                            transition: "swingInverted",
                            icon: "",
                            sound: true
                        }
                    );
                }
            }

            if (request.status === 419) {
                notify.error(
                    "La sesión de seguridad expiró. Intenta nuevamente.",
                    {
                        duration: 4000,
                        progress: true,
                        position: "top-center"
                    }
                );
            }

            return;
        }

        $input_ci.classList.remove("error");
        $input_password.classList.remove("error");

        notify.success(
            "Usuario inició sesión correctamente",
            {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: true
            }
        );

        // 4. REDIRECCIÓN SEGÚN ROL
        const usuario = response.usuario;

        console.log("ROL:", usuario.rol);

        setTimeout(() => {
            switch (usuario.rol) {

                case "administrador":
                    window.location.replace("./administrador.html");
                    break;

                case "usuario_proveedor":
                    window.location.replace("./Provedores.html");
                    break;

                default:
                    window.location.replace("./inicio.html");
                    break;
            }
        }, 2000);

    } catch (error) {
        console.log("Error al intentar comunicarse con la API.");
        console.log(error);

        $input_ci.classList.remove("error");
        $input_password.classList.remove("error");

        $btn_login.disabled = false;
        $btn_login.textContent = "[ERROR] Intentar de nuevo";

        $btn_login.style.background =
            "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";

        notify.error(
            "No se pudo conectar con el servidor",
            {
                duration: 4000,
                progress: true,
                position: "top-center"
            }
        );
    }
}
