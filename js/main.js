/* ============ 1. LOADING SCREEN ============ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => (preloader.style.opacity = '0'),  500);
    setTimeout(() => (preloader.style.display = 'none'), 1000);
});

/* ============ 2. NAV TOGGLE (unchanged) ============ */
const navToggle = document.getElementById('nav-toggle');
const sideNav   = document.getElementById('side-nav');
navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    sideNav.classList.toggle('active');
});

/* ============ 3. SMOOTH SCROLL + ACTIVE LINK ============ */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        sideNav.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

/* ============ 4. SCROLL-SPY (lightweight) ============ */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const links    = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
});

/* ============ 5. FORM HANDLER ============ */
document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message!');
    e.target.reset();
});