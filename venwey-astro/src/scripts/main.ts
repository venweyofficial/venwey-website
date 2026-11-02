const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement | null;
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  const dropdowns = navLinks.querySelectorAll<HTMLDetailsElement>(".nav-dropdown");
  const desktopHover = window.matchMedia("(hover: hover) and (min-width: 901px)");

  dropdowns.forEach((dropdown) => {
    let closeTimer = 0;

    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) otherDropdown.open = false;
      });
    });

    dropdown.addEventListener("pointerenter", (event) => {
      if (!desktopHover.matches || event.pointerType === "touch") return;
      window.clearTimeout(closeTimer);
      dropdown.open = true;
    });

    dropdown.addEventListener("pointerleave", (event) => {
      if (!desktopHover.matches || event.pointerType === "touch") return;
      closeTimer = window.setTimeout(() => {
        if (!dropdown.matches(":hover") && !dropdown.contains(document.activeElement)) dropdown.open = false;
      }, 180);
    });
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      dropdowns.forEach((dropdown) => {
        dropdown.open = false;
      });
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Capability cards can preselect the relevant enquiry category.
document.querySelectorAll<HTMLElement>("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!link.dataset.service) return;
    document.querySelectorAll<HTMLSelectElement>('.contact-form select[name="service"]').forEach((serviceSelect) => {
      serviceSelect.value = link.dataset.service!;
    });
  });
});

// The forms use the visitor's email application; no backend is required for this starter version.
document.querySelectorAll<HTMLFormElement>(".contact-form").forEach((contactForm) => {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = encodeURIComponent(`Venwey website enquiry - ${data.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
    );
    const status = form.querySelector<HTMLElement>(".form-status");
    if (status) status.textContent = "Opening your email app...";
    window.location.href = `mailto:venweyofficial@gmail.com?subject=${subject}&body=${body}`;
  });
});

const contactDialog = document.getElementById("contactDialog") as HTMLDialogElement | null;

if (contactDialog) {
  const closeContactDialog = () => contactDialog.close();
  const closeButton = contactDialog.querySelector<HTMLButtonElement>("[data-close-contact-dialog]");

  closeButton?.addEventListener("click", closeContactDialog);
  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) closeContactDialog();
  });
  contactDialog.addEventListener("close", () => {
    document.documentElement.classList.remove("contact-dialog-open");
    try {
      sessionStorage.setItem("venwey-contact-dialog-dismissed", "true");
    } catch {
      // The dialog still works if the browser blocks session storage.
    }
  });

  let wasDismissed = false;
  try {
    wasDismissed = sessionStorage.getItem("venwey-contact-dialog-dismissed") === "true";
  } catch {
    // Open the dialog normally if the browser blocks session storage.
  }

  if (!wasDismissed) {
    window.setTimeout(() => {
      if (contactDialog.open) return;
      contactDialog.showModal();
      document.documentElement.classList.add("contact-dialog-open");
    }, 500);
  }
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const revealTargets = document.querySelectorAll<HTMLElement>(
  "h1, h2, h3, p, li, label, .button, .text-link, .card-link, .nav-contact, .nav-dropdown > summary, .nav-dropdown-menu a, footer a, .contact-dialog-close"
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

  revealTargets.forEach((target) => {
    const siblings = Array.from(target.parentElement?.children ?? []);
    const siblingIndex = siblings.indexOf(target);
    target.style.setProperty("--reveal-delay", `${Math.min(Math.max(siblingIndex, 0), 4) * 55}ms`);
    target.classList.add("reveal-on-scroll");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

export {};
