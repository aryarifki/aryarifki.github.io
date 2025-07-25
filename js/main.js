// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const sideNav = document.getElementById('sideNav');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    sideNav.classList.toggle('active');
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
        sideNav.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close nav on mobile
        sideNav.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Smooth scroll
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // Here you would normally send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
});

// Update active nav link on scroll
let lastScrollY = window.scrollY;
let isScrollingDown = false;
let ticking = false;

function updateNavOnScroll() {
    const currentScrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past hero section
        isScrollingDown = true;
        sideNav.classList.add('scroll-visible');
    } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolling up or at top
        isScrollingDown = false;
        sideNav.classList.remove('scroll-visible');
    }
    
    lastScrollY = currentScrollY;
    
    // Update active nav link
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (currentScrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);
