/* Title shrinks */

const header = document.querySelector("header");
const page = document.querySelector(".page");

page.addEventListener("scroll", () => {
  header.classList.toggle("shrink", page.scrollTop > 50);
});

/* Image on hover covers all card */
