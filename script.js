// script.js

// === Layout Page Logic ===
let currentVideoIndex = 0; // Start at 0 for array indexing
const layoutAnimationVideo = document.getElementById('layout-animation-video');
const layoutVideoSource = document.getElementById('layout-video-source');
const layoutPageBody = document.querySelector('.layout-page');

// Define video sources for different device types
const desktopVideos = [
    'frame 1.mp4', // Desktop Part 1 (corrected slash)
    'frame 2.mp4', // Desktop Part 2 (corrected slash)
    'frame 3.mp4', // Desktop Part 3 (corrected slash)
    'frame 4.mp4'  // Desktop Part 4 (corrected slash)
];

const mobileTabletVideos = [
    'cracking egg 1-1.mp4', // Mobile/Tablet Part 1 (corrected slash)
    '1-2.mp4',             // Mobile/Tablet Part 2 (corrected slash)
    'cracking egg 1-3.mp4', // Mobile/Tablet Part 3 (corrected slash)
    'cracking egg 1-4.mp4'  // Mobile/Tablet Part 4 (corrected slash)
];

// Create an Audio object for the breaking shell sound
const shellBreakSound = new Audio('https://freesound.org/data/previews/321/321151_5482392-lq.mp3');
shellBreakSound.volume = 0.7;

if (layoutPageBody && layoutAnimationVideo && layoutVideoSource) {
    let activeVideos;
    // We'll manage a hidden video element for preloading
    let preloadedVideoElement = document.createElement('video');
    preloadedVideoElement.style.display = 'none';
    preloadedVideoElement.muted = true; // Always mute preloaded videos
    preloadedVideoElement.preload = 'auto'; // Crucial for preloading
    document.body.appendChild(preloadedVideoElement);

    // Determine which set of videos to use based on screen width
    const isMobileOrTablet = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileOrTablet) {
        activeVideos = mobileTabletVideos;
        console.log("Loading mobile/tablet videos.");
    } else {
        activeVideos = desktopVideos;
        console.log("Loading desktop videos.");
    }

    // --- Core Functions ---

    // Function to preload a specific video by index
    function preloadVideo(index) {
        if (index < activeVideos.length) {
            const videoPath = activeVideos[index];
            preloadedVideoElement.src = videoPath;
            preloadedVideoElement.load();
            console.log(`Preloading video: ${videoPath}`);
        }
    }

    // Function to play the video at the currentVideoIndex
    function playCurrentVideo() {
        if (currentVideoIndex >= activeVideos.length) {
            console.log("All videos played. Redirecting to home.html");
            window.location.href = 'home.html';
            return;
        }

        const videoPathToPlay = activeVideos[currentVideoIndex];
        console.log(`Now attempting to play video: ${videoPathToPlay}`);

        // If the preloaded video element holds the one we want to play, use it for instant swap
        // Also ensure the main video is unmuted if it's not already
        layoutAnimationVideo.muted = false; // Ensure it's unmuted before playing

        if (preloadedVideoElement.src.endsWith(videoPathToPlay)) {
            layoutVideoSource.src = videoPathToPlay; // Set the main player's source
            layoutAnimationVideo.load(); // Load instantly from the cached data
            layoutAnimationVideo.play().catch(e => console.error(`Error playing preloaded video ${videoPathToPlay}:`, e));
            console.log(`Swapped to preloaded video ${currentVideoIndex + 1}`);

            // Clear the preloaded element after using its source
            preloadedVideoElement.src = '';
            preloadedVideoElement.load();
        } else {
            // Fallback: If for some reason the desired video wasn't preloaded, load and play it directly
            console.warn(`Video ${videoPathToPlay} was not preloaded. Loading directly.`);
            layoutVideoSource.src = videoPathToPlay;
            layoutAnimationVideo.load();
            layoutAnimationVideo.play().catch(e => console.error(`Error playing video ${videoPathToPlay}:`, e));
        }

        // Set up the onended event for the currently playing video
        // This will only redirect AFTER the last video finishes, if no more clicks occur.
        // It's a fallback for the very last video.
        if (currentVideoIndex === activeVideos.length - 1) {
            layoutAnimationVideo.onended = () => {
                console.log("Last video ended. Redirecting to home.html");
                window.location.href = 'home.html';
            };
        } else {
            // For all other videos, clear the onended handler so it doesn't auto-advance
            // We want clicks to advance here.
            layoutAnimationVideo.onended = null;
        }

        // Immediately start preloading the *next* video in sequence
        preloadVideo(currentVideoIndex + 1);
    }

    // --- Event Handler for Clicks ---
    function handleLayoutPageInteraction(event) {
        event.preventDefault(); // Prevent default browser behavior

        // Play sound on every click (except potentially the very first one if it's purely for unmuting)
        shellBreakSound.currentTime = 0; // Rewind sound to start
        shellBreakSound.play().catch(e => console.error("Error playing sound:", e));

        // Increment index and play the next video
        currentVideoIndex++;
        playCurrentVideo();
    }

    // --- Initial Setup on Page Load ---

    // 1. Display the video element
    layoutAnimationVideo.style.display = 'block';

    // 2. Set the source of the first video
    layoutVideoSource.src = activeVideos[currentVideoIndex];
    layoutAnimationVideo.load();

    // 3. Attempt to play the first video immediately (it will be muted initially due to policies)
    layoutAnimationVideo.muted = true; // Start muted to allow autoplay
    layoutAnimationVideo.play().then(() => {
        console.log("Initial video started (muted).");
    }).catch(e => {
        console.warn("Autoplay of initial video (muted) failed:", e);
        // If even muted autoplay fails, you might show a "Click to Start" overlay.
    });

    // 4. Preload the *second* video so it's ready for the first user click
    preloadVideo(currentVideoIndex + 1);

    // 5. Attach event listeners for clicks/taps
    layoutPageBody.addEventListener('click', handleLayoutPageInteraction);
    layoutPageBody.addEventListener('touchend', handleLayoutPageInteraction);

    // --- Debugging Listeners (Optional) ---
    layoutAnimationVideo.addEventListener('error', (e) => {
        console.error('Video playback error:', layoutVideoSource.src, e);
    });
    layoutAnimationVideo.addEventListener('loadeddata', () => {
        console.log(`Video loaded data: ${layoutVideoSource.src}`);
    });
    layoutAnimationVideo.addEventListener('canplay', () => {
        console.log(`Video can play: ${layoutVideoSource.src}`);
    });
}

// === Home Page Logic ===
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    if (document.querySelector('.home-page-wrapper')) {
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
        
        if (mobileLoginIcon) {
            mobileLoginIcon.addEventListener('click', function() {
                window.location.href = 'C:\\Users\\AL_YOUSSEF\\Desktop\\Hala 2\\Entry\\login.html';
            });
        }
        
        // Desktop Login Button
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', function() {
                window.location.href = 'C:\\Users\\AL_YOUSSEF\\Desktop\\Hala 2\\Entry\\login.html';
            });
        }
        
      // Animated Photo on Scroll
const animatedPhoto = document.getElementById('animated-photo');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2'); // Ensure section2 is correctly identified

if (animatedPhoto && section1 && section2) {
    // Generate array of image paths (100.gif to 132.gif)
    const imageFrames = [
                'Comp 100.gif',
        'Comp 101.gif',
        'Comp 102.gif',
        'Comp 103.gif',
        'Comp 104.gif',
        'Comp 105.gif',
        'Comp 106.gif',
        'Comp 107.gif',
        'Comp 108.gif',
        'Comp 109.gif',
        'Comp 110.gif',
        'Comp 111.gif',
        'Comp 112.gif',
        'Comp 113.gif',
        'Comp 114.gif',
        'Comp 115.gif',
        'Comp 116.gif',
        'Comp 117.gif',
        'Comp 118.gif',
        'Comp 119.gif',
        'Comp 120.gif',
        'Comp 121.gif',
        'Comp 122.gif',
        'Comp 123.gif',
        'Comp 124.gif',
        'Comp 125.gif',
        'Comp 126.gif',
        'Comp 127.gif',
        'Comp 128.gif',
        'Comp 129.gif',
        'Comp 130.gif',
        'Comp 132.gif',
            ];

    let currentFrameIndex = -1; // Use -1 to ensure the first frame loads on initialization

    // --- Preloading Images for Smoothness ---
    function preloadAllAnimationImages() {
        const preloadPromises = imageFrames.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => {
                    console.warn(`Failed to preload image: ${src}`);
                    reject(new Error(`Failed to preload ${src}`));
                };
            });
        });

        Promise.allSettled(preloadPromises).then(results => {
            console.log('All scroll animation images attempted to preload.');
        });
    }

    // --- Core Animation Logic ---
    function updateAnimationFrame() {
        const scrollPosition = window.scrollY;
        const section1Top = section1.offsetTop; // Absolute scroll position of the top of section1
        const section2Top = section2.offsetTop; // Absolute scroll position of the top of section2
        const windowHeight = window.innerHeight;

        const animationStartPoint = section1Top;

        let totalAnimationScrollRange = windowHeight * 0.5; // Example: Animation completes over 1.5 times the viewport height

        // Ensure a minimum length (e.g., at least half a viewport height)
        if (totalAnimationScrollRange <= 0 || isNaN(totalAnimationScrollRange)) {
            console.warn("Calculated animation scroll range is non-positive or NaN. Setting to 0.5 * windowHeight as fallback.");
            totalAnimationScrollRange = windowHeight * 0.25; // Default to half a viewport height
        }

        const animationEndPoint = animationStartPoint + totalAnimationScrollRange;

        // Calculate scroll progress (0 to 1) within the defined animation range
        let scrollProgress = 0;
        if (scrollPosition >= animationStartPoint && scrollPosition <= animationEndPoint) {
            scrollProgress = (scrollPosition - animationStartPoint) / totalAnimationScrollRange;
        } else if (scrollPosition > animationEndPoint) {
            scrollProgress = 1; // Ensure last frame is shown if scrolled past the end point
        }
        // If scrollPosition < animationStartPoint, scrollProgress remains 0 (first frame)

        // Clamp the progress to ensure it's always between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        // Determine which image frame to show based on the calculated progress
        const frameIndex = Math.floor(scrollProgress * (imageFrames.length - 1));
        const clampedFrameIndex = Math.max(0, Math.min(imageFrames.length - 1, frameIndex)); // Ensure index is within bounds

        if (clampedFrameIndex !== currentFrameIndex) {
            currentFrameIndex = clampedFrameIndex;
            animatedPhoto.src = imageFrames[currentFrameIndex];
            // console.log(`Setting animatedPhoto.src to: ${imageFrames[currentFrameIndex]} (Frame: ${currentFrameIndex})`); // For debugging
        }
    }

    // --- Initialization ---

    // Preload all images immediately on page load for a smoother animation
    preloadAllAnimationImages();

    // Set the initial image source to the first frame
    animatedPhoto.src = imageFrames[0];
    currentFrameIndex = 0; // Update currentFrameIndex to match

    // Attach scroll listener, debounced with requestAnimationFrame for performance
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateAnimationFrame);
    });

    // Call updateAnimationFrame once on load to set the correct initial frame
    // in case the user loads the page mid-scroll.
    updateAnimationFrame();

    // Add a resize listener to re-evaluate section positions if the layout changes
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateAnimationFrame);
    });
}

// --- Scroll-based Photo Animation (Div-2: Services to Div-3) ---
const servicesAnimatedPhoto = document.getElementById('services-animated-photo');
const section3 = document.getElementById('section3');

const servicesToTrustedAnimationFrames = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png'
];

// Preload all images to ensure consistent sizing
function preloadImages() {
    servicesToTrustedAnimationFrames.forEach(src => {
        const img = new Image();
        img.src = src;
        // Set the same dimensions for all preloaded images
        img.width = servicesAnimatedPhoto.width;
        img.height = servicesAnimatedPhoto.height;
    });
}

let currentServicesToTrustedFrameIndex = 0;
const scrollPerFrameServicesToTrusted = window.innerHeight * 0.5;
const totalAnimationScrollHeightServicesToTrusted = servicesToTrustedAnimationFrames.length * scrollPerFrameServicesToTrusted;

if (section2) {
    section2.style.minHeight = `${totalAnimationScrollHeightServicesToTrusted + window.innerHeight}px`;
}

const updateServicesToTrustedAnimationFrame = () => {
    if (!servicesAnimatedPhoto || !section2 || !section3) return;

    const scrollRelativeToSection2 = window.scrollY - section2.offsetTop;
    const animationProgress = Math.max(0, Math.min(1, scrollRelativeToSection2 / totalAnimationScrollHeightServicesToTrusted));
    
    const frameIndex = Math.floor(animationProgress * (servicesToTrustedAnimationFrames.length - 1));

    if (frameIndex !== currentServicesToTrustedFrameIndex) {
        // Maintain the same dimensions when changing images
        const currentWidth = servicesAnimatedPhoto.width;
        const currentHeight = servicesAnimatedPhoto.height;
        
        servicesAnimatedPhoto.style.opacity = '0';
        
        setTimeout(() => {
            servicesAnimatedPhoto.src = servicesToTrustedAnimationFrames[frameIndex];
            // Explicitly set dimensions to prevent fluctuations
            servicesAnimatedPhoto.width = currentWidth;
            servicesAnimatedPhoto.height = currentHeight;
            servicesAnimatedPhoto.style.opacity = '1';
            currentServicesToTrustedFrameIndex = frameIndex;
        }, 100);
    }
};

// Initialize
if (servicesAnimatedPhoto && section2 && section3) {
    // Set initial dimensions
    servicesAnimatedPhoto.width = window.innerWidth * 0.75;
    servicesAnimatedPhoto.height = window.innerHeight * 0.75;
    
    preloadImages();
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateServicesToTrustedAnimationFrame);
    });
    
    // Handle window resize to maintain consistent sizing
    window.addEventListener('resize', () => {
        servicesAnimatedPhoto.width = window.innerWidth * 0.75;
        servicesAnimatedPhoto.height = window.innerHeight * 0.75;
    });
    
    updateServicesToTrustedAnimationFrame();
}
        
        // Video Modal
        const watchJourneyBtn = document.getElementById('watchJourneyBtn');
        const videoModal = document.getElementById('videoModal');
        const closeVideoBtn = document.getElementById('closeVideoBtn');
        const journeyVideo = document.getElementById('journeyVideo');
        
        if (watchJourneyBtn && videoModal) {
            watchJourneyBtn.addEventListener('click', function() {
                videoModal.style.display = 'flex';
                journeyVideo.play();
            });
            
            closeVideoBtn.addEventListener('click', function() {
                videoModal.style.display = 'none';
                journeyVideo.pause();
                journeyVideo.currentTime = 0;
            });
            
            window.addEventListener('click', function(event) {
                if (event.target === videoModal) {
                    videoModal.style.display = 'none';
                    journeyVideo.pause();
                    journeyVideo.currentTime = 0;
                }
            });
        }
        
        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(13, 13, 13, 0.9)';
                } else {
                    header.style.backgroundColor = 'transparent';
                }
            }
        });

       // --- Portfolio Download Logic (Div-4) ---
        const downloadPortfolioBtn = document.getElementById('downloadPortfolioBtn');
        if (downloadPortfolioBtn) {
            downloadPortfolioBtn.addEventListener('click', function() {
                const emailInput = document.getElementById('emailInput');
                const phoneInput = document.getElementById('phoneInput');
                const agreeCheckbox = document.getElementById('agreeCheckbox');

                // Basic validation
                if (!emailInput.value || !phoneInput.value) {
                    alert('Please enter both your email and phone number.');
                    return;
                }
                if (!agreeCheckbox.checked) {
                    alert('You must agree to receive marketing communications to download the portfolio.');
                    return;
                }

                // In a real application, you would send this data to a server
                // and then trigger the download. For this example, we'll directly
                // trigger a download of a placeholder PDF.
                console.log('Email:', emailInput.value);
                console.log('Phone:', phoneInput.value);
                console.log('Agreed to marketing:', agreeCheckbox.checked);

                // Create a dummy anchor element to trigger download
                const downloadLink = document.createElement('a');
                downloadLink.href = 'https://drive.google.com/file/d/1bF3fGo-d1_ixFlDOXENebxnEwtDaesvE/view?usp=sharing'; // Placeholder PDF URL
                downloadLink.download = 'Branchez_Portfolio.pdf'; // Suggested filename for download
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                alert('Thank you! Your portfolio download should begin shortly.'); // Use a custom modal in production
            });
        }
            }
});