const btn = document.getElementById("btn-enviar");
const tabla = document.getElementById("tabla-mensajes");

btn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || mensaje === "") return;

    const fecha = new Date();
    const f = fecha.toLocaleDateString();
    const h = fecha.toLocaleTimeString();

    const row = `
        <tr>
            <td>${f}</td>
            <td>${h}</td>
            <td>${nombre}</td>
            <td>${mensaje}</td>
        </tr>
    `;

    tabla.innerHTML += row;

    document.getElementById("nombre").value = "";
    document.getElementById("mensaje").value = "";
});
