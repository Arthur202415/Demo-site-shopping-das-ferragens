(() => {
  "use strict";
  const demoToast = document.querySelector(".demo-toast");
  let demoToastTimer;
  const showDemoMessage = () => {
    if (!demoToast) return;
    demoToast.classList.add("is-visible");
    window.clearTimeout(demoToastTimer);
    demoToastTimer = window.setTimeout(() => demoToast.classList.remove("is-visible"), 2600);
  };
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const external = href.startsWith("https://") || href.startsWith("http://") || href.startsWith("tel:");
    if (!external) return;
    event.preventDefault();
    showDemoMessage();
  }, true);
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav");
  if (button && menu) {
    const close = () => { menu.classList.remove("is-open"); button.setAttribute("aria-expanded", "false"); button.setAttribute("aria-label", "Abrir menu"); };
    button.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    menu.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) items.forEach((item) => item.classList.add("is-visible"));
  else {
    const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); current.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
  }));
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
