// Loading Screen - Optimized duration
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    // Reduced from 2000ms to 1000ms for better UX
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const sideNav = document.getElementById('sideNav');

navToggle.addEventListener('click', toggleNav);

function toggleNav() {
    const isActive = navToggle.classList.toggle('active');
    sideNav.classList.toggle('active');
    
    // Update ARIA attribute for accessibility
    navToggle.setAttribute('aria-expanded', isActive);
    
    // Focus management for accessibility
    if (isActive) {
        // Focus first nav link when opened
        const firstNavLink = sideNav.querySelector('.nav-link');
        if (firstNavLink) firstNavLink.focus();
    }
}

// Keyboard navigation support
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
    }
});

// Close nav with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideNav.classList.contains('active')) {
        navToggle.classList.remove('active');
        sideNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus(); // Return focus to toggle button
    }
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
        sideNav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
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

// Form submission with improved accessibility
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data using the correct field names
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would normally send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
    
    // Return focus to the first form field for accessibility
    const firstInput = e.target.querySelector('input[type="text"]');
    if (firstInput) firstInput.focus();
});

// Update active nav link on scroll with improved debouncing
let lastScrollY = window.scrollY;
let ticking = false;
let scrollTimeout;

function updateNavOnScroll() {
    const currentScrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove auto-show navbar functionality - navbar only shows when manually toggled
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

// Debounced scroll event listener
function debouncedScrollHandler() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(requestScrollUpdate, 10);
}

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
