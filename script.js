/* 
   RESISTÊNCIA - Interaction Scripts
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('main-header');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        
        // Transform hamburger to X
        const hamburger = document.querySelector('.hamburger');
        if (!isExpanded) {
            hamburger.style.backgroundColor = 'transparent';
            hamburger.style.setProperty('--pseudo-top', '0');
            hamburger.style.transform = 'rotate(45deg)';
            // Note: In a full app, CSS classes for the active state of the hamburger are cleaner.
            // But this minimal inline toggle works well for vanilla JS.
        } else {
            hamburger.style.backgroundColor = 'var(--creme)';
            hamburger.style.transform = 'rotate(0)';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. Reading Progress Bar & Header Scroll State
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        // Progress Bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
        
        // Header background opacity
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(23, 23, 23, 0.98)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.backgroundColor = 'rgba(23, 23, 23, 0.9)';
            header.style.padding = '1rem 0';
        }
        
        // Back to top button visibility
        const backToTop = document.getElementById('back-to-top');
        if (scrollTop > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // 3. Back to Top Button
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        
        fadeElements.forEach(el => appearOnScroll.observe(el));
    } else {
        // Fallback for old browsers or reduced motion: make everything visible immediately
        fadeElements.forEach(el => el.classList.add('visible'));
    }
});
