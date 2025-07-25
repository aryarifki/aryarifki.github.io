/* =========================================================
   =                SCROLL & REVEAL  ANIMATIONS              =
   ========================================================= */

// 1️⃣ Reveal on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('animated'));
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// 2️⃣ Counter animation
function animateCounter(el, start, end, dur = 2000) {
    const inc = (end - start) / (dur / 16);
    let cur = start;
    const timer = setInterval(() => {
        cur += inc;
        if ((inc > 0 && cur >= end) || (inc < 0 && cur <= end)) {
            el.textContent = end;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(cur);
        }
    }, 16);
}

document.querySelectorAll('.stat-card h3').forEach(stat => {
    const final = parseInt(stat.textContent);
    stat.textContent = '0';
    new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting && animateCounter(stat, 0, final));
    }).observe(stat);
});

// 3️⃣ Type-writer for hero subtitle
function typeWriter(el, txt, spd = 50) {
    el.textContent = '';
    let i = 0;
    const type = () => {
        if (i < txt.length) {
            el.textContent += txt.charAt(i++);
            setTimeout(type, spd);
        }
    };
    type();
}

window.addEventListener('load', () => {
    const sub = document.querySelector('.hero-subtitle');
    if (sub) typeWriter(sub, sub.textContent, 50);
});

// 4️⃣ Skill tags stagger
document.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.animationDelay = `${i * 0.1}s`;
});

// 5️⃣ Timeline items
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.animationDelay = `${i * 0.2}s`;
});

// 6️⃣ Certificate flip
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'rotateY(10deg) scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'rotateY(0) scale(1)');
});

// 7️⃣ Floating cards
document.querySelectorAll('.floating-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.5}s`;
});

// 8️⃣ Form focus
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => !input.value && input.parentElement.classList.remove('focused'));
});

// 9️⃣ Loading text pulse
const loader = document.querySelector('.loader');
if (loader) {
    const txt = document.createElement('div');
    txt.textContent = 'Loading...';
    txt.style.cssText = `position:absolute;bottom:-40px;left:50%;transform:translateX(-50%);color:var(--neon-green);font-size:14px;animation:pulse 1.5s infinite`;
    loader.appendChild(txt);
}

// 🔟 Konami easter egg
let konami = [];
const secret = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
document.addEventListener('keydown', e => {
    konami.push(e.code);
    konami = konami.slice(-10);
    if (konami.join('') === secret) document.body.style.animation = 'rainbow 2s infinite';
});