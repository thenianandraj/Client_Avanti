// Door opening animation - auto-open after 2 seconds or click to open immediately
document.addEventListener('DOMContentLoaded', function () {
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

    // ========== MOBILE MENU TOGGLE FOR HOME PAGE ==========
    const menuToggle = document.getElementById('menuToggle');
    const homeHeader = document.querySelector('.home-header');

    if (menuToggle && homeHeader) {
        const navMenu = homeHeader.querySelector('.nav-menu');

        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });

        // Close menu when clicking a link (except dropdown toggles)
        if (navMenu) {
            const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!homeHeader.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }

    // ========== DROPDOWN MENU TOGGLE FOR MOBILE ==========
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    navDropdowns.forEach(function (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        if (toggle) {
            toggle.addEventListener('click', function (e) {
                // Only toggle on mobile (when menu toggle is visible)
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Check if we're on the home page (has door animation)
    const isHomePage = doorLeft && doorRight && entranceContainer;

    // If NOT on home page, show navbar immediately
    if (!isHomePage) {
        if (navbar) navbar.classList.add('visible');
        const homeHeader = document.querySelector('.home-header');
        if (homeHeader) homeHeader.classList.add('visible');
    }

    // ========== HERO CAROUSEL ==========
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const slides = heroCarousel.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        let carouselInterval = null;

        function nextSlide() {
            // Remove active from current slide
            slides[currentSlide].classList.remove('active');
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            // Add active to new slide
            slides[currentSlide].classList.add('active');
        }

        // Start carousel - change every 4 seconds
        function startCarousel() {
            carouselInterval = setInterval(nextSlide, 4000);
        }

        // Stop carousel
        function stopCarousel() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }
        }

        // Remove blur from carousel when doors open
        function removeCarouselBlur() {
            slides.forEach(function (slide) {
                slide.classList.add('no-blur');
            });
        }

        // Start the carousel
        startCarousel();

        // Expose removeCarouselBlur to be called when doors open
        window.removeCarouselBlur = removeCarouselBlur;
    }

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

        // Hide corner decorations when doors open
        if (entranceContainer) {
            entranceContainer.classList.add('doors-opened');
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

    // Click to open doors immediately (also reveal post-content)
    if (entranceContainer) {
        entranceContainer.style.cursor = 'pointer';
        entranceContainer.addEventListener('click', function () { openDoorsAndReveal(); });
        entranceContainer.title = 'Click to open';
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

        // Handle home-header scroll effect (transparent -> maroon)
        const homeHeaderNav = document.querySelector('.home-header');
        if (homeHeaderNav) {
            if (scrollTop > 50) {
                homeHeaderNav.classList.add('scrolled');
            } else {
                homeHeaderNav.classList.remove('scrolled');
            }
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    handleScroll();

    // Letter-by-letter animation using GSAP, then open doors and reveal post-content
    function splitIntoLetters(element, isHighlight) {
        isHighlight = isHighlight || false;
        var text = element.textContent;
        element.innerHTML = '';

        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            if (ch === ' ') {
                // Add space as text node to preserve spacing
                element.appendChild(document.createTextNode(' '));
            } else {
                var span = document.createElement('span');
                span.className = 'letter' + (isHighlight ? ' highlight-letter' : '');
                span.textContent = ch;
                element.appendChild(span);
            }
        }
    }

    function processHeroElementLetters(element) {
        // Handle elements with nested spans (like .highlight)
        var children = Array.from(element.childNodes);
        element.innerHTML = '';

        children.forEach(function (child) {
            if (child.nodeType === 3) { // Text node
                var text = child.textContent;
                for (var i = 0; i < text.length; i++) {
                    var ch = text[i];
                    if (ch === ' ') {
                        element.appendChild(document.createTextNode(' '));
                    } else {
                        var span = document.createElement('span');
                        span.className = 'letter';
                        span.textContent = ch;
                        element.appendChild(span);
                    }
                }
            } else if (child.nodeType === 1) { // Element node
                var isHighlight = child.classList && child.classList.contains('highlight');
                var text = child.textContent;
                for (var i = 0; i < text.length; i++) {
                    var ch = text[i];
                    if (ch === ' ') {
                        element.appendChild(document.createTextNode(' '));
                    } else {
                        var span = document.createElement('span');
                        span.className = 'letter' + (isHighlight ? ' highlight-letter' : '');
                        span.textContent = ch;
                        element.appendChild(span);
                    }
                }
            }
        });
    }

    // Animate all hero text elements letter by letter
    var heroTextEl = document.querySelector('.hero-text');
    if (heroTextEl) {
        var heroWelcome = heroTextEl.querySelector('.hero-welcome');
        var heroH1 = heroTextEl.querySelector('h1');
        var heroTagline = heroTextEl.querySelector('.hero-tagline');
        var heroBtn = heroTextEl.querySelector('.btn');

        // Process all text elements into letters
        if (heroWelcome) splitIntoLetters(heroWelcome);
        if (heroH1) processHeroElementLetters(heroH1);
        if (heroTagline) splitIntoLetters(heroTagline);
        if (heroBtn) heroBtn.classList.add('letter-animated');

        // Collect all letters in order
        var allLetters = heroTextEl.querySelectorAll('.letter');

        if (typeof gsap !== 'undefined' && allLetters.length) {
            // Create timeline for letter animations with burst and bounce
            var tl = gsap.timeline({
                delay: 0.2,
                onComplete: function () {
                    // After all letters animate, open doors and reveal post content
                    setTimeout(openDoorsAndReveal, 200);
                }
            });

            // Animate letters with burst and bounce effect
            tl.to(allLetters, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.03,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'  // Burst and bounce effect
            });

            // Animate button with bounce
            if (heroBtn) {
                tl.to(heroBtn, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)'  // Bounce effect for button
                }, "-=0.3");
            }
        } else {
            // Fallback: show everything and open doors
            allLetters.forEach(function (l) {
                l.style.opacity = '1';
                l.style.transform = 'none';
            });
            if (heroBtn) {
                heroBtn.style.opacity = '1';
                heroBtn.style.transform = 'none';
            }
            setTimeout(openDoorsAndReveal, 300);
        }
    }

    // When doors open, reveal additional content (navbar first, then Tamil content)
    const originalOpenDoors = openDoors;
    function openDoorsAndReveal() {
        originalOpenDoors();

        // Remove blur from carousel backgrounds when doors open
        if (window.removeCarouselBlur) {
            window.removeCarouselBlur();
        }

        // Step 1: After doors start opening, reveal navbar and logo (after 1 second)
        setTimeout(function () {
            if (navbar) {
                navbar.classList.add('visible');
            }
            // Also show the new home-header navbar
            const homeHeaderNav = document.querySelector('.home-header');
            if (homeHeaderNav) {
                homeHeaderNav.classList.add('visible');
            }
        }, 1000);

        // Step 2: After navbar appears, reveal content with slider animation (after 1.8 seconds total)
        const revealContent = document.getElementById('revealContent');
        if (revealContent) {
            setTimeout(function () {
                revealContent.setAttribute('aria-hidden', 'false');
                revealContent.classList.add('visible');

                // Start the reveal slider
                initRevealSlider(revealContent);
            }, 1800);
        }
    }

    // Function to handle reveal slider with rotating content and letter animation
    function initRevealSlider(container) {
        const slides = container.querySelectorAll('.reveal-slide');
        const contactBtn = container.querySelector('.contact-btn');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds per slide

        if (slides.length === 0) return;

        // Prepare all slides - wrap English text in letter spans
        slides.forEach(function (slide) {
            const enText = slide.querySelector('.reveal-line-en');
            if (enText) {
                const originalHTML = enText.innerHTML;
                // Check if already processed
                if (!enText.classList.contains('letter-wrapped')) {
                    // Remove heart emoji from text before processing
                    const text = enText.textContent.replace(/❤️/g, '').replace(/🤍/g, '').trim();
                    const hasHeartIcon = originalHTML.includes('heart-icon');
                    let newHTML = '';
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === ' ') {
                            newHTML += ' ';
                        } else {
                            newHTML += '<span class="letter">' + text[i] + '</span>';
                        }
                    }
                    // Keep heart icon if exists (only add once)
                    if (hasHeartIcon) {
                        newHTML += ' <span class="heart-icon">❤️</span>';
                    }
                    enText.innerHTML = newHTML;
                    enText.classList.add('letter-wrapped');
                }
            }
        });

        // Function to animate letters of current slide
        function animateCurrentSlide() {
            const currentSlideEl = slides[currentSlide];
            const letters = currentSlideEl.querySelectorAll('.letter');
            const tamilText = currentSlideEl.querySelector('.reveal-line-ta');

            if (typeof gsap !== 'undefined' && letters.length > 0) {
                // Reset letters for bubble effect
                gsap.set(letters, { opacity: 0, y: 40, scale: 0 });
                if (tamilText) gsap.set(tamilText, { opacity: 0, y: 20 });

                // Animate letters with bubble pop effect
                gsap.to(letters, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.04,
                    ease: 'elastic.out(1.2, 0.5)',
                    onComplete: function () {
                        // Animate Tamil text after English
                        if (tamilText) {
                            gsap.to(tamilText, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    }
                });
            }
        }

        // Show contact button
        if (contactBtn) {
            contactBtn.style.opacity = '0';
            setTimeout(function () {
                if (typeof gsap !== 'undefined') {
                    gsap.to(contactBtn, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    });
                } else {
                    contactBtn.style.opacity = '1';
                }
            }, 600);
        }

        // Animate first slide
        animateCurrentSlide();

        // Function to show next slide
        function showNextSlide() {
            // Remove active from current
            slides[currentSlide].classList.remove('active');

            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active to new slide
            slides[currentSlide].classList.add('active');

            // Animate the new slide
            setTimeout(animateCurrentSlide, 100);
        }

        // Start the slider loop
        setInterval(showNextSlide, slideInterval);
    }

    // Ensure manual calls (if any) use the combined function
    // If openDoors was used elsewhere (like earlier code), keep a wrapper to call reveal as well
    // Replace the old openDoors in our current scope by pointing the click handler above; other calls use openDoors directly

    // ============================================
    // TAMIL CALENDAR MODAL FUNCTIONALITY
    // ============================================
    const calendarBtn = document.getElementById('calendarBtn');
    const calendarModal = document.getElementById('calendarModal');
    const calendarClose = document.getElementById('calendarClose');

    if (calendarBtn && calendarModal) {
        // Open modal
        calendarBtn.addEventListener('click', function () {
            calendarModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal - X button
        if (calendarClose) {
            calendarClose.addEventListener('click', function () {
                calendarModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close modal - Click outside
        calendarModal.addEventListener('click', function (e) {
            if (e.target === calendarModal) {
                calendarModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal - ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && calendarModal.classList.contains('active')) {
                calendarModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

});

