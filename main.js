document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("product-search");
    const filterButtons = [...document.querySelectorAll(".filter-button")];
    const productCards = [...document.querySelectorAll(".product-card")];
    const resultCount = document.querySelector(".result-count");
    const emptyState = document.querySelector(".empty-state");
    const cartButton = document.querySelector(".cart-button");
    const cartCount = document.querySelector(".cart-count");
    let activeFilter = "todos";
    let itemCount = 0;

    const normalizeText = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

    const updateProducts = () => {
        const searchTerm = normalizeText(searchInput.value.trim());
        let visibleCount = 0;

        productCards.forEach((card) => {
            const matchesCategory = activeFilter === "todos" || card.dataset.category === activeFilter;
            const matchesSearch = normalizeText(card.dataset.search).includes(searchTerm);
            const isVisible = matchesCategory && matchesSearch;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "producto" : "productos"}`;
        emptyState.hidden = visibleCount > 0;
    };

    searchInput.addEventListener("input", updateProducts);

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter;
            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;
                filterButton.classList.toggle("is-active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });
            updateProducts();
        });
    });

    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => {
            itemCount += 1;
            cartCount.textContent = itemCount;
            cartButton.setAttribute("aria-label", `Carrito, ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`);
            button.textContent = "✓";
            button.setAttribute("aria-label", "Producto agregado al carrito");
            window.setTimeout(() => {
                button.textContent = "+";
                button.setAttribute("aria-label", `Agregar ${button.closest(".product-card").querySelector("h3").textContent} al carrito`);
            }, 900);
        });
    });

    document.getElementById("btn-promocion").addEventListener("click", () => {
        document.getElementById("mensaje-promocion").textContent = "Tu código: FARMA20 · Consulta condiciones en tienda.";
    });
});