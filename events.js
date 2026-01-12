// ============================================
// EVENTS PAGE JAVASCRIPT - FAST & SMOOTH
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

    // ============================================
    // CHECK GSAP AVAILABILITY
    // ============================================
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded, showing content without animations');
        document.querySelectorAll('.event-card, .feature-item, .intro-content, .cta-content').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Set GSAP defaults for snappy animations
    gsap.defaults({
        ease: 'power2.out',
        overwrite: 'auto'
    });

    // ============================================
    // INTRO SECTION ANIMATION - INSTANT
    // ============================================
    gsap.from('.intro-content', {
        scrollTrigger: {
            trigger: '.events-intro',
            start: 'top 95%',
            toggleActions: 'play none none none'
        },
        duration: 0.35,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    });

    // ============================================
    // EVENT CARDS - FAST FLIP ANIMATION
    // ============================================
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        // Set initial state
        gsap.set(card, {
            opacity: 0,
            rotateY: 90,
            transformPerspective: 1000,
            transformOrigin: 'center center'
        });

        // Fast flip animation on scroll
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            duration: 0.4,
            rotateY: 0,
            opacity: 1,
            delay: index * 0.05,
            ease: 'power2.out',
            onComplete: () => {
                card.classList.add('animated');
            }
        });

        // Quick icon pop
        const cardIcon = card.querySelector('.card-icon');
        if (cardIcon) {
            gsap.from(cardIcon, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                duration: 0.25,
                scale: 0,
                rotation: 90,
                delay: (index * 0.05) + 0.2,
                ease: 'back.out(2)'
            });
        }

        // Fast feature list animation
        const features = card.querySelectorAll('.card-features li');
        gsap.from(features, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            duration: 0.2,
            x: -15,
            opacity: 0,
            stagger: 0.03,
            delay: (index * 0.05) + 0.25,
            ease: 'power2.out'
        });
    });

    // ============================================
    // CTA SECTION - SNAPPY ANIMATION
    // ============================================
    const ctaTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.events-cta',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    ctaTimeline
        .from('.cta-content', {
            duration: 0.35,
            y: 25,
            opacity: 0
        })
        .from('.cta-buttons .btn', {
            duration: 0.25,
            y: 15,
            opacity: 0,
            stagger: 0.08
        }, '-=0.15')
        .from('.cta-mandala-left, .cta-mandala-right', {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            stagger: 0.08,
            ease: 'back.out(2)'
        }, '-=0.2');

    // ============================================
    // FOOTER - QUICK REVEAL
    // ============================================
    gsap.from('.common-footer .footer-top > *', {
        scrollTrigger: {
            trigger: '.common-footer',
            start: 'top 98%',
            toggleActions: 'play none none none'
        },
        duration: 0.25,
        y: 15,
        opacity: 0,
        stagger: 0.04,
        ease: 'power2.out'
    });

    // ============================================
    // SMOOTH PARALLAX FOR MANDALAS
    // ============================================
    const mandalas = document.querySelectorAll('.mandala-decor');
    
    mandalas.forEach(mandala => {
        gsap.to(mandala, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            },
            y: window.innerHeight * 0.2,
            ease: 'none'
        });
    });

    // ============================================
    // FAST HOVER EFFECTS
    // ============================================
    eventCards.forEach(card => {
        const image = card.querySelector('.card-image img');
        const icon = card.querySelector('.card-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(image, {
                duration: 0.3,
                scale: 1.08,
                ease: 'power2.out'
            });
            if (icon) {
                gsap.to(icon, {
                    duration: 0.2,
                    scale: 1.15,
                    ease: 'back.out(2)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                duration: 0.25,
                scale: 1,
                ease: 'power2.out'
            });
            if (icon) {
                gsap.to(icon, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });

    // ============================================
    // BUTTON HOVER ANIMATIONS
    // ============================================
    const buttons = document.querySelectorAll('.card-btn, .btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.2,
                scale: 1.03,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.15,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    console.log('Events page - Fast animations initialized');
});
