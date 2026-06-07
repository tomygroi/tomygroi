const menuHeader = document.querySelector(".menu-header ul");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
      menuHeader.style.backgroundColor = "#01213fd5";
  } else {
    menuHeader.style.backgroundColor = "transparent";
    
  }
});
