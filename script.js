// Door opening animation - auto-open after 2 seconds or click to open immediately
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const doorLeft = document.getElementById('doorLeft');
    const doorRight = document.getElementById('doorRight');
    const interiorView = document.getElementById('interiorView');
    const entranceImage = document.getElementById('entranceImage');
    const entranceContainer = document.querySelector('.entrance-container');
    const navbar = document.querySelector('.navbar');
    const heroText = document.querySelector('.hero-text');
    
    let doorsOpened = false;
    let autoOpenTimer = null;
    
    // Function to open doors
    function openDoors() {
        if (doorsOpened) return;
        doorsOpened = true;
        
        // Clear auto-open timer if doors are opened manually
        if (autoOpenTimer) {
            clearTimeout(autoOpenTimer);
        }
        
        // Add opened class to doors
        if (doorLeft && doorRight) {
            doorLeft.classList.add('opened');
            doorRight.classList.add('opened');
        }
        
        // Reveal interior view
        if (interiorView && entranceImage) {
            interiorView.classList.add('revealed');
            entranceImage.style.opacity = 0;
        }
        
        // Fade out hero text
        if (heroText) {
            heroText.style.opacity = 0;
            heroText.style.pointerEvents = 'none';
        }
    }
    
    // Click to open doors immediately
    if (entranceContainer) {
        entranceContainer.style.cursor = 'pointer';
        entranceContainer.addEventListener('click', openDoors);
        entranceContainer.title = 'Click to open';
    }
    
    // Auto-open doors after 2 seconds
    if (heroSection && doorLeft && doorRight) {
        autoOpenTimer = setTimeout(function() {
            if (!doorsOpened) {
                openDoors();
            }
        }, 2000);
    }
    
    // Navbar scroll effect (works on all pages)
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    handleScroll();
    
    // Add smooth fade-in animation on page load (only for home page)
    if (heroText) {
        window.addEventListener('load', function() {
            heroText.style.opacity = '0';
            heroText.style.transition = 'opacity 1s ease-in-out, transform 0.3s ease-out';
            setTimeout(function() {
                heroText.style.opacity = '1';
            }, 300);
        });
    }
});

