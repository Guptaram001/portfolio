
const repoName = '/portfolio'; 

let basePath = '';
const pathParts = window.location.pathname.split('/');
if (pathParts.includes(repoName.replace('/', '')) && pathParts.length > 2) {
  basePath = '../'; 
}

fetch(`${basePath}navbar.html`)
  .then(response => {
    if (!response.ok) throw new Error("Navbar not found");
    return response.text();
  })
  .then(data => {
    const container = document.getElementById('navbar-container');
    container.innerHTML = data;

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('nav-right');
    if (hamburger && navRight) {
      hamburger.addEventListener('click', () => {
        navRight.classList.toggle('active');
      });
    }

    const hero = document.querySelector('.hero');
    const navbar = document.getElementById('navbar');
    function adjustHeroPadding() {
      if (hero && navbar) {
        hero.style.paddingTop = navbar.offsetHeight + 'px';
      }
    }
    window.addEventListener('resize', adjustHeroPadding);
    window.addEventListener('load', adjustHeroPadding);
    adjustHeroPadding();
  })
  .catch(err => console.error("Navbar load error:", err));