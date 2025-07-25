/* =========================================================
   =                 INTERACTION EXTRAS                      =
   ========================================================= */

// 1️⃣ Parallax
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${window.pageYOffset * speed}px)`;
    });
});

// 2️⃣ Custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(follower);

document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top  = `${e.clientY}px`;
    setTimeout(() => {
        follower.style.left = `${e.clientX}px`;
        follower.style.top  = `${e.clientY}px`;
    }, 100);
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// 3️⃣ Particles
function createParticles() {
    const box = document.createElement('div');
    box.className = 'particles';
    document.body.appendChild(box);
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (Math.random() * 10 + 15) + 's';
        box.appendChild(p);
    }
}
createParticles();

// 4️⃣ Glitch on hover
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => title.classList.add('glitch'));
    title.addEventListener('mouseleave', () => title.classList.remove('glitch'));
});