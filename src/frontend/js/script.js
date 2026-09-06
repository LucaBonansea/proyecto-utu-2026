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

function obtener_cookie(nombre) {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find(
        item => item.startsWith(nombre + "=")
    );

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(
        cookie.substring(nombre.length + 1)
    );
}

async function obtener_csrf() {
    const response = await fetch(
        "http://127.0.0.1:8000/sanctum/csrf-cookie",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    console.log("CSRF STATUS:", response.status);

    if (!response.ok) {
        throw new Error("No se pudo obtener la cookie CSRF");
    }
}

async function iniciar_usuario(datos) {
    try {
        // 1. Pedir cookie CSRF
        await obtener_csrf();

        // 2. Leer la cookie DESPUÉS de pedirla
        const csrfToken = obtener_cookie("XSRF-TOKEN");

        console.log("CSRF TOKEN:", csrfToken);

        if (!csrfToken) {
            throw new Error("No se encontró el token CSRF");
        }

        // 3. Hacer login enviando el token
        const request = await fetch(
            "http://127.0.0.1:8000/api/auth/login",
            {
                method: "POST",
                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": csrfToken
                },

                body: JSON.stringify(datos)
            }
        );

        const response = await request.json();

        console.log("LOGIN STATUS:", request.status);
        console.log("LOGIN RESPONSE:", response);

        if (!request.ok) {
            $btn_login.textContent = "[ERROR] Intentar de nuevo";
            $btn_login.style.background =
                "linear-gradient(135deg, #e64a23 0%, #d2731f 100%)";
            $btn_login.disabled = false;

            if (request.status === 401) {
                $input_ci.classList.add("error");
                $input_password.classList.add("error");

                showToast.error(response.mensaje, {
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

                    showToast.error(
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

                    showToast.error(
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
                showToast.error(
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

        showToast.success(
            "Usuario inició sesión correctamente",
            {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: true
            }
        );

        setTimeout(() => {
            window.location.href = "./inicio.html";
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

        showToast.error(
            "No se pudo conectar con el servidor",
            {
                duration: 4000,
                progress: true,
                position: "top-center"
            }
        );
    }
}