const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("year");
const productGrid = document.getElementById("product-grid");
const galleryGrid = document.getElementById("gallery-grid");
const interestSelect = document.getElementById("interest");

yearEl.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function renderProducts() {
  productGrid.innerHTML = STONE_PRODUCTS.map((product) => {
    const swatches = product.swatches
      .map(
        (swatch) =>
          `<img class="swatch" src="${swatch.image}" alt="${product.name} — ${swatch.label}" title="${swatch.label}" loading="lazy">`
      )
      .join("");

    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name} flexible soft stone panel" loading="lazy">
        <div class="product-body">
          <h3>${product.name}</h3>
          <p class="product-meta">Sizes: ${product.sizes} · ${product.thickness} thick</p>
          <div class="swatch-row">${swatches}</div>
        </div>
      </article>
    `;
  }).join("");

  interestSelect.innerHTML = `
    <option value="">Select a product</option>
    ${STONE_PRODUCTS.map((p) => `<option value="${p.name}">${p.name}</option>`).join("")}
    <option value="Full Catalog">Full Catalog</option>
    <option value="Other">Other / Not Sure</option>
  `;
}

function renderGallery() {
  galleryGrid.innerHTML = GALLERY_IMAGES.map(
    (item) => `
      <figure>
        <img src="${item.image}" alt="${item.label}" loading="lazy">
        <figcaption>${item.label}</figcaption>
      </figure>
    `
  ).join("");
}

renderProducts();
renderGallery();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.textContent = "Sending...";
  formStatus.className = "form-note";

  try {
    const response = await fetch("https://formsubmit.co/ajax/thepotterpad@gmail.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });

    if (response.ok) {
      form.reset();
      formStatus.textContent = "Thank you. We received your request and will be in touch soon.";
      formStatus.className = "form-note success";
      return;
    }

    throw new Error("Request failed");
  } catch {
    formStatus.textContent = "Something went wrong. Please try again.";
    formStatus.className = "form-note error";
  }
});
