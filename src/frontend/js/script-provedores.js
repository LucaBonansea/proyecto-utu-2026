async function verificar_sesion() {
    try {
        const request = await fetch(
            "http://127.0.0.1:8000/api/auth/me",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!request.ok) {
            window.location.replace("./index.html");
            return null;
        }

        const response = await request.json();
        const usuario = response.usuario;

        if (usuario.rol === "usuario_proveedor") {
            return usuario;
        }

        if (usuario.rol === "administrador") {
            window.location.replace("./administrador.html");
            return null;
        }

        window.location.replace("./inicio.html");
        return null;
    } catch (error) {
        console.error("Error verificando sesión:", error);
        window.location.replace("./index.html");
        return null;
    }
}

function iniciarAplicacion() {
    const coordenadasIniciales = [-34.9011, -56.1645];
    const mapas = [];

    document.querySelectorAll(".map").forEach(function (contenedor) {
        const mapa = L.map(contenedor).setView(coordenadasIniciales, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(mapa);

        mapas.push(mapa);
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const precision = position.coords.accuracy;

                mapas.forEach(function (mapa) {
                    mapa.setView([lat, lng], 16);

                    L.marker([lat, lng])
                        .addTo(mapa)
                        .bindPopup("📍 Tu ubicación")
                        .openPopup();

                    L.circle([lat, lng], {
                        radius: precision,
                        color: "blue",
                        fillColor: "#3f8cff",
                        fillOpacity: 0.25
                    }).addTo(mapa);
                });
            },
            function (error) {
                console.error("No fue posible obtener la ubicación:", error.message);
            }
        );
    } else {
        console.log("Tu navegador no soporta geolocalización.");
    }
}

async function iniciar() {
    const usuario = await verificar_sesion();

    if (!usuario) {
        return;
    }

    iniciarAplicacion();
}

document.addEventListener("DOMContentLoaded", iniciar);
