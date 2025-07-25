/* Sidebar toggle */
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar ul li a').forEach(link=>{
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

/* Dark mode */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const saved = localStorage.getItem('theme');
if(saved === 'dark') enableDark();
themeToggle.addEventListener('click', () => body.classList.contains('dark') ? enableLight() : enableDark());
function enableDark(){
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
  localStorage.setItem('theme','dark');
}
function enableLight(){
  body.classList.remove('dark');
  themeToggle.textContent = '🌙';
  localStorage.setItem('theme','light');
}
