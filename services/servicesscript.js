document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    if (document.querySelector('.services-page-wrapper')) {
        // Mobile Navigation Toggle
        const mobileNavToggle = document.getElementById('mobileNavToggle');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const closeMobileNav = document.getElementById('closeMobileNav');
        const mobileLoginIcon = document.getElementById('mobileLoginIcon');
        
        if (mobileNavToggle && mobileNavOverlay) {
            mobileNavToggle.addEventListener('click', function() {
                mobileNavOverlay.style.width = '100%';
            });
        }
        
        if (closeMobileNav) {
            closeMobileNav.addEventListener('click', function() {
                mobileNavOverlay.style.width = '0';
            });
        }
        
    }
})   
        // Desktop Login Button
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', function() {
                window.location.href = 'c:\\Users\\AL_YOUSSEF\\Desktop\\Hala 2\\Entry\\login.html';
            });
        }
    

    // === Horizontal Scroll Indicator Logic ===
    const horizontalScrollContainer = document.getElementById('horizontalScrollContainer');
    const scrollIndicatorBar = document.getElementById('scrollIndicatorBar');
    const scrollPercentageSpan = document.getElementById('scrollPercentage');

    if (horizontalScrollContainer && scrollIndicatorBar && scrollPercentageSpan) {
        horizontalScrollContainer.addEventListener('scroll', function() {
            const scrollLeft = horizontalScrollContainer.scrollLeft;
            const scrollWidth = horizontalScrollContainer.scrollWidth - horizontalScrollContainer.clientWidth;

            if (scrollWidth > 0) {
                const percentage = (scrollLeft / scrollWidth) * 100;
                scrollIndicatorBar.style.width = `${percentage}%`;
                scrollPercentageSpan.textContent = `${Math.round(percentage)}%`;
            } else {
                scrollIndicatorBar.style.width = '0%';
                scrollPercentageSpan.textContent = '0%';
            }
        });

        // Initialize on load
        horizontalScrollContainer.dispatchEvent(new Event('scroll'));

        // === Keyboard Horizontal Scrolling for Laptop Users ===
        document.addEventListener('keydown', function(event) {
            // Check if the horizontal scroll container is visible and has scrollable content
            if (horizontalScrollContainer && horizontalScrollContainer.scrollWidth > horizontalScrollContainer.clientWidth) {
                const scrollAmount = 100; // Pixels to scroll per key press

                if (event.key === 'ArrowLeft') {
                    horizontalScrollContainer.scrollLeft -= scrollAmount;
                    event.preventDefault(); // Prevent default browser scroll behavior
                } else if (event.key === 'ArrowRight') {
                    horizontalScrollContainer.scrollLeft += scrollAmount;
                    event.preventDefault(); // Prevent default browser scroll behavior
                }
            }
        });
    }

// === Image Flip Logic for All Devices ===
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    // Remove listener from flipIcon and add to the entire card
    card.addEventListener('click', function(event) {
 
        if (event.target.closest('a')) {
            return; // Don't flip if an internal link was clicked
        }

        card.classList.toggle('flipped'); // Toggle the 'flipped' class on the service-card
    });
});

    // === Header background change on scroll ===
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

