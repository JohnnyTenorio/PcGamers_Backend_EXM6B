document.addEventListener("DOMContentLoaded", async () => {
    // ====================== ELEMENTOS ======================
    const contenedorCombos = document.getElementById("carrito-combos");
    const contenedorCotizacion = document.getElementById("carrito-cotizacion");
    const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));

    const inputEditarId = document.getElementById("editarId");
    const inputEditarNombre = document.getElementById("editarNombre");
    const inputEditarDescripcion = document.getElementById("editarDescripcion");
    const inputEditarPrecio = document.getElementById("editarPrecio");
    const inputEditarImagen = document.getElementById("editarImagen");
    const inputEliminarId = document.getElementById("eliminarId");

    let tipoEliminar = ""; // "combo" o "cotizacion"

    // ====================== FUNCIONES ======================
    async function cargarCombos() {
        try {
            const res = await fetch("/api/carrito");
            const data = await res.json();
            contenedorCombos.innerHTML = "";

            if (!data.items || data.items.length === 0) {
                contenedorCombos.innerHTML = "<p class='text-center text-muted'>Todavía no agregas ningún combo.</p>";
                return;
            }

            data.items.forEach(item => {
                if (item.categoria !== "combo") return;

                const card = document.createElement("div");
                card.classList.add("col-md-4");
                card.innerHTML = `
                    <div class="pc-card p-2 border rounded">
                        <img src="${item.imagen}" class="pc-img w-100">
                        <div class="pc-name fw-bold mt-2">${item.nombre}</div>
                        <p class="mb-1">${item.descripcion}</p>
                        <h4 class="text-danger">$${item.precio}</h4>
                        <div class="d-flex justify-content-between mt-2">
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${item._id}" data-tipo="combo">Eliminar</button>
                            <button class="btn btn-sm btn-primary btn-editar" data-id="${item._id}" data-tipo="combo">Editar</button>
                        </div>
                    </div>
                `;
                contenedorCombos.appendChild(card);
            });
        } catch (error) {
            contenedorCombos.innerHTML = "<p class='text-center text-danger'>Error al cargar el carrito</p>";
        }
    }

    async function cargarCotizaciones() {
        try {
            const res = await fetch("/api/cotizacion");
            const data = await res.json();
            contenedorCotizacion.innerHTML = "";

            if (!data.items || data.items.length === 0) {
                contenedorCotizacion.innerHTML = "<p class='text-center text-muted'>Aún no tienes PCs en cotización.</p>";
                return;
            }

            data.items.forEach(item => {
                if (item.categoria !== "pc") return;

                const card = document.createElement("div");
                card.classList.add("col-md-4");
                card.innerHTML = `
                    <div class="pc-card p-2 border rounded">
                        <div class="pc-name fw-bold mt-2">Cliente: ${item.cliente}</div>
                        <ul class="componentes-list">
                            ${item.componentes.map(c => `<li>${c.nombre} - $${c.precio}</li>`).join("")}
                        </ul>
                        <h4 class="text-danger total">$${item.total}</h4>
                        <p class="text-muted">Fecha: ${new Date(item.fecha).toLocaleString()}</p>
                        <div class="d-flex justify-content-between mt-2">
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${item._id}" data-tipo="cotizacion">Eliminar</button>
                            <button class="btn btn-sm btn-primary btn-editar" data-id="${item._id}" data-tipo="cotizacion">Editar</button>
                        </div>
                    </div>
                `;
                contenedorCotizacion.appendChild(card);
            });
        } catch (error) {
            contenedorCotizacion.innerHTML = "<p class='text-center text-danger'>Error al cargar las cotizaciones</p>";
        }
    }

    // ====================== EVENTOS ======================
    // Click en eliminar o editar (delegación)
    document.addEventListener("click", (e) => {
        const btn = e.target;
        const card = btn.closest(".pc-card");
        if (!card) return;
        const id = btn.dataset.id;
        const tipo = btn.dataset.tipo;

        // ====== ELIMINAR ======
        if (btn.classList.contains("btn-eliminar")) {
            inputEliminarId.value = id;
            tipoEliminar = tipo;
            modalEliminar.show();
        }

        // ====== EDITAR ======
        if (btn.classList.contains("btn-editar")) {
            inputEditarId.value = id;

            if (tipo === "combo") {
                inputEditarNombre.value = card.querySelector(".pc-name").innerText;
                inputEditarDescripcion.value = card.querySelector("p").innerText;
                inputEditarPrecio.value = parseFloat(card.querySelector("h4").innerText.replace("$", ""));
                inputEditarImagen.value = card.querySelector("img").getAttribute("src");
            }

            if (tipo === "cotizacion") {
                inputEditarNombre.value = card.querySelector(".pc-name").innerText.replace("Cliente: ", "");
                inputEditarDescripcion.value = [...card.querySelectorAll(".componentes-list li")]
                    .map(li => li.innerText)
                    .join("\n");
                inputEditarPrecio.value = parseFloat(card.querySelector(".total").innerText.replace("$", ""));
                inputEditarImagen.value = "";
            }

            modalEditar.show();
        }
    });

    // Confirmar eliminación
    document.getElementById("btnConfirmarEliminar").addEventListener("click", async () => {
        const id = inputEliminarId.value;
        try {
            if (tipoEliminar === "combo") {
                const res = await fetch(`/api/carrito/${id}`, { method: "DELETE" });
                if (res.status === 200) cargarCombos();
            } else if (tipoEliminar === "cotizacion") {
                const res = await fetch(`/api/cotizacion/${id}`, { method: "DELETE" });
                if (res.status === 200) cargarCotizaciones();
            }
            modalEliminar.hide();
        } catch (error) {
            console.error(error);
        }
    });

    // Guardar edición
    document.getElementById("btnGuardarEditar").addEventListener("click", async () => {
        const id = inputEditarId.value;
        const tipo = document.querySelector("#btnGuardarEditar").dataset.tipo || "combo";
        const nombre = inputEditarNombre.value.trim();
        const descripcion = inputEditarDescripcion.value.trim();
        const precio = parseFloat(inputEditarPrecio.value);
        const imagen = inputEditarImagen.value.trim();

        if (!nombre || !precio) return;

        try {
            if (tipoEliminar === "combo") {
                await fetch(`/api/carrito/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, descripcion, precio, imagen, categoria: "combo" })
                });
                cargarCombos();
            } else if (tipoEliminar === "cotizacion") {
                const componentes = descripcion
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map(line => {
                        const parts = line.split(" - $");
                        return { nombre: parts[0], precio: parseFloat(parts[1]) || 0 };
                    });

                await fetch(`/api/cotizacion/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cliente: nombre,
                        componentes,
                        total: precio,
                        categoria: "pc"
                    })
                });
                cargarCotizaciones();
            }

            modalEditar.hide();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar");
        }
    });

    // ====================== INICIALIZAR ======================
    await cargarCombos();
    await cargarCotizaciones();
});
