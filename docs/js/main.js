/* Title shrinks */

const header = document.querySelector("header");
const page = document.querySelector(".page");
const hero = document.querySelector(".hero");

if (hero) {
  page.addEventListener("scroll", () => {
    header.classList.toggle("shrink", page.scrollTop > 50);
  });
} else {
  header.classList.add("shrink");
  header.style.position = "sticky";
}
