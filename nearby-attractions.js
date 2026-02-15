/* ============================================
   NEARBY ATTRACTIONS PAGE - ANIMATIONS
   Fast, smooth animations with GSAP
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
   
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // FAST INITIAL LOAD ANIMATIONS
    // ============================================
   
    // Header animation - immediate
    gsap.to('.nearby-header', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1
    });

    // Featured card animation
    gsap.to('.featured-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.2
    });

    // Filter buttons - staggered fast animation
    gsap.to('.filter-btn', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
        delay: 0.3
    });

    // Section titles
    gsap.to('.section-title, .section-title-tamil', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.4
    });

    // First 2 cards animate via CSS
    // Remaining cards animate on scroll via Intersection Observer

    // ============================================
    // MANDALA PARALLAX & SPREADING EFFECT
    // ============================================
   
    const mandalas = document.querySelectorAll('.mandala-pattern');
    const mandalaSpread = document.querySelector('.mandala-spread');
   
    // Throttled scroll handler for performance
    let ticking = false;
   
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.scrollY;
                const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
               
                // Rotate and move mandalas based on scroll
                mandalas.forEach((mandala, index) => {
                    const speed = 0.03 + (index * 0.015);
                    const rotation = scrollY * speed;
                    const yOffset = scrollY * (0.08 + index * 0.03);
                    const scale = 1 + (scrollPercent * 0.2 * (index + 1) * 0.3);
                   
                    mandala.style.transform = `rotate(${rotation}deg) translateY(${yOffset * (index % 2 === 0 ? 1 : -1)}px) scale(${scale})`;
                    mandala.style.opacity = 0.06 + (scrollPercent * 0.04);
                });
               
                // Spread effect - increase opacity and scale as user scrolls
                if (mandalaSpread) {
                    const spreadOpacity = 0.3 + (scrollPercent * 0.4);
                    mandalaSpread.style.opacity = spreadOpacity;
                    mandalaSpread.style.transform = `scale(${1 + scrollPercent * 0.1})`;
                }
               
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // CATEGORY FILTER FUNCTIONALITY
    // ============================================
   
    const filterButtons = document.querySelectorAll('.filter-btn');
    const attractionCards = document.querySelectorAll('.attraction-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
           
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Animate button
            gsap.fromTo(this,
                { scale: 0.95 },
                { scale: 1, duration: 0.2, ease: 'back.out(2)' }
            );

            // Filter and animate cards
            attractionCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    card.style.display = 'block';
                    gsap.fromTo(card,
                        { opacity: 0, y: 30, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            delay: index * 0.05,
                            ease: 'power2.out'
                        }
                    );
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.2,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // ============================================
    // FAVORITE BUTTON FUNCTIONALITY
    // ============================================
   
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
           
            // Heart animation
            gsap.fromTo(this,
                { scale: 0.7 },
                { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
            );

            // Change icon fill when active
            const svg = this.querySelector('svg');
            if (this.classList.contains('active')) {
                svg.style.fill = 'currentColor';
            } else {
                svg.style.fill = 'none';
            }
        });
    });

    // ============================================
    // CARD HOVER ANIMATIONS
    // ============================================
   
    attractionCards.forEach(card => {
        const image = card.querySelector('.card-image img');
        const exploreBtn = card.querySelector('.explore-btn');

        card.addEventListener('mouseenter', function() {
            gsap.to(image, {
                scale: 1.08,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // SCROLL-TRIGGERED ANIMATIONS - 2 CARDS AT A TIME
    // ============================================
   
    // Get all cards except first 2 (they animate on load)
    const scrollCards = document.querySelectorAll('.attraction-card:nth-child(n+3)');
   
    // Create Intersection Observer for scroll animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                // Add small delay for staggered effect within pairs
                const delay = (index % 2) * 0.1; // 0 or 0.1s
               
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, delay * 1000);
               
                // Stop observing once animated
                cardObserver.unobserve(card);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
   
    // Observe cards 3 onwards
    scrollCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ============================================
    // FEATURED IMAGE PARALLAX
    // ============================================
   
    const featuredImage = document.querySelector('.featured-image img');
    if (featuredImage) {
        gsap.to(featuredImage, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.featured-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // ============================================
    // EXPLORE BUTTON RIPPLE EFFECT
    // ============================================
   
    const exploreBtns = document.querySelectorAll('.explore-btn');
   
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
            `;
           
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
           
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
           
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR BACK BUTTON
    // ============================================
   
    // Already using default link behavior

    // ============================================
    // PAGE VISIBILITY ANIMATION
    // ============================================
   
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Refresh animations when page becomes visible again
            ScrollTrigger.refresh();
        }
    });

    // ============================================
    // LOADING COMPLETE
    // ============================================
   
    // Mark page as loaded
    document.body.classList.add('loaded');
   
    console.log('Nearby Attractions page loaded with fast animations!');
});

// ============================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

