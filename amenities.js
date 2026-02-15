// ============================================
// AMENITIES PAGE - PREMIUM SMOOTH ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // // ============================================
    // // DROPDOWN MENU TOGGLE FOR MOBILE
    // // ============================================
    // const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // navDropdowns.forEach(function (dropdown) {
    //     const toggle = dropdown.querySelector('.dropdown-toggle');

    //     if (toggle) {
    //         toggle.addEventListener('click', function (e) {
    //             if (window.innerWidth <= 768) {
    //                 e.preventDefault();
    //                 dropdown.classList.toggle('active');
    //             }
    //         });
    //     }
    // });

    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded, showing content without animations');
        return;
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // HEADER & HERO ANIMATION - FAST
    // ============================================
    const headerTl = gsap.timeline();

    headerTl.from('.amenities-header', {
        y: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    })
        .from('.section-intro .page-title, .section-intro .page-title-tamil, .section-intro .page-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.3');

    // ============================================
    // AMENITY CARDS - ELAGANT SLIDE & FADE
    // ============================================
    const amenityCards = document.querySelectorAll('.amenity-card');

    amenityCards.forEach((card, index) => {
        const isEven = index % 2 !== 0;
        const cardImage = card.querySelector('.card-image');
        const cardContent = card.querySelector('.card-content');

        // Setup initial state
        gsap.set(cardImage, {
            opacity: 0,
            x: isEven ? 50 : -50,
            scale: 0.95
        });

        gsap.set(cardContent, {
            opacity: 0,
            y: 30
        });

        // Animation for image and content
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 90%', // Trigger earlier
                toggleActions: 'play none none none',
            }
        });

        tl.to(cardImage, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
        })
            .to(cardContent, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.3');

        // Staggered features list
        const features = card.querySelectorAll('.feature-tag');
        gsap.from(features, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            opacity: 0,
            y: 10,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // ============================================
    // ADDITIONAL FEATURES - SNAP TRIGGER
    // ============================================
    const featureItems = document.querySelectorAll('.feature-item');

    gsap.from(featureItems, {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 98%', // Almost immediate
        },
        opacity: 0,
        y: 20,
        scale: 0.98,
        stagger: 0.02,
        duration: 0.4,
        ease: 'power2.out'
    });

    // ============================================
    // CTA SECTION
    // ============================================
    if (document.querySelector('.cta-section')) {
        gsap.from('.cta-content', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 95%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    }

    console.log('Amenities page optimized animations initialized');
});

