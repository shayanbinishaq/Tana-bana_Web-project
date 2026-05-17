document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-item");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (slides.length && nextBtn && prevBtn) {
    let current = 0;
    let isAnimating = false;

    slides.forEach((slide, i) => {
      slide.style.opacity = i === 0 ? 1 : 0;
      slide.style.zIndex = i === 0 ? 1 : 0;
    });

    function goToSlide(nextIndex) {
      if (isAnimating || nextIndex === current) return;
      isAnimating = true;
      const currentSlide = slides[current];
      const nextSlide = slides[nextIndex];
      nextSlide.style.zIndex = 2;
      currentSlide.style.zIndex = 0;
      nextSlide.style.opacity = 0;
      nextSlide.offsetHeight;
      nextSlide.style.opacity = 1;
      currentSlide.style.opacity = 0;
      setTimeout(() => { current = nextIndex; isAnimating = false; }, 800);
    }

    function nextSlide() { goToSlide((current + 1) % slides.length); }
    function prevSlide() { goToSlide((current - 1 + slides.length) % slides.length); }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    let auto = setInterval(nextSlide, 4000);
    const carousel = document.querySelector(".carousel");
    carousel.addEventListener("mouseenter", () => clearInterval(auto));
    carousel.addEventListener("mouseleave", () => { auto = setInterval(nextSlide, 4000); });
  }

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  if (hamburger && mobileNav) {
    function openMobileNav() {
      mobileNav.classList.add("open");
      mobileNavOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeMobileNav() {
      mobileNav.classList.remove("open");
      mobileNavOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
    hamburger.addEventListener("click", openMobileNav);
    mobileNavClose.addEventListener("click", closeMobileNav);
    mobileNavOverlay.addEventListener("click", closeMobileNav);
  }

  const openFilterBtn = document.getElementById("openFilter");
  const closeFilterBtn = document.getElementById("closeFilter");
  const applyFilterBtn = document.getElementById("applyFilter");
  const clearFilterBtn = document.getElementById("clearFilter");
  const filterOverlay = document.getElementById("filterOverlay");
  const filterPanel = document.getElementById("filterPanel");

  if (openFilterBtn && filterPanel) {
    function openFilterPanel() {
      filterPanel.classList.add("open");
      filterOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeFilterPanel() {
      filterPanel.classList.remove("open");
      filterOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    openFilterBtn.addEventListener("click", openFilterPanel);
    closeFilterBtn.addEventListener("click", closeFilterPanel);
    filterOverlay.addEventListener("click", closeFilterPanel);

    const allCards = Array.from(document.querySelectorAll(".product-card"));
    const productCount = document.getElementById("productCount");
    const noResults = document.getElementById("noResults");

    function applyFilters() {
      const checkedBrands = Array.from(document.querySelectorAll('.filter-check[data-filter="brand"]:checked')).map((c) => c.value);
      const checkedPrices = Array.from(document.querySelectorAll('.filter-check[data-filter="price"]:checked')).map((c) => c.value);

      let visible = 0;
      allCards.forEach((card) => {
        const brand = card.dataset.brand;
        const price = parseInt(card.dataset.price);
        const brandOk = checkedBrands.length === 0 || checkedBrands.includes(brand);
        const priceOk = checkedPrices.length === 0 || checkedPrices.some((range) => {
          if (range === "under-10000") return price < 10000;
          if (range === "10000-15000") return price >= 10000 && price <= 15000;
          if (range === "above-15000") return price > 15000;
          return true;
        });
        const show = brandOk && priceOk;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });

      productCount.textContent = `Showing ${visible} of ${allCards.length} products`;
      noResults.style.display = visible === 0 ? "block" : "none";
      closeFilterPanel();
    }

    function clearFilters() {
      document.querySelectorAll(".filter-check").forEach((c) => (c.checked = false));
      allCards.forEach((card) => (card.style.display = ""));
      productCount.textContent = `Showing ${allCards.length} of ${allCards.length} products`;
      noResults.style.display = "none";
    }

    applyFilterBtn.addEventListener("click", applyFilters);
    clearFilterBtn.addEventListener("click", clearFilters);

    const resetInline = document.getElementById("resetFiltersInline");
    if (resetInline) resetInline.addEventListener("click", clearFilters);

    const sortSelect = document.getElementById("sortSelect");
    const grid = document.getElementById("productGrid");

    if (sortSelect && grid) {
      sortSelect.addEventListener("change", () => {
        const val = sortSelect.value;
        const cards = Array.from(grid.querySelectorAll(".product-card"));
        cards.sort((a, b) => {
          const nameA = a.dataset.name;
          const nameB = b.dataset.name;
          const priceA = parseInt(a.dataset.price);
          const priceB = parseInt(b.dataset.price);
          if (val === "price-asc") return priceA - priceB;
          if (val === "price-desc") return priceB - priceA;
          if (val === "name-asc") return nameA.localeCompare(nameB);
          if (val === "name-desc") return nameB.localeCompare(nameA);
          return 0;
        });
        cards.forEach((c) => grid.insertBefore(c, noResults));
      });
    }
  }

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const svg = btn.querySelector("svg");
      const active = btn.dataset.active === "true";
      btn.dataset.active = !active;
      svg.setAttribute("fill", active ? "none" : "#e81e63");
      svg.style.stroke = active ? "currentColor" : "#e81e63";
      btn.style.background = active ? "#fff" : "#e81e63";
      btn.style.color = active ? "#666" : "#fff";
    });
  });
});

const HEART_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>`;

function buildProductCard(p) {
  const isUpload = p.img_main && !p.img_main.startsWith('assets/');
  const imgMain  = p.img_main  ? (isUpload ? `/uploads/${p.img_main}` : `/${p.img_main}`) : '';
  const imgHover = p.img_hover ? (p.img_hover.startsWith('assets/') ? `/${p.img_hover}` : `/uploads/${p.img_hover}`) : imgMain;
  const price = Number(p.price).toLocaleString("en-PK");
  return `
    <div class="product-card" data-brand="${escHtml(p.brand)}" data-price="${p.price}" data-name="${escHtml(p.name)}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
      <div class="img-wrap">
        <img class="img-main" src="${imgMain}" alt="${escHtml(p.name)} main"
             onerror="this.src='assets/main page/placeholder.png'">
        <img class="img-hover" src="${imgHover}" alt="${escHtml(p.name)} hover"
             onerror="this.src='assets/main page/placeholder.png'">
        <button class="wishlist-btn" aria-label="Add to wishlist" data-active="false"
                onclick="event.stopPropagation();toggleWishlist(this)">${HEART_SVG}</button>
        <div class="quick-add">SELECT OPTIONS</div>
      </div>
      <div class="product-info">
        <div class="vendor">${escHtml(p.brand)}</div>
        <h3>${escHtml(p.name)}</h3>
        <div class="price-wrap"><span class="price-sale">Rs.${price}</span></div>
      </div>
    </div>`;
}

function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toggleWishlist(btn) {
  const active = btn.dataset.active === "true";
  btn.dataset.active = String(!active);
  const svg = btn.querySelector("svg");
  svg.setAttribute("fill", active ? "none" : "#e81e63");
  svg.style.stroke = active ? "currentColor" : "#e81e63";
  btn.style.background = active ? "#fff" : "#e81e63";
  btn.style.color = active ? "#666" : "#fff";
}

async function loadProducts(collection) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  try {
    const url = "/api/products?collection=" + encodeURIComponent(collection);
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error " + res.status);
    const products = await res.json();
    if (!products.length) {
      grid.innerHTML = '<div class="empty-state">No products found in this collection.</div>';
      return;
    }
    grid.innerHTML = products.map(buildProductCard).join("");
  } catch (err) {
    console.error("loadProducts error:", err);
    grid.innerHTML = '<div class="empty-state">Could not load products. Please try again later.</div>';
  }
}
