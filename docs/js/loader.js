window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // pequeño delay para que no “parpadee”
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 300);
});
