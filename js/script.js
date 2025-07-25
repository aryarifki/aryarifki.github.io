/* Sidebar toggle for mobile */
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar ul li a').forEach(link=>{
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});
