document.addEventListener("DOMContentLoaded", () => {
    const botonPromo = document.getElementById("btn-promocion");
    const mensajePromo = document.getElementById("mensaje-promocion");

    if (botonPromo) {
        botonPromo.addEventListener("click", () => {
            alert("¡Oferta activa! 20% de descuento en analgésicos y vitaminas.");
            if (mensajePromo) {
                mensajePromo.textContent = "Cupón aplicado: FARMA20 (20% OFF en caja)";
            }
        });
    }
});