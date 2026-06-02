const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

// Controla la apertura y cierre del menú hamburguesa en pantallas pequeñas.
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const setFieldError = (field, message) => {
  const formGroup = field.closest(".form-group");
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.toggle("error", Boolean(message));
  errorMessage.textContent = message;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Valida el formulario sin recargar la página.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;
  let isValid = true;

  if (!name.value.trim()) {
    setFieldError(name, "Escribe tu nombre.");
    isValid = false;
  } else {
    setFieldError(name, "");
  }

  if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Escribe un correo válido.");
    isValid = false;
  } else {
    setFieldError(email, "");
  }

  if (!message.value.trim()) {
    setFieldError(message, "Escribe un mensaje.");
    isValid = false;
  } else {
    setFieldError(message, "");
  }

  if (!isValid) {
    formStatus.textContent = "";
    return;
  }

  contactForm.reset();
  formStatus.textContent = "Mensaje enviado correctamente.";

  setTimeout(() => {
    formStatus.textContent = "";
  }, 3500);
});

// Resalta el enlace de navegación según la sección visible.
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => observer.observe(section));
