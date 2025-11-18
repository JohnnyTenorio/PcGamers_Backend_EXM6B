document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".pc-card button");

    botones.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const card = e.target.closest(".pc-card");

            let src = card.querySelector("img").getAttribute("src");
            if (src.startsWith("./")) {
                src = src.replace("./", "../");
            }

            const item = {
                nombre: card.querySelector(".pc-name").innerText,
                descripcion: card.querySelector("p") ? card.querySelector("p").innerText : "",
                precio: parseFloat(card.querySelector("h4").innerText.replace("$", "")),
                imagen: src,
                categoria: "combo"
            };

            try {
                const res = await fetch("/api/carrito", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item)
                });
                const data = await res.json();
                if (res.status === 201) {
                    alert("Listo, ya se envió al carrito");
                } else {
                    alert("Error: " + data.msg);
                }
            } catch (error) {
                alert("Error al conectar con el servidor");
            }
        });
    });
});
