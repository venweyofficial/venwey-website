const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement | null;
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Capability cards can preselect the relevant enquiry category.
document.querySelectorAll<HTMLElement>("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service") as HTMLSelectElement | null;
    if (serviceSelect && link.dataset.service) serviceSelect.value = link.dataset.service;
  });
});

// The form uses the visitor's email application; no backend is required for this starter version.
const contactForm = document.getElementById("contactForm") as HTMLFormElement | null;

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`VENWEY website enquiry — ${data.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
  );
  const status = document.getElementById("formStatus");
  if (status) status.textContent = "Opening your email app…";
  window.location.href = `mailto:venweyofficial@gmail.com?subject=${subject}&body=${body}`;
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

export {};
