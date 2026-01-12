// ============================================
// AMENITIES PAGE - SMOOTH ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (except dropdown toggles)
        navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // DROPDOWN MENU TOGGLE FOR MOBILE
    // ============================================
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navDropdowns.forEach(function(dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Ensure feature items and cta are visible (cards will be animated separately)
    document.querySelectorAll('.feature-item, .cta-section').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded, showing content without animations');
        // Show all content without animations
        document.querySelectorAll('.amenity-card .card-image, .amenity-card .card-content, .amenity-card .card-icon').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // HEADER ANIMATION - FAST
    // ============================================
    gsap.from('.amenities-header', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });

    // ============================================
    // SECTION INTRO ANIMATION - FAST
    // ============================================
    gsap.from('.section-intro .mandala-divider', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: 'back.out(1.5)'
    });

    // ============================================
    // AMENITY CARDS - FAST POP UP ZOOM IN ANIMATION
    // ============================================
    const amenityCards = document.querySelectorAll('.amenity-card');
    
    amenityCards.forEach((card, index) => {
        const cardImage = card.querySelector('.card-image');
        const cardContent = card.querySelector('.card-content');
        
        // Set initial states - small scale for pop-up effect
        if (cardImage) {
            gsap.set(cardImage, { 
                opacity: 0, 
                scale: 0.5
            });
        }
        
        if (cardContent) {
            gsap.set(cardContent, { 
                opacity: 0, 
                scale: 0.5
            });
        }
        
        // Animate IMAGE - FAST POP UP (same as content)
        if (cardImage) {
            gsap.to(cardImage, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.7)'
            });
        }
        
        // Animate CONTENT - FAST POP UP (same speed as image)
        if (cardContent) {
            gsap.to(cardContent, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 1,
                scale: 1,
                duration: 0.35,
                delay: 0.1,
                ease: 'back.out(1.7)'
            });
        }

        // Animate card icon - quick pop
        const cardIcon = card.querySelector('.card-icon');
        if (cardIcon) {
            gsap.set(cardIcon, { opacity: 0, scale: 0 });
            gsap.to(cardIcon, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                scale: 1,
                opacity: 1,
                duration: 0.25,
                delay: 0.2,
                ease: 'back.out(2)'
            });
        }
    });

    // ============================================
    // SUBTLE FLOAT EFFECT ON SCROLL
    // ============================================
    amenityCards.forEach(card => {
        const cardImage = card.querySelector('.card-image');
        if (cardImage) {
            gsap.to(cardImage, {
                y: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        }
    });

    // ============================================
    // ADDITIONAL FEATURES - FAST STAGGERED ANIMATION
    // ============================================
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.3,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });

    // ============================================
    // CTA SECTION ANIMATION - FAST
    // ============================================
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        gsap.from(ctaSection, {
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    // ============================================
    // HOVER EFFECTS - SNAPPY
    // ============================================
    amenityCards.forEach(card => {
        const icon = card.querySelector('.card-icon');
        
        if (icon) {
            card.addEventListener('mouseenter', function() {
                gsap.to(icon, {
                    scale: 1.15,
                    rotation: 10,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        }
    });

    // Feature items hover - snappy
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('Amenities page animations initialized');
});
