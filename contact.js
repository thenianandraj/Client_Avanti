// ============================================
// CONTACT PAGE - ANIMATIONS
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

        // Close menu when clicking on a link (except dropdown toggles)
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
    // HEADER ANIMATION
    // ============================================
    gsap.from('.contact-header', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });

    // ============================================
    // HERO ANIMATION
    // ============================================
    gsap.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2.out'
    });

    gsap.from('.hero-title-tamil', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.mandala-divider', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'back.out(1.5)'
    });

    // ============================================
    // INFO CARDS - POP UP ANIMATION
    // ============================================
    const infoCards = document.querySelectorAll('.info-card');

    infoCards.forEach((card, index) => {
        gsap.set(card, {
            opacity: 0,
            scale: 0.5,
            y: 30
        });

        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'back.out(1.5)'
        });
    });

    // ============================================
    // FORM WRAPPER ANIMATION
    // ============================================
    const formWrapper = document.querySelector('.contact-form-wrapper');

    if (formWrapper) {
        gsap.set(formWrapper, { opacity: 0, x: -50 });

        gsap.to(formWrapper, {
            scrollTrigger: {
                trigger: formWrapper,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    // ============================================
    // MAP WRAPPER ANIMATION
    // ============================================
    const mapWrapper = document.querySelector('.map-wrapper');

    if (mapWrapper) {
        gsap.set(mapWrapper, { opacity: 0, x: 50 });

        gsap.to(mapWrapper, {
            scrollTrigger: {
                trigger: mapWrapper,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.1,
            ease: 'power2.out'
        });
    }

    // ============================================
    // FORM FIELDS ANIMATION
    // ============================================
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: group,
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 20,
            duration: 0.3,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });

    // ============================================
    // HOVER EFFECTS
    // ============================================
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, {
                y: -8,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // FORM SUBMISSION - REDIRECT TO WHATSAPP
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Format message for WhatsApp
            let message = `*New Event Inquiry from Avanti Mahal Website*\n\n`;
            message += `*Name:* ${data.name}\n`;
            message += `*Phone:* ${data.phone}\n`;
            message += `*Email:* ${data.email}\n`;
            message += `*Event Type:* ${data.event}\n`;
            message += `*Preferred Date:* ${data.date}\n`;
            message += `*Message:* ${data.message}\n`;

            // WhatsApp number and URL
            const whatsappNumber = '917305180177';
            const whatsappURL = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success animation
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Opening WhatsApp...</span> ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';

            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);

            console.log('Form submitted to WhatsApp:', data);
        });
    }

    console.log('Contact page animations initialized');
});


