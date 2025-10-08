// Toggle sidebar menu
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Auto-update footer year
document.getElementById('year').textContent = new Date().getFullYear();
