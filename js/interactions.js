// Parallax Effect with better performance and cross-browser support
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const transform = `translateY(${scrolled * speed}px)`;
        
        // Cross-browser transform
        element.style.transform = transform;
        element.style.webkitTransform = transform;
        element.style.msTransform = transform;
    });
    
    parallaxTicking = false;
}

function requestParallaxUpdate() {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

// Mouse follower - Only for devices with mouse support
function initMouseFollower() {
    // Check if device supports mouse (not touch-only device)
    if (window.matchMedia('(hover: hover)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth animation for follower
        function animateFollower() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursorFollower.style.left = cursorX + 'px';
            cursorFollower.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects
        document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
}

// Initialize mouse follower only on appropriate devices
initMouseFollower();

// Add cursor styles with cross-browser support
const style = document.createElement('style');
style.textContent = `
    @media (hover: hover) {
        .cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--neon-green);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s;
            will-change: transform;
        }
        
        .cursor-follower {
            width: 40px;
            height: 40px;
            background: rgba(57, 255, 20, 0.1);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s;
            will-change: transform;
        }
        
        .cursor.active {
            transform: scale(1.5);
        }
        
        /* Hide default cursor for mouse devices */
        body {
            cursor: none;
        }
    }
    
    /* Show default cursor for touch devices */
    @media (hover: none) {
        body {
            cursor: auto;
        }
    }
`;
document.head.appendChild(style);

// Particle effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Interactive background
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
});

// Glitch effect for text
function addGlitchEffect(element) {
    const text = element.textContent;
    element.setAttribute('data-text', text);
    
    element.style.cssText = `
        position: relative;
        display: inline-block;
    `;
    
    element.addEventListener('mouseenter', () => {
        element.classList.add('glitch');
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('glitch');
    });
}

// Apply glitch effect to titles
document.querySelectorAll('.section-title').forEach(addGlitchEffect);

// Add glitch styles
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    .glitch {
        animation: glitch 0.3s infinite;
    }
    
    @keyframes glitch {
        0% {
            text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #fc00ff;
        }
        15% {
            text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #fc00ff;
        }
        16% {
            text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #fc00ff;
        }
        49% {
            text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #fc00ff;
        }
        50% {
            text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #fc00ff;
        }
        99% {
            text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #fc00ff;
        }
        100% {
            text-shadow: -0.025em 0 0 #00fffc, -0.025em -0.025em 0 #fc00ff;
        }
    }
`;
document.head.appendChild(glitchStyle);
