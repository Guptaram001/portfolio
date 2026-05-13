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
   fetch('https://github-contributions-api.jogruber.de/v4/Guptaram001?y=last')
            .then(r => r.json())
            .then(data => {
                const now = new Date();
                const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                const thisMonth = data.contributions.filter(d => d.date.startsWith(currentMonth));
                new Chart(document.getElementById('activity-graph'), {
                    type: 'line',
                    data: {
                        labels: thisMonth.map(d => d.date.slice(8)),
                        datasets: [{
                            label: 'Contributions',
                            data: thisMonth.map(d => d.count),
                            borderColor: '#7c3aed',
                            backgroundColor: 'rgba(24, 24, 45, 0.3)',
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                            pointHoverBackgroundColor: '#7c3aed',
                            fill: true,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Day',  
                                    color: '#94a3b8',
                                    font: { size: 12 }
                                },
                                ticks: { color: '#94a3b8' },
                                grid: { display: false }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Contributions', 
                                    color: '#94a3b8',
                                    font: { size: 12 }
                                },
                                ticks: { color: '#94a3b8' },
                                grid: { color: '#21262d' }
                            }
                        }
                    }
                });
            });