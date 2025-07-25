// ----------  INTERSECTION OBSERVER FOR ANIMATIONS  ----------
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Create intersection observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// ----------  CARD ANIMATION EFFECTS  ----------
function initCardAnimations() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    
    // Observe for scroll animations
    scrollObserver.observe(card);
    
    // Add enhanced hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ----------  PARALLAX EFFECT  ----------
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// ----------  TEXT TYPING ANIMATION  ----------
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ----------  FLOATING PARTICLES BACKGROUND  ----------
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const animationDuration = Math.random() * 20 + 10;
    const opacity = Math.random() * 0.5 + 0.1;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${animationDuration}s;
      animation-delay: ${Math.random() * animationDuration}s;
      opacity: ${opacity};
    `;
    
    particlesContainer.appendChild(particle);
  }
}

// ----------  SECTION REVEAL ANIMATIONS  ----------
function initSectionAnimations() {
  const sections = document.querySelectorAll('section, header');
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    scrollObserver.observe(section);
  });
}

// ----------  PROJECT CARD ANIMATIONS  ----------
function initProjectAnimations() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    card.style.setProperty('--animation-delay', `${index * 0.2}s`);
    scrollObserver.observe(card);
    
    // Add tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// ----------  CONTACT ITEM ANIMATIONS  ----------
function initContactAnimations() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach((item, index) => {
    item.style.setProperty('--animation-delay', `${index * 0.1}s`);
    scrollObserver.observe(item);
    
    // Add ripple effect on click
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;
      
      ripple.className = 'ripple';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ----------  LOADING ANIMATION  ----------
function initLoadingAnimation() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
      <div class="loader-text">Loading Portfolio...</div>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
        document.body.classList.add('loaded');
      }, 500);
    }, 1000);
  });
}

// ----------  HEADER ANIMATION  ----------
function initHeaderAnimation() {
  const header = document.querySelector('header');
  const title = header.querySelector('h1');
  const subtitle = header.querySelector('p');
  
  if (title && subtitle) {
    // Animate title on load
    setTimeout(() => {
      title.classList.add('title-animate');
    }, 500);
    
    // Animate subtitle after title
    setTimeout(() => {
      subtitle.classList.add('subtitle-animate');
    }, 1000);
  }
}

// ----------  INITIALIZE ALL ANIMATIONS  ----------
document.addEventListener('DOMContentLoaded', () => {
  initLoadingAnimation();
  initSectionAnimations();
  initCardAnimations();
  initProjectAnimations();
  initContactAnimations();
  initParallaxEffect();
  initHeaderAnimation();
  createFloatingParticles();
});