/**
 * AVANTI Gallery Page - JavaScript
 * Handles filtering, lightbox, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.gallery-header .nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link (except dropdown toggles)
        navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
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
    // GALLERY ITEMS ANIMATION
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Initial animation on page load for visible items
        gsap.fromTo(item, 
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onComplete: () => {
                    item.classList.add('animate-in');
                }
            }
        );
    });

    // ============================================
    // CATEGORY FILTERING
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const emptyState = document.querySelector('.gallery-empty');
    let currentFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items with animation
            filterGallery(filter);
            currentFilter = filter;
        });
    });

    function filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        let visibleCount = 0;

        items.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                visibleCount++;
                // Animate in
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    delay: visibleCount * 0.05,
                    ease: 'power2.out',
                    onStart: () => {
                        item.style.display = 'block';
                        item.style.position = 'relative';
                    }
                });
            } else {
                // Animate out
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });

        // Show/hide empty state
        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
                gsap.fromTo(emptyState, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4 }
                );
            } else {
                emptyState.style.display = 'none';
            }
        }
    }

    // ============================================
    // LIGHTBOX FUNCTIONALITY
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox-image');
    const lightboxTitle = lightbox?.querySelector('.lightbox-title');
    const lightboxSubtitle = lightbox?.querySelector('.lightbox-subtitle');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
    const lightboxNext = lightbox?.querySelector('.lightbox-next');
    const lightboxCurrent = lightbox?.querySelector('.lightbox-counter .current');
    const lightboxTotal = lightbox?.querySelector('.lightbox-counter .total');

    let currentImageIndex = 0;
    let visibleImages = [];

    // Get visible images based on current filter
    function getVisibleImages() {
        const items = document.querySelectorAll('.gallery-item');
        return Array.from(items).filter(item => {
            return currentFilter === 'all' || item.dataset.category === currentFilter;
        });
    }

    // Open lightbox
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            visibleImages = getVisibleImages();
            currentImageIndex = visibleImages.indexOf(item);
            
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3')?.textContent || '';
        const subtitle = item.querySelector('.info-tamil')?.textContent || '';

        if (lightboxImage) lightboxImage.src = img.src;
        if (lightboxImage) lightboxImage.alt = img.alt;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle;
        
        updateCounter();
        
        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateCounter() {
        if (lightboxCurrent) lightboxCurrent.textContent = currentImageIndex + 1;
        if (lightboxTotal) lightboxTotal.textContent = visibleImages.length;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const item = visibleImages[currentImageIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3')?.textContent || '';
        const subtitle = item.querySelector('.info-tamil')?.textContent || '';

        // Fade out
        gsap.to(lightboxImage, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            onComplete: () => {
                if (lightboxImage) {
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt;
                }
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle;
                
                // Fade in
                gsap.to(lightboxImage, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3
                });
            }
        });

        updateCounter();
    }

    // Event listeners for lightbox
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrevImage);
    lightboxNext?.addEventListener('click', showNextImage);

    // Close on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch/swipe support for lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }

    // ============================================
    // HERO SECTION PARALLAX
    // ============================================
    const heroSection = document.querySelector('.gallery-hero');
    
    if (heroSection) {
        gsap.to('.gallery-hero .hero-content', {
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 80,
            opacity: 0.3
        });
    }

    // ============================================
    // FILTER BUTTONS ANIMATION
    // ============================================
    filterBtns.forEach((btn, index) => {
        gsap.fromTo(btn,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.5 + (index * 0.08),
                ease: 'power2.out'
            }
        );
    });

    // ============================================
    // CTA SECTION ANIMATION
    // ============================================
    const ctaSection = document.querySelector('.gallery-cta');
    
    if (ctaSection) {
        gsap.fromTo('.cta-content',
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaSection,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // LAZY LOADING IMAGES
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
        threshold: 0.01
    });

    document.querySelectorAll('.gallery-image img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // HEADER SCROLL EFFECT - FIXED NAVBAR
    // ============================================
    const header = document.querySelector('.gallery-header');
    
    // Initial check on page load
    if (window.scrollY > 80) {
        header?.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });


    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', () => {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Refresh ScrollTrigger after all images are loaded
        ScrollTrigger.refresh();
    });
});

