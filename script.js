const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("year");

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const action = form.getAttribute("action") || "";
  if (action.includes("YOUR_FORM_ID")) {
    formStatus.textContent =
      "Form is not connected yet. Replace YOUR_FORM_ID in index.html with your Formspree form ID.";
    formStatus.className = "form-note error";
    return;
  }

  formStatus.textContent = "Sending...";
  formStatus.className = "form-note";

  try {
    const response = await fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      formStatus.textContent = "Thank you. We received your request and will be in touch soon.";
      formStatus.className = "form-note success";
      return;
    }

    throw new Error("Request failed");
  } catch {
    formStatus.textContent = "Something went wrong. Please try again or email us directly.";
    formStatus.className = "form-note error";
  }
});
