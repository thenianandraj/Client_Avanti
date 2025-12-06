// GSAP Rich Animations
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set default ease for smoother animations
    gsap.defaults({ ease: "power2.out" });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        gsap.to(navbar, {
            scrollTrigger: {
                trigger: "body",
                start: "top -50",
                end: "bottom bottom",
                onEnter: () => navbar.classList.add('scrolled'),
                onLeaveBack: () => navbar.classList.remove('scrolled')
            }
        });
    }
    
    // Hero text animation (home page only)
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const heroSubtitle = heroText.querySelector('.hero-subtitle');
        const heroH1 = heroText.querySelector('h1');
        const heroTagline = heroText.querySelector('.hero-tagline');
        const heroDescription = heroText.querySelector('.hero-description');
        const heroBtn = heroText.querySelector('.btn');
        
        const heroTl = gsap.timeline({ delay: 0.3 });
        
        if (heroSubtitle) {
            heroTl.from(heroSubtitle, {
                opacity: 0,
                y: 30,
                duration: 0.8
            });
        }
        
        if (heroH1) {
            heroTl.from(heroH1, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");
        }
        
        if (heroTagline) {
            heroTl.from(heroTagline, {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, "-=0.6");
        }
        
        if (heroDescription) {
            heroTl.from(heroDescription, {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, "-=0.5");
        }
        
        if (heroBtn) {
            heroTl.from(heroBtn, {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.8
            }, "-=0.4");
        }
    }
    
    // Mission & Vision sections animation
    const missionSection = document.querySelector('.mission-section');
    if (missionSection) {
        const missionH2 = missionSection.querySelector('h2');
        const missionStatement = missionSection.querySelector('.mission-statement');
        
        gsap.from(missionH2, {
            scrollTrigger: {
                trigger: missionSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from(missionStatement, {
            scrollTrigger: {
                trigger: missionSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out"
        });
    }
    
    const visionSection = document.querySelector('.vision-section');
    if (visionSection) {
        const visionH2 = visionSection.querySelector('h2');
        const visionStatement = visionSection.querySelector('.vision-statement');
        
        gsap.from(visionH2, {
            scrollTrigger: {
                trigger: visionSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from(visionStatement, {
            scrollTrigger: {
                trigger: visionSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out"
        });
    }
    
    // Feature cards staggered animation
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.from(featureCards, {
            scrollTrigger: {
                trigger: ".features",
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 1,
            stagger: {
                amount: 0.8,
                from: "start"
            },
            ease: "power3.out"
        });
    }
    
    // Service cards staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: ".content-section",
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 1,
            stagger: {
                amount: 0.8,
                from: "start"
            },
            ease: "power3.out"
        });
    }
    
    // Gallery items animation with scale effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        gsap.from(galleryItems, {
            scrollTrigger: {
                trigger: ".gallery-grid",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotation: 2,
            duration: 1.2,
            stagger: {
                amount: 1,
                from: "random"
            },
            ease: "back.out(1.2)"
        });
    }
    
    // Section headings animation
    const sectionHeadings = document.querySelectorAll('.features h2, .content-section h2, .contact-info h2, .contact-form h2');
    sectionHeadings.forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Content text animation
    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach((text, index) => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 1.2,
            delay: 0.2,
            ease: "power2.out"
        });
    });
    
    // Contact info items animation
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length > 0) {
        gsap.from(infoItems, {
            scrollTrigger: {
                trigger: ".contact-info",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -40,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
    
    // Page header animation
    const pageHeaders = document.querySelectorAll('.page-header h1, .page-header p');
    if (pageHeaders.length > 0) {
        gsap.from(pageHeaders, {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (heroSection && heroContent) {
        gsap.to(heroContent, {
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            y: 200,
            ease: "none"
        });
    }
    
    // Smooth hover animations for cards
    const cards = document.querySelectorAll('.feature-card, .service-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -15,
                scale: 1.02,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Logo animation on load
    const logo = document.querySelector('.logo img');
    if (logo) {
        gsap.from(logo, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.2
        });
    }
    
    // Navigation menu items animation
    const navItems = document.querySelectorAll('.nav-menu a');
    if (navItems.length > 0) {
        gsap.from(navItems, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out"
        });
    }
    
    // Form inputs animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach((input, index) => {
        gsap.from(input, {
            scrollTrigger: {
                trigger: input,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
    
    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            ScrollTrigger.refresh();
        }, 250);
    });
});
