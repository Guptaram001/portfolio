
let basePath = '';

// Check if current page is in a subfolder (like projects/)
if (window.location.pathname.includes('/projects/')) {
  basePath = '../';
}
if (window.location.pathname.includes('/experience/')) {
  basePath = '../';
}

const repoName = '/portfolio'; 

// Fetch navbar
fetch(`${basePath}navbar.html`)
  .then(response => {
    if (!response.ok) throw new Error("Navbar not found");
    return response.text();
  })
  .then(data => {
    const container = document.getElementById('navbar-container');
    container.innerHTML = data;

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") lucide.createIcons();

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('nav-right');
    if (hamburger && navRight) {
      hamburger.addEventListener('click', () => {
        navRight.classList.toggle('active');
      });
    }

    // Hero padding
    const hero = document.querySelector('.hero');
    const navbar = document.getElementById('navbar');
    function adjustHeroPadding() {
      if (hero && navbar) hero.style.paddingTop = navbar.offsetHeight + 'px';
    }
    window.addEventListener('resize', adjustHeroPadding);
    window.addEventListener('load', adjustHeroPadding);
    adjustHeroPadding();
  })
  .catch(err => console.error("Navbar load error:", err));