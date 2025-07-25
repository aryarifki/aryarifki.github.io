document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior

            // Remove 'active' class from all nav links and content sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add 'active' class to the clicked nav link
            link.classList.add('active');

            // Get the target section ID from the data-target attribute
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);

            // Add 'active' class to the corresponding content section
            if (targetSection) {
                targetSection.classList.add('active');
                // Optional: Scroll to the top of the main content area
                document.querySelector('.main-content').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set the initial active state (Home section)
    const initialActiveNavLink = document.querySelector('.nav-link.active');
    const initialActiveSection = document.querySelector('.content-section.active');

    if (!initialActiveNavLink) {
        document.querySelector('.nav-link[data-target="home"]').classList.add('active');
    }
    if (!initialActiveSection) {
        document.getElementById('home').classList.add('active');
    }
});
