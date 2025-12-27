//custom cursor

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.6)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

//toggle themes
const toggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const storageKey = "theme";

/* 1️⃣ Cargar tema guardado */
const savedTheme = localStorage.getItem(storageKey);

if (savedTheme) {
  root.classList.add(`theme-${savedTheme}`);
}

/* 2️⃣ Toggle manual */
toggle.addEventListener("click", () => {
  const isDark = root.classList.contains("theme-dark");

  root.classList.remove(isDark ? "theme-dark" : "theme-light");
  root.classList.add(isDark ? "theme-light" : "theme-dark");

  localStorage.setItem(storageKey, isDark ? "light" : "dark");
});

//dinamic icon
const setIcon = () => {
  toggle.textContent = root.classList.contains("theme-dark") ? "☀️" : "🌙";
};

setIcon();

toggle.addEventListener("click", setIcon);
