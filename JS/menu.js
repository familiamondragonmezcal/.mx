document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // MENU
  const menuBtn = document.querySelector(".menu-btn");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.add("active");
    });
  }

  if (closeMenu && sideMenu) {
    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });
  }

});